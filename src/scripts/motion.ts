// Site-wide behaviour, loaded once by Base.astro. Each part only runs when its
// elements are on the page, and every effect is a progressive enhancement:
// without JavaScript (or with reduced motion) the page is complete and still.

const still = matchMedia("(prefers-reduced-motion: reduce)");
const fine = matchMedia("(hover: hover) and (pointer: fine)");

/* ---------- Header: solid background once the page scrolls ---------- */
const header = document.querySelector<HTMLElement>("[data-header]");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Scroll reveal: elements arriving together cascade in ---------- */
const revealables = document.querySelectorAll<HTMLElement>(".reveal, .reveal-image, [data-reveal-group]");
if (revealables.length) {
  const io = new IntersectionObserver(
    (entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        el.style.setProperty("--stagger", String(Math.min(order++, 6)));
        el.classList.add("in", "is-visible");
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );
  revealables.forEach((el) => io.observe(el));
  // A fast scroll can jump clean past an element without it ever intersecting;
  // anything already above the screen is revealed so nothing stays hidden.
  let frame = 0;
  const catchUp = () => {
    frame = 0;
    revealables.forEach((el) => {
      if (!el.classList.contains("in") && el.getBoundingClientRect().bottom < 0) {
        io.unobserve(el);
        el.classList.add("in", "is-visible");
      }
    });
  };
  addEventListener("scroll", () => frame || (frame = requestAnimationFrame(catchUp)), { passive: true });
}

/* ---------- Count-up numbers ----------
   <span data-count="120" data-suffix="+">120+</span>
   Optional: data-prefix="$", data-from="2000" (start value, e.g. for a year),
   data-group="false" (no thousands separator). The final text is in the HTML,
   so it reads correctly without JavaScript. */
const counters = document.querySelectorAll<HTMLElement>("[data-count]");
if (counters.length && !still.matches) {
  const run = (el: HTMLElement) => {
    const to = Number(el.dataset.count);
    const from = Number(el.dataset.from ?? 0);
    const prefix = el.dataset.prefix ?? "";
    const suffix = el.dataset.suffix ?? "";
    const useGrouping = el.dataset.group !== "false";
    const decimals = (el.dataset.count!.split(".")[1] ?? "").length;
    const start = performance.now();
    const ms = 1400;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      const v = from + (to - from) * (1 - Math.pow(1 - k, 3));
      el.textContent = prefix + v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping }) + suffix;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        run(e.target as HTMLElement);
      }),
    { threshold: 0.6 },
  );
  counters.forEach((el) => io.observe(el));
}

/* ---------- Spotlight cards and magnetic buttons (mouse users) ---------- */
let pulled: HTMLElement | null = null;
const release = () => {
  pulled?.style.removeProperty("--mx");
  pulled?.style.removeProperty("--my");
  pulled = null;
};
document.addEventListener(
  "pointermove",
  (event) => {
    if (!fine.matches || !(event.target instanceof Element)) return;
    const card = event.target.closest<HTMLElement>(".spotlight");
    if (card) {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", event.clientX - box.left + "px");
      card.style.setProperty("--spot-y", event.clientY - box.top + "px");
    }
    if (still.matches) return;
    const magnet = event.target.closest<HTMLElement>(".magnetic");
    if (magnet !== pulled) release();
    if (!magnet) return;
    const box = magnet.getBoundingClientRect();
    magnet.style.setProperty("--mx", (event.clientX - (box.left + box.width / 2)) * 0.3 + "px");
    magnet.style.setProperty("--my", (event.clientY - (box.top + box.height / 2)) * 0.3 + "px");
    pulled = magnet;
  },
  { passive: true },
);
document.addEventListener("pointerleave", release);
