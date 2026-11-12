import type { ReactNode } from "react";
import Navigation from "./navigation";
import StoryMotion from "./motion";
import LeadExperience from "./lead-experience";
import SiteFooter from "./site-footer";
import { reviewsFor, SAMPLE_REVIEWS, type Pillar } from "../src/data/reviews";

/** Shared parts for Jody's pillar pages (hypnosis, coaching, equestrian, book, listen). */

export function Arrow() {
  return <svg aria-hidden="true" className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.3" /></svg>;
}

export function PillarPage({ children }: { children: ReactNode }) {
  return <div data-story-root className="pillar-root">
    <a className="skip-link" href="#main">Skip to the content</a>
    <Navigation />
    <main id="main">{children}</main>
    <SiteFooter />
    <StoryMotion />
    <LeadExperience />
  </div>;
}

type Img = { src: string; srcSet?: string; alt: string; position?: string };

export function PillarHero({ eyebrow, title, lead, image, primary, secondary, facts }: {
  eyebrow: string; title: ReactNode; lead: string; image: Img;
  primary: { label: string; href: string; interest?: string };
  secondary?: { label: string; href: string };
  facts?: string[];
}) {
  return <section className="p-hero" aria-labelledby="p-title">
    <div className="section-shell p-hero-grid">
      <div className="p-hero-copy">
        <p className="p-eyebrow"><span className="p-gem" aria-hidden="true">✦</span>{eyebrow}</p>
        <h1 id="p-title">{title}</h1>
        <p className="p-lead">{lead}</p>
        <div className="p-actions">
          <a className="gold-button" href={primary.href} data-interest={primary.interest}>{primary.label} <Arrow /></a>
          {secondary && <a className="p-ghost" href={secondary.href}>{secondary.label}</a>}
        </div>
        {facts && <ul className="p-facts">{facts.map((f) => <li key={f}>{f}</li>)}</ul>}
      </div>
      <figure className="p-hero-photo">
        <img src={image.src} srcSet={image.srcSet} sizes="(max-width: 900px) 90vw, 40vw" alt={image.alt} style={image.position ? { objectPosition: image.position } : undefined} fetchPriority="high" />
      </figure>
    </div>
  </section>;
}

export function Section({ id, tone = "ivory", eyebrow, title, intro, children }: {
  id?: string; tone?: "ivory" | "champagne" | "pearl"; eyebrow?: string; title: ReactNode; intro?: string; children?: ReactNode;
}) {
  return <section id={id} className={`p-section tone-${tone}`}>
    <div className="section-shell">
      <div className="p-section-head" data-reveal>
        {eyebrow && <p className="p-eyebrow"><span className="p-gem" aria-hidden="true">✦</span>{eyebrow}</p>}
        <h2>{title}</h2>
        {intro && <p className="p-intro">{intro}</p>}
      </div>
      {children}
    </div>
  </section>;
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return <ol className="p-steps">{items.map((s, i) => <li key={s.title} data-reveal><span className="p-num">{String(i + 1).padStart(2, "0")}</span><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol>;
}

export function Offers({ items }: { items: { title: string; price?: string; text: string; interest: string; cta?: string }[] }) {
  return <div className="p-offers">{items.map((o) => <article key={o.title} className="p-offer" data-reveal>
    <h3>{o.title}</h3>
    {o.price && <p className="p-price">{o.price}</p>}
    <p>{o.text}</p>
    <a className="p-offer-link" href={`/book-a-session?interest=${encodeURIComponent(o.interest)}`}>{o.cta ?? "Book this session"} <Arrow /></a>
  </article>)}</div>;
}

export function Reviews({ pillar, title = "Kind words.", limit }: { pillar?: Pillar; title?: string; limit?: number }) {
  const all = reviewsFor(pillar);
  // Mixed lists lead with one review from each pillar
  const ordered = pillar ? all : [...all.filter((r, i) => all.findIndex((x) => x.pillar === r.pillar) === i), ...all.filter((r, i) => all.findIndex((x) => x.pillar === r.pillar) !== i)];
  const list = limit ? ordered.slice(0, limit) : ordered;
  if (!list.length) return null;
  return <section className="p-reviews" aria-labelledby={`reviews-${pillar ?? "all"}`}>
    <div className="section-shell">
      <div className="p-reviews-head">
        <p className="p-eyebrow"><span className="p-gem" aria-hidden="true">✦</span>Client stories</p>
        <h2 id={`reviews-${pillar ?? "all"}`}>{title}</h2>
        {SAMPLE_REVIEWS && <p className="p-sample-note">Sample reviews to show the layout. Jody’s real client reviews will replace them.</p>}
      </div>
      <div className="p-review-grid">{list.map((r) => <figure key={r.name} className="p-review" data-reveal>
        {SAMPLE_REVIEWS && <span className="p-sample-tag">Sample</span>}
        <span className="p-stars" aria-label="Five stars">★★★★★</span>
        <blockquote>“{r.quote}”</blockquote>
        <figcaption><b>{r.name}</b><span>{r.context}</span></figcaption>
      </figure>)}</div>
    </div>
  </section>;
}

export function BookBand({ line, interest, label = "Book a session" }: { line: ReactNode; interest: string; label?: string }) {
  return <section className="p-book-band">
    <div className="section-shell">
      <p>{line}</p>
      <a className="gold-button" href={`/book-a-session?interest=${encodeURIComponent(interest)}`}>{label} <Arrow /></a>
      <small>No upfront payment · Cancellations within 24 hours incur half the fee</small>
    </div>
  </section>;
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return <div className="p-faq">{items.map((f) => <details key={f.q}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}</div>;
}
