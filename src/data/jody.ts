// Jody's content, from the "Avatar x Jody" meeting (5 Nov 2026) and the brief.
// Everything here is read by the page sections in src/components/jody/.
// Lines marked TO CONFIRM are our wording or a plan Jody hasn't checked yet.
// Never invent testimonials, figures or prices: empty lists hide their section.

/** Where every "Book" button goes. SITE.booking (a calendar link) wins when set. */
export const BOOK_HREF = "#contact";

export const PHOTOS = {
  /** Cut out of the branding shoot, with the circle crop baked in (see README). */
  hero: { src: "/jody-hero.webp", alt: "Jody Pockran smiling, in a white silk blouse printed with gold chains", width: 690, height: 770 },
  /** The full branding photo (grey studio wall, white proteas). */
  portrait: { src: "/jody-portrait.jpg", alt: "Jody Pockran at a glass desk beside white proteas", width: 923, height: 920 },
};

export const HERO = {
  /** Big line on the left of the hero. */
  tagline: "Feel at home in your own life again.",
  /** Small serif intro on the right. TO CONFIRM */
  intro:
    "I’m Jody Pockran, a master hypnotherapist and life coach. I help people, especially women in overwhelm, clear what’s been holding them back and feel confident in their own skin again.",
};

/** The gold-circle statement under the hero. Words in **stars** are bold. TO CONFIRM */
export const STATEMENT =
  "I am a **hypnotherapist**, a **life coach**, a **horse lover** and soon an **author**. I believe confidence isn’t something you’re born with. It’s something you remember.";

export const CREDENTIALS = ["Master hypnotherapist", "Master life coach", "NLP practitioner", "Equestrian mindset coach", "Speaker and podcast host"];

/** The pillars. `word` is the giant word on the card, as in "hypnosis." */
export const SERVICES = [
  {
    id: "hypnosis",
    word: "hypnosis",
    title: "Hypnosis",
    tagline: "One deep session. A recording made just for you.",
    text: "We start with a whole-life analysis, then a session tailored to you. The moment of change is recorded on your phone, and you listen every night for 21 nights so it sets in.",
    price: "$250 a session",
    helpsWith: [
      "Anxiety and overwhelm",
      "Depression and low mood",
      "Quit smoking and vaping",
      "Weight: the mental gastric bypass",
      "Money and abundance blocks",
      "Childhood trauma",
      "Phobias and fears",
    ],
    tone: "gold",
  },
  {
    id: "coaching",
    word: "coaching",
    title: "Life coaching",
    tagline: "Mentoring, not therapy.",
    text: "Set the goals together, meet regularly, track progress and clear whatever gets in the way, with a hypnosis session when something needs shifting.",
    price: "Monthly packages",
    helpsWith: ["Goal setting", "Regular check-ins", "Reinvention after a big change", "Confidence"],
    tone: "dark",
  },
  {
    id: "riders",
    word: "riders",
    title: "Equestrian mindset coaching",
    tagline: "For riders who compete. New.",
    text: "Calm nerves, sharper focus and a competition mindset you can trust, from someone who lives with horses every day.",
    price: "Ask Jody",
    helpsWith: ["Competition nerves", "Focus under pressure", "Confidence after a fall", "Rider and horse connection"],
    tone: "ivory",
  },
];

/** What Jody's clients say, in their words (for problem-led copy). */
export const PROBLEMS = [
  { said: "My mind won’t switch off.", fix: "Anxiety and overwhelm" },
  { said: "I’ve tried everything to quit.", fix: "Quit smoking and vaping" },
  { said: "I know what to eat. I just can’t stick to it.", fix: "Mental gastric bypass" },
  { said: "Money never seems to stay.", fix: "Money blocks" },
  { said: "The past still runs the show.", fix: "Childhood trauma" },
  { said: "Talking about it hasn’t helped.", fix: "Depression and low mood" },
];

export const STEPS = [
  { title: "Book your time", text: "Choose a time that suits you. Nothing to pay upfront." },
  { title: "Whole-life analysis", text: "A detailed look at your whole life, not just the problem. Allow at least an hour and a half." },
  { title: "Your session", text: "Hypnosis tailored to you. The transformation, about 20 minutes, is recorded on your own phone as it happens." },
  { title: "21 nights", text: "Listen to your recording every night as you fall asleep, for at least 21 days, so the change sets in." },
];

export const PRICES = [
  { name: "Hypnosis session", price: "$250", per: "per session", includes: ["Whole-life analysis (1.5 hours or more)", "A session tailored to you", "Your personal recording to keep"], featured: true },
  { name: "Quit smoking or vaping", price: "Ask", per: "one focused session", includes: ["Usually a single session", "Your personal recording", "Priced separately"] },
  { name: "Life coaching", price: "Monthly", per: "packages", includes: ["Goals set together", "Regular check-ins", "Hypnosis when something needs clearing"] },
];

export const TERMS = [
  "Prices in Australian dollars.",
  "Nothing to pay upfront: book, then pay for the session itself.",
  "Cancel within 24 hours of your time and half the fee applies.",
];

