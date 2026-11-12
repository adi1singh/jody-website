import { PillarPage, Reviews } from "../pillar";
import BookingFlow from "./booking-flow";

export const metadata = {
  title: "Book a session · Jody Pockran",
  description: "Request a hypnosis, life coaching or equestrian mindset session with Jody Pockran. No upfront payment.",
};

export default function BookASession() {
  return <PillarPage>
    <section className="p-section bk-page" aria-labelledby="bk-title">
      <div className="section-shell">
        <div className="p-section-head">
          <p className="p-eyebrow"><span className="p-gem" aria-hidden="true">✦</span>Book a session</p>
          <h1 id="bk-title">Let’s find <em>your time.</em></h1>
          <p className="p-intro">Choose a session, tell Jody when suits you, and she’ll confirm your appointment personally.</p>
        </div>
        <BookingFlow />
      </div>
    </section>
    <Reviews title="Kind words." limit={3} />
  </PillarPage>;
}
