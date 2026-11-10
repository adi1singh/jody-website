"use client";

import { useEffect, useRef } from "react";

/**
 * Opening scene: a closed book titled "Jody Pockran, Hypnotherapy & Coaching".
 * The cover swings open onto its first page (the hero), the title glides up
 * into the header wordmark, and the book dissolves into the background.
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
      const title = el.querySelector<HTMLElement>(".intro-title");
      const page = el.querySelector<HTMLElement>(".intro-page");
      const target = document.querySelector<HTMLElement>("[data-wordmark]");
      if (!book || !cover || !title || !page) { finish(); return; }

      // Where the title must land: the header wordmark (FLIP).
      const from = title.getBoundingClientRect();
      const to = target?.getBoundingClientRect();
      const dx = to ? to.left - from.left : 0;
      const dy = to ? to.top - from.top : -from.top;
      const scale = to ? Math.max(0.2, to.width / from.width) : 0.4;

      const tl = gsap.timeline({ onComplete: finish });
      tl.from(book, { scale: 0.9, y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
        .to({}, { duration: 0.35 })
        // The cover swings open on its spine…
        .to(cover, { rotateY: -168, duration: 1.15, ease: "power2.inOut" }, "open")
        .to(page, { opacity: 1, duration: 0.6, ease: "power1.out" }, "open+=0.25")
        // …while the title lifts off the cover into the header.
        .to(title, { x: dx, y: dy, scale, transformOrigin: "left top", duration: 1.15, ease: "power3.inOut" }, "open+=0.1")
        // The first page becomes the page: the book grows and dissolves.
        .to(book, { scale: 2.4, opacity: 0, duration: 0.9, ease: "power2.in" }, "open+=0.85")
        .to(el, { backgroundColor: "rgba(17,17,15,0)", duration: 0.8, ease: "power1.out" }, "open+=0.95")
        .to(title, { opacity: 0, duration: 0.25 }, ">-0.1");
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
    <div className="intro-book">
      <div className="intro-page">
        <span>Chapter one</span>
        <em>Change the story.</em>
      </div>
      <div className="intro-cover">
        <div className="intro-cover-front">
          <span className="intro-rule" />
          <span className="intro-flourish">✧</span>
          <span className="intro-rule" />
        </div>
        <div className="intro-cover-back" />
      </div>
    </div>
    <p className="intro-title">Jody Pockran<span>Hypnotherapy &amp; Coaching</span></p>
  </div>;
}
