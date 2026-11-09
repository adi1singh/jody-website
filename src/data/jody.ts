// Jody Pockran's content (version 3). Every section reads from here.
// Sources: the "Avatar x Jody" meeting (5 Nov 2026) and the redesign brief.
// Lines marked TO CONFIRM are our wording; Jody approves before launch.
// Never invent testimonials, guests, episodes, figures or prices.

/** Where every booking button goes. SITE.booking (a calendar link) wins when set. */
export const BOOK_HREF = "#contact";

// ---------------------------------------------------------------------------
// Photography. One entry per photo slot on the page = the shot list for Jody's
// photographer. TEMPORARY: the /photos/ images are free stock photos (CC0,
// sources in public/photos/CREDITS.md), graded black and gold, used until
// Jody's own shoot replaces them slot by slot. Only /jody-*.{jpg,webp} are Jody.
//
// photographer. Empty `src` shows a labelled placeholder of the right shape
// (see components/jody/Photo.astro). To use a real photo: put the file in
// public/photos/ and set `src` (and `focus` to keep the face in frame).
// ---------------------------------------------------------------------------
export interface PhotoSlot {
  src?: string;
  alt: string;
  /** What the photograph should show (the placeholder displays this). */
  brief: string;
  ratio: string;
  focus?: string;
}

export const PHOTOS = {
  /** Hero. The only real photo so far: the branding shoot (low resolution; full-size original requested). */
  hero: {
    src: "/jody-portrait.jpg",
    alt: "Jody Pockran in a white silk blouse printed with gold chains, beside white proteas",
    brief: "Jody, black and gold branding shoot, looking to camera",
    ratio: "4/5",
    focus: "22% 30%",
  },
  /** Cut-out of the same shoot, for the closing section. */
  cutout: {
    src: "/jody-hero.webp",
    alt: "Jody Pockran smiling",
    brief: "Jody, cut out from the branding shoot",
    ratio: "690/770",
  },
  intro: { src: "/jody-portrait.jpg", alt: "Jody Pockran smiling, in white silk with gold chains", brief: "Jody, warm close portrait in natural light, ivory or white styling", ratio: "3/4", focus: "20% 22%" },
  introDetail: { src: "/photos/hands-on-horse.jpg", alt: "A rider's hands making a heart shape on a horse's neck", brief: "Detail: Jody's hand on a horse's neck, gold jewellery", ratio: "1/1", focus: "48% 60%" },
  hypnosis: { src: "/photos/window-chair.jpg", alt: "A quiet room with a leather chair in soft window light", brief: "Jody in session: soft window light, client's view, calm and close", ratio: "4/5", focus: "55% 70%" },
  coaching: { src: "/photos/hand-wheat.jpg", alt: "A hand brushing through golden wheat", brief: "Jody mid-conversation, laughing, editorial black and gold", ratio: "3/4", focus: "35% 50%" },
  riders: { src: "/photos/rider-sunset.jpg", alt: "A rider on horseback against a golden sunset", brief: "Jody with her horse in the arena or paddock, golden hour", ratio: "3/4", focus: "62% 60%" },
  experience: { src: "/photos/horses-golden-dust.jpg", alt: "Horses and riders in golden dust under gum trees at sunrise", brief: "Cinematic: the acreage at dusk, horses grazing in the distance", ratio: "21/9", focus: "50% 55%" },
  book: { src: "/photos/horse-sunset.jpg", alt: "A horse in silhouette against a gold and amber sunset", brief: "Book cover shoot: Jody beside a horse, wide landscape, low sun", ratio: "16/9", focus: "60% 45%" },
  podcast: { src: "/photos/gold-microphone.jpg", alt: "A gold microphone against a dark background", brief: "Jody in the studio at the microphone, black and gold", ratio: "4/5", focus: "45% 40%" },
  speaking: { src: "/photos/microphone-lights.jpg", alt: "A microphone on a stand in front of warm stage lights", brief: "Jody speaking on stage, warm light", ratio: "3/2", focus: "50% 50%" },
  closing: { src: "/photos/woman-golden-field.jpg", alt: "A woman in a hat walking into a golden field at sunset", brief: "Jody looking out over the paddocks at sunset, from behind or side-on", ratio: "16/9", focus: "45% 6%" },
  story: { src: "/photos/horses-running-dust.jpg", alt: "Two horses running through dust and haze", brief: "Horses running free through dust: the old story letting go", ratio: "16/9", focus: "60% 55%" },
  blackHorse: { src: "/photos/black-horse.jpg", alt: "A black horse in shadow, its eye and bridle catching the light", brief: "A black horse in low light, close", ratio: "4/5", focus: "40% 40%" },
  night: { src: "/photos/horse-grazing-gold.jpg", alt: "A horse grazing in silhouette against a gold dusk sky", brief: "A horse grazing at dusk", ratio: "3/4", focus: "50% 60%" },
  horseEye: { src: "/photos/horse-eye.jpg", alt: "Close-up of a grey horse's eye", brief: "A horse's eye, close", ratio: "1/1", focus: "35% 50%" },
} satisfies Record<string, PhotoSlot>;

