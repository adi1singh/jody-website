// Everything site-specific in one place. A new site starts by editing this file
// and src/styles/tokens.css; the components read from here.

export const SITE = {
  name: "Jody",
  suffix: "",
  tagline: "Hypnotherapy, life coaching and mindset. Home of Live Sexy Now.",
  description:
    "Hypnosis and life coaching with Jody, for anxiety, overwhelm, old habits and the blocks that keep you small. Book a session, or start tonight with a free audio.",
  // To confirm with Jody: the email for the site (a business address once the domain is bought).
  email: "jannpockran@gmail.com",
  // To confirm with Jody. Leave empty to hide it everywhere.
  phone: "",
  // Where the forms send (Formspree, Web3Forms, or the CRM's form endpoint). Leave it
  // empty and the forms show switched off with a note, so nobody fills them in for nothing.
  form: { endpoint: "", extraFields: {} as Record<string, string> },
  // The intro curtain's words.
  intro: { word: "live sexy now", sub: "CONFIDENCE · CALM · REINVENTION" },
};

export type NavItem = { label: string; href: string; desc?: string };
export type NavGroup = { label: string; items: NavItem[] };

export const NAV: (NavItem | NavGroup)[] = [
  {
    label: "Work with Jody",
    items: [
      { label: "Hypnosis", href: "/#pillars", desc: "Anxiety, habits, blocks" },
      { label: "Life coaching", href: "/#pillars", desc: "Monthly mentoring" },
      { label: "Equestrian mindset", href: "/#pillars", desc: "For riders who compete" },
      { label: "Prices", href: "/#prices", desc: "And how booking works" },
    ],
  },
  { label: "Free audio", href: "/#free" },
  { label: "The book", href: "/#book" },
  { label: "About", href: "/#about" },
];

export const FOOTER = [
  {
    title: "Work with Jody",
    links: [
      { label: "Hypnosis", href: "/#pillars" },
      { label: "Life coaching", href: "/#pillars" },
      { label: "Equestrian mindset", href: "/#pillars" },
      { label: "Book a session", href: "/#contact" },
    ],
  },
  {
    title: "Free",
    links: [
      { label: "Free audio", href: "/#free" },
      { label: "Live Sexy Now, the book", href: "/#book" },
      { label: "Questions", href: "/#faq" },
    ],
  },
];

export const isGroup = (n: NavItem | NavGroup): n is NavGroup => "items" in n;
