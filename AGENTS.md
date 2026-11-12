# Working on Jody's website

Read `AI_HANDOFF.md`, `README.md` and `docs/client-brief-2026-11-05.md` before making changes. The client brief is the content authority; existing code is the implemented review build.

## Design and content

- **The hero must always fit fully on screen. Nothing in it may be cut off at the bottom, on any device.** It is sized to the viewport (`#cover` in `app/chapters.css`). After any hero change, check it at 1440×900, 1366×768, 1280×720, 1024×768, 768×1024, 390×844 and 360×640 before calling it done. The owner has asked for this repeatedly.
- Keep the hero minimal: one line, Jody's photograph, one action. Put detail in later chapters or on subpages (`/sessions`).
- Body text is never smaller than 15px; labels never smaller than 11px.
- **Bright, warm and hopeful, never dark or sad** (owner and manager, Nov 2026): visitors are people leaving bad habits or low moods behind. Keep light warm backgrounds (`app/sunny.css`), dark warm text and sunshine gold; don't bring back black or near-black sections.
- Any scroll animation must be checked running at 1440×900, 1366×768 and 390×844 (not just one size): pinned scenes silently fall back when they don't fit the screen.

- Preserve the modern black-and-gold direction, bright reading sections, chapter flow and prominent Jody portraits.
- Keep hypnosis as the main offer. Life coaching is monthly mentoring; equestrian mindset is a new offering for riders and competitors.
- The 90 minutes refers to the whole-life analysis. Hypnosis and the personal recording follow; do not call it the total appointment duration.
- Keep the book, podcast and audio availability labels accurate. Add genuine final assets and testimonials when supplied.
- Respect native scrolling, keyboard access, narrow-screen layouts and reduced-motion preferences.

## Implementation

- This is React + TypeScript with Vinext/Vite, GSAP, a Cloudflare Worker and D1. It is not a plain static Vite app or an ordinary Next.js deployment.
- Main visible content is in `app/page.tsx`. `src/data/content.ts` is a supporting content reference, not the sole renderer of page copy.
- Approved media, account links and optional sections are configured in `src/data/site-config.ts`.
- Keep server-side lead validation, durable saves, duplicate-request protection and separate consent choices intact.
- Generate and inspect migrations when changing `db/schema.ts`. Apply each pending migration once to the intended database.
- Store runtime secrets in the chosen deployment environment. Local environment files, `.wrangler` state and `node_modules` are not part of this handoff.
- On a host other than Sites, replace the gateway-dependent owner authentication with verified sessions or equivalent trusted authentication. Client-supplied identity headers are not authenticated users.

## Verification

Follow `README.md` to install, build, migrate and run. For changes that affect the server, use the existing validation tests. Inspect the actual page in a browser for visual and interaction changes.

Report which integrations are connected and what was actually verified. A stored enquiry is not a reserved calendar slot or proof of email/SMS delivery.
