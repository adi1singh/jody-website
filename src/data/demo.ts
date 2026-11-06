// Placeholder content for the demo pages. Replace with the real business's words.

export const PHOTOS = Array.from({ length: 8 }, (_, i) => ({ src: `/placeholders/photo-${i + 1}.svg`, alt: `Placeholder photo ${i + 1}` }));

export const PROBLEMS = [
  { problem: "Our website looks dated and nobody enquires", name: "Website redesign", text: "A fast, modern site built around what your customers actually ask.", href: "#finder" },
  { problem: "Leads come in, then go cold", name: "Follow-up automation", text: "Every enquiry gets a reply in minutes, with reminders until someone answers.", href: "#finder" },
  { problem: "We spend hours on admin every week", name: "Workflow setup", text: "Bookings, forms and reminders connected, so the busywork runs itself.", href: "#finder" },
];

export const STEPS = [
  { title: "Discover", text: "A short call to understand your business and goals." },
  { title: "Design", text: "We sketch the pages and agree the look before building." },
  { title: "Build", text: "A fast, accessible site, shared with you as it grows." },
  { title: "Launch", text: "We go live, measure, and keep improving." },
];

export const STORY_PANELS = [
  { title: "Listen", text: "Start from the questions your customers ask.", img: PHOTOS[0].src, alt: "" },
  { title: "Shape", text: "Turn the answers into a clear page flow.", img: PHOTOS[1].src, alt: "" },
  { title: "Build", text: "Ship a fast site with motion that means something.", img: PHOTOS[2].src, alt: "" },
  { title: "Grow", text: "Measure what works and do more of it.", img: PHOTOS[3].src, alt: "" },
];

export const TESTIMONIALS = [
  { quote: "Enquiries doubled in the first month after launch. The site finally does the selling for us.", name: "Priya Shah", detail: "Owner, Shah Physio", from: "Quiet inbox", to: "Booked out" },
  { quote: "The calculator alone convinced three clients to call us.", name: "Tom Becker", detail: "Director, Becker Plumbing" },
  { quote: "It finally looks like the business we actually are.", name: "Ana Lima", detail: "Founder, Lima Studio", from: "Dated site", to: "Proud of it" },
  { quote: "Fast, clear, and the team understood us straight away.", name: "Sam Okafor", detail: "Manager, Okafor Logistics" },
  { quote: "The intro animation gets a comment from every new client.", name: "Mei Chen", detail: "Partner, Chen & Co" },
  { quote: "We stopped losing leads over the weekend. Every enquiry gets an answer now.", name: "Raj Mehta", detail: "Owner, Mehta Dental", from: "Missed calls", to: "Every lead answered" },
];

export const FAQ = [
  { q: "How long does a website take?", a: "Most sites take three to six weeks from the first call to launch." },
  { q: "Can I edit the site myself?", a: "Yes. Text and photos live in simple files, and we can add a CMS if you need one." },
  { q: "Do you write the content?", a: "We can, or we can shape what you already have into pages that convert." },
  { q: "What does it cost?", a: "It depends on the size of the site. Try the calculator above, then book a call for a quote.", link: { label: "Get in touch", href: "#contact" } },
];

export const QUIZ = {
  questions: [
    {
      id: "stage",
      q: "Where is your business right now?",
      options: [
        { id: "new", label: "Just starting out", picks: ["site"], reason: "A new business needs a clear front door first." },
        { id: "growing", label: "Growing, but leads are patchy", picks: ["followup", "site"], reason: "Growing businesses lose most leads in the follow-up." },
        { id: "busy", label: "Busy, drowning in admin", picks: ["workflow"], reason: "Busy teams get the most back from automation." },
      ],
    },
    {
      id: "leak",
      q: "What would help most this month?",
      options: [
        { id: "look", label: "Looking more professional", picks: ["site"], reason: "You said looking professional matters most." },
        { id: "reply", label: "Replying to people faster", picks: ["followup"], reason: "You want faster replies." },
        { id: "time", label: "Getting hours back", picks: ["workflow"], reason: "You want your time back." },
      ],
    },
    {
      id: "channel",
      q: "How do most customers find you?",
      options: [
        { id: "web", label: "Online search or social", picks: ["site"], reason: "Your customers find you online." },
        { id: "word", label: "Word of mouth", picks: ["followup"], reason: "Referrals convert best with a quick reply." },
        { id: "both", label: "A bit of both", picks: ["site", "followup"] },
      ],
    },
  ],
  results: {
    site: { name: "Website redesign", text: "A fast, modern site built around your customers’ questions.", href: "#solutions", tint: "var(--c1)" },
    followup: { name: "Follow-up automation", text: "Every enquiry answered in minutes.", href: "#solutions", tint: "var(--c6)" },
    workflow: { name: "Workflow setup", text: "Bookings, forms and reminders that run themselves.", href: "#solutions", tint: "var(--c3)" },
  },
};

