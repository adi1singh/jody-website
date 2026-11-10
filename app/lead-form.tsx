"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LEAD_INTERESTS, type LeadInterest, type LeadKind, type LeadSuccessResponse, type LeadSubmission } from "../lib/lead-contract";

export type LeadFormProps = {
  kind: LeadKind;
  interest?: LeadInterest | string;
  source?: string;
  buttonLabel?: string;
  compact?: boolean;
  title?: string;
  onSuccess?: (result: LeadSuccessResponse) => void;
};

const bookingInterests = new Set(["General enquiry", "Hypnotherapy", "Quit smoking", "Quit vaping", "Mental gastric bypass", "Life coaching", "Equestrian mindset"]);

export function resolveLeadInterest(value?: string | null): LeadInterest | undefined {
  if (!value) return undefined;
  const normalise = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = normalise(value);
  const canonical = LEAD_INTERESTS.find((item) => normalise(item) === key);
  if (canonical) return canonical;
  const aliases: Record<string, string> = { hypnosis: "Hypnotherapy", equestrian: "Equestrian mindset", book: "Book updates", audio: "Free audio", audios: "Free audio", speaking: "Speaking and commentating" };
  return LEAD_INTERESTS.find((item) => item === aliases[key]);
}

function initialInterest(kind: LeadKind, requested?: string): LeadInterest {
  if (kind === "book") return "Book updates";
  if (kind === "newsletter") return "Newsletter";
  const resolved = resolveLeadInterest(requested);
  if (resolved && (kind !== "booking" || bookingInterests.has(resolved))
    && (kind !== "audio" || resolved.endsWith("audio") || resolved === "Podcast and audios")) return resolved;
  if (kind === "audio") return "Free audio";
  return "General enquiry";
}

