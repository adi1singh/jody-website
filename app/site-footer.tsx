import { siteConfig } from "../src/data/site-config";

/** The closing page of the book: brand, chapters, contact and small print. */
export default function SiteFooter() {
  const socials = siteConfig.socials.filter((s) => s.url);
  const year = new Date().getFullYear();
  return <footer className="book-footer ink">
    <div className="section-shell">
      <div className="book-footer-top">
        <div className="book-footer-brand">
          <a className="book-footer-mark" href="/#cover">Jody Pockran<span>Hypnotherapy &amp; Coaching</span></a>
          <p>Change the story. <em>Change your life.</em></p>
          <a className="gold-button" href="/book-a-session">Book a session</a>
        </div>
        <nav aria-label="Footer: work with Jody">
          <p className="book-footer-head">Work with Jody</p>
          <a href="/hypnosis">Hypnosis</a>
          <a href="/life-coaching">Life coaching</a>
          <a href="/equestrian">Equestrian mindset</a>
          <a href="/live-sexy-now">Live Sexy Now</a>
          <a href="/listen">Free audio &amp; podcast</a>
          <a href="/book-a-session">Book a session</a>
        </nav>
        <div>
          <p className="book-footer-head">Get in touch</p>
          <a href="mailto:jannpockran@gmail.com">jannpockran@gmail.com</a>
          <a href="/book-a-session?interest=General%20enquiry">Send an enquiry</a>
          {socials.length > 0 && <>
            <p className="book-footer-head book-footer-gap">Follow</p>
            {socials.map((s) => <a key={s.name} href={s.url} target="_blank" rel="noreferrer">{s.name}</a>)}
          </>}
        </div>
      </div>
      <div className="book-footer-bottom">
        <p>© {year} Jody Pockran</p>
        <div className="book-footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/photo-credits.txt" target="_blank" rel="noreferrer">Photo credits</a>
          <a className="powered" href="https://jobgen-website-tau.vercel.app" target="_blank" rel="noreferrer">Powered by <strong>JobGen</strong></a>
        </div>
      </div>
    </div>
  </footer>;
}
