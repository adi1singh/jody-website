"use client";
import { useEffect, useRef, useState } from "react";
const chapters = [
  { id: "cover", number: "00", name: "The cover", note: "Jody Pockran" },
  { id: "story", number: "01", name: "A life, still unfolding", note: "Meet Jody" },
  { id: "work", number: "02", name: "A different way forward", note: "Her work" },
  { id: "equestrian", number: "03", name: "Find your stride", note: "Equestrian mindset" },
  { id: "book", number: "04", name: "Live Sexy Now", note: "The forthcoming book" },
  { id: "beyond", number: "05", name: "Beyond the page", note: "Conversations & ideas" },
  { id: "contact", number: "06", name: "Your next chapter", note: "Begin a conversation" },
];
export default function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState("cover");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => { let next = "cover"; for (const chapter of chapters) { const element = document.getElementById(chapter.id); if (element && element.getBoundingClientRect().top <= window.innerHeight * .4) next = chapter.id; } setActive(next); setScrolled(window.scrollY > 40); frame = 0; };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, {passive:true}); update();
    return () => {window.removeEventListener("scroll", onScroll);cancelAnimationFrame(frame);};
  }, []);
  const open = () => { dialog.current?.showModal(); document.body.style.overflow = "hidden"; };
  const close = () => { dialog.current?.close(); document.body.style.overflow = ""; };
  return <>
    <div className="reading-progress" aria-hidden="true" />
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}><a className="wordmark" href="#cover" aria-label="Jody Pockran — back to the cover">Jody Pockran<span>A LIFE IN CHAPTERS</span></a><div className="header-right"><a className="header-contact" href="#contact">Let’s talk <svg aria-hidden="true" className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.2" /></svg></a><button className="contents-button" onClick={open} aria-haspopup="dialog" aria-controls="contents-dialog"><span>Contents</span><span className="menu-lines" aria-hidden="true"><i /><i /></span></button></div></header>
    <nav className="chapter-rail" aria-label="Chapters">{chapters.map(c=><a key={c.id} href={`#${c.id}`} aria-label={`${c.number}: ${c.name}`} aria-current={active===c.id ? "location" : undefined} className={active===c.id ? "active" : ""}><span className="rail-dot" /><span className="rail-number">{c.number}</span><span className="rail-tooltip">{c.name}</span></a>)}</nav>
    <dialog id="contents-dialog" className="contents-dialog" ref={dialog} onCancel={close} onClose={()=>{document.body.style.overflow="";}} aria-labelledby="contents-title"><div className="contents-top"><a className="wordmark" href="#cover" onClick={close}>Jody Pockran<span>A LIFE IN CHAPTERS</span></a><button className="close-menu" onClick={close} autoFocus>Close <span aria-hidden="true">×</span></button></div><div className="contents-body"><div className="contents-intro"><p className="eyebrow">An invitation to explore</p><h2 id="contents-title">Every chapter.<br /><em>A possibility.</em></h2><p>Read from the beginning,<br />or follow your curiosity.</p><span className="contents-flower" aria-hidden="true">✧</span></div><nav aria-label="Table of contents">{chapters.map(c=><a href={`#${c.id}`} key={c.id} onClick={close}><span className="contents-number">{c.number}</span><span className="contents-name">{c.name}<small>{c.note}</small></span><svg aria-hidden="true" className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.2" /></svg></a>)}</nav></div><div className="contents-bottom">CHANGE THE STORY. CHANGE YOUR LIFE.</div></dialog>
  </>;
}
