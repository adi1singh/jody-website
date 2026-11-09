export const LEAD_KINDS = ["enquiry", "book", "audio", "newsletter", "booking", "chat"] as const;
export type LeadKind = typeof LEAD_KINDS[number];

export const LEAD_INTERESTS = [
  "General enquiry", "Hypnotherapy", "Quit smoking", "Quit vaping", "Mental gastric bypass",
  "Life coaching", "Equestrian mindset", "Book updates", "Podcast and audios",
  "Speaking and commentating", "Newsletter", "Free audio", "Sleep audio", "Anxiety audio",
  "Depression audio", "Money rewiring audio",
] as const;
export type LeadInterest = typeof LEAD_INTERESTS[number];

export const CONSENT_VERSION = "lead-consent-v1";
export const MAX_LEAD_BODY_BYTES = 16_384;

export interface LeadSubmission {
  submissionId: string;
  kind: LeadKind;
  name?: string;
  email: string;
  phone?: string;
  interest: LeadInterest;
  message?: string;
  preferredTime?: string;
  consentContact: boolean;
  consentEmail: boolean;
  consentSms: boolean;
  source: string;
  website: string;
}

export type CrmStatus = "not_configured" | "sent" | "pending";
export interface LeadSuccessResponse { ok: true; reference: string; crmStatus: CrmStatus }
export interface LeadErrorResponse { ok: false; error: string; fields?: Record<string, string> }
export type LeadResponse = LeadSuccessResponse | LeadErrorResponse;

export type NormalizedLeadSubmission = Required<LeadSubmission>;
export type LeadValidationResult = { ok: true; value: NormalizedLeadSubmission } | LeadErrorResponse;

const WAITLIST_KINDS = new Set<LeadKind>(["book", "audio", "newsletter"]);
const SESSION_INTERESTS = new Set<LeadInterest>([
  "General enquiry", "Hypnotherapy", "Quit smoking", "Quit vaping", "Mental gastric bypass",
  "Life coaching", "Equestrian mindset",
]);
const AUDIO_INTERESTS = new Set<LeadInterest>([
  "Free audio", "Podcast and audios", "Sleep audio", "Anxiety audio", "Depression audio", "Money rewiring audio",
]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const FIELDS = new Set([
  "submissionId", "kind", "name", "email", "phone", "interest", "message", "preferredTime",
  "consentContact", "consentEmail", "consentSms", "source", "website",
]);

/** Shared client/server validation. Server validation is always authoritative. */
export function validateLeadSubmission(input: unknown): LeadValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, error: "Please send a valid enquiry." };
  const data = input as Record<string, unknown>;
  if (Object.keys(data).some((key) => !FIELDS.has(key))) return { ok: false, error: "The enquiry contains an unsupported field." };
  const errors: Record<string, string> = {};
  const string = (key: string, limit: number, required = false) => {
    const original = data[key];
    if (original === undefined && !required) return "";
    if (typeof original !== "string") { errors[key] = "Please enter a valid value."; return ""; }
    const value = original.trim();
    if ((required && !value) || value.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) {
      errors[key] = required && !value ? "This field is required." : `Please use ${limit} characters or fewer.`;
    }
    return value;
  };
  const submissionId = string("submissionId", 36, true).toLowerCase();
  if (!UUID.test(submissionId)) errors.submissionId = "Please refresh the form and try again.";
  const kindValue = string("kind", 20, true);
  const kind = kindValue as LeadKind;
  if (!(LEAD_KINDS as readonly string[]).includes(kind)) errors.kind = "Please choose a valid request type.";
  const name = string("name", 120);
  const email = string("email", 254, true).toLowerCase();
  if (!EMAIL.test(email) || email.split("@")[0]?.length > 64) errors.email = "Please enter a valid email address.";
  const phone = string("phone", 32);
  if (phone && (!/^[+()\d.\s-]+$/.test(phone) || phone.replace(/\D/g, "").length < 6)) errors.phone = "Please enter a valid phone number.";
  const interest = string("interest", 80, true) as LeadInterest;
  if (!(LEAD_INTERESTS as readonly string[]).includes(interest)) errors.interest = "Please choose one of the listed interests.";
  const message = string("message", 2500);
  const preferredTime = string("preferredTime", 180);
  const source = string("source", 120, true);
  const website = string("website", 200, true);
  // A blank honeypot is required but must not be reported as a visible form error.
  delete errors.website;
  if (typeof data.website !== "string" || data.website.trim()) return { ok: false, error: "This request could not be accepted. Please try again." };
  const boolean = (key: string) => {
    if (typeof data[key] !== "boolean") errors[key] = "Please confirm your contact preferences.";
    return data[key] === true;
  };
  const consentContact = boolean("consentContact");
  const consentEmail = boolean("consentEmail");
  const consentSms = boolean("consentSms");
  if (!consentContact) errors.consentContact = "Please allow us to respond to this request.";
  if (WAITLIST_KINDS.has(kind) && !consentEmail) errors.consentEmail = "Please opt in to email updates for this signup.";
  if (consentSms && !phone) errors.phone = "A phone number is needed for SMS contact.";
  if (kind === "booking" && !SESSION_INTERESTS.has(interest)) errors.interest = "Please choose a session or coaching service.";
  if (kind === "book" && interest !== "Book updates") errors.interest = "Please select book updates.";
  if (kind === "audio" && !AUDIO_INTERESTS.has(interest)) errors.interest = "Please select an audio topic.";
  if (kind === "newsletter" && interest !== "Newsletter") errors.interest = "Please select newsletter updates.";
  if (Object.keys(errors).length) return { ok: false, error: "Please check the highlighted fields.", fields: errors };
  return { ok: true, value: { submissionId, kind, name, email, phone, interest, message, preferredTime, consentContact, consentEmail, consentSms, source, website } };
}

/** Browser writes must originate from this exact origin; no wildcard CORS. */
export function checkBrowserWrite(request: Request): { ok: true } | { ok: false; status: number; error: string } {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null" || origin !== new URL(request.url).origin) return { ok: false, status: 403, error: "Please submit this form from the website." };
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return { ok: false, status: 403, error: "Please submit this form from the website." };
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return { ok: false, status: 415, error: "Please send the form as JSON." };
  const declaredSize = request.headers.get("content-length");
  if (declaredSize && (!/^\d+$/.test(declaredSize) || Number(declaredSize) > MAX_LEAD_BODY_BYTES)) return { ok: false, status: 413, error: "This enquiry is too large." };
  return { ok: true };
}
