"use client";

import { useEffect, useId, useRef, useState } from "react";
import LeadForm from "./lead-form";
import type { LeadInterest } from "../lib/lead-contract";

const popupSessionKey = "jody-newsletter-seen";
const greetingSessionKey = "jody-guide-greeting";
const audioTopics: { label: string; interest: LeadInterest; description: string }[] = [
  { label: "Sleep", interest: "Sleep audio", description: "A recording for your evening routine." },
  { label: "Anxiety", interest: "Anxiety audio", description: "A little space to pause." },
  { label: "Depression", interest: "Depression audio", description: "A gentle listening moment." },
  { label: "Money rewiring", interest: "Money rewiring audio", description: "Explore your money mindset." },
];

function sessionHas(key: string) {
  try { return sessionStorage.getItem(key) === "1"; } catch { return false; }
}
function remember(key: string) {
  try { sessionStorage.setItem(key, "1"); } catch { /* The current mount still remembers. */ }
}
function interactingWithForm() {
  return Boolean(document.querySelector('form[aria-busy="true"]'))
    || (document.activeElement instanceof Element && Boolean(document.activeElement.closest("form, input, textarea, select, [contenteditable=true]")));
}
function anotherSurfaceIsOpen() {
  return Boolean(document.querySelector('dialog[open], [role="dialog"][aria-modal="true"], [data-website-guide][data-open="true"]'));
}
function CloseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.4" /></svg>;
}
function ChatIcon() {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h14v11H9l-4 3V5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "left" | "right" }) {
  const path = direction === "left" ? "M20 12H4M11 5l-7 7 7 7"
    : direction === "right" ? "M4 12h16M13 5l7 7-7 7" : "M5 19 19 5M5 5h14v14";
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d={path} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function AudioSignup({ source = "website-audio" }: { source?: string }) {
  const id = useId().replaceAll(":", "");
  const [selected, setSelected] = useState<LeadInterest>("Sleep audio");
  const topic = audioTopics.find((item) => item.interest === selected) ?? audioTopics[0];
  return <div className="lead-audio-signup">
    <fieldset className="lead-audio-topics"><legend>Choose the recording you’d like updates on</legend><div>
      {audioTopics.map((item, index) => <label className={`lead-audio-topic${selected === item.interest ? " is-selected" : ""}`} key={item.interest}>
        <input type="radio" name={`audio-topic-${id}`} value={item.interest} checked={selected === item.interest} onChange={() => setSelected(item.interest)} />
        <span className="lead-audio-number" aria-hidden="true">0{index + 1}</span><span><strong>{item.label}</strong><small>{item.description}</small></span><span className="lead-audio-choice" aria-hidden="true" />
      </label>)}
    </div></fieldset>
    <div className="lead-audio-notice"><span aria-hidden="true" /><p><strong>Being recorded</strong>Notify me when it’s ready.</p></div>
    <LeadForm key={selected} kind="audio" interest={selected} source={source} compact title={`${topic.label} audio updates.`} buttonLabel="Notify me when it’s ready" />
  </div>;
}

type GuideView = "home" | "services" | "book" | "audio" | "booking" | "enquiry";
const guideResponses: Record<Exclude<GuideView, "home" | "enquiry">, { title: string; copy: string; href: string; action: string }> = {
  services: { title: "A way forward, shaped around you.", copy: "Explore hypnotherapy, life coaching and equestrian mindset coaching. You’ll find the approach, fees and what to expect in the services chapter.", href: "#work", action: "Explore the services" },
  book: { title: "The next chapter, in print.", copy: "Live Sexy Now is Jody’s forthcoming book. The publication date is still to be announced. You can join the book list for updates.", href: "#book", action: "See the book and join the list" },
  audio: { title: "A moment to listen.", copy: "The Sleep, Anxiety, Depression and Money rewiring audios are being recorded. Choose a topic and request an update when it’s ready.", href: "#audio", action: "Choose an audio" },
  booking: { title: "Start with a session request.", copy: "Let Jody know what you’re interested in and the times that work for you. A request is not a confirmed appointment; a time needs to be agreed with Jody.", href: "#booking", action: "Request a session" },
};

export default function LeadExperience() {
  const [chatOpen, setChatOpen] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [view, setView] = useState<GuideView>("home");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const responseRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const popupFocusRef = useRef<HTMLElement | null>(null);
  const popupShownRef = useRef(false);

  const closeGuide = (restoreFocus = true) => {
    setChatOpen(false);
    if (restoreFocus) launcherRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!chatOpen) return;
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) {
        event.preventDefault(); setChatOpen(false); launcherRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [chatOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    if (view !== "home" && chatOpen) responseRef.current?.focus({ preventScroll: true });
  }, [view, chatOpen]);

  useEffect(() => {
    const greetingTimer = window.setTimeout(() => {
      if (!sessionHas(greetingSessionKey) && !interactingWithForm() && !anotherSurfaceIsOpen()) {
        remember(greetingSessionKey); setGreetingVisible(true);
      }
    }, 6000);
    return () => window.clearTimeout(greetingTimer);
  }, []);

  useEffect(() => {
    const events = new AbortController();
    let elapsed = false;
    let frame = 0;
    const considerPopup = () => {
      if (popupShownRef.current || sessionHas(popupSessionKey) || !elapsed || document.hidden) return;
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      if (travel <= 0 || window.scrollY / travel <= 0.35 || interactingWithForm() || anotherSurfaceIsOpen()) return;
      const dialog = dialogRef.current;
      if (!dialog || typeof dialog.showModal !== "function") return;
      popupFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      popupShownRef.current = true;
      remember(popupSessionKey);
      setGreetingVisible(false);
    };
    const checkScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; considerPopup(); });
    };
    const timeGate = window.setTimeout(() => { elapsed = true; considerPopup(); }, 30000);
    const retryWhenFree = window.setInterval(considerPopup, 5000);
    const leadSaved = () => {
      popupShownRef.current = true; remember(popupSessionKey); remember(greetingSessionKey); setGreetingVisible(false);
    };
    window.addEventListener("scroll", checkScroll, { passive: true, signal: events.signal });
    window.addEventListener("jody:lead-saved", leadSaved, { signal: events.signal });
    return () => {
      events.abort(); cancelAnimationFrame(frame); window.clearTimeout(timeGate); window.clearInterval(retryWhenFree);
    };
  }, []);

  const openGuide = () => {
    setGreetingVisible(false); remember(greetingSessionKey); setChatOpen(true);
  };
  const goTo = () => closeGuide(false);

  return <>
    <div className="lead-guide-widget" data-website-guide data-open={chatOpen ? "true" : "false"}>
      {greetingVisible && !chatOpen && <div className="lead-guide-greeting"><button type="button" className="lead-greeting-message" onClick={openGuide}>Need a hand finding<br />your next chapter?<span aria-hidden="true"><ArrowIcon /></span></button><button className="lead-greeting-dismiss" type="button" aria-label="Dismiss greeting" onClick={() => setGreetingVisible(false)}><CloseIcon /></button></div>}
      {chatOpen && <section className="lead-guide-panel" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="website-guide-title" id="website-guide-panel">
        <header className="lead-guide-header"><span className="lead-guide-monogram" aria-hidden="true">J</span><div><h2 id="website-guide-title">Website guide</h2><p>A simple guide to Jody’s website</p></div><button type="button" className="lead-icon-button" aria-label="Close website guide" onClick={() => closeGuide()}><CloseIcon /></button></header>
        <div className="lead-guide-scroll" data-lenis-prevent ref={scrollRef}>
          {view !== "home" && <button type="button" className="lead-guide-back" onClick={() => setView("home")}><span aria-hidden="true"><ArrowIcon direction="left" /></span> Back to the choices</button>}
          {view === "home" ? <>
            <p className="lead-guide-welcome">Where would you<br />like to begin?</p><p className="lead-guide-intro">I can point you to a service, something new, or a way to get in touch.</p>
            <div className="lead-guide-choices">{([
              ["services", "Explore the services", "Hypnotherapy, coaching and mindset"],
              ["book", "Live Sexy Now", "The forthcoming book"],
              ["audio", "Free audios", "Get notified when they’re ready"],
              ["booking", "Request a session", "Find a time with Jody"],
              ["enquiry", "Leave an enquiry", "A note and your contact details"],
            ] as const).map(([key, label, detail]) => <button type="button" key={key} onClick={() => setView(key)}><span>{label}<small>{detail}</small></span><span aria-hidden="true"><ArrowIcon /></span></button>)}</div>
          </> : view === "enquiry" ? <><h3 className="lead-sr-only" tabIndex={-1} ref={responseRef}>Leave an enquiry</h3><LeadForm kind="chat" interest="General enquiry" source="website-guide" compact title="A note to Jody." buttonLabel="Send enquiry" /></> : <div className="lead-guide-answer" aria-live="polite"><span className="lead-kicker">A little direction</span><h3 ref={responseRef} tabIndex={-1}>{guideResponses[view].title}</h3><p>{guideResponses[view].copy}</p><a className="lead-guide-link" href={guideResponses[view].href} onClick={goTo}>{guideResponses[view].action}<span aria-hidden="true"><ArrowIcon /></span></a><button className="lead-text-button" type="button" onClick={() => setView("enquiry")}>Or leave an enquiry<span aria-hidden="true"><ArrowIcon direction="right" /></span></button></div>}
          <p className="lead-guide-footnote">This guide helps you navigate the website. For personal questions, <a href="#contact" onClick={goTo}>contact Jody</a>.</p>
        </div>
      </section>}
      <button className="lead-guide-launcher" ref={launcherRef} type="button" aria-label={chatOpen ? "Close website guide" : "Open website guide"} aria-expanded={chatOpen} aria-controls="website-guide-panel" aria-haspopup="dialog" onClick={() => chatOpen ? closeGuide() : openGuide()}>{chatOpen ? <CloseIcon /> : <ChatIcon />}<span>{chatOpen ? "Close" : "Guide"}</span></button>
    </div>

    <dialog className="lead-newsletter-dialog" data-lenis-prevent ref={dialogRef} aria-labelledby="newsletter-popup-title" aria-describedby="newsletter-popup-copy"
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}
      onClose={() => { if (popupFocusRef.current?.isConnected) popupFocusRef.current.focus({ preventScroll: true }); }}>
      <div className="lead-newsletter-card"><button className="lead-icon-button lead-popup-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close newsletter signup" autoFocus><CloseIcon /></button><span className="lead-kicker">Letters from Jody</span><h2 id="newsletter-popup-title">One more<br /><em>chapter.</em></h2><p id="newsletter-popup-copy">News, new ideas and what’s coming next. An occasional note, when there’s something to share.</p><LeadForm kind="newsletter" interest="Newsletter" source="engagement-popup" compact title="Stay in the loop." buttonLabel="Join the newsletter" /></div>
    </dialog>
  </>;
}
