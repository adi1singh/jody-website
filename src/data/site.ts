// Everything site-specific in one place. A new site starts by editing this file
// and src/styles/tokens.css; the components read from here.

export const SITE = {
  name: "Jody Pockran",
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
  intro: { word: "jody pockran", sub: "CONFIDENCE · CALM · REINVENTION" },
  // Online booking calendar (Calendly, Cal.com, Acuity…). Empty: "Book" buttons go to the request form.
  booking: "",
  // Jody's new business accounts (to create). Empty ones are hidden.
  socials: [
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
    { label: "TikTok", href: "" },
    { label: "YouTube", href: "" },
    { label: "LinkedIn", href: "" },
  ],
};

export type NavItem = { label: string; href: string; desc?: string };
export type NavGroup = { label: string; items: NavItem[] };

export const NAV: (NavItem | NavGroup)[] = [
  {
    label: "Work with me",
    items: [
      { label: "Hypnosis", href: "/#hypnosis", desc: "Anxiety, habits, blocks" },
      { label: "Life coaching", href: "/#coaching", desc: "Monthly mentoring" },
      { label: "Equestrian mindset", href: "/#riders", desc: "For riders who compete" },
      { label: "How a session works", href: "/#session", desc: "Prices and booking" },
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
      { label: "Hypnosis", href: "/#hypnosis" },
      { label: "Life coaching", href: "/#coaching" },
      { label: "Equestrian mindset", href: "/#riders" },
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
