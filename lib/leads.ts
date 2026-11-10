import { and, desc, eq, lt, or } from "drizzle-orm";
import type { getDb } from "../db/index";
import { leads } from "../db/schema";
import { CONSENT_VERSION, MAX_LEAD_BODY_BYTES, type CrmStatus, type LeadSuccessResponse, type NormalizedLeadSubmission } from "./lead-contract";

type LeadDb = ReturnType<typeof getDb>;
export type LeadRecord = typeof leads.$inferSelect;
type NewLead = typeof leads.$inferInsert;
export interface LeadStore {
  find(id: string): Promise<LeadRecord | undefined>;
  insert(record: NewLead): Promise<LeadRecord | undefined>;
  consumeRate(bucketKey: string, limit: number, expiresAt: number): Promise<boolean>;
  markCrm(id: string, status: CrmStatus, attemptedAt: number, error: string | null): Promise<void>;
  cleanRateLimits(now: number): Promise<void>;
}
export interface LeadDeliveryConfig { webhookUrl?: string; webhookToken?: string; rateLimitSalt?: string }
export class LeadRequestError extends Error {
  constructor(public status: number, message: string, public retryAfter?: number) { super(message); this.name = "LeadRequestError"; }
}

export function createLeadStore(db: LeadDb, raw: D1Database): LeadStore {
  return {
    async find(id) { return (await db.select().from(leads).where(eq(leads.id, id)).limit(1))[0]; },
    async insert(record) { return (await db.insert(leads).values(record).onConflictDoNothing({ target: leads.id }).returning())[0]; },
    async consumeRate(bucketKey, limit, expiresAt) {
      const row = await raw.prepare("INSERT INTO lead_rate_limits (bucket_key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(bucket_key) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count").bind(bucketKey, expiresAt, limit).first<{ count: number }>();
      return !!row;
    },
    async markCrm(id, status, attemptedAt, error) { await db.update(leads).set({ crmStatus: status, crmAttempts: 1, crmAttemptedAt: attemptedAt, crmLastError: error }).where(eq(leads.id, id)); },
    async cleanRateLimits(now) { await raw.prepare("DELETE FROM lead_rate_limits WHERE bucket_key IN (SELECT bucket_key FROM lead_rate_limits WHERE expires_at < ? LIMIT 100)").bind(now).run(); },
  };
}

