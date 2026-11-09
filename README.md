# Jody Pockran — A Life in Chapters

A complete responsive, editorial website with six chapters, an accessible contents menu, scroll-linked GSAP scenes, a CSS 3D book, service disclosures and an honest email enquiry flow.

## Run locally

Requirements: Node.js 22.13 or newer, npm.

```bash
npm ci
npm run dev
```

Use the local URL printed by the development server.

```bash
npx tsc --noEmit
npm run build
```

The project uses React, TypeScript, Vinext/Vite and GSAP. The existing Sites integration builds a Cloudflare Worker and static assets. The tracked `.openai/hosting.json` identifies this specific Site. Keep it when editing this Site; remove the identity before intentionally creating an unrelated project.

## Main files

- `app/page.tsx` — the chapter content and semantic layout.
- `app/globals.css` — typography, palette, responsive layouts and CSS book geometry.
- `app/motion.tsx` — responsive GSAP / ScrollTrigger timelines and cleanup.
- `app/navigation.tsx` — table of contents, accessible modal and active chapter indicator.
- `app/contact-form.tsx` — enquiry topic selection and email-draft preparation.
- `src/data/content.ts` — the verified source content reference used during the redesign.
- `public/images/` — responsive WebP photographs and self-hosted fonts.
- `public/photo-credits.txt` — original sources and licence details.

## Narrative

Cover → I. A life, still unfolding → II. A different way forward → III. Find your stride → IV. Live Sexy Now → V. Beyond the page → VI. Your next chapter.

The page uses native scrolling. Desktop scenes can pin briefly; mobile and touch layouts use normal document flow. Reduced-motion preferences remove the moving scenes. Server-rendered content stays legible if the animation code cannot load.

## Content and availability

Source: https://jody-website.vercel.app/ reviewed in this conversation.

The site retains Jody's published services, qualification descriptions, session price ($250 AUD), session process and public contact email. It does not invent life events, testimonial quotes, customer counts or results. The personal story chapter currently uses verified professional information. Add Jody's approved autobiographical copy and authentic personal photos to make this a fuller memoir.

`Live Sexy Now` remains forthcoming. The custom book artwork is a typographic cover concept, labelled on the page. The podcast is in production and free audios are being recorded. Replace availability copy only when the actual products and media are ready.

## Enquiries

The form is intentionally an email-draft workflow, labelled "Continue in your email app". It does not send mail or claim to store a lead. The visitor reviews and sends the prepared note in their own email application. No credentials or personal submissions are stored by the website.

To enable direct submission later, connect an approved mail service or form backend, add server-side validation, set the destination and provide accurate delivery/error states before changing the interface wording. Do not put provider secrets in client code.

## Publishing and ownership

This implementation is a separate Site. It does not alter the original Vercel deployment. The full source can be adapted to another host using that host's supported framework/build setup. Replacing the existing Vercel site requires access to its project or repository.

## Assets

The portrait is reused from Jody's existing branding website. Other photographs are illustrative stock, never represented as Jody or her clients. Original licence and attribution details are preserved in `public/photo-credits.txt`, with a visible footer link. The locally hosted fonts include their OFL licence files.
