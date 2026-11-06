// Jody's content, taken from the meeting on 5 Nov 2026 (Avatar x Jody notes).
// Anything marked TO CONFIRM is our wording or a plan, not yet checked with Jody.
// Photos are kit placeholders until Jody's black-and-gold branding shoot and horse
// photos arrive. No testimonials yet: Jody has feedback to send; never invent it.

export const PHOTOS = {
  // TO REPLACE: Jody's branding photo (black and gold shoot)
  portrait: { src: "/placeholders/photo-3.svg", alt: "Placeholder for Jody’s portrait" },
  // TO REPLACE: Jody with the horses on the acreage
  horses: { src: "/placeholders/photo-5.svg", alt: "Placeholder for a photo of Jody with the horses" },
};

export const PILLARS = [
  {
    title: "Hypnosis",
    tag: "From $250",
    line: "Anxiety, overwhelm, phobias, habits and blocks. One deep session and a recording made just for you.",
    img: { src: "/placeholders/photo-1.svg", alt: "" },
    tone: "#d4af6a",
  },
  {
    title: "Life coaching",
    tag: "Monthly",
    line: "Mentoring, not therapy. Set the goals, meet regularly, and clear what gets in the way.",
    img: { src: "/placeholders/photo-2.svg", alt: "" },
    tone: "#6d1f2e",
  },
  {
    title: "Equestrian mindset",
    tag: "New",
    line: "For riders and competitors: calm nerves, sharper focus and a competition mindset you can trust.",
    img: { src: "/placeholders/photo-5.svg", alt: "" },
    tone: "#1e1b16",
  },
  {
    title: "Speaking and podcast",
    tag: "Coming soon",
    line: "Talks, commentating and the Live Sexy Now podcast: real conversations about confidence and reinvention.",
    img: { src: "/placeholders/photo-4.svg", alt: "" },
    tone: "#e9d3a1",
  },
];

export const PROBLEMS = [
  { problem: "My mind won’t switch off.", name: "Anxiety, low mood and overwhelm", text: "For everyday struggles that talking alone hasn’t shifted.", cta: "Book a session", href: "#contact" },
  { problem: "I’ve tried everything to quit.", name: "Quit smoking and vaping", text: "A single, focused session to be done with it. Priced on its own.", cta: "Ask about quitting", href: "#contact" },
  { problem: "I know what to eat. I just can’t stick to it.", name: "Mental gastric bypass", text: "Weight loss that starts with how you think about food.", cta: "Book a session", href: "#contact" },
  { problem: "Money never seems to stay.", name: "Money and abundance blocks", text: "For business owners ready for the next level, and anyone who feels stuck around money.", cta: "Book a session", href: "#contact" },
  { problem: "The past still runs the show.", name: "Childhood trauma", text: "Gentle, careful work on what still holds you back.", cta: "Book a session", href: "#contact" },
  { problem: "It’s only a spider, but…", name: "Phobias and fears", text: "Flying, spiders, needles, public speaking: the fears that make life smaller.", cta: "Book a session", href: "#contact" },
];

export const STEPS = [
  { title: "Book a time", text: "Choose a time that suits you. Nothing to pay upfront." },
  { title: "Whole-life analysis", text: "We start with a detailed look at your whole life, not just the problem. Allow at least an hour and a half." },
  { title: "Your session", text: "A hypnosis session tailored to you. The transformation is recorded on your own phone as it happens." },
  { title: "21 nights", text: "Listen to your recording every night as you go to sleep for at least 21 days, so the change sets in." },
];

export const PRICES = [
  {
    name: "Hypnosis session",
    price: "$250",
    per: "per session",
    includes: ["Whole-life analysis (1.5 hours or more)", "A session tailored to you", "Your personal recording to keep"],
  },
  {
    name: "Quit smoking or vaping",
    price: "Ask Jody",
    per: "one focused session",
    includes: ["Usually a single session", "Your personal recording", "Priced separately"],
  },
  {
    name: "Life coaching",
    price: "Monthly",
    per: "packages",
    includes: ["Goals set together", "Regular check-ins", "Hypnosis when something needs clearing"],
  },
];

