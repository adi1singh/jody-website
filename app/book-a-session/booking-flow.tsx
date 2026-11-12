"use client";

import { useEffect, useRef, useState } from "react";
import LeadForm, { resolveLeadInterest } from "../lead-form";
import type { LeadInterest } from "../../lib/lead-contract";
import { siteConfig } from "../../src/data/site-config";

const SESSIONS: { interest: LeadInterest; title: string; price: string; note: string }[] = [
  { interest: "Hypnotherapy", title: "Hypnosis session", price: "$250 AUD", note: "90-minute analysis, hypnosis and your own recording" },
  { interest: "Quit smoking", title: "Quit smoking", price: "Priced above standard", note: "A dedicated hypnosis session" },
  { interest: "Quit vaping", title: "Quit vaping", price: "Enquire", note: "Hypnosis to stop vaping" },
  { interest: "Mental gastric bypass", title: "Mental gastric bypass", price: "Enquire", note: "Weight-related hypnosis" },
  { interest: "Life coaching", title: "Life coaching", price: "Enquire", note: "Monthly mentoring and goals" },
  { interest: "Equestrian mindset", title: "Equestrian mindset", price: "Enquire", note: "Coaching for riders and competitors" },
  { interest: "General enquiry", title: "Not sure yet", price: "Free to ask", note: "Tell Jody what’s on your mind" },
];
const DAYS = ["Weekdays", "Weekends", "Any day"];
const TIMES = ["Mornings", "Afternoons", "Evenings"];

/** Choose a session, pick when suits you, then send the request. */
export default function BookingFlow() {
  const [interest, setInterest] = useState<LeadInterest>("Hypnotherapy");
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const formWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromUrl = resolveLeadInterest(new URLSearchParams(location.search).get("interest"));
    if (fromUrl) setInterest(fromUrl);
  }, []);

  const when = [days.join(" or "), times.join(" or ").toLowerCase()].filter(Boolean).join(", ");
  useEffect(() => {
    const input = formWrap.current?.querySelector<HTMLInputElement>('input[name="preferredTime"]');
    if (input && when) input.value = when;
  }, [when, interest]);

  const isSession = SESSIONS.some((s) => s.interest === interest);
  const chosen = SESSIONS.find((s) => s.interest === interest);
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return <div className="bk-grid">
    <div className="bk-steps">
      <fieldset className="bk-step">
        <legend><span className="bk-n">1</span>Choose your session</legend>
        <div className="bk-sessions">
          {SESSIONS.map((s) => <label key={s.interest} className={`bk-session${interest === s.interest ? " is-on" : ""}`}>
            <input type="radio" name="bk-session" value={s.interest} checked={interest === s.interest} onChange={() => setInterest(s.interest)} />
            <b>{s.title}</b><span className="bk-price">{s.price}</span><small>{s.note}</small>
          </label>)}
        </div>
      </fieldset>
      {isSession && <fieldset className="bk-step">
        <legend><span className="bk-n">2</span>When suits you?</legend>
        <div className="bk-chips" role="group" aria-label="Days">{DAYS.map((d) => <button type="button" key={d} aria-pressed={days.includes(d)} onClick={() => toggle(days, setDays, d)}>{d}</button>)}</div>
        <div className="bk-chips" role="group" aria-label="Times">{TIMES.map((t) => <button type="button" key={t} aria-pressed={times.includes(t)} onClick={() => toggle(times, setTimes, t)}>{t}</button>)}</div>
        {siteConfig.bookingUrl && <a className="gold-button" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Or choose a time in Jody’s calendar</a>}
      </fieldset>}
      <div className="bk-step bk-form" ref={formWrap}>
        <p className="bk-legend"><span className="bk-n">{isSession ? 3 : 2}</span>Your details</p>
        <LeadForm key={isSession ? "booking" : "enquiry"} kind={isSession ? "booking" : "enquiry"} interest={interest} source="book-a-session" title={isSession ? "Request your session." : "A note to Jody."} buttonLabel={isSession ? "Send session request" : "Send enquiry"} />
      </div>
    </div>
    <aside className="bk-summary" aria-label="Your request">
      <p className="p-eyebrow"><span className="p-gem" aria-hidden="true">✦</span>Your request</p>
      <h2>{chosen?.title ?? interest}</h2>
      {chosen && <p className="bk-sum-price">{chosen.price}</p>}
      {when && <p className="bk-sum-when">{when}</p>}
      <ul>
        <li>Jody replies personally to confirm a time.</li>
        <li>No upfront payment.</li>
        <li>Cancellations within 24 hours incur half the fee.</li>
      </ul>
      <a className="bk-mail" href="mailto:jannpockran@gmail.com">Prefer email? jannpockran@gmail.com</a>
    </aside>
  </div>;
}
