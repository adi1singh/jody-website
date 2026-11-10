import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull(),
  requestHash: text("request_hash").notNull(),
  kind: text("kind").notNull(),
  name: text("name").notNull().default(""),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  interest: text("interest").notNull(),
  message: text("message").notNull().default(""),
  preferredTime: text("preferred_time").notNull().default(""),
  consentContact: integer("consent_contact", { mode: "boolean" }).notNull(),
  consentEmail: integer("consent_email", { mode: "boolean" }).notNull(),
  consentSms: integer("consent_sms", { mode: "boolean" }).notNull(),
  consentVersion: text("consent_version").notNull(),
  source: text("source").notNull(),
  createdAt: integer("created_at").notNull(),
  crmStatus: text("crm_status").notNull().default("not_configured"),
  crmAttempts: integer("crm_attempts").notNull().default(0),
  crmAttemptedAt: integer("crm_attempted_at"),
  crmLastError: text("crm_last_error"),
}, (table) => [
  uniqueIndex("leads_reference_unique").on(table.reference),
  index("leads_created_at_index").on(table.createdAt, table.id),
  index("leads_kind_index").on(table.kind),
]);

export const leadRateLimits = sqliteTable("lead_rate_limits", {
  bucketKey: text("bucket_key").primaryKey(),
  count: integer("count").notNull().default(1),
  expiresAt: integer("expires_at").notNull(),
}, (table) => [index("lead_rate_limits_expiry_index").on(table.expiresAt)]);
