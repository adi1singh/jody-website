"use client";

import { useEffect, useRef } from "react";

/**
 * Opening scene: a closed leather-and-gold book titled "Jody Pockran,
 * Hypnotherapy & Coaching". The cover swings open onto its first page and
 * the book dissolves into the hero.
 *
 * - Plays once per visit, only on the home page, only with motion allowed.
 *   The decision is made before first paint by INTRO_SCRIPT (intro-script.ts),
 *   which sets <html data-intro="play">; CSS shows the overlay only then.
 * - Without JavaScript, or with reduced motion, nothing is shown.
 * - Any click, key or scroll skips straight to the page.
 */

export default function BookIntro() {
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = overlay.current;
    if (!el || html.dataset.intro !== "play") return;

    let finished = false;
    let timeline: { kill: () => void; progress: (n: number) => void } | undefined;
    const finish = () => {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem("jp-intro", "1"); } catch { /* private mode */ }
      html.dataset.intro = "done";
      window.dispatchEvent(new Event("jody:layout"));
    };
    const skip = () => { timeline?.progress(1); finish(); };
    const opts = { once: true, passive: true } as const;
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchstart", skip, opts);
    window.addEventListener("keydown", skip, { once: true });
    el.addEventListener("click", skip, { once: true });

    let cancelled = false;
    void import("gsap").then(({ gsap }) => {
      if (cancelled || finished) return;
      const book = el.querySelector<HTMLElement>(".intro-book");
      const cover = el.querySelector<HTMLElement>(".intro-cover");
      const page = el.querySelector<HTMLElement>(".intro-page");
      const glow = el.querySelector<HTMLElement>(".intro-glow");
      if (!book || !cover || !page) { finish(); return; }

      const tl = gsap.timeline({ onComplete: finish });
      const sweep = el.querySelector<HTMLElement>(".intro-sweep");
      const shadow = el.querySelector<HTMLElement>(".intro-shadow");
      tl.from(glow, { opacity: 0, duration: 1.2, ease: "power1.out" }, 0)
        .from(shadow, { opacity: 0, scale: 0.6, duration: 1.1, ease: "power3.out" }, 0)
        // It arrives turned slightly, showing its spine, then faces you
        .from(book, { y: 50, rotateY: 28, rotateX: 12, opacity: 0, duration: 1.3, ease: "power3.out" }, 0)
        .fromTo(sweep, { xPercent: -130 }, { xPercent: 130, duration: 1.1, ease: "power1.inOut" }, 0.55)
        .to({}, { duration: 0.25 })
        // The cover swings open on its spine onto the first page…
        .to(cover, { rotateY: -165, duration: 1.4, ease: "power2.inOut" }, "open")
        .to(page, { opacity: 1, duration: 0.7, ease: "power1.out" }, "open+=0.3")
        // …then the book dissolves into the page behind it.
        .to(book, { scale: 1.6, opacity: 0, duration: 1, ease: "power2.in" }, "open+=1.15")
        .to(shadow, { opacity: 0, duration: 0.6 }, "open+=1.1")
        .to(glow, { opacity: 0, duration: 0.8 }, "open+=1.2")
        .to(el, { backgroundColor: "rgba(12,11,10,0)", duration: 0.9, ease: "power1.out" }, "open+=1.25");
      timeline = tl;
    }).catch(finish);

    return () => {
      cancelled = true;
      timeline?.kill();
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return <div ref={overlay} className="book-intro" aria-hidden="true">
    <div className="intro-glow" />
    <div className="intro-shadow" />
    <div className="intro-book">
      <div className="intro-spine"><span>Jody Pockran</span></div>
      <div className="intro-pages-edge" />
      <div className="intro-page">
        <span>Chapter one</span>
        <em>Change the story.</em>
      </div>
      <div className="intro-cover">
        <div className="intro-cover-front">
          <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
          <span className="intro-author">Jody Pockran</span>
          <span className="intro-rule" />
          <span className="intro-sub">Hypnotherapy &amp; Coaching</span>
          <span className="intro-flourish">✧</span>
          <i className="intro-sweep" />
        </div>
        <div className="intro-cover-back" />
      </div>
    </div>
  </div>;
}
