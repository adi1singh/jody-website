import Navigation from "../navigation";
import StoryMotion from "../motion";
import LeadExperience from "../lead-experience";
import SiteFooter from "../site-footer";

function Arrow() {
  return <svg aria-hidden="true" className="arrow" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.2" /></svg>;
}

export const metadata = {
  title: "Hypnosis sessions · Jody Pockran",
  description: "How a hypnosis session with Jody Pockran works, and her specialist sessions for quitting smoking, quitting vaping and mental gastric bypass.",
};

/** Session details moved off the home page so the story stays light. */
export default function Sessions() {
  return <div data-story-root>
    <a className="skip-link" href="#main">Skip to the content</a>
    <Navigation />
    <main id="main">
      <section className="work chapter ink subpage" aria-labelledby="sessions-heading">
        <div className="section-shell">
          <a className="back-link" href="/#work">← Back to the story</a>
          <div className="section-heading" data-reveal><div><p className="eyebrow gold-text">Hypnosis with Jody</p><h1 id="sessions-heading" className="subpage-title">Your session,<br /><span className="gold-text">step by step.</span></h1></div><p>A standard hypnosis session is $250 AUD. Nothing is payable upfront; cancellations within 24 hours incur half the fee.</p></div>
          <div id="process" className="process-heading" data-reveal><p className="eyebrow">Your session, step by step</p><p>Understand.<br />Experience. Return.</p></div>
          <div className="process-grid"><div className="process-step"><span>01 / THE WHOLE PICTURE</span><h3>A 90-minute analysis.</h3><p>Begin with a whole-life analysis. Time to understand what brings you here.</p></div><div className="process-step"><span>02 / PERSONALISED HYPNOSIS</span><h3>A recording for you.</h3><p>Hypnosis follows the analysis, with a personal recording made on your phone.</p></div><div className="process-step"><span>03 / YOUR NIGHTLY PRACTICE</span><h3>21 nights.</h3><p>Return to your recording at bedtime for at least 21 nights.</p></div></div>
          <div id="specialist" className="specialist-heading" data-reveal><h3>Specialist sessions.</h3><p>Discuss suitability and pricing with Jody.</p></div>
          <div className="specialist-grid">
            <article id="quit-smoking" data-reveal><span>01 / HABITS</span><h3>Quit smoking.</h3><p>A dedicated hypnosis session. Priced above the standard session.</p><a className="text-link" href="/#booking" data-interest="Quit smoking">Ask about smoking <Arrow /></a></article>
            <article id="quit-vaping" data-reveal><span>02 / HABITS</span><h3>Quit vaping.</h3><p>Enquire about Jody’s hypnosis sessions for people wanting to stop vaping.</p><a className="text-link" href="/#booking" data-interest="Quit vaping">Ask about vaping <Arrow /></a></article>
            <article id="weight-support" data-reveal><span>03 / WEIGHT-RELATED HYPNOSIS</span><h3>Mental gastric bypass.</h3><p>A specialist hypnosis enquiry. Discuss the approach and suitability with Jody.</p><a className="text-link" href="/#booking" data-interest="Mental gastric bypass">Explore the session <Arrow /></a></article>
          </div>
          <div id="coaching" className="supporting-services">
            <article id="life-coaching" className="service-row" data-reveal><div><span className="eyebrow">Life coaching</span><h3>Mentoring.<br />With momentum.</h3></div><div><p>Ongoing mentoring, shared goals and monthly support. A practical space to work on your direction, separate from therapy.</p><a className="text-link" href="/#booking" data-interest="Life coaching">Explore monthly coaching <Arrow /></a></div></article>
          </div>
          <div className="subpage-cta" data-reveal><p>Ready to begin, or not sure which session fits?</p><a className="gold-button" href="/#booking" data-interest="Hypnotherapy">Request a session<Arrow /></a></div>
        </div>
      </section>
    </main>
    <SiteFooter />
    <StoryMotion />
    <LeadExperience />
  </div>;
}
