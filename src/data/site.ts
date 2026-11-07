// Everything site-specific in one place. A new site starts by editing this file
// and src/styles/tokens.css; the components read from here.

export const SITE = {
  name: "Jody Pockran",
  suffix: "",
  tagline: "Hypnotherapy, life coaching and equestrian mindset coaching. Author of Live Sexy Now.",
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
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Work with me", href: "/#work" },
  { label: "Live Sexy Now", href: "/#book" },
  { label: "Podcast", href: "/#podcast" },
  { label: "Contact", href: "/#contact" },
];

export const FOOTER = [
  {
    title: "Work with me",
    links: [
      { label: "Hypnosis", href: "/#hypnosis" },
      { label: "Life coaching", href: "/#coaching" },
      { label: "Equestrian mindset", href: "/#riders" },
      { label: "How a session works", href: "/#experience" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Live Sexy Now", href: "/#book" },
      { label: "Podcast and speaking", href: "/#podcast" },
      { label: "Free audio", href: "/#free" },
      { label: "Questions", href: "/#faq" },
    ],
  },
];

export const isGroup = (n: NavItem | NavGroup): n is NavGroup => "items" in n;
