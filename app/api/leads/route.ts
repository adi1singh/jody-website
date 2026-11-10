import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { checkBrowserWrite, validateLeadSubmission } from "@/lib/lead-contract";
import { createLeadStore, LeadRequestError, readLeadJson, saveLead } from "@/lib/leads";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };

export async function POST(request: Request) {
  const browser = checkBrowserWrite(request);
  if (!browser.ok) return Response.json({ ok: false, error: browser.error }, { status: browser.status, headers });
  if (!env.DB) return Response.json({ ok: false, error: "The enquiry service is temporarily unavailable. Please email Jody directly." }, { status: 503, headers });
  try {
    const validation = validateLeadSubmission(await readLeadJson(request));
    if (!validation.ok) return Response.json(validation, { status: 400, headers });
    const result = await saveLead(validation.value, {
      origin: new URL(request.url).origin,
      ip: request.headers.get("cf-connecting-ip"),
    }, createLeadStore(getDb(), env.DB), {
      webhookUrl: env.CRM_WEBHOOK_URL,
      webhookToken: env.CRM_WEBHOOK_TOKEN,
      rateLimitSalt: env.RATE_LIMIT_SALT,
    });
    return Response.json(result.body, { status: result.status, headers });
  } catch (cause) {
    if (cause instanceof LeadRequestError) return Response.json({ ok: false, error: cause.message }, { status: cause.status, headers: { ...headers, ...(cause.retryAfter ? { "Retry-After": String(cause.retryAfter) } : {}) } });
    // Do not expose submitted text, email addresses, service URLs, or database errors.
    console.error("Lead capture failed before a successful acknowledgement.");
    return Response.json({ ok: false, error: "We could not confirm that your enquiry was saved. Please retry with the same details or email Jody directly." }, { status: 503, headers });
  }
}