// ---------------------------------------------------------------------------
// Words
// ---------------------------------------------------------------------------
export const HERO = {
  /** Two lines; the second is set in italic. */
  title: ["Change the story.", "Change your life."],
  sub: "Hypnotherapy and life coaching with Jody Pockran, for people ready to let go of what’s been holding them back.",
  cta: { label: "Work with Jody", href: "#work" },
};

// TO CONFIRM: all intro wording.
export const INTRO = {
  eyebrow: "Introducing Jody",
  title: "Hello, I’m Jody.",
  lead: "I’m a master hypnotherapist and life coach, and I believe the story you tell yourself shapes everything.",
  body: "I don’t just look at the problem in front of you. I look at your whole life: where the pattern began, what it’s been protecting, and who you are without it. Then we change the story, gently and for good.",
  /** Three short lines about the approach. */
  approach: [
    { title: "Your whole life first", text: "Every session starts with the whole picture, not just the symptom." },
    { title: "Change at the root", text: "Hypnosis works where habits and old beliefs actually live." },
    { title: "Calm, like the horses", text: "Life on the acreage with my horses taught me presence. I bring it to every session." },
  ],
  credentials: ["Master hypnotherapist", "Master life coach", "NLP practitioner", "Equestrian mindset coach"],
};

export const PILLARS = [
  {
    id: "hypnosis",
    number: "01",
    title: "Hypnosis",
    line: "One deep session. A recording made just for you. Twenty-one nights to make it yours.",
    for: ["Anxiety and overwhelm", "Depression and low mood", "Quit smoking and vaping", "Weight: the mental gastric bypass", "Money and abundance blocks", "Childhood trauma", "Phobias and fears"],
    price: "$250 a session",
    cta: { label: "How a session works", href: "#experience" },
    photo: "hypnosis",
  },
  {
    id: "coaching",
    number: "02",
    title: "Life coaching",
    line: "Mentoring, not therapy. Goals set together, monthly check-ins, and support when life shifts.",
    for: ["Reinvention after a big change", "Goals and accountability", "Confidence"],
    price: "Monthly packages",
    cta: { label: "Ask about coaching", href: "#contact" },
    photo: "coaching",
  },
  {
    id: "riders",
    number: "03",
    title: "Equestrian mindset",
    line: "For riders who compete: calm nerves, sharper focus and a competition mindset you can trust.",
    for: ["Competition nerves", "Focus under pressure", "Confidence after a fall"],
    price: "New",
    cta: { label: "Ask about riders", href: "#contact" },
    photo: "riders",
  },
] as const;

/** Clients' own words for what brings them (problem-led). */
export const PROBLEMS = [
  "My mind won’t switch off.",
  "I’ve tried everything to quit.",
  "I know what to eat. I just can’t stick to it.",
  "Money never seems to stay.",
  "The past still runs the show.",
];

