declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    /** Comma-separated, verified owner email addresses. No default access. */
    ADMIN_EMAILS?: string;
    /** Optional server-side CRM destination. Leave absent until configured. */
    CRM_WEBHOOK_URL?: string;
    CRM_WEBHOOK_TOKEN?: string;
    /** Optional additional salt for short-lived anti-abuse identifiers. */
    RATE_LIMIT_SALT?: string;
  }
}