export const ASSISTANT = [
  { keys: ["price", "cost", "how much", "quote"], chip: "How much does it cost?", text: "Most sites are quoted after a short call. The calculator on the home page gives a feel for the value.", link: { label: "Try the calculator", href: "/#calculator" } },
  { keys: ["long", "time", "weeks", "when"], chip: "How long does it take?", text: "Usually three to six weeks from first call to launch." },
  { keys: ["edit", "change", "update", "cms"], chip: "Can I edit it myself?", text: "Yes. Content lives in simple files, and a CMS can be added." },
  { keys: ["talk", "person", "call", "human", "contact"], chip: "Talk to a person", text: "Happy to! Send us a message and we’ll reply within a working day.", link: { label: "Get in touch", href: "/#contact" } },
];

// Placeholder figures. Real numbers only on a live site.
export const STATS = [
  { value: 120, suffix: "+", label: "Sites launched" },
  { value: 4.9, label: "Average client rating" },
  { value: 6, label: "Weeks to launch, typically" },
  { value: 2017, from: 2000, plain: true, label: "Building websites since" },
];

export const PIPELINE = {
  checks: ["Budget fits", "Timing works", "Has content ready", "Decision maker on the call"],
  items: [
    { name: "Aria Dental", detail: "New site · 3 locations", score: 92, checks: [true, true, true, true] },
    { name: "Bolt Fitness", detail: "Landing page", score: 58, checks: [true, false, false, true] },
    { name: "Cedar Law", detail: "Redesign · 20 pages", score: 86, checks: [true, true, false, true] },
    { name: "Dune Cafe", detail: "Menu and bookings", score: 64, checks: [false, true, true, true] },
    { name: "Ember Studio", detail: "Portfolio", score: 90, checks: [true, true, true, true] },
  ],
};

export const PROJECTS = [
  { figure: "+212%", name: "Shah Physio", place: "Sydney", scope: "New site, booking flow and follow-up", note: "Enquiries in the first quarter", status: "Live" },
  { figure: "3 weeks", name: "Becker Plumbing", place: "Melbourne", scope: "Redesign with the missed-call calculator", status: "Live" },
  { figure: "11 pages", name: "Lima Studio", place: "Brisbane", scope: "Portfolio and shop", status: "In progress", ongoing: true },
];

export const STORY_CHAPTERS = [
  { eyebrow: "01 / THE AMBITION", title: "Big ambitions.<br /><em>Room to grow.</em>", text: "Your people, your platforms, your next opportunity. They work better when the website connects them." },
  { eyebrow: "02 / THE WAY FORWARD", title: "Built around<br /><em>your business.</em>", text: "We start with what your customers need to know, then build the shortest path to a yes.", cta: { label: "Find your starting point", href: "#contact" } },
];

