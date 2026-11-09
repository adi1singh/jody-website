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
- **Live preview:** https://jody-website.vercel.app (Vercel project linked to this repo: every push to `main` redeploys)
- **Status:** version 5 (9 Nov 2026): the book concept kept but tightened (about 40% shorter), every chapter built around one large photograph, three high-resolution landscape photos (2600px, Wikimedia Commons, credited in the footer). Before that, version 4 (9 Nov 2026): the story in chapters, black and gold, complete with temporary stock photography (CC0, graded to one look; sources in `public/photos/CREDITS.md`) so Jody sees the finished feel before her own shoot. Built on version 3, the editorial redesign from the owner's brief (7 Nov 2026). A frontend-only visual prototype for Jody's approval: no backend is connected. Waiting on Jody's material.

## Prices and terms (from the meeting)

- Hypnosis session: $250 (AUD). Includes the whole-life analysis and the personal recording.
- Quit smoking or vaping: one-off session, priced higher. **Price to confirm.**
- Life coaching: to move to monthly packages. **Price to confirm.**
- Nothing upfront; cancel within 24 hours and half the fee applies.
- Planned: free audios, then a membership of about $9 a month (freemium). Not on the site yet.

## Waiting on

- [ ] Jody: the **original, full-size** branding photo. The site uses a screenshot of the Facebook post (only 923px wide), so the About and booking photos are a little soft. Then redo the hero cut-out (see "Photos" below)
- [ ] Jody: horse photos and more branding photos (one photo is used three times for now)
- [ ] Jody: the "pillars" brief email (full list of services and wording)
- [ ] Jody: client feedback, to add a testimonial section (`TestimonialWall` or `CurvedRail`)
- [ ] Jody: domain for Live Sexy Now (and whether the site lives on a Jody domain or the book's), business email, phone
- [ ] Jody: the 5 social accounts (Instagram, Facebook, TikTok, YouTube, LinkedIn), to link in the footer
- [ ] Jody: book cover (burgundy and gold, bold lettering, horse and landscape). The site shows a drawn draft labelled as a draft
- [ ] Prices for quit smoking and life coaching packages; whether sessions are in person, online or both, and where
- [ ] Recordings of the 4 free audios (sleep, anxiety, depression, money rewiring)
- [ ] Choose: booking calendar (Calendly, Cal.com, Acuity…), CRM, form endpoint; then set `form.endpoint` in `src/data/site.ts` (the free-audio and book sign-ups send a `list` field so the CRM can tell them apart)
- [ ] Jody to read every line in `src/data/jody.ts` marked TO CONFIRM (FAQ answers especially)

## Version 4: the story in chapters

- **Concept:** "Change the story" made literal. After the hero, the page is a book in six chapters: I The story you've been telling, II Meet Jody, III How the story changes, IV Ways to work together, V The next chapter (Live Sexy Now, podcast, speaking, free audio, questions), VI Your chapter (booking).
- **The gold thread** (`Thread.astro`): one champagne line down the left margin that draws itself as you scroll, with a bead at its tip, passing through each chapter's seal (`ChapterMark.astro`). It is the site's one signature element.
- **Gold with meaning:** every chapter headline turns from the old story (first line) to the new one (second line, gold italic: `<h2 class="turn">…<em>…</em></h2>`); gold buttons on dark sections; gold chapter seals and labels; 21 gold marks for the 21 nights; foil-stamped lettering only on the book cover.
- **Photography:** 13 free CC0 photos (horses at golden hour, a black horse, a rider at sunset, golden wheat, a quiet room, a gold microphone), all graded the same way (warm blacks, champagne highlights, fine grain) so they read as one shoot. Each slot in `PHOTOS` keeps its brief for Jody's own photographer; swap them one by one.
- **Testimonials** are hidden until real ones exist (no placeholders on the page).

## Version 3: design system

The redesign brief asks for "luxury editorial fashion photography meets a powerful personal development brand, with subtle cinematic equestrian influences": brighter, less text, photography-led, restrained. References: Regan Hillyer, Marie Forleo, Mel Robbins, Marisa Peer (studied, not copied).

- **Colour** (`src/styles/tokens.css`): black `#171514`, champagne gold `#C4A46B` (details only: labels, hairlines, numerals, hover), warm ivory `#F7F3EC` (the default), white, burgundy `#6A273B` (only for Live Sexy Now). Sections switch tone with `.dark`, `.white` or `.burgundy`; every part adapts through the same variables. No metallic gradients, glows or gold borders.
- **Type:** Cormorant Garamond for headlines (light, large, italic for the second half of a line), Manrope for body, navigation, buttons and small-caps labels. Fluid scale `--step-hero`, `--step-1`, `--step-2`, `--step-3`. Classes in `src/styles/base.css`: `.display`, `.h2`, `.h3`, `.lead`, `.read`, `.eyebrow`, `.btn-primary`, `.btn-line`, `.link-arrow`, `.preview-note`.
- **Photography:** every image goes through `src/components/jody/Photo.astro`. Each slot is listed in `PHOTOS` in `src/data/jody.ts` with a description of the shot and its aspect ratio: that list is the shot list for Jody's photographer. Empty slots show a labelled "Photo to come" placeholder of the right shape; to use a real photo, put it in `public/photos/`, set `src` (and `focus` to keep the face in frame). No layout changes needed.
- **Motion:** slow image wipes (`.reveal-image`), lines that rise in the hero, fades on scroll (`.reveal`), quiet hover states. Everything settles still with reduced motion.
- **Preview honesty:** forms and sign-ups show "Preview" notes and stay switched off until `form.endpoint` is set; podcast episodes are shown as planned, not published; testimonials are labelled placeholders until Jody sends real ones.

## What's on the page (version 3)

1. Cinematic hero: "Change the story. Change your life.", one action (`Hero.astro`)
2. Introducing Jody (`Intro.astro`, `#about`)
3. The three pillars: hypnosis (strongest), life coaching, equestrian mindset (`Pillars.astro`, `#work`, `#hypnosis`, `#coaching`, `#riders`)
4. The transformation experience: 90-minute whole-life analysis, personal recording, 21 nights; prices and terms (`Experience.astro`, `#experience`)
5. Testimonials, labelled placeholders until real ones arrive (`Testimonials.astro`)
6. Live Sexy Now: book launch with a temporary cover and waitlist (`Book.astro`, `#book`)
7. Podcast (planned episodes) and speaking (`Podcast.astro`, `#podcast`)
8. Free audio (`FreeAudio.astro`, `#free`), questions (`Faq.astro`, `#faq`)
9. Closing with Jody and the booking request (`Closing.astro`, `#contact`)

Navigation: Home, About, Work with me, Live Sexy Now, Podcast, Contact, and Book a session.

<!-- version 2 notes below -->
## What's on the page (version 2)

Look after [dawnsaunders.com](https://www.dawnsaunders.com/), which the owner chose: giant lowercase words with a coloured full stop, big circles, thin Figtree headings over Forum text, rounded cards almost edge to edge. Jody's colours: metallic gold, black, ivory, and burgundy for the book.

1. Hero: "jody." in ivory on gold, Jody on a black disc, the promise and two buttons (book, free audio); a gold disc with Jody's statement spills into the next section (`Hero.astro`)
2. Ways to work with me: big-word cards "hypnosis." (with what it helps with), "coaching.", "riders.", and "Sound familiar?" in clients' words (`Services.astro`)
3. How a session works, "One session. Twenty-one nights.", prices and terms (`Session.astro`)
4. Free audio, "Start tonight.": four audios marked "recording now", sign-up for the CRM, the $9 membership as coming soon (`FreeAudio.astro`)
5. "live sexy now.": the book with a drawn draft cover, the podcast and a waitlist (`Book.astro`)
6. About: the branding photo with "Hypnotherapist. Life coach. Horse lover. And now, the next chapter." and credentials (`About.astro`)
7. What clients are saying: built, but hidden until real quotes are added to `TESTIMONIALS` in `src/data/jody.ts` (`Testimonials.astro`)
8. FAQ and the Lifeline note (`Faq.astro`); book a session: gold card with terms and the request form (`BookSession.astro`, `#contact`)
9. Footer with a giant "live sexy now." over a gold sun; email pop-up offering the free audio (once per visitor, after scrolling or 25s); chat helper

Sections live in `src/components/jody/`, content in `src/data/jody.ts`, colours and fonts in `src/styles/tokens.css`. When ready, set in `src/data/site.ts`: `form.endpoint` (all forms and sign-ups go live), `booking` (calendar link for every "Book" button), `socials` (shown in the footer), `email` and `phone`.

## Photos

- `public/jody-hero.webp`: Jody cut out of the branding photo with the circle crop baked in (centre 345,460, radius 345 in a 690×770 image; `Hero.astro` matches it). Made with `rembg` (isnet-general-use and u2net_human_seg masks combined), then the desk removed. Redo from the full-size original when it arrives.
- `public/jody-portrait.jpg`: the full branding photo. `public/og.jpg`: the share image for links.

<!-- version 1 notes below -->
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