export async function readLeadJson(request: Request): Promise<unknown> {
  if (!request.body) throw new LeadRequestError(400, "Please complete the enquiry form.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_LEAD_BODY_BYTES) { await reader.cancel(); throw new LeadRequestError(413, "This enquiry is too large."); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); }
  catch { throw new LeadRequestError(400, "Please send a valid enquiry."); }
}

async function hash(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function saveLead(
  input: NormalizedLeadSubmission,
  context: { origin: string; ip: string | null; now?: number },
  store: LeadStore,
  config: LeadDeliveryConfig,
  deliver: typeof fetch = fetch,
): Promise<{ status: 200 | 201; body: LeadSuccessResponse }> {
  const now = context.now ?? Date.now();
  const requestHash = await hash(JSON.stringify(input));
  const existing = await store.find(input.submissionId);
  if (existing) return replay(existing, requestHash);

  const salt = config.rateLimitSalt ?? context.origin;
  const hour = 3_600_000;
  const emailWindow = Math.floor(now / hour) * hour;
  const emailKey = "email:" + await hash(salt + "|" + input.email) + ":" + emailWindow;
  if (!await store.consumeRate(emailKey, 5, emailWindow + hour)) throw new LeadRequestError(429, "You have sent several requests recently. Please try again later or email Jody directly.", Math.ceil((emailWindow + hour - now) / 1000));
  if (context.ip) {
    const interval = 600_000;
    const window = Math.floor(now / interval) * interval;
    const key = "ip:" + await hash(salt + "|" + context.ip) + ":" + window;
    if (!await store.consumeRate(key, 10, window + interval)) throw new LeadRequestError(429, "Too many requests. Please try again in a few minutes.", Math.ceil((window + interval - now) / 1000));
  }

  const record: NewLead = {
    id: input.submissionId,
    reference: "JP-" + crypto.randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase(),
    requestHash, kind: input.kind, name: input.name, email: input.email, phone: input.phone,
    interest: input.interest, message: input.message, preferredTime: input.preferredTime,
    consentContact: input.consentContact, consentEmail: input.consentEmail, consentSms: input.consentSms,
    consentVersion: CONSENT_VERSION, source: input.source, createdAt: now,
    crmStatus: config.webhookUrl ? "pending" : "not_configured", crmAttempts: 0,
  };
  const inserted = await store.insert(record);
  if (!inserted) {
    const winner = await store.find(input.submissionId);
    if (!winner) throw new Error("Idempotent insertion could not be resolved.");
    return replay(winner, requestHash);
  }

  let crmStatus = inserted.crmStatus as CrmStatus;
  if (config.webhookUrl) {
    let error: string | null = null;
    try {
      const url = new URL(config.webhookUrl);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error("invalid_configuration");
      const response = await deliver(url, {
        method: "POST", redirect: "error", signal: AbortSignal.timeout(5_000),
        headers: { "Content-Type": "application/json", "Idempotency-Key": input.submissionId, ...(config.webhookToken ? { Authorization: "Bearer " + config.webhookToken } : {}) },
        body: JSON.stringify({ event: "lead.created", version: 1, reference: inserted.reference, submittedAt: new Date(now).toISOString(), ...input, consentVersion: CONSENT_VERSION, website: undefined }),
      });
      if (!response.ok) error = "HTTP " + response.status;
      else crmStatus = "sent";
      await response.body?.cancel();
    } catch (cause) {
      error = cause instanceof Error && cause.message === "invalid_configuration" ? "invalid_configuration" : "delivery_failed";
    }
    // If delivery's acknowledgement is uncertain, retain a durable pending state.
    // Replaying the browser submission never sends the webhook a second time.
    try { await store.markCrm(inserted.id, crmStatus, now, error); }
    catch { crmStatus = "pending"; }
  }
  await store.cleanRateLimits(now).catch(() => {});
  return { status: 201, body: { ok: true, reference: inserted.reference, crmStatus } };
}

function replay(record: LeadRecord, requestHash: string): { status: 200; body: LeadSuccessResponse } {
  if (record.requestHash !== requestHash) throw new LeadRequestError(409, "This request has already been submitted with different details. Please start a new enquiry.");
  return { status: 200, body: { ok: true, reference: record.reference, crmStatus: record.crmStatus as CrmStatus } };
}

export async function listLeads(db: LeadDb, cursor?: string, limit = 50) {
  let before: { createdAt: number; id: string } | undefined;
  if (cursor) {
    const match = /^(\d{10,15})\.([0-9a-f-]{36})$/i.exec(cursor);
    if (match) before = { createdAt: Number(match[1]), id: match[2] };
  }
  const rows = await db.select().from(leads)
    .where(before ? or(lt(leads.createdAt, before.createdAt), and(eq(leads.createdAt, before.createdAt), lt(leads.id, before.id))) : undefined)
    .orderBy(desc(leads.createdAt), desc(leads.id)).limit(Math.min(limit, 5000) + 1);
  const hasMore = rows.length > limit;
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  return { items, hasMore, nextCursor: hasMore && last ? `${last.createdAt}.${last.id}` : null };
}

export function csvCell(value: unknown): string {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^[\s\u0000-\u001f\u007f]*[=+\-@]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}

export function leadsToCsv(rows: LeadRecord[]): string {
  const columns = ["Reference", "Submitted UTC", "Type", "Name", "Email", "Phone", "Interest", "Message", "Preferred time", "Respond to request", "Email updates opt-in", "SMS opt-in", "Consent version", "Source", "CRM status"];
  const lines = rows.map((lead) => [lead.reference, new Date(lead.createdAt).toISOString(), lead.kind, lead.name, lead.email, lead.phone, lead.interest, lead.message, lead.preferredTime, lead.consentContact ? "Yes" : "No", lead.consentEmail ? "Yes" : "No", lead.consentSms ? "Yes" : "No", lead.consentVersion, lead.source, lead.crmStatus].map(csvCell).join(","));
  return "\uFEFF" + [columns.map(csvCell).join(","), ...lines].join("\r\n") + "\r\n";
}
