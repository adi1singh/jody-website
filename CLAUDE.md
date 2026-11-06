# Jody: notes for Claude

This site started as a copy of the website starter kit (`kit/` at the repo root). The brief is in `README.md`. Build pages from `src/components/` instead of writing sections from scratch; the kit's notes below still apply. Only change files in this folder: `kit/` and the other sites stay as they are.

## Map

- `src/data/catalog.ts`: **read this first when choosing parts.** One entry per part: what it does, where it came from, what it's good for, the visitor goals it serves (understand, explore, choose, trust, act, return), how it behaves without JavaScript, any outside service, related parts. `/gallery/` is built from it; update it when you add or remove a component.
- `src/components/`, one file per part, in folders by the job it does on a page. Every component has a header comment saying what it does, where it came from and how to use it.
  - `layout/`: Header, Footer, Intro, BrandMark, LanguageSwitcher, Backdrop (signature backgrounds), TiltedBands (divider)
  - `heroes/`: Hero (aurora), PhotoHero, ReelHero. One hero per page.
  - `proof/`: Stats, FeaturedStory, AudioPlayer, VideoEmbed, LiveList, Pipeline, ProjectCards, PlaceCards, TestimonialWall, CurvedRail, BeforeAfter, RouteMap
  - `explain/`: ProblemCards, Steps, HorizontalStory, PhotoBand, PhotoStory, WordCycle, ConnectPlayground, PathwayMap, InkStatement, Scramble, PictureHeadline, ColourPanels, Hotspots
  - `convert/`: Calculator, Quiz, Faq, ContactForm, SearchDock, CircleBadge, SentenceFilter
  - `widgets/`: ChatAssistant (and Quiz with `variant="corner"`), placed in `slot="end"`
- `src/data/site.ts`: name, contact, nav, footer, intro words and the contact form endpoint. Edit this first for a new site.
- `src/data/demo.ts`: placeholder content for the demo pages (`public/placeholders/` has the photos and a villa drawing in colour and as lines, which line up for BeforeAfter).
- `src/pages/textures/topo.svg.ts`: the contour lines for `Backdrop kind="topo"`, generated at build time. Keep it if you use that backdrop. `src/data/landmarks.ts`: line drawings of Indian landmarks for PlaceCards.
- `src/styles/tokens.css`: all colours, fonts, radii and easing. Components only use these variables. Never hard-code a brand colour in a component.
  - `.light` on any element switches it to the warm cream palette (alternate dark and light sections for rhythm).
  - `--c1`…`--c6` are category colours (one per product, service or audience). `--spectrum` is the signature gradient. `--font-serif` (Instrument Serif italic) is for accent words in `<em>`; `--font-serif-roman` (upright) is for editorial statements.
  - The default palette is JobGen/Olivia. Themes: `bridge` (Digital Bridge), `earth` (Hind Zero Waste), `pathwise` (`<Base theme="...">`). The gallery's palette switcher previews them.
- `src/styles/base.css`: elements, `.wrap`, `.section`, `.section-head`, `.eyebrow`, `.btn` (`-light`, `-accent`, `-ghost`, `-small`, `-big`), `.card`, `.grid`. `[hidden]` always hides.
- `src/styles/motion.css` + `src/scripts/motion.ts`: the shared motion layer. Use these instead of writing new animation code:
  - `.reveal`: fades and rises in when scrolled to; siblings arriving together stagger (`data-reveal-group` on the parent).
  - `.reveal-image`: a photo that wipes open.
  - `data-count="120" data-suffix="+"`: a number that counts up. Also `data-prefix`, `data-from="2000"` (start value, for years) and `data-group="false"` (no thousands separator).
  - `.spotlight`: a card with a soft light following the cursor (`--spot` sets its colour).
  - `.magnetic`: a button that leans towards the cursor.
  - `.line-up > span` / `.fade-up`: hero entrance; waits for the intro curtain.
- `src/layouts/Base.astro`: every page. Props: `title`, `description`, `intro` (curtain, default on), `theme`, `grain`, `lang`, `languageSwitcher`, `cta`, `noindex`. Use `slot="end"` for floating widgets.
- `src/i18n/ui.ts`: languages and interface strings. Pages for other languages go in `src/pages/<lang>/`.

## Page flow that works

Hero → stats → problem-led cards → proof (featured story, recording, live demo) → four moves (horizontal story) → process steps → photo band → testimonial wall → cost calculator → finder quiz → FAQ → contact. `src/pages/index.astro` is this flow; copy it and cut what the business doesn't need. Everything else is live on `/gallery/`.

## Principles for a new site

- **Plan before building:** audience → their problem in their words → the promise → the proof you really have → the one action you want → how you'll measure it. The brief at the top of the site's README holds these.
- **Show what the problem costs.** Wherever it can be estimated honestly, include the cost calculator (`mode="live"` by default), and state its assumption.
- **Four features → the four moves.** When a business has four things to show (services, stages, values), use `HorizontalStory`.
- **Other languages from the start.** If the customers speak more than one language, add the language switcher and translated pages in the first version, not later.
- **Real material only.** Never invent testimonials, figures, logos or prices. Placeholders stay clearly placeholders until real ones arrive.

## Rules every component follows (keep them)

- **Works without JavaScript.** Content is in the HTML; scripts only add motion and interaction. `html.js` is set before paint, so hidden-until-revealed styles apply only when scripts run. Interactive parts show a complete still version without it (see `js` in the catalog).
- **Respects reduced motion.** Everything settles into its final, still state. The intro never shows.
- **Accessible.** Real buttons and links, `aria-expanded` on toggles, Escape closes menus and panels, focus is managed, `aria-hidden` on decoration, drag interactions also work by tap and keyboard. Simulated demos are labelled as simulated.
- **No external services on load.** YouTube loads only on play; the contact form sends only on submit. The quiz and chat assistant never send anything.
- **Data in, markup out.** Components take content as props; demo content lives in `src/data/demo.ts`.
- **Phones first-class.** No horizontal scroll at 390px; pinned, drag or hover effects fall back to swipe or tap.

## Gotchas

- `Hero`, `PhotoHero`, `PathwayMap` and `WordCycle` script by `querySelector`: one of each per page. One `Calculator`, `Faq` and `ContactForm` per page too (they use `#calculator`, `#faq`, `#contact`).
- Scoped Astro styles: classes added by scripts need `:global(...)`, and put the element in the selector (e.g. `span:global(.is-active)`) so it outranks the scoped base rule. Elements a script creates have no scope attribute: copy the `data-astro-cid-*` attribute from an existing element (see `Pipeline.astro`) or style them with `:global`.
- Show and hide with the `hidden` attribute: base.css makes it beat any `display` rule. Keep that rule if you copy styles elsewhere.
- Don't use `data-count` for anything but count-up numbers: motion.ts animates every element that has it.
- Scroll-linked animations (`animation-timeline`): write `animation-name`, `animation-timing-function` and `animation-fill-mode` as separate properties, never the `animation` shorthand. The build's CSS minifier folds a following `animation-timeline` into the shorthand, which Chrome rejects, so the effect silently never runs. Wrap them in `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`; the reduced-motion rule in motion.css doesn't stop them.
- Around anything with a view timeline, clip with `overflow: clip`, not `hidden`: a hidden overflow makes the box a scroll container and freezes the timeline.
- Calculator `formula[].calc` strings are evaluated at build time and in the browser. Only put author-written expressions there, never visitor input.
- Run `npm run build` and look at `/`, `/gallery/` and a 390px-wide view before calling a page done.