// TO CONFIRM: final titles. Jody records these (sleep, anxiety, depression, money rewiring).
export const AUDIOS = [
  { title: "Sleep", text: "Let the day go and drift off." },
  { title: "Anxiety", text: "Settle a busy mind and a tight chest." },
  { title: "Feeling low", text: "A lift for the heavy days." },
  { title: "Money rewiring", text: "Loosen old beliefs about money." },
];

export const CREDENTIALS = ["Master hypnotherapist", "Master life coach", "NLP practitioner", "Equestrian mindset coach", "Speaker and podcast host"];

// TO CONFIRM with Jody: every answer below.
export const FAQ = [
  { q: "What does hypnosis feel like?", a: "Most people describe it as deeply relaxed and focused, like the moment just before sleep. You can hear everything and you stay in control." },
  { q: "How long is a session?", a: "Allow at least an hour and a half. We begin with a whole-life analysis, then move into the session itself." },
  { q: "What is the recording?", a: "While you’re in hypnosis, Jody records the part of the session where the change happens, straight onto your phone. You listen to it every night as you go to sleep for at least 21 days, so it sets in." },
  { q: "Do I pay upfront?", a: "No. You book, and pay for the session itself. If you cancel within 24 hours of your time, half the fee applies, because that time can’t be offered to someone else." },
  { q: "Is quitting smoking really one session?", a: "Usually, yes. Quit smoking and quit vaping are focused one-off sessions, priced separately. Ask Jody for the price." },
  { q: "Is hypnosis instead of seeing my doctor?", a: "No. Hypnotherapy and coaching work alongside medical and psychological care, not instead of it. If you are in crisis, call Lifeline on 13 11 14 or 000 in an emergency." },
  { q: "What’s the difference between hypnosis and life coaching?", a: "Hypnosis clears something specific, often in one session. Life coaching is ongoing mentoring: monthly, with goals and regular check-ins. Many people use both." },
];

export const ASSISTANT = [
  { keys: ["price", "cost", "how much", "fee", "$"], chip: "Prices", text: "A hypnosis session is $250 and includes a whole-life analysis and your own recording. Quit smoking and vaping are priced separately, and life coaching is monthly.", link: { label: "See prices", href: "#prices" } },
  { keys: ["book", "appointment", "time", "available"], chip: "Book a session", text: "Send a request and Jody will reply to find a time. Nothing to pay upfront.", link: { label: "Book a session", href: "#contact" } },
  { keys: ["free", "download", "audio", "sleep"], chip: "Free audio", text: "Free audios for sleep, anxiety, feeling low and money are on the way. Leave your email and you’ll get them first.", link: { label: "Get the free audio", href: "#free" } },
  { keys: ["cancel", "cancellation", "reschedule"], chip: "Cancelling", text: "Cancel within 24 hours of your time and half the fee applies. Earlier than that is fine." },
  { keys: ["smok", "vap", "quit", "cigarette"], text: "Quit smoking and quit vaping are usually one focused session, priced separately.", link: { label: "Ask Jody", href: "#contact" } },
  { keys: ["weight", "food", "gastric", "eat"], text: "The mental gastric bypass is Jody’s hypnosis approach to weight loss: it starts with how you think about food.", link: { label: "Book a session", href: "#contact" } },
  { keys: ["horse", "equestrian", "rider", "riding", "competition"], chip: "Riders", text: "Equestrian mindset coaching is for riders and competitors who want calm nerves and a competition mindset they can trust.", link: { label: "Ask about it", href: "#contact" } },
  { keys: ["live sexy now", "podcast", "the book", "your book", "author"], chip: "The book", text: "Live Sexy Now is Jody’s book about confidence and reinvention, with a podcast to match. Join the list to hear first.", link: { label: "About the book", href: "#book" } },
  { keys: ["recording", "21", "listen"], text: "During your session Jody records the transformation onto your phone. You listen every night for at least 21 days." },
];
