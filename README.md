# Jody Pockran — A Life in Chapters

Website setup, features and launch handoff. Reissued 10 November 2026.

- Private review website: https://jody-a-life-in-chapters.jobgen-ai.chatgpt.site/
- Owner enquiry inbox: https://jody-a-life-in-chapters.jobgen-ai.chatgpt.site/admin
- Original website: https://jody-website.vercel.app/

The review website requires the authorised owner’s ChatGPT sign-in. It is a separate deployment from the original Vercel website. This README describes the implemented review build and identifies the remaining launch connections.

A complete responsive, editorial website with six chapters, an accessible contents menu, scroll-linked GSAP scenes, a CSS 3D book, direct enquiry and signup forms, and a protected owner inbox backed by Cloudflare D1.

## Repository handoff

This export includes the complete application source and Git history. Start with `AI_HANDOFF.md` for the project state, important files and remaining work. `AGENTS.md` gives coding agents the project-specific instructions. The exported repository has no remote configured; add your own GitHub remote when you want to push it.

## Run locally

These commands require the complete project source. Open a terminal in the extracted or cloned project folder containing `package.json`. Requirements: Node.js 22.13 or newer and npm. Run commands from that project root. The project uses React, TypeScript, Vinext/Vite and GSAP. Its Sites integration builds a Cloudflare Worker and static assets.

### Install and build

```bash
npm ci
npm run build
```

The build generates `dist/server/wrangler.json`, including the `DB` binding declared in `.openai/hosting.json`.

### Apply the first local database migration

