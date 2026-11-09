import { env } from "cloudflare:workers";
import { getChatGPTUser, chatGPTSignInPath, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { getAdminAccess } from "@/lib/admin-auth";
import { listLeads } from "@/lib/leads";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { title: "Owner enquiries · Jody Pockran", robots: { index: false, follow: false } };

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ before?: string }> }) {
  const user = await getChatGPTUser();
  const access = getAdminAccess(user, env.ADMIN_EMAILS);
  const params = await searchParams;
  const cursor = typeof params.before === "string" ? params.before : undefined;
  if (!access.allowed) return <main className={styles.page}><div className={styles.wrap}><a className={styles.brand} href="/">Jody Pockran</a><h1 className={styles.heading}>Owner access</h1><p className={styles.description}>{access.reason}</p>{access.status === 401 ? <a className={styles.button} href={chatGPTSignInPath("/admin")} target="_top">Sign in with ChatGPT</a> : <a className={styles.button} href="/">Return to the website</a>}{user && <p><a href={chatGPTSignOutPath("/admin")} target="_top">Sign out</a></p>}</div></main>;

  if (!env.DB) return <main className={styles.page}><div className={styles.wrap}><a className={styles.brand} href="/">Jody Pockran</a><h1 className={styles.heading}>Enquiries</h1><p className={styles.notice}>Enquiry storage is temporarily unavailable. Please check the database configuration.</p></div></main>;
  const result = await listLeads(getDb(), cursor);
  const formatTime = (time: number) => new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short", timeZone: "Australia/Sydney" }).format(new Date(time));
  const kindLabels: Record<string, string> = { enquiry: "Enquiry", booking: "Session request", book: "Book updates", audio: "Audio updates", newsletter: "Newsletter", chat: "Chat follow-up" };
  const crmLabels: Record<string, string> = { not_configured: "CRM not connected", sent: "Sent to CRM", pending: "CRM delivery pending review" };
  return <main className={styles.page}><div className={styles.wrap}>
    <header className={styles.top}><a className={styles.brand} href="/">Jody Pockran</a><nav className={styles.nav} aria-label="Owner navigation"><a href="/">View website</a><a href="/privacy">Privacy</a><a href={chatGPTSignOutPath("/")} target="_top">Sign out</a></nav></header>
    <h1 className={styles.heading}>Your enquiries.</h1>
    <p className={styles.description}>Submissions saved through the website. Review the visitor’s contact preferences before following up. A session request is not a confirmed appointment.</p>
    <div className={styles.toolbar}><div className={styles.quiet}>Signed in as {access.user.email}<br />Dates shown in Australia/Sydney.</div><a className={styles.button} href="/api/leads/export">Export latest 5,000 to CSV</a></div>
    {!env.CRM_WEBHOOK_URL && <p className={styles.notice}>Enquiries are stored here. No CRM is connected, and this website does not automatically send email or SMS messages.</p>}
    {result.items.length ? <div className={styles.list}>{result.items.map((lead) => <article key={lead.id} className={styles.lead}>
      <div className={styles.leadTop}><div><h2 className={styles.name}>{lead.name || "Name not supplied"}</h2><span className={styles.reference}>{lead.reference}</span></div><span className={styles.badge}>{kindLabels[lead.kind] ?? lead.kind}</span></div>
      <div className={styles.meta}><a href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone && <span>{lead.phone}</span>}<time dateTime={new Date(lead.createdAt).toISOString()}>{formatTime(lead.createdAt)}</time></div>
      <p><strong>Interest:</strong> {lead.interest}</p>
      {lead.preferredTime && <p><strong>Preferred time:</strong> {lead.preferredTime}</p>}
      {lead.message && <p className={styles.message}>{lead.message}</p>}
      <div className={styles.consents} aria-label="Recorded contact preferences"><span className={lead.consentContact ? styles.yes : styles.no}>Reply to this request: {lead.consentContact ? "Allowed" : "Not allowed"}</span><span className={lead.consentEmail ? styles.yes : styles.no}>Email updates: {lead.consentEmail ? "Opted in" : "Not opted in"}</span><span className={lead.consentSms ? styles.yes : styles.no}>SMS: {lead.consentSms ? "Opted in" : "Not opted in"}</span></div>
      <div className={styles.bottom}><span className={styles.quiet}>Source: {lead.source} · Consent: {lead.consentVersion}</span><span className={styles.quiet}>{crmLabels[lead.crmStatus] ?? "CRM status unavailable"}{lead.crmAttemptedAt ? ` · ${formatTime(lead.crmAttemptedAt)}` : ""}</span></div>
    </article>)}</div> : <div className={styles.empty}><h2 className={styles.name}>No enquiries here yet.</h2><p>New website submissions will appear here after they are saved.</p></div>}
    <nav className={styles.pagination} aria-label="Enquiry pages">{cursor && <a href="/admin">Newest enquiries</a>}{result.nextCursor && <a className={styles.button} href={`/admin?before=${encodeURIComponent(result.nextCursor)}`}>Older enquiries</a>}<span className={styles.quiet}>Showing {result.items.length} {result.items.length === 1 ? "submission" : "submissions"}.</span></nav>
  </div></main>;
}
