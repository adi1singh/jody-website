import assert from "node:assert/strict";
import test from "node:test";
import { csvCell, LeadRequestError, readLeadJson, saveLead, type LeadRecord, type LeadStore } from "./leads";
import { MAX_LEAD_BODY_BYTES, validateLeadSubmission, type NormalizedLeadSubmission } from "./lead-contract";

function input(): NormalizedLeadSubmission {
  const result = validateLeadSubmission({ submissionId: crypto.randomUUID(), kind: "enquiry", email: "person@example.com", interest: "Hypnotherapy", message: "Please contact me.", consentContact: true, consentEmail: false, consentSms: false, source: "contact", website: "" });
  if (!result.ok) throw new Error("Fixture is invalid");
  return result.value;
}
class MemoryStore implements LeadStore {
  rows = new Map<string, LeadRecord>();
  buckets = new Map<string, number>();
  failInsert = false;
  async find(id: string) { return this.rows.get(id); }
  async insert(record: Parameters<LeadStore["insert"]>[0]) {
    if (this.failInsert) throw new Error("Database unavailable");
    if (this.rows.has(record.id)) return undefined;
    const row = { ...record, crmAttempts: record.crmAttempts ?? 0, crmAttemptedAt: null, crmLastError: null } as LeadRecord;
    this.rows.set(record.id, row);
    return row;
  }
  async consumeRate(key: string, limit: number) {
    const count = this.buckets.get(key) ?? 0;
    if (count >= limit) return false;
    this.buckets.set(key, count + 1);
    return true;
  }
  async markCrm(id: string, status: LeadRecord["crmStatus"], attemptedAt: number, error: string | null) {
    Object.assign(this.rows.get(id)!, { crmStatus: status, crmAttemptedAt: attemptedAt, crmAttempts: 1, crmLastError: error });
  }
  async cleanRateLimits() {}
}
const context = { origin: "https://jody.example", ip: "192.0.2.1", now: 1_794_000_000_000 };

test("identical browser retries return the same saved lead without consuming more limits", async () => {
  const store = new MemoryStore(); const lead = input();
  const first = await saveLead(lead, context, store, {});
  const retry = await saveLead(lead, context, store, {});
  assert.equal(first.status, 201); assert.equal(retry.status, 200);
  assert.equal(first.body.reference, retry.body.reference); assert.equal(store.rows.size, 1);
  assert.equal(first.body.crmStatus, "not_configured");
  assert.deepEqual([...store.buckets.values()], [1, 1]);
});

test("reusing an identifier for changed data is rejected", async () => {
  const store = new MemoryStore(); const lead = input();
  await saveLead(lead, context, store, {});
  await assert.rejects(saveLead({ ...lead, email: "changed@example.com" }, context, store, {}), (cause: unknown) => cause instanceof LeadRequestError && cause.status === 409);
  assert.equal(store.rows.size, 1);
});

test("concurrent identical submissions create one record and one CRM request", async () => {
  const store = new MemoryStore(); const lead = input(); let sent = 0;
  const deliver = (async () => { sent++; await Promise.resolve(); return new Response(null, { status: 204 }); }) as typeof fetch;
  const results = await Promise.all([saveLead(lead, context, store, { webhookUrl: "https://crm.example/lead" }, deliver), saveLead(lead, context, store, { webhookUrl: "https://crm.example/lead" }, deliver)]);
  assert.equal(store.rows.size, 1); assert.equal(sent, 1);
  assert.equal(results[0].body.reference, results[1].body.reference);
  assert.equal(store.rows.get(lead.submissionId)?.crmStatus, "sent");
});

test("database failures never acknowledge a save or forward a CRM request", async () => {
  const store = new MemoryStore(); store.failInsert = true; let sent = 0;
  const deliver = (async () => { sent++; return new Response(); }) as typeof fetch;
  await assert.rejects(saveLead(input(), context, store, { webhookUrl: "https://crm.example/lead" }, deliver));
  assert.equal(store.rows.size, 0); assert.equal(sent, 0);
});

test("CRM failure preserves the lead and pending state without retrying on replay", async () => {
  const store = new MemoryStore(); const lead = input(); let sent = 0;
  const deliver = (async () => { sent++; throw new Error("Network failure"); }) as typeof fetch;
  const result = await saveLead(lead, context, store, { webhookUrl: "https://crm.example/lead" }, deliver);
  assert.equal(result.status, 201); assert.equal(result.body.crmStatus, "pending");
  assert.equal(store.rows.get(lead.submissionId)?.crmLastError, "delivery_failed");
  await saveLead(lead, context, store, { webhookUrl: "https://crm.example/lead" }, deliver);
  assert.equal(sent, 1);
});

test("durable rate limits cap new enquiries but allow a saved request to be retried", async () => {
  const store = new MemoryStore(); const first = input();
  await saveLead(first, context, store, {});
  for (let i = 0; i < 4; i++) await saveLead(input(), context, store, {});
  await assert.rejects(saveLead(input(), context, store, {}), (cause: unknown) => cause instanceof LeadRequestError && cause.status === 429);
  assert.equal((await saveLead(first, context, store, {})).status, 200);
  assert.equal(store.rows.size, 5);
});

test("rejects oversized streamed bodies even without a content-length header", async () => {
  const request = new Request("https://jody.example/api/leads", { method: "POST", body: "x".repeat(MAX_LEAD_BODY_BYTES + 1) });
  await assert.rejects(readLeadJson(request), (cause: unknown) => cause instanceof LeadRequestError && cause.status === 413);
  await assert.rejects(readLeadJson(new Request("https://jody.example/api/leads", { method: "POST", body: "invalid JSON" })), (cause: unknown) => cause instanceof LeadRequestError && cause.status === 400);
});

test("CSV cells neutralize spreadsheet formulas and escape embedded delimiters", () => {
  for (const value of ["=1+1", "+cmd", "-2+3", "@SUM(A1)", "\t=HYPERLINK()", "\r\n+formula"]) assert.ok(csvCell(value).startsWith('"\''));
  assert.equal(csvCell('A "quoted", name'), '"A ""quoted"", name"');
  assert.equal(csvCell("ordinary text"), '"ordinary text"');
});
