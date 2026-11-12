"use client";

import { useEffect, useRef } from "react";

/**
 * Between Chapter IV and Chapter V a horse and rider gallop across the screen.
 * The gallop is Eadweard Muybridge's "The Horse in Motion" (1878, public
 * domain), cut out as a silhouette: public/images/gallop.webp holds its 15
 * frames side by side and CSS steps through them while the horse crosses.
 * It runs each time the band scrolls into view. With reduced motion (or
 * before JavaScript) the horse stands still mid-stride.
 */
export default function Gallop() {
  const band = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("can-run");
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.classList.remove("is-running");
      void el.offsetWidth; // restart the animation
      el.classList.add("is-running");
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={band} className="gallop" aria-hidden="true">
    <p className="gallop-line">Find your stride.</p>
    <div className="gallop-ground" />
    <div className="gallop-runner"><i className="gallop-shadow" /><i className="gallop-horse" /><i className="gallop-dust" /></div>
  </div>;
}
