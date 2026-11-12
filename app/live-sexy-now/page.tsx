import { PillarPage, Section, Reviews } from "../pillar";
import LeadForm from "../lead-form";

export const metadata = {
  title: "Live Sexy Now · the book by Jody Pockran",
  description: "Live Sexy Now: a manifesto for bold living, your guide to reclaiming your life on your terms. Coming soon. Join the list.",
};

export default function Book() {
  return <PillarPage>
    <section className="p-hero p-hero--book" aria-labelledby="p-title">
      <div className="section-shell p-hero-grid">
        <div className="p-hero-copy">
          <p className="p-eyebrow"><span className="p-gem" aria-hidden="true">✦</span>Pillar four · The book · Coming soon</p>
          <h1 id="p-title">Live <em>Sexy</em><br />Now.</h1>
          <p className="p-lead">A manifesto for bold living: your guide to reclaim your life on your terms. Honest, funny and kind, for anyone who has ever been told it’s too late.</p>
          <div className="p-book-form"><LeadForm kind="book" interest="Book updates" source="book-page" compact buttonLabel="Tell me when it’s out" /></div>
        </div>
        <figure className="p-book-cover"><img src="/images/live-sexy-now-cover.webp" alt="Live Sexy Now by Jody Pockran: the book cover" fetchPriority="high" /></figure>
      </div>
    </section>
    <Section tone="champagne" eyebrow="Inside the book" title={<>Your life.<br /><em>Your terms.</em></>} intro="Each chapter becomes an episode of the Live Sexy Now podcast, with guests who have rewritten their own stories.">
      <ul className="p-chips">
        <li>Confidence</li><li>Reinvention</li><li>Letting go</li><li>Money and worth</li><li>Love and boundaries</li><li>Beginning again</li>
      </ul>
    </Section>
    <Reviews pillar="book" title="Early readers." />
  </PillarPage>;
}
