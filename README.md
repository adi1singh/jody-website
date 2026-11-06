# Jody

Jody's personal-brand site: hypnotherapy, life coaching and mindset coaching, and the home of the book and podcast **Live Sexy Now**. From the "Avatar x Jody" meeting on 5 Nov 2026 (notes in the shared Google Doc). First version due within a week of that meeting, ideally live before New Year for a promotion.

- **What it is:** Jody (Australia; lives on acreage with horses) is a master hypnotherapist, master life coach, NLP practitioner, equestrian mindset coach, speaker and soon podcast host. Pillars: 1. hypnosis, 2. life coaching, 3. equestrian mindset coaching (new), 4. speaking, the book and the podcast.
- **Who it's for:** mainly women in overwhelm; also anyone with anxiety, depression, everyday struggles, phobias, childhood trauma, money and abundance blocks (business owners), quitting smoking or vaping, weight loss ("mental gastric bypass"); riders and competitors for the equestrian work. Often people for whom a psychologist "isn't working".
- **Their problem, in their words:** overwhelm, "my mind won't switch off", "I've tried everything to quit", money blocks holding the business back.
- **What we promise:** feel confident and calm again, from the inside out. One deep session (1.5-hour whole-life analysis, a tailored session, the transformation recorded on the client's own phone) plus 21 nights of listening.
- **Proof we have:** Jody's credentials; the branding photo (black and gold shoot) and horse photos are coming. Jody has client feedback to send. **No testimonials on the site until real ones arrive.**
- **What visitors should do:** 1. book a session (calendar booking, nothing upfront, half the fee if cancelled within 24 hours); 2. leave their email for the free audios (sleep, anxiety, depression, money rewiring) so they go into the CRM; 3. join the book and podcast list. A chat helper answers common questions.
- **How we'll measure it:** sessions booked a month, free-audio sign-ups, book-list sign-ups; ads (4 or 5, $10 to $20 each for a week, for quit smoking, weight loss, hypnosis, coaching) point at the site.
- **Look:** gold and black, clean, luxurious, less text, more modern and a bit brighter than the reference. Burgundy and gold for the book. People buy from people: Jody's face throughout.
- **References Jody loves:** Regan Hillyer (gold and black, flow, imagery, email pop-up, video up front, trust logos), Marie Forleo (marieforleo.com), Mel Robbins (friendly, podcast; Jody wants hers more luxe), Marisa Peer (free downloads, app), and the site built for the career-counsellor friend with a book and podcast.
- **Languages:** English only.
- **Status:** first version built (one page). Waiting on Jody's material.

## Prices and terms (from the meeting)

- Hypnosis session: $250 (AUD). Includes the whole-life analysis and the personal recording.
- Quit smoking or vaping: one-off session, priced higher. **Price to confirm.**
- Life coaching: to move to monthly packages. **Price to confirm.**
- Nothing upfront; cancel within 24 hours and half the fee applies.
- Planned: free audios, then a membership of about $9 a month (freemium). Not on the site yet.

## Waiting on

- [ ] Jody: branding photos (black and gold shoot) and horse photos. They replace `public/placeholders/` (portrait: photo-3, horses: photo-5, pillars: photo-1, 2, 4)
- [ ] Jody: the "pillars" brief email (full list of services and wording)
- [ ] Jody: client feedback, to add a testimonial section (`TestimonialWall` or `CurvedRail`)
- [ ] Jody: domain for Live Sexy Now (and whether the site lives on a Jody domain or the book's), business email, phone
- [ ] Jody: the 5 social accounts (Instagram, Facebook, TikTok, YouTube, LinkedIn), to link in the footer
- [ ] Jody: book cover (burgundy and gold, bold lettering, horse and landscape). The site shows a drawn draft labelled as a draft
- [ ] Prices for quit smoking and life coaching packages; whether sessions are in person, online or both, and where
- [ ] Recordings of the 4 free audios (sleep, anxiety, depression, money rewiring)
- [ ] Choose: booking calendar (Calendly, Cal.com, Acuity…), CRM, form endpoint; then set `form.endpoint` in `src/data/site.ts` (the free-audio and book sign-ups send a `list` field so the CRM can tell them apart)
- [ ] Jody to read every line in `src/data/jody.ts` marked TO CONFIRM (FAQ answers especially)

## What's on the page

Hero (gold aurora, rotating word) → statement → four pillars (ColourPanels) → "Sound familiar?" problem cards → how a session works (Steps) → prices and terms → free audio sign-up → Live Sexy Now book and podcast with waitlist → photo band (horses) → Meet Jody → FAQ → booking request form → care note (Lifeline 13 11 14) → chat helper. Content is in `src/data/jody.ts`; colours in `src/styles/tokens.css`; the sign-up form is `src/components/convert/Signup.astro` (made for this site).

When the photos arrive, consider `PhotoHero` instead of the aurora hero so Jody's face is the first thing visitors see.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Before launch

- [ ] `src/data/site.ts`: name, contact details, navigation, footer, intro words
- [ ] `src/data/site.ts`: `form.endpoint` so the contact form can send (until then it shows switched off)
- [ ] `src/styles/tokens.css`: colours and fonts (or try `theme="bridge"`, `"earth"` or `"pathwise"` on `<Base>`)
- [ ] `src/pages/`: build the pages from `src/components/` (see `src/data/catalog.ts`), starting from a copy of `index.astro`
- [ ] Replace `public/placeholders/` and the demo content in `src/data/demo.ts`
- [ ] Set the real address as `site` in `astro.config.mjs`
- [ ] Remove what the site doesn't need: `src/pages/gallery.astro` and its links in `src/data/site.ts`, `src/pages/hi/` and the `hi` entries in `src/i18n/ui.ts`, unused components
- [ ] `npm run build`, then check every page at 390px wide, with reduced motion, and with JavaScript off

Started from the website starter kit (`kit/`) on 2026-11-06.
