import Navigation from "./navigation";
import ContactForm from "./contact-form";
import StoryMotion from "./motion";
import LeadForm from "./lead-form";
import LeadExperience, { AudioSignup } from "./lead-experience";
import { siteConfig } from "../src/data/site-config";
import SiteFooter from "./site-footer";
import BookIntro from "./book-intro";
import Gallop from "./gallop";
import { Reviews } from "./pillar";

function Arrow() {
  return <svg aria-hidden="true" className="arrow" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="chapter-label"><span className="folio">{number}</span><span className="chapter-line" /><span className="chapter-name"><span className="chapter-word">Chapter {number}</span>{children}</span></div>;
}
/** A full-width photograph between chapters. On scroll it holds still while
 * the first line reads, then the second line grows in, larger (motion.tsx). */
function Interlude({ photo, alt, line, turn, position = "50% 50%" }: { photo: string; alt: string; line: string; turn: string; position?: string }) {
  return <section className="interlude" aria-label={`${line} ${turn}`}>
    <div className="interlude-stage">
      <img src={`/images/${photo}.webp`} srcSet={`/images/${photo}-640.webp 640w, /images/${photo}-960.webp 960w, /images/${photo}.webp 1920w`} sizes="100vw" alt={alt} loading="lazy" style={{ objectPosition: position }} />
      <div className="interlude-shade" aria-hidden="true" />
      <div className="interlude-words">
        <p className="interlude-line">{line}</p>
        <p className="interlude-turn">{turn}</p>
      </div>
    </div>
  </section>;
}
function Photo({ name, alt, className = "", portrait = false, priority = false, wide = false }: { name: string; alt: string; className?: string; portrait?: boolean; priority?: boolean; wide?: boolean }) {
  const dimensions: Record<string, [number, number]> = {"jody-portrait":[923,920],"hand-wheat":[1344,896],"gold-microphone":[1344,893],"microphone-lights":[1344,896],"black-horse":[1536,1024],"horse-tree-light":[1920,1280],"sunbeams-horses":[1920,1280],"rider-sunset":[1536,1028],"horses-golden-grazing":[1920,1280]};
  const [width,height] = dimensions[name] ?? [1536,1024];
  return <img className={className} src={`/images/${name}.webp`} srcSet={portrait ? `/images/${name}-480.webp 480w, /images/${name}-768.webp 768w, /images/${name}.webp 923w` : `/images/${name}-640.webp 640w, /images/${name}-960.webp 960w, /images/${name}.webp ${width}w`} sizes={wide ? "100vw" : "(max-width: 760px) 92vw, 46vw"} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />;
}

