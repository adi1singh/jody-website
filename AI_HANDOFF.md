# Jody website — handoff for the next AI

## Start here

Continue working on this complete existing website. Inspect the source and the client brief before changing it.

This Git export contains the full tracked application, assets, migrations and tests. The starting application revision is `c121c37091ad1b8ab2c544922b7b75113e474b94`. The export adds the revised README and these handoff instructions in a separate commit. Application code and design assets are unchanged by the export.

- Private review build: https://jody-a-life-in-chapters.jobgen-ai.chatgpt.site/
- Original Vercel website: https://jody-website.vercel.app/
- Authoritative client brief: `docs/client-brief-2026-11-05.md`
- Setup and integration guide: `README.md`
- Agent instructions: `AGENTS.md`
- Desktop design reference from the implemented build: `docs/preview-cover.png`

The private review build and the original Vercel site are separate deployments. The export contains no configured Git remote. Select the intended destination before preparing a deployment.

## Premium upgrade (10 November 2026)

Visual-only changes on branch `storybook` (`app/premium.css`, loaded last, plus small markup changes in `app/page.tsx`). Forms, server code, database and motion are unchanged; type check, the 16 backend tests and the build pass, and a contact submission was saved locally after the change.

- Headlines in Cormorant Garamond (light; the gold second line in italic) instead of the sans-serif.
- Body text and labels raised from 7–13px to readable sizes, with more contrast on dark sections.
- Chapter openers read like a book: a large gold italic Roman numeral, "Chapter II" and the chapter name.
- Two full-width photo interludes (horses under sunbeams before chapter II; a rider at sunset before chapter VI).
- "Meet Jody" no longer repeats the cover portrait: it shows an illustrative image (a rider's hands on a horse), labelled as illustrative in its alt text, until Jody's own photos arrive.

## Chapters v2 (10 November 2026)

- Book-opening intro (`app/book-intro.tsx`, `app/intro-script.ts`): once per visit on the home page, skipped for reduced motion and without JavaScript; any click, key or scroll skips it.
- Hero reduced to one line, Jody's photograph and one action, sized to the viewport (see the hero rule in AGENTS.md); larger wordmark.
- Chapter moments and page folds in `app/motion.tsx`: "Chapter II" appears and fades; the previous page tips back and dims while the next comes alive; a page edge sweeps across at every chapter change. Pinned scenes are never transformed.
- Session steps and specialist sessions moved to `/sessions` (`app/sessions/page.tsx`); the home page links there.
- Contents is a dark drawer over the page; shared footer with "Powered by JobGen" (`app/site-footer.tsx`).
- Styles in `app/chapters.css` (loaded last).

## Vercel design preview (static snapshot)

`vercel.json` and `vercel-preview/` exist only so the design can be viewed on Vercel. `vercel-preview/` is the rendered home and privacy pages saved from the local Worker build, plus `dist/client` assets. It has no server: a small script in its HTML answers `/api/leads` with a clear "design preview, forms aren't connected" message, and a "Design preview" label is shown. Regenerate it after visual changes: `npm run build`, `npm run start`, then `node scripts/make-vercel-preview.mjs`. Delete both before deploying the real site (Cloudflare Workers + D1, or a proper Vercel port).

## Product and design direction

Create a premium personal-brand website for Jody Pockran that reads like a book. Her life, work, connection with horses, forthcoming book and media should feel like connected chapters.

The implemented direction uses near-black, warm gold and brighter reading sections. Burgundy is reserved for the book concept. Large modern type, clear service hierarchy and Jody's own face are central to the design.

Chapter sequence:

1. Cover: Jody, the main message and a session enquiry.
2. Meet Jody: the person and approach behind the work.
3. Hypnosis and coaching: hypnosis first, specialist enquiries and monthly mentoring.
4. Equestrian mindset: horses, confidence, focus and competition.
5. Live Sexy Now: forthcoming book, 3D presentation and email list.
6. Beyond the page: podcast, speaking, commentating and four audio topics.
7. Your next chapter: contact, session requests and practical questions.

Existing motion includes cover reveals, image movement, chapter progress, page-edge transitions, an equestrian scene, a 3D book and podcast waveform. Larger scenes simplify on smaller screens and respect reduced-motion preferences.

## Content details to preserve

- Hypnosis is the main pillar, especially for women experiencing overwhelm.
- Other stated areas include anxiety, depression, phobias, childhood trauma and money blocks. Do not turn service descriptions into outcome guarantees.
- Specialist enquiries: quit smoking, quit vaping and mental gastric bypass.
- Standard hypnosis price: $250 AUD. Quit smoking costs more; no exact specialist or monthly package price is supplied.
- Session sequence: 90-minute whole-life analysis, then hypnosis and a personal recording made on the client's phone, then 21 nights of listening. Confirm total appointment time separately.
- Life coaching is monthly mentoring. Equestrian mindset is new and is for riders and competitors.
- Nothing is payable upfront. Cancellations within 24 hours incur half the fee.
- The book is Live Sexy Now, about confidence and reinvention, and is coming soon.
- Podcast plan: one episode per book chapter, with guests, at Daniel's studio.
- Free audio topics: sleep, anxiety, depression and money rewiring.
- Five business social accounts are intended: Instagram, Facebook, TikTok, YouTube and LinkedIn.

The autobiographical chapter currently uses professional background rather than an invented life timeline. Add Jody's approved personal story when supplied. The portrait is from her existing site; other photos are illustrative. Preserve `public/photo-credits.txt` and font licences.

## What is implemented

- Responsive chapter-based website, contents dialog, navigation and motion.
- Direct contact, book, audio, newsletter and guided-chat lead capture.
- `POST /api/leads`: same-origin JSON requests with server validation, explicit consent, a honeypot, payload limits and rate limits.
- D1 storage with UUID-based duplicate protection and saved reference numbers.
- A Website guide using predefined choices and responses. It is not an LLM chatbot, a live staff member or a clinical assistant.
- A newsletter popup gated by time and scroll engagement; it avoids active forms and other open panels.
- Owner enquiry review at `/admin` and protected CSV export at `/api/leads/export`.
- A privacy page and separate contact, email-update and SMS choices.
- An optional server-side CRM webhook with durable delivery status.

The general contact form supports service-link selection and the `?interest=` campaign parameter. With no calendar URL configured, session enquiries remain requests, not confirmed appointments.

## What still needs connection or content

| Area | Current state | Needed next |
| --- | --- | --- |
| Calendar | Session request form | Real calendar provider, URL and booking settings |
| CRM | Optional webhook adapter | Approved CRM endpoint and credentials |
| Email and SMS | Preferences are stored | Provider connections, sender setup and follow-up workflows |
| AI chatbot | Guided website navigation | A separately implemented and configured AI service if required |
| Hero video | Portrait fallback | Approved introduction video |
| Photography | Existing portrait and illustrative images | Full-size branding, horse and acreage photographs |
| Book | Labelled typographic cover concept and email list | Final burgundy-and-gold cover with Jody and a horse |
| Audio | Four topic-specific release lists | Actual recordings and delivery/playback implementation |
| Podcast | Coming-soon presentation | Published episodes and approved links |
| Social | Empty destinations omitted | Five verified account URLs and approved reels |
| Live Instagram feed | No automatic feed | Account/provider connection and feed implementation |
| Trust | Empty sections omitted | Genuine testimonials and approved logos |
| Domain | Private review URL | Chosen domain and deployment destination |

No automatic email or SMS is sent by the current code. The CRM webhook is dormant without configuration; failed deliveries remain pending and there is no automatic retry job.

The approximately $9/month membership and four or five New Year advertising campaigns are future-phase work. There is no paid membership checkout or active promotion in this build.

## Source map

| File or directory | Purpose |
| --- | --- |
| `app/page.tsx` | Visible page structure and copy |
| `app/globals.css`, `app/brand.css` | Layout, responsive styles, palette and book geometry |
| `app/motion.tsx` | GSAP and ScrollTrigger scenes |
| `app/navigation.tsx` | Contents dialog and active chapter navigation |
| `app/lead-form.tsx` | Shared forms and request states |
| `app/contact-form.tsx` | Service and campaign topic preselection |
| `app/lead-experience.tsx`, `app/lead-experience.css` | Guide, newsletter and audio signup UI |
| `app/api/leads/` | Capture and CSV export endpoints |
| `app/admin/` | Owner enquiry inbox |
| `app/chatgpt-auth.ts`, `lib/admin-auth.ts` | Hosted identity and explicit owner allowlist |
| `lib/lead-contract.ts`, `lib/leads.ts` | Validation, persistence, CRM and CSV logic |
| `db/`, `drizzle/` | Database access, schema and migrations |
| `src/data/site-config.ts` | Approved public links, media and conditional sections |
| `src/data/content.ts` | Supporting content reference |
| `public/` | Images, fonts, favicon and attribution |
| `scripts/`, `worker/`, `vite.config.ts` | Build, local tooling and Worker integration |

## Stack and hosting

The application uses React 19, TypeScript, Vinext/Vite, GSAP and Cloudflare Worker/D1 integrations. Use the pinned versions in `package-lock.json` through `npm ci`.

The existing `.openai/hosting.json` contains the identity of the original review Site and its logical `DB` binding. It is not a credential. Preserve it only when intentionally updating that same Site. A separate Site needs its own registered identity and database. A different hosting platform needs compatible build, database and authentication configuration.

`app/layout.tsx` also sets the existing review domain as `metadataBase`; update it when a new deployment uses a different canonical domain. This clean export uses the portable execution profile by default and does not copy the original machine's local tooling state.

Owner access currently depends on a trusted Sites sign-in gateway plus `ADMIN_EMAILS`. On another host, use verified server-side sessions or a trusted authentication layer; do not accept visitor-supplied `oai-authenticated-*` headers as identity.

Server settings:

- `DB`: actual D1 database binding, not a browser value.
- `ADMIN_EMAILS`: explicit permitted owner/admin emails.
- `CRM_WEBHOOK_URL`: optional approved HTTPS webhook.
- `CRM_WEBHOOK_TOKEN`: optional server-only webhook token.
- `RATE_LIMIT_SALT`: optional additional anti-abuse salt.

Values are not supplied in the export. See `README.md` for local environment-file handling and migration commands.

## Getting started

1. Read this file and the client brief.
2. Follow the README to install dependencies, build, apply the pending local migration and start the application.
3. Inspect the page and existing behavior before implementing the user's next request.
4. Keep existing service details and availability statements accurate as integrations are connected.
5. Report completed changes, checks run and remaining external dependencies.

Existing verification for the source build includes a successful TypeScript check, production build and 16 backend tests. Book, enquiry and audio submissions were exercised in the local browser preview; narrow-width reflow was checked at 340px and 454px CSS widths. This handoff does not claim a physical-device test or successful unconfigured calendar, email, SMS or CRM delivery.

## Git use

The ZIP contains a real repository, including its `.git` directory. Extract it and open the `jody-website` folder:

```bash
cd jody-website
git status
git log --oneline
```

Alternatively, restore the standalone bundle:

```bash
git clone Jody-Website.bundle jody-website
cd jody-website
```

A bundle clone initially uses the bundle file as its `origin`. Remove that origin before configuring GitHub:

```bash
git remote remove origin
```

For the ZIP, there is no origin to remove. Create an empty GitHub repository in your account, then use its actual URL:

```bash
git remote add origin https://github.com/YOUR-USERNAME/jody-website.git
git push -u origin main
```

Replace the example URL. These commands need your own GitHub authentication. No GitHub repository is created by this offline export.
