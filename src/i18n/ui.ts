// Multi-language setup from Hind Zero Waste: interface text per language, and
// pages for other languages live under src/pages/<lang>/ (see src/pages/hi/).
// Add or remove languages here; the switcher and <html lang> follow.

export const languages = {
  en: { label: "English", short: "EN", htmlLang: "en", prefix: "" },
  hi: { label: "हिंदी", short: "हिं", htmlLang: "hi-IN", prefix: "/hi" },
} as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    "hero.cta": "Get in touch",
    "hero.secondary": "See our work",
    "lang.label": "Language",
  },
  hi: {
    "hero.cta": "संपर्क करें",
    "hero.secondary": "हमारा काम देखें",
    "lang.label": "भाषा",
  },
} satisfies Record<Lang, Record<string, string>>;

export const t = (lang: Lang) => (key: keyof (typeof ui)["en"]) => ui[lang][key] ?? ui.en[key];

/** The same page in another language: /about/ ↔ /hi/about/ */
export function localise(path: string, to: Lang): string {
  const bare = path.replace(/^\/(hi)(?=\/|$)/, "") || "/";
  return (languages[to].prefix + bare).replace(/\/{2,}/g, "/") || "/";
}