function ArrowIcon() {
  return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

export default function LeadForm({ kind, interest, source, buttonLabel, compact = false, title, onSuccess }: LeadFormProps) {
  const formId = `lead-${useId().replaceAll(":", "")}`;
  const formRef = useRef<HTMLFormElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const attemptRef = useRef<{ id: string; fingerprint: string } | null>(null);
  const mounted = useRef(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<LeadSuccessResponse | null>(null);
  const [savedInterest, setSavedInterest] = useState("");
  const waitlist = kind === "book" || kind === "audio" || kind === "newsletter";
  const selectedInterest = initialInterest(kind, interest);
  const pending = status === "submitting";

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; controllerRef.current?.abort(); };
  }, []);

  // Preserve all other entries when a service link changes the selected topic.
  useEffect(() => { if (selectRef.current) selectRef.current.value = selectedInterest; }, [selectedInterest]);

  // A saved/error state changes the height of the page. Let the chapter motion
  // recalculate after React has committed the new form or confirmation.
  useEffect(() => { window.dispatchEvent(new Event("jody:layout")); }, [status, selectedInterest]);

  const fieldProps = (field: string) => ({
    "aria-invalid": Boolean(fieldErrors[field]) || undefined,
    "aria-describedby": fieldErrors[field] ? `${formId}-${field}-error` : undefined,
  });
  const fieldError = (field: string) => fieldErrors[field]
    ? <span className="lead-field-error" id={`${formId}-${field}-error`}>{fieldErrors[field]}</span> : null;

  const fail = (message: string, fields: Record<string, string> = {}) => {
    if (!mounted.current) return;
    setStatus("error"); setError(message); setFieldErrors(fields);
    const firstField = Object.keys(fields)[0];
    if (firstField) requestAnimationFrame(() => {
      const element = formRef.current?.elements.namedItem(firstField);
      if (element instanceof HTMLElement) element.focus();
    });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (controllerRef.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const consentEmail = data.get("consentEmail") === "on";
    const consentSms = data.get("consentSms") === "on";
    const phone = text("phone");
    if (consentSms && !phone) {
      fail("Please add a phone number for SMS updates, or untick SMS updates.", { phone: "A phone number is needed for SMS updates." });
      return;
    }
    const enquiryInterest = waitlist ? selectedInterest : initialInterest(kind, text("interest"));
    const payload: Omit<LeadSubmission, "submissionId"> = {
      kind, name: text("name") || undefined, email: text("email"), phone: phone || undefined,
      interest: enquiryInterest, message: text("message") || undefined, preferredTime: text("preferredTime") || undefined,
      consentContact: waitlist ? consentEmail : data.get("consentContact") === "on", consentEmail, consentSms,
      source: (source || `website-${kind}`).slice(0, 120), website: text("website"),
    };
    const fingerprint = JSON.stringify(payload);
    if (!attemptRef.current || attemptRef.current.fingerprint !== fingerprint) attemptRef.current = { id: crypto.randomUUID(), fingerprint };
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setStatus("submitting"); setError(""); setFieldErrors({});
    let saved: LeadSuccessResponse | undefined;
    try {
      const response = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submissionId: attemptRef.current.id }), signal: controller.signal,
      });
      const body = await response.json().catch(() => null) as {
        ok?: boolean; reference?: string; crmStatus?: string; error?: string; fields?: Record<string, unknown>;
      } | null;
      if (!response.ok || !body?.ok || typeof body.reference !== "string") {
        const fields = Object.fromEntries(Object.entries(body?.fields ?? {}).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
        fail(typeof body?.error === "string" ? body.error : "We couldn’t save your request just now. Please try again.", fields);
        return;
      }
      saved = { ok: true, reference: body.reference, crmStatus: body.crmStatus === "sent" || body.crmStatus === "not_configured" ? body.crmStatus : "pending" };
      if (!mounted.current) return;
      setSavedInterest(enquiryInterest); setResult(saved); setStatus("success"); attemptRef.current = null;
      window.dispatchEvent(new CustomEvent("jody:lead-saved", { detail: { kind } }));
    } catch (cause) {
      const timedOut = cause instanceof DOMException && cause.name === "AbortError";
      fail(timedOut ? "That took longer than expected. Please try again; an identical retry won’t create a duplicate request." : "We couldn’t connect. Check your connection and try again; your entries are still here.");
    } finally {
      window.clearTimeout(timeout); controllerRef.current = null;
    }
    // A consumer callback cannot turn a saved request into a submission error.
    if (saved && mounted.current) onSuccess?.(saved);
  };

  const consentLabel = kind === "book" ? "Email me about Live Sexy Now. I agree to be contacted for book updates."
    : kind === "audio" ? `Email me when ${selectedInterest === "Free audio" ? "the free audios are" : `the ${selectedInterest.replace(/ audio$/, "").toLowerCase()} audio is`} ready. I agree to be contacted for these updates.`
      : "I’d like occasional email updates from Jody and agree to be contacted for the newsletter.";
  const defaultTitle = waitlist ? "Stay close to the next chapter." : kind === "booking" ? "Request a session." : "A note to Jody.";
  const defaultButton = kind === "book" ? "Join the book list" : kind === "audio" ? "Notify me when it’s ready" : kind === "newsletter" ? "Keep me in the loop" : kind === "booking" ? "Send session request" : "Send enquiry";

  if (status === "success" && result) return <div className={`lead-form lead-success${compact ? " lead-form--compact" : ""}`} role="status" aria-live="polite">
    <span className="lead-success-mark" aria-hidden="true">✓</span><p className="lead-kicker">{waitlist ? "Your interest is saved" : "Your request is received"}</p>
    <h3>{waitlist ? "You’re on the list." : "Thank you for reaching out."}</h3>
    <p>{kind === "book" ? "Your request for news about Live Sexy Now has been saved." : kind === "newsletter" ? "Your newsletter signup has been saved." : kind === "audio" ? `Your request for ${savedInterest.toLowerCase()} updates has been saved.` : kind === "booking" ? "Your session request has been saved. Your appointment is confirmed only after a time has been agreed with Jody." : "Your details have been saved for follow-up."}</p>
    <p className="lead-reference">Your reference <strong>{result.reference}</strong></p>
    <button className="lead-text-button" type="button" onClick={() => { setStatus("idle"); setResult(null); setError(""); setFieldErrors({}); attemptRef.current = null; }}>{waitlist ? "Use another email" : "Send another enquiry"}<ArrowIcon /></button>
  </div>;

  return <form ref={formRef} className={`lead-form${compact ? " lead-form--compact" : ""}${waitlist ? " lead-form--waitlist" : ""}`} onSubmit={submit}
    onInput={() => { if (status === "error") { setStatus("idle"); setError(""); setFieldErrors({}); } }}
    aria-busy={pending} aria-labelledby={`${formId}-title`} data-lead-kind={kind}>
    <div className="lead-form-heading"><h3 id={`${formId}-title`}>{title ?? defaultTitle}</h3><span aria-hidden="true"><ArrowIcon /></span></div>
    {kind === "booking" && <p className="lead-intro-note">Tell Jody what works for you. This sends a request; it does not reserve or confirm a time.</p>}
    <fieldset className="lead-fieldset" disabled={pending}>
      <div className="lead-honeypot" aria-hidden="true"><label htmlFor={`${formId}-website`}>Leave this field empty</label><input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="lead-field-grid">
        {!waitlist && <label className="lead-field" htmlFor={`${formId}-name`}><span>Your name{kind === "chat" && <small>optional</small>}</span><input id={`${formId}-name`} name="name" type="text" autoComplete="name" placeholder="First and last name" required={kind !== "chat"} maxLength={120} {...fieldProps("name")} />{fieldError("name")}</label>}
        <label className="lead-field" htmlFor={`${formId}-email`}><span>Email address</span><input id={`${formId}-email`} name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" required maxLength={254} {...fieldProps("email")} />{fieldError("email")}</label>
        {!waitlist && <label className="lead-field" htmlFor={`${formId}-phone`}><span>Phone <small>optional</small></span><input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your contact number" maxLength={32} {...fieldProps("phone")} />{fieldError("phone")}</label>}
        {!waitlist && kind !== "chat" && <label className="lead-field" htmlFor={`${formId}-time`}><span>{kind === "booking" ? "Preferred session time" : "Preferred session or contact time"} <small>optional</small></span><input id={`${formId}-time`} name="preferredTime" type="text" placeholder="e.g. weekday afternoons" maxLength={180} {...fieldProps("preferredTime")} />{fieldError("preferredTime")}</label>}
      </div>
      {!waitlist && <>
        <label className="lead-field" htmlFor={`${formId}-interest`}><span>I’m interested in</span><select ref={selectRef} id={`${formId}-interest`} name="interest" defaultValue={selectedInterest} {...fieldProps("interest")}>{LEAD_INTERESTS.filter((item) => kind !== "booking" || bookingInterests.has(item)).map((item) => <option key={item} value={item}>{item}</option>)}</select>{fieldError("interest")}</label>
        <label className="lead-field" htmlFor={`${formId}-message`}><span>A little about your enquiry <small>optional</small></span><textarea id={`${formId}-message`} name="message" rows={3} maxLength={2500} placeholder="What would you like to explore?" {...fieldProps("message")} aria-describedby={[`${formId}-message-note`, fieldErrors.message ? `${formId}-message-error` : ""].filter(Boolean).join(" ")} /><span className="lead-field-note" id={`${formId}-message-note`}>Keep medical details for your session.</span>{fieldError("message")}</label>
      </>}
      <div className="lead-consents">
        {waitlist ? <label className="lead-check"><input type="checkbox" name="consentEmail" required {...fieldProps("consentEmail")} /><span>{consentLabel}</span></label> : <>
          <label className="lead-check"><input type="checkbox" name="consentContact" required {...fieldProps("consentContact")} /><span>I agree to be contacted about this enquiry.</span></label>
          <details className="lead-optional"><summary>Optional updates <span aria-hidden="true">+</span></summary><div><label className="lead-check"><input type="checkbox" name="consentEmail" {...fieldProps("consentEmail")} /><span>Also send me occasional email updates.</span></label><label className="lead-check"><input type="checkbox" name="consentSms" {...fieldProps("consentSms")} /><span>Also send me SMS updates. A phone number is required.</span></label></div></details>
        </>}
        {fieldError("consentContact")}{fieldError("consentEmail")}{fieldError("consentSms")}
      </div>
      {error && <p className="lead-error" role="alert">{error}</p>}
      <button className="lead-submit" type="submit" disabled={pending}><span>{pending ? "Saving your request…" : buttonLabel ?? defaultButton}</span>{pending ? <span className="lead-spinner" aria-hidden="true" /> : <ArrowIcon />}</button>
      <p className="lead-privacy">{waitlist ? "Only the updates you opt in to. " : "Optional updates are separate from your enquiry. "}<a href="/privacy">Privacy policy</a></p>
    </fieldset>
  </form>;
}