/** The hypnosis journey, in three moments. */
export const EXPERIENCE = {
  eyebrow: "The transformation experience",
  title: ["One session.", "Twenty-one nights."],
  intro: "A hypnosis session with Jody is calm, unhurried and made entirely around you.",
  steps: [
    { number: "01", title: "Your whole-life analysis", time: "90 minutes", text: "We talk through your whole life, not just the problem, so the session is built on what’s really going on." },
    { number: "02", title: "Your personal recording", time: "During your session", text: "While you’re in hypnosis, the moment of change is recorded straight onto your phone. It’s yours to keep." },
    { number: "03", title: "Twenty-one nights", time: "At home", text: "You listen every night as you fall asleep, for at least 21 nights, so the new story settles in." },
  ],
  care: "Hypnotherapy and coaching work alongside medical and psychological care, never instead of it. Everyone’s experience is different. If you’re in crisis, call Lifeline on 13 11 14, or 000 in an emergency.",
};

export const PRICES = [
  { name: "Hypnosis session", price: "$250", note: "Whole-life analysis, tailored session and your personal recording" },
  { name: "Quit smoking or vaping", price: "On request", note: "Usually one focused session" },
  { name: "Life coaching", price: "Monthly", note: "Packages with regular check-ins" },
];
export const TERMS = ["Prices in Australian dollars", "Nothing to pay upfront", "Cancel within 24 hours and half the fee applies"];

/** Real client words only. Empty: the section shows labelled placeholders. */
export const TESTIMONIALS: { quote: string; name: string; detail?: string }[] = [];

export const BOOK = {
  title: "Live Sexy Now",
  kicker: "The book · Coming soon",
  line: "Confidence. Reinvention. Coming home to yourself.",
  text: "It’s not about how you look. It’s how you feel when you walk into a room. Jody’s first book is about confidence and reinvention, for anyone ready to feel alive in their own life again.",
  /** No cover yet: burgundy and gold, bold lettering, Jody beside a horse in a landscape. */
  cover: null as null | { src: string; alt: string },
};

export const PODCAST = {
  title: "The Live Sexy Now podcast",
  status: "In production",
  text: "One chapter, one conversation. Each episode takes a chapter of the book and explores it with a guest who has lived it. Recorded in the studio, released before the book.",
  /** Planned format, not published episodes. No guest names until confirmed. */
  planned: ["Chapter one", "Chapter two", "Chapter three"],
  /** Published episodes (title, guest, link). Empty until launch. */
  episodes: [] as { title: string; guest: string; href: string }[],
};

export const SPEAKING = {
  title: "Speaking",
  text: "Jody speaks and commentates on confidence, mindset and reinvention, for events, teams and the equestrian world.",
  cta: { label: "Enquire about speaking", href: "#contact" },
};

export const AUDIOS = [
  { title: "Sleep", text: "Let the day go and drift off." },
  { title: "Anxiety", text: "Settle a busy mind." },
  { title: "Feeling low", text: "A lift for the heavy days." },
  { title: "Money rewiring", text: "Loosen old beliefs about money." },
];
export const FREE_AUDIO = {
  eyebrow: "Free hypnosis audio",
  title: "Start tonight.",
  text: "Short hypnosis recordings by Jody, free to download. Leave your email and they’re yours as soon as they’re ready.",
  status: "Being recorded now",
};