For a fresh local database, apply the existing migration once:

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_friendly_wind_dancer.sql
```

Use `.wrangler/state`, not `.wrangler/state/v3`; Wrangler adds its own versioned directories. Do not replay a migration already applied locally. Local and hosted databases are separate. The Sites publishing workflow applies pending hosted migrations. A successful local migration does not apply the same migration to the hosted database.

### Preview the working Worker

Run one local server at a time. Complete the build and local migration above before using the built preview.

```bash
npm run start
```

Use the local URL printed by Wrangler. This built preview includes D1-backed form handling. For iterative frontend development, the project also provides:

```bash
npm run dev
```

Rebuild the Worker before testing changed server code with `npm run start`.

For local runtime settings, create an ignored `.env.local` in your project directory and pass its **absolute path** explicitly:

```bash
npm run start -- --env-file /absolute/path/to/jody-storybook/.env.local
```

Replace the example path with the real path on your machine. The default built configuration lives in `dist/server/wrangler.json`, so a `.dev.vars` file in the project root is not automatically loaded as a file beside that configuration. Keep local environment files untracked; configure hosted settings through the hosting platform.

Local development does not reproduce the hosted ChatGPT sign-in boundary. Verify the complete owner sign-in flow on the hosted preview as well.

### Validate changes

```bash
npx tsc --noEmit --incremental false
node --import tsx --test lib/lead-contract.test.ts lib/admin-auth.test.ts lib/leads.test.ts
npm run build
```

The tests cover consent and input validation, exact-origin browser writes, oversized request bodies, idempotent and concurrent submissions, rate limiting, failed saves, CRM forwarding, owner authorization and spreadsheet formula injection. Run `npm run lint` when linting is required.

After changing `db/schema.ts`, generate an additional migration:

```bash
npm run db:generate
```

Inspect the generated SQL and metadata, rebuild if needed, and apply each new pending SQL file locally using the migration command above with its actual filename. Applied migrations and metadata are immutable. Tables are never created or altered while handling form requests.

## Main files

- `app/page.tsx` — the chapter content and semantic layout.
- `app/globals.css` and `app/brand.css` — responsive layouts, modern black-and-gold styling and CSS book geometry.
- `app/motion.tsx` — responsive GSAP / ScrollTrigger timelines and cleanup.
- `app/navigation.tsx` — table of contents, accessible modal and active chapter indicator.
- `app/lead-form.tsx` — shared direct enquiry, booking-request and signup form; preference handling and safe retries.
- `app/lead-experience.tsx` — audio selection, newsletter interaction and the website helper/follow-up experience.
- `app/api/leads/route.ts` — validated, same-origin lead capture.
- `app/admin/page.tsx` — protected owner enquiry inbox.
- `app/api/leads/export/route.ts` — protected CSV export.
- `app/privacy/page.tsx` — collection, usage and preference information.
- `lib/lead-contract.ts` — shared request types, supported topics and validation rules.
- `lib/leads.ts` — durable saving, idempotency, rate limiting, optional CRM forwarding and CSV formatting.
- `lib/admin-auth.ts` — explicit owner-allowlist authorization.
- `db/schema.ts` and `drizzle/` — D1 schema and generated migrations.
- `src/data/content.ts` — the verified source content reference used during the redesign.
- `src/data/site-config.ts` — approved destinations, media, social links and optional trust content.
- `public/images/` — responsive WebP photographs and self-hosted fonts.
- `public/photo-credits.txt` — original sources and licence details.

## Client requirements and session wording

Hypnosis is the lead service, with life coaching presented as monthly mentoring and equestrian mindset coaching as a new offer for riders and competitors. NLP, speaking and commentating support those main pillars.

- Standard hypnosis session: $250 AUD; quit smoking is priced separately and costs more.
- Session sequence: a 90-minute whole-life analysis, followed by hypnosis and a personal recording made on the client’s phone, then 21 nights of listening. The 90 minutes is not the total appointment duration.
- Nothing is payable upfront. Cancellations within 24 hours incur half the session fee.
- Specialist enquiries include quitting smoking, quitting vaping and mental gastric bypass. Other specialist and package prices must be confirmed with Jody.
- Live Sexy Now remains forthcoming. The podcast is planned around one episode per chapter, with guests, at Daniel’s studio.

## Narrative

Cover → I. Meet Jody → II. Hypnosis & coaching → III. Find your stride → IV. Live Sexy Now → V. Beyond the page → VI. Your next chapter.

The page uses native scrolling. Desktop scenes can pin briefly; mobile and touch layouts use normal document flow. Reduced-motion preferences remove the moving scenes. Server-rendered content stays legible if the animation code cannot load.

## Content and availability

Primary brief: the client meeting notes of 5 November 2026, recorded in `docs/client-brief-2026-11-05.md`. Existing public content and imagery: https://jody-website.vercel.app/ reviewed in this conversation.

The site retains Jody's published services, qualification descriptions, session price ($250 AUD), session process and public contact email. It does not invent life events, testimonial quotes, customer counts or results. The personal story chapter currently uses verified professional information. Add Jody's approved autobiographical copy and authentic personal photos to make this a fuller memoir.

`Live Sexy Now` remains forthcoming. The custom book artwork is a typographic cover concept, labelled on the page. The podcast is in production and free audios are being recorded. Replace availability copy only when the actual products and media are ready.

## Direct enquiries and signups

Forms submit JSON to `POST /api/leads`. Supported types are `enquiry`, `booking`, `book`, `audio`, `newsletter` and `chat`. Service interest, audio topic, contact details, optional message/preferred time, source and separate contact preferences are saved in D1.

- A new submission receives a reference only after the database save succeeds.
- An identical retry with the same submission UUID returns the same saved reference. Changed details require a new UUID.
- General enquiries, booking requests and chat follow-ups require permission to respond. Book, audio and newsletter signups also require explicit email-update consent. SMS consent is separate and requires a phone number.
- The server validates the request independently, limits payload size, rejects unsupported fields/topics, checks a honeypot, and applies durable rate limits.
- Browser writes must originate from the exact website origin and use JSON.
- Booking forms collect a **request** and preferred availability; they do not reserve or confirm an appointment.
- Audio and book signup success means interest has been recorded. It does not claim that an unavailable file was downloaded or an email was sent.

The public email link remains a contact option. The primary website forms now store submissions directly; they are no longer a mailto-only flow.

### Owner review and CSV

Open `/admin` to review saved enquiries, topics, messages, recorded contact/email/SMS permissions and CRM status. Older submissions can be paged through. The CSV action is labelled **Export latest 5,000 to CSV**; the export endpoint also returns a continuation cursor for larger datasets.

Both `/admin` and `/api/leads/export` require a trusted ChatGPT identity supplied by the hosting platform **and** an exact email match in the server runtime `ADMIN_EMAILS` allowlist. Missing configuration denies access; there is no hardcoded owner fallback. Sign-in alone does not grant owner access. This authorization remains required if the public website's audience changes.

The owner page is dynamic and marked against indexing. CSV responses are private/no-store and untrusted cell values are neutralized against spreadsheet formulas. The inbox provides review/export only; it does not automatically contact visitors.

### Server runtime configuration

Declare the `DB` storage binding in the hosting manifest. Supply the allowlist and optional integration settings through the hosted runtime or an ignored local environment; keep them out of browser code and tracked configuration files:

| Name | Purpose |
| --- | --- |
| `DB` | Required Cloudflare D1 binding, declared by the manifest's `d1` field. |
| `ADMIN_EMAILS` | Required comma-separated allowlist of verified owner/admin emails. Both identity and allowlist checks must pass. |
| `CRM_WEBHOOK_URL` | Optional HTTPS webhook destination, set only after the owner has chosen and connected the CRM. |
| `CRM_WEBHOOK_TOKEN` | Optional server-only bearer token for that webhook. |
| `RATE_LIMIT_SALT` | Optional additional salt for short-lived hashed anti-abuse identifiers. |

No secret values belong in this repository. The production allowlist must be configured explicitly for the verified owner.

### Optional CRM forwarding

The integration is dormant when `CRM_WEBHOOK_URL` is absent. A configured webhook receives the saved lead with its reference, consent choices and an idempotency header. The durable save occurs first.

Successful delivery records `sent`. Failed or uncertain delivery retains the saved lead with `pending` status for owner review. There are **no automatic CRM retries**, and a repeated browser submission does not resend the webhook. A CRM acknowledgement is not evidence that any email or SMS was delivered.

The website sends **no automatic email or SMS**. Those workflows require an approved provider connection, sender configuration and an explicit follow-up implementation.

## Approved content and integration settings

Edit `src/data/site-config.ts` for the following public, approved values:

| Setting | Current behaviour and next integration step |
| --- | --- |
| `bookingUrl` | Blank uses the session-request flow. Add Jody's real calendar URL when ready; availability, reservation and confirmation are handled by that booking service. |
| `introVideoUrl` | Add an approved MP4 introduction video. The portrait is shown when this is blank. |
| `bookCoverUrl` | Add the final approved cover image to replace the labelled typographic concept. |
| `portrait` | Select the approved portrait asset name used by the photo component. |
| `socials` | Add verified account URLs. Empty accounts are omitted. |
| `reels` | Add approved public reel links, titles and thumbnails. This is a curated collection, not an automatically refreshed feed. |
| `testimonials` | Add genuine, permissioned quotes and attribution. The section is omitted while empty. |
| `trustLogos` | Add approved professional logos/assets. The section is omitted while empty. |

Remaining production integrations and assets include a real booking/calendar destination, any desired email/SMS follow-up service, a chosen CRM, final book artwork, actual podcast/audio files and approved personal media. An automatically refreshed Instagram or other social feed requires the relevant account/provider connection and a separate feed integration. These connections are not simulated by the current website.

## Remaining launch checklist

- Receive the full pillars brief and approved personal-story copy.
- Replace illustrative imagery with Jody’s full-size branding, horse and acreage photographs.
- Add the final book cover and approved introduction video.
- Connect the real booking calendar and confirm appointment settings.
- Connect the selected CRM and implement the approved email/SMS follow-up workflows.
- Add completed audio recordings, podcast episodes and their delivery or playback integrations.
- Add the five verified business social links, approved reels, testimonials and any authorised trust logos.
- Connect the chosen domain and confirm the intended public audience.

The approximately $9/month paid tier and four or five New Year advertising campaigns are future-phase items. No paid membership checkout, promotional discount or advertising campaign is active in this build.

## Publishing and ownership

This implementation is a separate Site. It does not alter the original Vercel deployment. Replacing the existing Vercel site requires access to its project or repository. This implementation also depends on Cloudflare D1 and trusted identity supplied by the Sites ChatGPT sign-in gateway. A Vercel migration therefore requires a supported database connection and authentication/authorization implementation, plus compatible framework and build configuration. Changing only the deployment target or build command is insufficient.

The tracked `.openai/hosting.json` identifies this specific Site and its logical `DB` binding. Preserve that identity while editing this Site. An unrelated new project needs its own registered identity and storage; do not reuse this Site's ID. The Sites release workflow applies pending hosted D1 migrations separately from local preview state. Confirm the release succeeds before treating the hosted database as updated.

## Assets

The portrait is reused from Jody's existing branding website. Other photographs are illustrative stock, never represented as Jody or her clients. Original licence and attribution details are preserved in `public/photo-credits.txt`, with a visible footer link. The locally hosted fonts include their OFL licence files.
