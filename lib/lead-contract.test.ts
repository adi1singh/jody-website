import assert from "node:assert/strict";
import test from "node:test";
import { checkBrowserWrite, MAX_LEAD_BODY_BYTES, validateLeadSubmission } from "./lead-contract";

const valid = () => ({ submissionId: crypto.randomUUID(), kind: "enquiry", email: " Person@Example.com ", name: " A Person ", interest: "Hypnotherapy", message: "Please contact me.", consentContact: true, consentEmail: false, consentSms: false, source: "contact", website: "" });

test("normalizes contact details and allows an enquiry without marketing consent", () => {
  const result = validateLeadSubmission(valid());
  assert.equal(result.ok, true);
  if (result.ok) { assert.equal(result.value.email, "person@example.com"); assert.equal(result.value.name, "A Person"); assert.equal(result.value.consentEmail, false); }
});

test("waitlists require explicit email consent and preserve distinct audio topics", () => {
  for (const [kind, interest] of [["book", "Book updates"], ["audio", "Sleep audio"], ["newsletter", "Newsletter"]]) {
    assert.equal(validateLeadSubmission({ ...valid(), kind, interest }).ok, false);
    const accepted = validateLeadSubmission({ ...valid(), kind, interest, consentEmail: true });
    assert.equal(accepted.ok, true);
    if (accepted.ok) assert.equal(accepted.value.interest, interest);
  }
});

test("requires contact permission, boolean preferences and a phone for SMS", () => {
  assert.equal(validateLeadSubmission({ ...valid(), consentContact: false }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), consentEmail: "false" }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), consentSms: true }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), consentSms: true, phone: "+61 412 345 678" }).ok, true);
});

test("rejects spam, unsupported interests, malformed identifiers, oversized and extra fields", () => {
  assert.equal(validateLeadSubmission({ ...valid(), website: "https://spam.example" }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), interest: "arbitrary admin topic" }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), submissionId: "guessable" }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), message: "a".repeat(2501) }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), isAdmin: true }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), email: "bad@example.com\r\nBcc: stolen@example.com" }).ok, false);
});

test("booking and update kinds must use corresponding service topics", () => {
  assert.equal(validateLeadSubmission({ ...valid(), kind: "booking", interest: "Quit smoking" }).ok, true);
  assert.equal(validateLeadSubmission({ ...valid(), kind: "booking", interest: "Book updates" }).ok, false);
  assert.equal(validateLeadSubmission({ ...valid(), kind: "audio", interest: "Hypnotherapy", consentEmail: true }).ok, false);
});

test("browser write gate rejects absent/cross origins and non-JSON requests", () => {
  const req = (headers: Record<string, string>) => new Request("https://jody.example/api/leads", { method: "POST", headers });
  const good = { origin: "https://jody.example", "content-type": "application/json", "sec-fetch-site": "same-origin" };
  assert.equal(checkBrowserWrite(req(good)).ok, true);
  assert.equal(checkBrowserWrite(req({ "content-type": "application/json" })).ok, false);
  assert.equal(checkBrowserWrite(req({ ...good, origin: "https://other.example" })).ok, false);
  assert.equal(checkBrowserWrite(req({ ...good, "sec-fetch-site": "same-site" })).ok, false);
  assert.equal(checkBrowserWrite(req({ ...good, "content-type": "text/plain" })).ok, false);
  assert.equal(checkBrowserWrite(req({ ...good, "content-length": String(MAX_LEAD_BODY_BYTES + 1) })).ok, false);
});
