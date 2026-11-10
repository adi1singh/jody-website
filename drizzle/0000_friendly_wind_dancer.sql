CREATE TABLE `lead_rate_limits` (
	`bucket_key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `lead_rate_limits_expiry_index` ON `lead_rate_limits` (`expires_at`);--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`request_hash` text NOT NULL,
	`kind` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`interest` text NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`preferred_time` text DEFAULT '' NOT NULL,
	`consent_contact` integer NOT NULL,
	`consent_email` integer NOT NULL,
	`consent_sms` integer NOT NULL,
	`consent_version` text NOT NULL,
	`source` text NOT NULL,
	`created_at` integer NOT NULL,
	`crm_status` text DEFAULT 'not_configured' NOT NULL,
	`crm_attempts` integer DEFAULT 0 NOT NULL,
	`crm_attempted_at` integer,
	`crm_last_error` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_reference_unique` ON `leads` (`reference`);--> statement-breakpoint
CREATE INDEX `leads_created_at_index` ON `leads` (`created_at`,`id`);--> statement-breakpoint
CREATE INDEX `leads_kind_index` ON `leads` (`kind`);