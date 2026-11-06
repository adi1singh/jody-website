// The library's catalog: one entry per part. The gallery page is built from it,
// and it is the first thing to read when choosing parts for a new site.
// When you add or remove a component, update its entry here.

/** Folder in src/components, by the job the part does on a page. */
export type Role = "foundations" | "layout" | "heroes" | "proof" | "explain" | "convert" | "widgets";

/** What a visitor is trying to do when the part helps them. */
export type Goal = "understand" | "explore" | "choose" | "trust" | "act" | "return";

/**
 * How it behaves without JavaScript:
 * - "none": pure HTML and CSS
 * - "enhances": complete without it; scripts only add motion or polish
 * - "fallback": the interaction needs it; without it a complete still version shows
 */
export type Js = "none" | "enhances" | "fallback";

export interface Part {
  id: string;
  name: string;
  /** Path from src/ */
  file: string;
  role: Role;
  /** The past site(s) it came from, or the reference sites for parts from the inspiration board. */
  from: string[];
  does: string;
  goodFor: string;
  goals: Goal[];
  js: Js;
  /** Any outside service it talks to, and when. */
  external?: string;
  related?: string[];
  /** Where it is shown live. */
  demo: "home" | "gallery" | "both" | "every page";
}

export const ROLES: Record<Role, { label: string; blurb: string }> = {
  foundations: { label: "Foundations", blurb: "Colours, type, motion and languages that every part uses." },
  layout: { label: "Layout", blurb: "Header, footer, intro and brand on every page; backgrounds and dividers between sections." },
  heroes: { label: "Heroes", blurb: "The first screen. One per page." },
  proof: { label: "Proof", blurb: "Why a visitor should believe you." },
  explain: { label: "Explain", blurb: "What you do and how it works." },
  convert: { label: "Convert", blurb: "Help visitors choose and get in touch." },
  widgets: { label: "Widgets", blurb: "Floating helpers, placed in Base's slot=\"end\"." },
};

export const GOALS: Record<Goal, string> = {
  understand: "Understand what you do",
  explore: "Look around",
  choose: "Pick the right option",
  trust: "Believe you",
  act: "Get in touch or buy",
  return: "Come back later",
};

export const JS_LABEL: Record<Js, string> = {
  none: "No JavaScript needed",
  enhances: "Complete without JavaScript",
  fallback: "Still version without JavaScript",
};