// TO CONFIRM with Jody: every answer below.
export const FAQ = [
  { q: "What does hypnosis feel like?", a: "Most people describe it as deeply relaxed and focused, like the moment just before sleep. You can hear everything and you stay in control." },
  { q: "How long is a session?", a: "Allow at least an hour and a half. We begin with a whole-life analysis, then move into the session itself." },
  { q: "What is the recording?", a: "While you’re in hypnosis, I record the part of the session where the change happens, straight onto your phone. You listen every night as you fall asleep for at least 21 nights." },
  { q: "Do I pay upfront?", a: "No. You book, and pay for the session itself. If you cancel within 24 hours of your time, half the fee applies." },
  { q: "Is quitting smoking really one session?", a: "Usually, yes. Quit smoking and quit vaping are focused one-off sessions, priced separately." },
  { q: "What’s the difference between hypnosis and life coaching?", a: "Hypnosis clears something specific, often in one session. Life coaching is ongoing mentoring, monthly, with goals and regular check-ins." },
  { q: "Is hypnosis instead of seeing my doctor?", a: "No. Hypnotherapy and coaching work alongside medical and psychological care, not instead of it. If you are in crisis, call Lifeline on 13 11 14, or 000 in an emergency." },
];

export const CLOSING = {
  title: ["Your next chapter", "starts with one conversation."],
  text: "Nothing to pay upfront. Just a time that suits you.",
  cta: { label: "Book a session", href: BOOK_HREF },
};

export const CARE_NOTE = EXPERIENCE.care;

export const ASSISTANT = [
  { keys: ["price", "cost", "how much", "fee", "$"], chip: "Prices", text: "A hypnosis session is $250 and includes a whole-life analysis and your own recording. Quit smoking and vaping are priced separately, and life coaching is monthly.", link: { label: "See prices", href: "#experience" } },
  { keys: ["book", "appointment", "time", "available"], chip: "Book a session", text: "Send a request and Jody will reply to find a time. Nothing to pay upfront.", link: { label: "Book a session", href: "#contact" } },
  { keys: ["free", "download", "audio", "sleep"], chip: "Free audio", text: "Free audios for sleep, anxiety, feeling low and money are on the way. Leave your email and you’ll get them first.", link: { label: "Free audio", href: "#free" } },
  { keys: ["cancel", "cancellation", "reschedule"], chip: "Cancelling", text: "Cancel within 24 hours of your time and half the fee applies. Earlier than that is fine." },
  { keys: ["smok", "vap", "quit", "cigarette"], text: "Quit smoking and quit vaping are usually one focused session, priced separately.", link: { label: "Ask Jody", href: "#contact" } },
  { keys: ["weight", "food", "gastric", "eat"], text: "The mental gastric bypass is Jody’s hypnosis approach to weight loss: it starts with how you think about food.", link: { label: "Book a session", href: "#contact" } },
  { keys: ["horse", "equestrian", "rider", "riding", "competition"], chip: "Riders", text: "Equestrian mindset coaching is for riders and competitors who want calm nerves and a competition mindset they can trust.", link: { label: "Ask about it", href: "#riders" } },
  { keys: ["live sexy now", "podcast", "the book", "your book", "author"], chip: "The book", text: "Live Sexy Now is Jody’s book about confidence and reinvention, with a podcast to match. Join the list to hear first.", link: { label: "About the book", href: "#book" } },
  { keys: ["speak", "event", "talk", "keynote"], text: "Jody speaks on confidence, mindset and reinvention. Send an enquiry with your event details.", link: { label: "Enquire", href: "#contact" } },
];

// ---------------------------------------------------------------------------
// Version 4: the page is a book in six chapters, joined by a gold thread.
// Each chapter headline turns from the old story to the new (gold italic).
// TO CONFIRM: chapter wording.
// ---------------------------------------------------------------------------
export const CHAPTERS = {
  story: { n: "I", name: "The story you’ve been telling" },
  meet: { n: "II", name: "Meet Jody" },
  change: { n: "III", name: "How the story changes" },
  work: { n: "IV", name: "Ways to work together" },
  next: { n: "V", name: "The next chapter" },
  yours: { n: "VI", name: "Your chapter" },
};

export const STORY = {
  title: ["You know the story by heart.", "It doesn’t have to end this way."],
  lead: "Most people come to me after years of the same few sentences running in the background.",
  turn: "Those sentences were learned. Which means they can be unlearned.",
};