export const ROUTES = [
  {
    id: "launch",
    label: "Launch a business",
    meta: "3 steps · from $2,400",
    img: PHOTOS[0].src,
    steps: [
      { level: "Step one", title: "A one-page site", text: "Look professional from day one", note: "Already have a logo? We can start straight away.", facts: [{ label: "Takes", value: "2 weeks" }, { label: "Typical price", value: "$2,400" }] },
      { level: "Step two", title: "Bookings <em>or</em> a shop", text: "Take enquiries while you sleep", facts: [{ label: "Takes", value: "3 weeks" }, { label: "Typical price", value: "$3,500" }] },
      { level: "Step three", title: "Follow-up that runs itself", text: "Every lead answered in minutes", facts: [{ label: "Takes", value: "2 weeks" }, { label: "Typical price", value: "$1,800" }] },
    ],
  },
  {
    id: "grow",
    label: "Grow an existing one",
    meta: "3 steps · from $3,200",
    img: PHOTOS[1].src,
    steps: [
      { level: "Step one", title: "A site audit", text: "Find where visitors drop off", note: "Running for a while? Your data makes this quicker.", facts: [{ label: "Takes", value: "1 week" }] },
      { level: "Step two", title: "Redesign the pages that matter", text: "Clearer offer, stronger proof", facts: [{ label: "Takes", value: "4 weeks" }] },
      { level: "Step three", title: "A calculator <em>or</em> finder", text: "Help visitors choose", facts: [{ label: "Takes", value: "2 weeks" }] },
    ],
  },
  {
    id: "automate",
    label: "Automate the busywork",
    meta: "2 steps",
    img: PHOTOS[3].src,
    steps: [
      { level: "Step one", title: "Connect your tools", text: "Forms, calendar and inbox in one flow", facts: [{ label: "Takes", value: "2 weeks" }] },
      { level: "Step two", title: "Reminders and reports", text: "Fewer no-shows, clearer numbers", facts: [{ label: "Takes", value: "1 week" }] },
    ],
  },
];

export const ROUTE_STAGES = [
  { label: "Just an idea", start: 0 },
  { label: "Up and running", start: 0, notes: [0] },
  { label: "Already have a site", start: 1 },
];

export const SEARCH = {
  chips: [
    { value: "site", label: "Websites" },
    { value: "growth", label: "Growth" },
    { value: "ops", label: "Automation" },
  ],
  synonyms: { shop: ["store", "ecommerce"], store: ["shop"], booking: ["bookings", "appointments"], appointments: ["booking"], seo: ["google", "search"], google: ["seo"], email: ["newsletter"] },
  items: [
    { title: "One-page website", tag: "site", meta: "2 weeks", text: "A fast, clear page with your offer, proof and a way to get in touch.", keywords: "landing page starter" },
    { title: "Multi-page website", tag: "site", meta: "4–6 weeks", text: "Services, about, case studies and contact, built from the kit.", keywords: "business website" },
    { title: "Online shop", tag: "site", meta: "4 weeks", text: "Products, cart and checkout with your payment provider.", keywords: "ecommerce store shop" },
    { title: "Booking flow", tag: "ops", meta: "2 weeks", text: "Let customers book appointments online with reminders.", keywords: "appointments calendar booking" },
    { title: "Lead follow-up", tag: "ops", meta: "2 weeks", text: "Every enquiry answered in minutes, with reminders until someone replies.", keywords: "crm email automation" },
    { title: "Search and Google basics", tag: "growth", meta: "1 week", text: "Page titles, descriptions, sitemap and FAQ data so Google can read you.", keywords: "seo google ranking" },
    { title: "Cost calculator", tag: "growth", meta: "1 week", text: "Show visitors what their problem is costing them.", keywords: "estimate quote roi" },
    { title: "Newsletter setup", tag: "growth", meta: "3 days", text: "A sign-up form and a simple monthly email.", keywords: "email newsletter mailing list" },
  ],
};

// ---------- Parts from the inspiration board ----------

/** Placeholder drawing of a villa, in colour and as a line drawing (same outline, so they line up). */
export const VILLA = { src: "/placeholders/villa.svg", alt: "Illustration of a two-storey modern villa with palm trees and a pool" };
export const VILLA_SKETCH = { src: "/placeholders/villa-lines.svg", alt: "Line drawing of the same villa, with a dimension line over the roof" };