export default function Home() {
  const socials = siteConfig.socials.filter(s => s.url);
  return <div data-story-root>
    <a className="skip-link" href="#main">Skip to the story</a>
    <Navigation />
    <div className="page-turn-edge" aria-hidden="true" />
    <main id="main">
      <section id="cover" className="cover ink" aria-labelledby="cover-heading" data-chapter="Cover">
        <div className="cover-inner">
          <div className="cover-copy">
            <h1 id="cover-heading" className="cover-title">Change the story.<span>Change your life.</span></h1>
            <p className="hero-line">Let go of what’s been holding you back, and feel like yourself again.</p>
            <div className="hero-cta"><a className="gold-button" href="/book-a-session">Book a session<Arrow /></a><span>No upfront payment</span></div>
            <ul className="hero-creds"><li>Master hypnotherapist</li><li>Master life coach</li><li>NLP practitioner</li></ul>
          </div>
          <figure className="cover-portrait">
            <span className="hero-sun" aria-hidden="true" />
            <div className="portrait-frame">{siteConfig.introVideoUrl ? <video className="hero-film" controls playsInline preload="metadata" poster="/images/jody-portrait.webp"><source src={siteConfig.introVideoUrl} type="video/mp4" />Your browser does not support this video.</video> : <Photo name={siteConfig.portrait} alt="Jody Pockran, master hypnotherapist and life coach" portrait priority />}</div>
          </figure>
        </div>
      </section>

      <section className="pillars" aria-labelledby="pillars-title">
        <div className="section-shell">
          <h2 id="pillars-title" className="pillars-title"><span className="p-gem" aria-hidden="true">✦</span> Ways to work with Jody</h2>
          <ul className="pillars-row">
            <li><a href="/hypnosis"><i>01</i><b>Hypnosis</b><span>Sessions from $250</span></a></li>
            <li><a href="/life-coaching"><i>02</i><b>Life coaching</b><span>Monthly mentoring</span></a></li>
            <li><a href="/equestrian"><i>03</i><b>Equestrian mindset</b><span>Coaching for riders</span></a></li>
            <li><a href="/live-sexy-now"><i>04</i><b>Live Sexy Now</b><span>The book · coming soon</span></a></li>
            <li><a href="/listen"><i>05</i><b>Free audio &amp; podcast</b><span>Listen free</span></a></li>
          </ul>
        </div>
      </section>

      <section id="story" className="story chapter paper" aria-labelledby="story-heading" data-chapter="Meet Jody">
        <div className="section-shell"><ChapterLabel number="I">Meet Jody</ChapterLabel>
          <div className="story-grid"><div className="story-copy"><h2 id="story-heading" data-reveal>Hi, I’m Jody.<br /><span className="gold-text">I help you begin again.</span></h2><div className="story-body" data-reveal><p>Master hypnotherapist, master life coach and NLP practitioner. I help people let go of the habits, worries and old stories holding them back.</p></div><a className="gold-button" href="#booking" data-interest="Hypnotherapy" data-reveal>Talk to Jody <Arrow /></a></div><div className="story-image"><span className="story-frame" aria-hidden="true" /><div className="story-photo">{siteConfig.meetJodyPhoto ? <img src={siteConfig.meetJodyPhoto} srcSet={`${siteConfig.meetJodyPhoto.replace(".webp","-480.webp")} 480w, ${siteConfig.meetJodyPhoto.replace(".webp","-768.webp")} 768w, ${siteConfig.meetJodyPhoto} 1020w`} sizes="(max-width: 900px) 92vw, 40vw" alt="Jody Pockran with her chestnut horse" loading="lazy" /> : <Photo name="hands-on-horse" alt="Illustrative image: a rider’s hands resting on a horse" />}</div></div></div>
          {siteConfig.trustLogos.length > 0 && <div className="trust-logos" aria-label="Professional affiliations">{siteConfig.trustLogos.map(logo=><img key={logo.name} src={logo.image} alt={logo.name} loading="lazy" />)}</div>}
        </div>
      </section>

      <section id="book" className="book chapter ink" aria-labelledby="book-heading" data-chapter="The book"><div className="book-stage section-shell"><ChapterLabel number="II">The book · Live Sexy Now</ChapterLabel><div className="book-grid"><div className="book-copy"><span className="status-tag"><i /> Coming soon</span><h2 id="book-heading">Live<br /><span className="gold-text">Sexy</span><br />Now.</h2><p className="book-subtitle">A manifesto for bold living: your guide to reclaim your life on your terms.</p><div id="book-list" className="book-signup"><LeadForm kind="book" interest="Book updates" source="book" compact buttonLabel="Tell me when it’s out" /><a className="p-more" href="/live-sexy-now">About the book</a></div></div><div className="book-scene" aria-label="Live Sexy Now — concept presentation of Jody’s forthcoming book"><div className="book-orbit" aria-hidden="true" /><div className="book-object" aria-hidden="true"><div className="book-back" /><div className="book-pages" /><div className="book-spine"><span>LIVE SEXY NOW</span><span>JODY POCKRAN</span></div><div className="book-front">{siteConfig.bookCoverUrl ? <img className="approved-book-cover" src={siteConfig.bookCoverUrl} alt="Live Sexy Now by Jody Pockran: the book cover" /> : <div className="book-cover-border"><span className="book-author">JODY POCKRAN</span><span className="book-cover-title">LIVE<br /><em>SEXY</em><br />NOW<span className="book-cover-dot">.</span></span><svg className="book-bloom" viewBox="0 0 180 100" fill="none"><path d="M90 94C88 70 55 20 18 13C18 48 45 83 90 94ZM90 94C92 70 125 20 162 13C162 48 135 83 90 94ZM90 94C55 55 65 20 90 3C115 20 125 55 90 94Z" stroke="currentColor" strokeWidth=".8"/><path d="M12 93H168M90 94V40" stroke="currentColor" strokeWidth=".6"/></svg><span className="book-cover-foot">CONFIDENCE. REINVENTION. YOU.</span></div>}</div></div>{!siteConfig.bookCoverUrl && <p className="book-concept-note">Concept presentation · Final cover to come</p>}</div></div></div></section>

      <section className="statement-band" aria-label="You know the story by heart. It doesn’t have to end this way.">
        <div className="section-shell">
          <p className="statement-small" data-reveal>You know the story by heart.</p>
          <p className="statement-big" data-reveal>It doesn’t have to <em>end this way.</em></p>
        </div>
      </section>

      <section id="work" className="work chapter ink" aria-labelledby="work-heading" data-chapter="Hypnosis">
        <div className="section-shell"><ChapterLabel number="III">Hypnosis with Jody</ChapterLabel>
          <div className="hyp">
            <div className="hyp-intro" data-reveal>
              <h2 id="work-heading">Let go of what’s <span className="gold-text">holding you back.</span></h2>
              <div className="hyp-side">
                <p className="hyp-lead">One deep session, a recording made just for you, and 21 nights of listening at bedtime.</p>
                <div className="hyp-buy"><div className="hyp-price"><strong>$250</strong><span>AUD a session<br />Nothing to pay upfront</span></div><a className="gold-button" href={siteConfig.bookingUrl || "#booking"} data-interest="Hypnotherapy">Book hypnosis <Arrow /></a><a className="p-more" href="/hypnosis">Explore hypnosis</a></div>
              </div>
            </div>
            <ul className="hyp-cards" aria-label="What people come to Jody for">
              <li><a className="hyp-card" href="#booking" data-interest="Hypnotherapy"><i>01</i><b>Overwhelm</b><span>For when everything feels like too much.</span><em className="hyp-more">When life piles up, we find where the pressure really starts.</em><u>Talk to Jody about this <Arrow /></u></a></li>
              <li><a className="hyp-card" href="#booking" data-interest="Hypnotherapy"><i>02</i><b>Anxiety</b><span>For the worry that keeps coming back.</span><em className="hyp-more">We work with the patterns behind the worry, gently and at your pace.</em><u>Talk to Jody about this <Arrow /></u></a></li>
              <li><a className="hyp-card" href="#booking" data-interest="Hypnotherapy"><i>03</i><b>Depression</b><span>For the heavy days that won’t lift.</span><em className="hyp-more">A calm space to explore what’s weighing on you, alongside your other care.</em><u>Talk to Jody about this <Arrow /></u></a></li>
              <li><a className="hyp-card" href="#booking" data-interest="Hypnotherapy"><i>04</i><b>Phobias</b><span>For fears that make life feel smaller.</span><em className="hyp-more">Spiders, flying, needles or crowds: fears that stop you living fully.</em><u>Talk to Jody about this <Arrow /></u></a></li>
              <li><a className="hyp-card" href="#booking" data-interest="Hypnotherapy"><i>05</i><b>Childhood trauma</b><span>For the past that still shows up today.</span><em className="hyp-more">Careful, respectful work with experiences that still shape you.</em><u>Talk to Jody about this <Arrow /></u></a></li>
              <li><a className="hyp-card" href="#booking" data-interest="Hypnotherapy"><i>06</i><b>Money blocks</b><span>For the old stories you tell about money.</span><em className="hyp-more">For the beliefs about money that hold your work and life back.</em><u>Talk to Jody about this <Arrow /></u></a></li>
            </ul>
            <details className="more"><summary>More details</summary><p>Each session starts with a 90-minute whole-life analysis. Hypnosis follows, with a personal recording made on your phone to listen to at bedtime for 21 nights. Specialist sessions: quit smoking (priced separately), quit vaping and mental gastric bypass. Monthly life coaching is also available. <a href="/hypnosis">See everything about hypnosis</a>.</p></details>
          </div>
        </div>
      </section>

      <section id="equestrian" className="equestrian chapter" aria-labelledby="equestrian-heading" data-chapter="Equestrian mindset"><div className="equestrian-stage"><div className="equestrian-image"><Photo name="horse-tree-light" alt="Illustrative landscape of a horse grazing beneath trees in golden light" wide /><div className="equestrian-shade" /></div><div className="equestrian-content section-shell"><ChapterLabel number="IV">Equestrian mindset coaching</ChapterLabel><div className="equestrian-copy"><h2 id="equestrian-heading">Ride with<br /><span>confidence.</span></h2><div className="equestrian-description"><p>Mindset coaching for riders and competitors: calm nerves, sharper focus.</p><a className="gold-button" href="#booking" data-interest="Equestrian mindset">Ask about rider coaching <Arrow /></a><a className="p-more" href="/equestrian">More about rider coaching</a></div></div><figure className="equestrian-portrait" data-reveal>{siteConfig.jodyWithHorse ? <img src={siteConfig.jodyWithHorse} srcSet={`${siteConfig.jodyWithHorse.replace(".webp","-480.webp")} 480w, ${siteConfig.jodyWithHorse.replace(".webp","-768.webp")} 768w, ${siteConfig.jodyWithHorse} 1010w`} sizes="(max-width: 900px) 80vw, 28vw" alt="Jody Pockran with her black horse" loading="lazy" /> : <Photo name="black-horse" alt="Illustrative image: a black horse in low light" />}<figcaption>{siteConfig.jodyWithHorse ? "Jody and her horse · Photo: Angelica Peady Photo and Film" : "Jody and her horse, photo to come"}</figcaption></figure></div></div></section>
      <Gallop />

      <section id="beyond" className="beyond chapter paper" aria-labelledby="beyond-heading" data-chapter="Listen"><div className="section-shell"><ChapterLabel number="V">Free audio &amp; podcast</ChapterLabel><div id="audio" className="audio-section"><div className="audio-heading" data-reveal><h2 id="beyond-heading">Listen free,<br /><span className="gold-text">feel lighter.</span></h2><p>Four free hypnosis audios: sleep, anxiety, low mood and money. Pick one and we’ll send it when it’s ready.</p><a className="p-more" href="/listen">Explore audio &amp; podcast</a><details className="more"><summary>The podcast &amp; speaking</summary><p>The <em>Live Sexy Now</em> podcast, one episode per chapter of the book with guests, is in production at Daniel’s studio. Jody also speaks on confidence, mindset and the equestrian world. <a href="#contact" data-interest="Speaking and commentating">Invite Jody</a>.</p></details></div><AudioSignup source="audio" /></div></div></section>

      {siteConfig.testimonials.length > 0 && <section className="testimonials-section paper"><div className="section-shell"><p className="eyebrow">In their words</p><h2>Personal experiences.</h2><div className="testimonial-grid">{siteConfig.testimonials.map(t=><figure key={t.name}><blockquote>{t.quote}</blockquote><figcaption>{t.name}{t.context && <span>{t.context}</span>}</figcaption></figure>)}</div></div></section>}
      {siteConfig.reels.length > 0 && <section className="social-section paper"><div className="section-shell"><p className="eyebrow">From Jody’s Instagram</p><div className="reels-grid">{siteConfig.reels.map(r=><a key={r.url} href={r.url} target="_blank" rel="noreferrer"><img src={r.thumbnail} alt="" loading="lazy" /><span>{r.title} <Arrow /></span></a>)}</div></div></section>}

      <Reviews limit={3} title="Kind words." />

      <section id="contact" className="contact chapter wine" aria-labelledby="contact-heading" data-chapter="Your next chapter"><div className="section-shell"><ChapterLabel number="VI">Book a session</ChapterLabel><div id="booking" className="contact-grid"><div className="contact-copy" data-reveal><h2 id="contact-heading">Let’s talk<br /><span className="gold-text">about you.</span></h2>{siteConfig.bookingUrl && <p>Choose a time in Jody’s calendar, or send a question below.</p>}{siteConfig.bookingUrl && <a className="gold-button calendar-link" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Choose a time <Arrow /></a>}<div className="booking-terms"><span>No upfront payment.</span><p>Cancellations within 24 hours incur half the fee.</p></div></div><ContactForm /></div><div className="faq-section"><div><h3>A few things<br />you might wonder.</h3></div><div className="faq-list"><details><summary>How does a hypnosis appointment work?<span aria-hidden="true">+</span></summary><p>Your appointment begins with a 90-minute whole-life analysis. Hypnosis follows, with a personal recording made on your phone. Jody asks you to listen at bedtime for at least 21 nights. The analysis is one part of the appointment; total appointment time is confirmed with Jody.</p></details><details><summary>What does it cost?<span aria-hidden="true">+</span></summary><p>A standard hypnosis session is $250 AUD. Quit smoking costs more. Enquire about pricing for quit vaping, mental gastric bypass, monthly life coaching, equestrian mindset, speaking and commentating.</p></details><details><summary>Is a request a confirmed booking?<span aria-hidden="true">+</span></summary><p>Submitting this form sends a session request. Jody will confirm the appointment with you. Nothing is payable upfront; cancellations within 24 hours incur half the session fee.</p></details><details><summary>Are the book, podcast and audios available?<span aria-hidden="true">+</span></summary><p>Live Sexy Now is coming soon, the podcast is in production and the free audios are being recorded. Join the book or audio list to register your interest.</p></details></div></div><p className="care-note">Hypnotherapy and coaching can sit alongside medical or psychological care. They do not replace it, and individual experiences differ. Please keep personal medical details for your appointment.</p></div></section>
    </main>
    <section className="takeaway" aria-label="You are allowed to begin again, as many times as you need.">
      <div className="takeaway-stage">
        <div className="takeaway-sky" aria-hidden="true" />
        <div className="takeaway-sun" aria-hidden="true"><span /></div>
        <div className="takeaway-hills" aria-hidden="true" />
        <div className="takeaway-words section-shell">
          <p className="takeaway-line">You are allowed to <b>begin again,</b></p>
          <p className="takeaway-turn">as many times as you need.</p>
          <p className="takeaway-sub">Your best chapter is still being written.</p>
          <a className="gold-button takeaway-cta" href="#booking" data-interest="Hypnotherapy">Start your next chapter <Arrow /></a>
        </div>
      </div>
    </section>
    <SiteFooter />
    <BookIntro />
    <StoryMotion />
    <LeadExperience />
  </div>;
}