export const PARTS: Part[] = [
  // Foundations
  { id: "tokens", name: "Colour system and themes", file: "styles/tokens.css", role: "foundations", from: ["JobGen", "Olivia"], does: "Charcoal and warm white with category colours, the spectrum gradient, film grain and cream .light sections. Themes: bridge (Digital Bridge), earth (Hind Zero Waste), pathwise.", goodFor: "Every site. Start a new look by editing :root or trying a theme.", goals: ["trust"], js: "none", demo: "every page" },
  { id: "motion", name: "Motion layer", file: "styles/motion.css + scripts/motion.ts", role: "foundations", from: ["Digital Bridge", "JobGen", "Hind Zero Waste"], does: "Staggered reveals, image wipes, count-up numbers (with a start value for years), cursor spotlight, magnetic buttons, scroll progress and page transitions.", goodFor: "Use the classes instead of writing new animation code.", goals: ["understand"], js: "enhances", demo: "every page" },
  { id: "languages", name: "Languages", file: "i18n/ui.ts + components/layout/LanguageSwitcher.astro", role: "foundations", from: ["Hind Zero Waste"], does: "Pages per language under src/pages/<lang>/, interface text per language and a switcher in the header.", goodFor: "Any business whose customers speak more than one language. Add it from the start.", goals: ["understand", "return"], js: "none", demo: "home" },
  { id: "landmarks", name: "Indian landmark drawings", file: "data/landmarks.ts", role: "foundations", from: ["Hind Zero Waste"], does: "Line drawings for Maharashtra, Rajasthan, Uttar Pradesh, Delhi, Himachal Pradesh, Punjab and Telangana.", goodFor: "PlaceCards on Indian sites.", goals: ["trust"], js: "none", related: ["place-cards"], demo: "gallery" },

  // Layout
  { id: "header", name: "Header", file: "components/layout/Header.astro", role: "layout", from: ["JobGen", "Hind Zero Waste"], does: "Sticky, turns solid on scroll, dropdowns open on hover or click, full-screen menu on phones.", goodFor: "Every site.", goals: ["explore"], js: "enhances", demo: "every page" },
  { id: "footer", name: "Footer", file: "components/layout/Footer.astro", role: "layout", from: ["Digital Bridge"], does: "A big closing call to action above the link columns.", goodFor: "Every site.", goals: ["act"], js: "none", demo: "every page" },
  { id: "intro", name: "Intro curtain", file: "components/layout/Intro.astro", role: "layout", from: ["Digital Bridge"], does: "A branded curtain on the first page view of a visit: logo bars grow, the name rises, the curtain lifts.", goodFor: "Brands that want a memorable first moment. Base.astro `intro` prop.", goals: ["trust"], js: "enhances", demo: "home" },
  { id: "brand-mark", name: "Brand mark", file: "components/layout/BrandMark.astro", role: "layout", from: ["JobGen", "Digital Bridge"], does: "Three bars in the category colours, or one colour with `mono`. Swap for a real logo.", goodFor: "Placeholder logo.", goals: ["trust"], js: "none", demo: "every page" },
  { id: "backdrop", name: "Signature backgrounds", file: "components/layout/Backdrop.astro", role: "layout", from: ["Lando Norris", "Oatly", "Raycast", "Cerebrium"], does: "Wraps any content in one of four backgrounds: topographic contours with a scribble that draws in, graph paper with taped notes, blurred glow stripes, or a dot field with a light that follows the pointer.", goodFor: "Giving a site its own texture. Contours: outdoors, sport, land. Paper: food, kids, education. Stripes: launches. Dots: AI and data.", goals: ["trust"], js: "enhances", related: ["hero"], demo: "gallery" },
  { id: "tilted-bands", name: "Tilted colour bands", file: "components/layout/TiltedBands.astro", role: "layout", from: ["FOLLOW.ART"], does: "Two coloured sections meeting on a slant, crossed by tilted bands with giant words running along them like tape on a poster.", goodFor: "Energetic brands: events, food, fitness, youth, creative studios.", goals: ["understand"], js: "none", demo: "gallery" },

  // Heroes
  { id: "hero", name: "Aurora hero", file: "components/heroes/Hero.astro", role: "heroes", from: ["JobGen", "Olivia", "Digital Bridge"], does: "Drifting colour light, a rotating word (in its own colour, inside the headline if you write {rotate}), lines rising in, and the animated voice ribbon.", goodFor: "Services, software, anything with a short promise.", goals: ["understand"], js: "enhances", related: ["photo-hero", "reel-hero"], demo: "both" },
  { id: "photo-hero", name: "Photo hero", file: "components/heroes/PhotoHero.astro", role: "heroes", from: ["Hind Zero Waste"], does: "A big centred headline over full-screen photos that crossfade with a slow zoom; words drift in from a blur and a highlighter sweeps behind the accent word; captioned progress bars.", goodFor: "Businesses with strong real photos: industry, places, products.", goals: ["understand", "trust"], js: "enhances", related: ["hero"], demo: "gallery" },
  { id: "reel-hero", name: "Photo reel hero", file: "components/heroes/ReelHero.astro", role: "heroes", from: ["Pathwise"], does: "Heading and one button beside three columns of photos drifting up and down.", goodFor: "A page with one clear job (a finder, a booking page) and lots of photos.", goals: ["understand", "act"], js: "none", related: ["quiz"], demo: "gallery" },

  // Proof
  { id: "stats", name: "Stats band", file: "components/proof/Stats.astro", role: "proof", from: ["Hind Zero Waste"], does: "Big figures that count up, divided by thin rules, with credential pills.", goodFor: "Right under the hero when you have real numbers.", goals: ["trust"], js: "enhances", related: ["project-cards"], demo: "both" },
  { id: "featured-story", name: "Featured story", file: "components/proof/FeaturedStory.astro", role: "proof", from: ["JobGen"], does: "Problem, what we did, what changed, beside the customer's quote.", goodFor: "One strong case study.", goals: ["trust"], js: "none", demo: "home" },
  { id: "audio-player", name: "Recording player", file: "components/proof/AudioPlayer.astro", role: "proof", from: ["JobGen"], does: "A real recording with its waveform coloured by who is speaking; click to seek.", goodFor: "Voice products, interviews, real calls.", goals: ["trust"], js: "fallback", demo: "home" },
  { id: "video", name: "Click-to-play video", file: "components/proof/VideoEmbed.astro", role: "proof", from: ["JobGen"], does: "YouTube that loads nothing until play (privacy-enhanced).", goodFor: "Video testimonials and demos without slowing the page.", goals: ["trust", "understand"], js: "fallback", external: "YouTube, only after the visitor presses play", demo: "gallery" },
  { id: "live-list", name: "Simple live list", file: "components/proof/LiveList.astro", role: "proof", from: ["JobGen"], does: "A list worked through row by row (queued, working, done), labelled as simulated.", goodFor: "Showing a process or automation at work.", goals: ["understand", "trust"], js: "enhances", related: ["pipeline"], demo: "home" },
  { id: "pipeline", name: "Screening pipeline", file: "components/proof/Pipeline.astro", role: "proof", from: ["JobGen"], does: "Queue → checks ticking off with a score ring → shortlist, for anything that gets screened.", goodFor: "Recruitment, lead qualification, quotes, approvals.", goals: ["understand", "trust"], js: "enhances", related: ["live-list"], demo: "home" },
  { id: "project-cards", name: "Project cards", file: "components/proof/ProjectCards.astro", role: "proof", from: ["Hind Zero Waste"], does: "Plain cards that lead with the figure, then client, place, scope and status.", goodFor: "A record of real projects.", goals: ["trust"], js: "none", related: ["stats", "place-cards"], demo: "gallery" },
  { id: "place-cards", name: "Place cards", file: "components/proof/PlaceCards.astro", role: "proof", from: ["Hind Zero Waste"], does: "One card per place with a count, sites and a landmark drawing; `flag` paints a country's colours across the set.", goodFor: "Showing reach: states, cities, countries.", goals: ["trust"], js: "none", related: ["landmarks", "project-cards"], demo: "gallery" },
  { id: "testimonial-wall", name: "Testimonial wall", file: "components/proof/TestimonialWall.astro", role: "proof", from: ["Pathwise"], does: "A bold colour band with two rows of tilted quote cards drifting in opposite directions; pause button.", goodFor: "Several short testimonials with personality.", goals: ["trust"], js: "none", demo: "home" },
  { id: "curved-rail", name: "Curved card rail", file: "components/proof/CurvedRail.astro", role: "proof", from: ["FOLLOW.ART", "Moto"], does: "A swipeable row of photo cards that bends like the inside of a cylinder as it scrolls; previous and next buttons; a flat row where the browser can't bend it.", goodFor: "Teams, products, portfolios, testimonials with photos.", goals: ["trust", "explore"], js: "enhances", related: ["testimonial-wall", "project-cards"], demo: "gallery" },
  { id: "before-after", name: "Before and after", file: "components/proof/BeforeAfter.astro", role: "proof", from: ["Kononenko Bureau"], does: "Two images in one frame with a line you drag (or move with the arrow keys) to compare them; half and half without JavaScript.", goodFor: "Anything visual you transform: architecture, interiors, renovation, cleaning, landscaping.", goals: ["trust"], js: "fallback", related: ["project-cards"], demo: "gallery" },
  { id: "route-map", name: "Route map", file: "components/proof/RouteMap.astro", role: "proof", from: ["United Carriers", "Cerebrium"], does: "Cities placed by latitude and longitude on a dot field, glowing arcs from a hub drawing in, small pulses travelling along them, readable tags. No country outline.", goodFor: "Reach across cities: logistics, distributors, plants across states.", goals: ["trust"], js: "enhances", related: ["place-cards"], demo: "gallery" },

  // Explain
  { id: "problem-cards", name: "Problem cards", file: "components/explain/ProblemCards.astro", role: "explain", from: ["JobGen"], does: "Each card leads with the problem in the customer's words, then the fix, with a cursor spotlight.", goodFor: "Services sorted by what the customer would name.", goals: ["understand", "choose"], js: "enhances", demo: "both" },
  { id: "steps", name: "Process steps", file: "components/explain/Steps.astro", role: "explain", from: ["Hind Zero Waste"], does: "Arrows draw 1 → 2 → 3 → 4 and each number lights up in turn; vertical timeline on phones.", goodFor: "How working with you goes.", goals: ["understand"], js: "enhances", demo: "both" },
  { id: "horizontal-story", name: "Four moves (sideways story)", file: "components/explain/HorizontalStory.astro", role: "explain", from: ["Digital Bridge"], does: "Pins on wide screens and slides panels sideways as you scroll; a swipeable row on phones.", goodFor: "Any four features or stages. The go-to when there are four things to show.", goals: ["understand"], js: "enhances", demo: "home" },
  { id: "photo-band", name: "Photo band", file: "components/explain/PhotoBand.astro", role: "explain", from: ["Digital Bridge"], does: "A full-width photo that wipes open and drifts, with a big headline.", goodFor: "A pause between sections; place and people.", goals: ["trust"], js: "enhances", demo: "home" },
  { id: "photo-story", name: "Photo story", file: "components/explain/PhotoStory.astro", role: "explain", from: ["Digital Bridge"], does: "A pinned full-screen photo that slowly zooms out while numbered chapters scroll over it.", goodFor: "Ambition and approach, told in two or three beats.", goals: ["understand"], js: "enhances", demo: "gallery" },
  { id: "word-cycle", name: "Word-by-word statement", file: "components/explain/WordCycle.astro", role: "explain", from: ["Hind Zero Waste"], does: "Big outlined words that fill in one at a time as you scroll, a photo showing through the letters.", goodFor: "A philosophy or three-to-five-word promise.", goals: ["understand"], js: "enhances", demo: "gallery" },
  { id: "connect", name: "Drag to connect", file: "components/explain/ConnectPlayground.astro", role: "explain", from: ["Digital Bridge"], does: "Drag the plug to the socket and the wire lights the path, then the message and a link appear. Tap, Enter or Space also connect.", goodFor: "A playful hero companion for anything about bringing two things together.", goals: ["understand", "act"], js: "fallback", demo: "gallery" },
  { id: "pathway-map", name: "Pathway map", file: "components/explain/PathwayMap.astro", role: "explain", from: ["Pathwise"], does: "Drag (or tap) an area onto the board and the route draws itself step by step; \"Where are you now?\" moves the start.", goodFor: "Progressions: courses, packages, levels, a customer journey.", goals: ["explore", "choose"], js: "fallback", related: ["quiz", "search"], demo: "gallery" },
  { id: "ink-statement", name: "Ink-in statement", file: "components/explain/InkStatement.astro", role: "explain", from: ["Aevion (Riotters)", "Cerebrium", "United Carriers"], does: "A big paragraph that starts pale and inks in word by word as it scrolls up the screen, with an optional two-tone line (quiet half grey, loud half full ink).", goodFor: "One strong promise or philosophy between sections.", goals: ["understand"], js: "none", related: ["word-cycle"], demo: "gallery" },
  { id: "scramble", name: "Decoding headline", file: "components/explain/Scramble.astro", role: "explain", from: ["L.I.S.A. by Locomotive"], does: "A headline that flickers through random characters and settles into the real words when it scrolls in, and again on hover; labels that do the same.", goodFor: "Tech, AI, engineering, security. One line per page at most.", goals: ["understand"], js: "enhances", demo: "gallery" },
  { id: "picture-headline", name: "Picture headline", file: "components/explain/PictureHeadline.astro", role: "explain", from: ["Realevate", "Butter", "Lusion"], does: "Small rounded photos inside a big headline that widen on hover, a \"Play [▶] reel\" button that opens to its thumbnail, and an optional marquee line with a photo between the words.", goodFor: "Real estate, hospitality, studios, launches: a section opener people remember.", goals: ["understand"], js: "none", demo: "gallery" },
  { id: "colour-panels", name: "Colour panels", file: "components/explain/ColourPanels.astro", role: "explain", from: ["LPAS", "Realevate"], does: "Tall panels side by side, each a solid colour with its title standing up the edge; choosing one widens it to show a photo, a line and a counter. A stack on phones.", goodFor: "Three to five sectors or services, each with its own colour.", goals: ["understand", "choose"], js: "fallback", related: ["problem-cards", "horizontal-story"], demo: "gallery" },
  { id: "hotspots", name: "Hotspot drawing", file: "components/explain/Hotspots.astro", role: "explain", from: ["Heron AI", "ERA Residence"], does: "A drawing or photo in a drafting frame with numbered, pulsing markers; choosing one shows its note beside it (below on phones). Without JavaScript the notes are listed under it.", goodFor: "Machinery, buildings, floor plans, products: details explored one at a time.", goals: ["understand", "explore"], js: "fallback", demo: "gallery" },

  // Convert
  { id: "calculator", name: "Cost calculator", file: "components/convert/Calculator.astro", role: "convert", from: ["Olivia", "JobGen"], does: "The visitor's own numbers show what their problem costs. mode=\"live\" updates as they slide (Olivia); mode=\"reveal\" shows the working after Calculate (JobGen).", goodFor: "Showing what the problem costs. Use it wherever that can be estimated honestly.", goals: ["understand", "choose"], js: "fallback", demo: "both" },
  { id: "quiz", name: "Finder quiz", file: "components/convert/Quiz.astro", role: "convert", from: ["Pathwise", "JobGen"], does: "One question at a time, then suggestions with reasons and a shareable link. variant=\"corner\" is JobGen's \"Not sure which one you need?\" pop-up.", goodFor: "More than three options to choose between.", goals: ["choose"], js: "fallback", related: ["pathway-map", "search"], demo: "both" },
  { id: "faq", name: "FAQ", file: "components/convert/Faq.astro", role: "convert", from: ["JobGen", "Hind Zero Waste"], does: "Questions open one by one as they scroll in, Expand all / Collapse all, and search-engine FAQ data.", goodFor: "Objections before someone gets in touch.", goals: ["understand", "act"], js: "enhances", demo: "home" },
  { id: "contact", name: "Contact form", file: "components/convert/ContactForm.astro", role: "convert", from: ["Pathwise", "Digital Bridge"], does: "Enquiry form with clear field messages, sending in the background and a spam trap. Switched off with a note until an endpoint is set.", goodFor: "Every site. Buttons point at #contact.", goals: ["act"], js: "enhances", external: "Your form endpoint (Formspree, Web3Forms…), only on submit", demo: "home" },
  { id: "search", name: "Search dock", file: "components/convert/SearchDock.astro", role: "convert", from: ["Pathwise"], does: "A big search bar with chips that ranks matches and understands everyday words; docks under the header as frosted glass while the results scroll.", goodFor: "Catalogues of ten or more items.", goals: ["explore", "choose"], js: "fallback", related: ["quiz"], demo: "gallery" },
  { id: "circle-badge", name: "Rotating badge and arc title", file: "components/convert/CircleBadge.astro", role: "convert", from: ["twks", "ERA Residence"], does: "A round badge whose words orbit an arrow (a real link that stops spinning on hover), and an optional title set along a big arch with reasons underneath.", goodFor: "A crafted call to action: book a visit, reserve a table.", goals: ["act", "trust"], js: "none", demo: "gallery" },
  { id: "sentence-filter", name: "Sentence filter", file: "components/convert/SentenceFilter.astro", role: "convert", from: ["Pentagram"], does: "\"Show me [homes ▾] in [Pune ▾]\": a filter written as a sentence with real select menus, over a grid that updates with a live count. All the work shows without JavaScript.", goodFor: "Portfolios, property listings, course catalogues, case studies.", goals: ["explore", "choose"], js: "fallback", related: ["search", "project-cards"], demo: "gallery" },

  // Widgets
  { id: "chat", name: "Chat assistant", file: "components/widgets/ChatAssistant.astro", role: "widgets", from: ["Pathwise"], does: "A rule-based helper that answers only from the site's own content, with quick-reply chips; hands over to a person. Sends nothing. Hidden when JavaScript is off.", goodFor: "Sites with recurring questions.", goals: ["understand", "act"], js: "fallback", demo: "home" },
];

export const byRole = (role: Role) => PARTS.filter((p) => p.role === role);