export const SECTORS = [
  { title: "Homes", line: "Apartments and villas designed around how families actually live.", tag: "Residential", img: VILLA, tone: "#925434" },
  { title: "Workplaces", line: "Offices that people choose to come back to.", tag: "Commercial", img: PHOTOS[1], tone: "#707569" },
  { title: "Schools", line: "Light, air and room to move for every classroom.", tag: "Education", img: PHOTOS[3], tone: "#c9d3df" },
  { title: "Public spaces", line: "Libraries, clinics and halls built for the whole town.", tag: "Civic", img: PHOTOS[5], tone: "#e3c1aa" },
];

export const TEAMS = [
  { title: "Design studio", sub: "8 people", img: PHOTOS[0] },
  { title: "Site engineering", sub: "14 people", img: PHOTOS[1] },
  { title: "Interiors", sub: "6 people", img: PHOTOS[2] },
  { title: "Landscape", sub: "5 people", img: VILLA },
  { title: "Planning", sub: "4 people", img: PHOTOS[3] },
  { title: "Client care", sub: "3 people", img: PHOTOS[4] },
  { title: "Workshop", sub: "9 people", img: PHOTOS[5] },
];

export const WORK = {
  noun: "projects",
  types: ["Homes", "Offices", "Clinics", "Schools"],
  cities: ["Pune", "Mumbai", "Bengaluru"],
  items: [
    { title: "Hillside villa", type: "Homes", city: "Pune", year: "2025", img: VILLA },
    { title: "Riverside offices", type: "Offices", city: "Mumbai", year: "2024", img: PHOTOS[0] },
    { title: "Family clinic", type: "Clinics", city: "Bengaluru", year: "2025", img: PHOTOS[1] },
    { title: "Primary school", type: "Schools", city: "Pune", year: "2023", img: PHOTOS[2] },
    { title: "Courtyard homes", type: "Homes", city: "Bengaluru", year: "2024", img: PHOTOS[3] },
    { title: "Co-working floor", type: "Offices", city: "Pune", year: "2025", img: PHOTOS[4] },
    { title: "Eye hospital", type: "Clinics", city: "Mumbai", year: "2023", img: PHOTOS[5] },
    { title: "Sea-view flats", type: "Homes", city: "Mumbai", year: "2025", img: PHOTOS[6] },
    { title: "Science block", type: "Schools", city: "Bengaluru", year: "2024", img: PHOTOS[7] },
  ],
};

export const VILLA_SPOTS = [
  { x: 34, y: 47, title: "Glass from floor to ceiling", text: "Double-glazed, shaded by the roof overhang, so rooms stay cool." },
  { x: 17, y: 60, title: "Cantilevered upper floor", text: "Overhangs the terrace by two metres: a covered porch without columns in the way." },
  { x: 70, y: 46, title: "Roof terrace with pergola", text: "Teak slats over the lower roof; space for a table of eight." },
  { x: 62, y: 88, title: "Pool", text: "Twelve metres, warmed by solar panels hidden on the upper roof." },
];

export const NETWORK = {
  hub: { name: "Nagpur", lat: 21.15, lon: 79.09 },
  places: [
    { name: "Delhi", lat: 28.61, lon: 77.21 },
    { name: "Guwahati", lat: 26.14, lon: 91.74 },
    { name: "Kolkata", lat: 22.57, lon: 88.36 },
    { name: "Ahmedabad", lat: 23.02, lon: 72.57, side: "left" as const },
    { name: "Mumbai", lat: 19.08, lon: 72.88, side: "left" as const },
    { name: "Hyderabad", lat: 17.39, lon: 78.49 },
    { name: "Bengaluru", lat: 12.97, lon: 77.59, side: "left" as const },
    { name: "Chennai", lat: 13.08, lon: 80.27 },
    { name: "Kochi", lat: 9.93, lon: 76.27 },
  ],
};

export const REASONS = [
  { title: "Built to last", text: "Concrete, teak and stone chosen for fifty summers, not five." },
  { title: "Ten minutes to the sea", text: "Every home is a short walk from the beach." },
  { title: "One team, start to keys", text: "Design, building and handover by the same people." },
];