/** Free audios (lead capture). Jody is recording them. TO CONFIRM titles and lengths. */
export const AUDIOS = [
  { title: "Sleep", text: "Let the day go and drift off.", ready: false },
  { title: "Anxiety", text: "Settle a busy mind and a tight chest.", ready: false },
  { title: "Feeling low", text: "A lift for the heavy days.", ready: false },
  { title: "Money rewiring", text: "Loosen old beliefs about money.", ready: false },
];
/** The paid tier planned after the free audios (freemium). TO CONFIRM */
export const MEMBERSHIP = { price: "$9", per: "a month", text: "The full audio library, new recordings each month. Coming soon." };

export const BOOK = {
  title: "Live Sexy Now",
  word: "live sexy now",
  status: "Coming soon",
  text: "It’s not about how you look. It’s how you feel when you walk into a room: confident, alive and back in your own life. A book about confidence and reinvention.",
  podcast: "Every chapter becomes a podcast conversation, with guests who’ve lived it. Recorded in the studio, released before the book.",
  /** The cover isn't designed yet: burgundy and gold, bold lettering, a horse and a landscape. */
  cover: null as null | { src: string; alt: string },
};

/** Real client words only. Empty: the testimonials section is hidden. */
export const TESTIMONIALS: { quote: string; name: string; detail?: string }[] = [];

/** Instagram reels or posts to show (links), once the business account exists. */
export const REELS: { href: string; caption: string; thumb?: string }[] = [];

// TO CONFIRM with Jody: every answer below.
export const FAQ = [
  { q: "What does hypnosis feel like?", a: "Most people describe it as deeply relaxed and focused, like the moment just before sleep. You can hear everything and you stay in control." },
  { q: "How long is a session?", a: "Allow at least an hour and a half. We begin with a whole-life analysis, then move into the session itself." },
  { q: "What is the recording?", a: "While you’re in hypnosis, I record the part of the session where the change happens, straight onto your phone. You listen every night as you fall asleep for at least 21 days, so it sets in." },
  { q: "Do I pay upfront?", a: "No. You book, and pay for the session itself. If you cancel within 24 hours of your time, half the fee applies, because that time can’t be offered to someone else." },
  { q: "Is quitting smoking really one session?", a: "Usually, yes. Quit smoking and quit vaping are focused one-off sessions, priced separately. Ask me for the price." },
  { q: "What’s the difference between hypnosis and life coaching?", a: "Hypnosis clears something specific, often in one session. Life coaching is ongoing mentoring, monthly, with goals and regular check-ins. Many people use both." },
  { q: "Is hypnosis instead of seeing my doctor?", a: "No. Hypnotherapy and coaching work alongside medical and psychological care, not instead of it. If you are in crisis, call Lifeline on 13 11 14, or 000 in an emergency." },
];

export const CARE_NOTE =
  "Hypnotherapy and coaching work alongside medical and psychological care, not instead of it. If you’re in crisis, call Lifeline on 13 11 14, or 000 in an emergency.";

export const ASSISTANT = [
  { keys: ["price", "cost", "how much", "fee", "$"], chip: "Prices", text: "A hypnosis session is $250 and includes a whole-life analysis and your own recording. Quit smoking and vaping are priced separately, and life coaching is monthly.", link: { label: "See prices", href: "#session" } },
  { keys: ["book", "appointment", "time", "available"], chip: "Book a session", text: "Send a request and Jody will reply to find a time. Nothing to pay upfront.", link: { label: "Book a session", href: "#contact" } },
  { keys: ["free", "download", "audio", "sleep"], chip: "Free audio", text: "Free audios for sleep, anxiety, feeling low and money are on the way. Leave your email and you’ll get them first.", link: { label: "Get the free audio", href: "#free" } },
  { keys: ["cancel", "cancellation", "reschedule"], chip: "Cancelling", text: "Cancel within 24 hours of your time and half the fee applies. Earlier than that is fine." },
  { keys: ["smok", "vap", "quit", "cigarette"], text: "Quit smoking and quit vaping are usually one focused session, priced separately.", link: { label: "Ask Jody", href: "#contact" } },
  { keys: ["weight", "food", "gastric", "eat"], text: "The mental gastric bypass is Jody’s hypnosis approach to weight loss: it starts with how you think about food.", link: { label: "Book a session", href: "#contact" } },
  { keys: ["horse", "equestrian", "rider", "riding", "competition"], chip: "Riders", text: "Equestrian mindset coaching is for riders and competitors who want calm nerves and a competition mindset they can trust.", link: { label: "Ask about it", href: "#riders" } },
  { keys: ["live sexy now", "podcast", "the book", "your book", "author"], chip: "The book", text: "Live Sexy Now is Jody’s book about confidence and reinvention, with a podcast to match. Join the list to hear first.", link: { label: "About the book", href: "#book" } },
  { keys: ["recording", "21", "listen"], text: "During your session Jody records the transformation onto your phone. You listen every night for at least 21 days." },
];
