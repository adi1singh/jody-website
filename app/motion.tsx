"use client";

import { useEffect } from "react";

/**
 * The document is the complete, readable experience. This component only adds
 * motion; it never replaces native scrolling or hides the page on startup.
 */
export default function StoryMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-story-root]")
      ?? document.querySelector<HTMLElement>("main");

    if (!root) return;

    let disposed = false;
    let destroy: (() => void) | undefined;

    const initialize = async () => {
      try {
        // Import in the effect so the server always renders the static story.
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);

        // Premium, softer scrolling: Lenis eases the wheel on mouse and
        // trackpad devices only. Touch keeps native scrolling, and reduced
        // motion gets none. It drives ScrollTrigger from GSAP's own ticker.
        let lenis: import("lenis").default | undefined;
        let lenisTick: ((time: number) => void) | undefined;
        if (matchMedia("(hover: hover) and (pointer: fine)").matches
          && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
          const { default: Lenis } = await import("lenis");
          if (disposed) return;
          const smooth = new Lenis({ duration: 1.25, easing: (t: number) => 1 - Math.pow(1 - t, 4), wheelMultiplier: 0.9, anchors: { offset: -80 } });
          smooth.on("scroll", () => ScrollTrigger.update());
          lenis = smooth;
          lenisTick = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(lenisTick);
          gsap.ticker.lagSmoothing(0);
        }

        const select = (selector: string) =>
          Array.from(root.querySelectorAll<HTMLElement>(selector));
        const first = (selector: string) =>
          root.querySelector<HTMLElement>(selector);
        const media = gsap.matchMedia();
        const events = new AbortController();
        let refreshFrame = 0;
        let active = true;

        const refresh = () => {
          if (disposed || !active) return;
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            if (!disposed && active) ScrollTrigger.refresh(true);
          });
        };

        destroy = () => {
          active = false;
          if (lenisTick) gsap.ticker.remove(lenisTick);
          lenis?.destroy();
          events.abort();
          cancelAnimationFrame(refreshFrame);
          media.revert();
          delete root.dataset.motionReady;
          delete root.dataset.motionMode;
        };

        media.add(
          {
            all: "(min-width: 0px)",
            desktop: "(min-width: 1024px)",
            tall: "(min-height: 700px)",
            fine: "(hover: hover) and (pointer: fine)",
            reduced: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const reduced = Boolean(context.conditions?.reduced);
            const desktop = Boolean(
              context.conditions?.desktop && context.conditions?.tall
                && context.conditions?.fine,
            );
            const sceneEvents = new AbortController();
            const handled = new Set<HTMLElement>();
            root.dataset.motionMode = reduced
              ? "reduced"
              : desktop ? "cinematic" : "compact";

            const progress = first(".reading-progress");
            if (progress) {
              gsap.fromTo(progress, { scaleX: 0 }, {
                scaleX: 1,
                transformOrigin: "left center",
                ease: "none",
                scrollTrigger: {
                  start: 0,
                  end: () => Math.max(1, ScrollTrigger.maxScroll(window)),
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              });
            }

            // A direct progress indicator remains useful, but the story itself
            // has no moving scenes when the visitor requests reduced motion.
            if (reduced) return () => sceneEvents.abort();

            const distance = desktop ? 34 : 18;
            const enter = (
              element: HTMLElement | null,
              options: { x?: number; y?: number; rotate?: number; delay?: number } = {},
            ) => {
              if (!element || handled.has(element)) return;
              handled.add(element);
              // Do not replay a reveal above a restored scroll position.
              if (element.getBoundingClientRect().bottom < 0) return;
              gsap.from(element, {
                x: options.x ?? 0,
                y: options.y ?? distance,
                rotation: options.rotate ?? 0,
                duration: desktop ? 0.95 : 0.65,
                delay: options.delay ?? 0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              });
            };

            // Cover: a tangible photograph and title, with no opening gate.
            const cover = first("#cover");
            const coverCopy = first("#cover .cover-copy");
            const coverPortrait = first("#cover .cover-portrait");
            const coverPortraitImage = first("#cover .portrait-frame img");
            enter(coverCopy, { y: desktop ? 25 : 16 });
            enter(coverPortrait, { x: desktop ? 30 : 0, y: desktop ? 0 : 16 });

            if (cover && coverPortraitImage && desktop) {
              gsap.fromTo(coverPortraitImage, {
                yPercent: -2,
                scale: 1.08,
              }, {
                yPercent: 2,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: cover,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });
            }

            // The first spread gently assembles around the personal story.
            const story = first("#story");
            const storyImage = first("#story .story-image");
            enter(storyImage, {
              x: desktop ? -26 : 0,
              y: desktop ? 22 : 18,
              rotate: desktop ? -2 : 0,
            });
            enter(first("#story .story-copy"), { y: desktop ? 44 : 20 });
            if (story && storyImage && desktop) {
              gsap.to(storyImage, {
                yPercent: -5,
                ease: "none",
                scrollTrigger: {
                  trigger: story,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.55,
                },
              });
            }

            select("#work .service-row").forEach((row, index) => {
              enter(row, {
                x: desktop ? (index % 2 ? 24 : -24) : 0,
                y: desktop ? 12 : 18,
              });
            });
            select("#work .process-step").forEach((step, index) => {
              enter(step, { y: desktop ? 32 : 18, delay: index * 0.045 });
            });

            // Pin the stationary stage, never its animated photograph/copy.
            // Short screens and touch layouts keep the chapter in normal flow.
            const equestrianStage = first("#equestrian .equestrian-stage");
            const equestrianImage = first("#equestrian .equestrian-image");
            const equestrianCopy = first("#equestrian .equestrian-copy");
            const equestrianWord = first("#equestrian .equestrian-word");
            // Not pinned: the chapter scrolls with the page (owner: a pinned,
            // still chapter looked empty). The photo drifts gently instead.
            const equestrianPin = false;
            // Desktop navigation settles at 72px after leaving the cover.
            const pinStart = "top 72px";

            if (equestrianStage && equestrianImage && equestrianPin) {
              [equestrianImage, equestrianCopy, equestrianWord].forEach((element) => {
                if (element) handled.add(element);
              });
              // The photograph grows out of an inset frame before the stage
              // pins. Only the image is masked; every line of copy stays live.
              gsap.fromTo(equestrianImage, {
                clipPath: "inset(7% 7% 7% 7%)",
              }, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: {
                  trigger: equestrianStage,
                  start: "top 88%",
                  end: pinStart,
                  scrub: 0.3,
                  invalidateOnRefresh: true,
                },
              });
              const equestrian = gsap.timeline({
                scrollTrigger: {
                  trigger: equestrianStage,
                  pin: equestrianStage,
                  pinSpacing: true,
                  start: pinStart,
                  end: () => `+=${Math.round(window.innerHeight * 0.65)}`,
                  scrub: 0.45,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });
              equestrian.to(equestrianImage, {
                scale: 1.12,
                yPercent: -3,
                duration: 0.58,
                ease: "none",
              }, 0);
              if (equestrianWord) {
                equestrian.fromTo(equestrianWord, { xPercent: -4 }, {
                  xPercent: 4,
                  duration: 0.7,
                  ease: "none",
                }, 0);
              }
              if (equestrianCopy) {
                equestrian.from(equestrianCopy, {
                  y: 36,
                  duration: 0.38,
                  ease: "power2.out",
                }, 0);
              }
              // End on a still composition, allowing time to read and act.
              equestrian.to({}, { duration: 0.3 }, 0.7);
            } else {
              const drift = equestrianImage?.querySelector("img");
              if (drift && equestrianStage) {
                gsap.fromTo(drift, { yPercent: -8, scale: 1.14 }, {
                  yPercent: 8, scale: 1.14, ease: "none",
                  scrollTrigger: { trigger: equestrianStage, start: "top bottom", end: "bottom top", scrub: 0.6 },
                });
              }
              enter(equestrianCopy, { y: 22 });
              enter(equestrianWord, { x: -12, y: 0 });
            }

            // The book is a lightweight DOM object; GSAP turns it in 3D while
            // the live text and links remain on a stationary, readable spread.
            const bookStage = first("#book .book-stage");
            const bookObject = first("#book .book-object");
            const bookFront = first("#book .book-object .book-front");
            const bookCopy = first("#book .book-copy");
            const bookOrbit = first("#book .book-orbit");
            // The orbit runs as the book scrolls through the screen, so it
            // plays on every size, not only where the whole stage fits.
            const bookPin = Boolean(bookStage);

            if (bookStage && bookObject && bookPin) {
              [bookObject, bookCopy, bookOrbit].forEach((element) => {
                if (element) handled.add(element);
              });
              const resting = {
                rotationY: Number(gsap.getProperty(bookObject, "rotationY")) || 0,
                rotationZ: Number(gsap.getProperty(bookObject, "rotationZ")) || 0,
                y: Number(gsap.getProperty(bookObject, "y")) || 0,
                scale: Number(gsap.getProperty(bookObject, "scaleX")) || 1,
              };
              gsap.set(bookObject, {
                transformPerspective: 1400,
                transformOrigin: "50% 50%",
              });
              // Orbit pop-out (as WTE's flask): one eased phase drives every
              // axis, so the book traces a single loop towards the viewer,
              // comes right up to the screen at the top of it, and returns to
              // exactly its resting pose.
              const stage = bookObject.parentElement as HTMLElement | null;
              if (stage) gsap.set(stage, { perspective: 1100 });
              const glint = document.createElement("span");
              glint.className = "book-glint";
              bookFront?.appendChild(glint);
              const ease = (v: number) => { const t = Math.min(1, Math.max(0, v)); return t * t * (3 - 2 * t); };
              const state = { p: 0 };
              const draw = () => {
                const o = ease(state.p);
                const lift = Math.sin(Math.PI * o) ** 2;
                const sweep = Math.sin(Math.PI * 2 * o);
                gsap.set(bookObject, {
                  x: sweep * (desktop ? 90 : 30),
                  y: resting.y + (1 - Math.cos(Math.PI * 2 * o)) * -18,
                  z: lift * (desktop ? 170 : 60),
                  scale: resting.scale * (1 + lift * 0.08),
                  rotationX: sweep * 12,
                  rotationY: resting.rotationY + sweep * -32,
                  rotationZ: resting.rotationZ + sweep * -9,
                });
                gsap.set(glint, { xPercent: -160 + o * 320, opacity: lift * 0.9 });
                if (bookOrbit) gsap.set(bookOrbit, { scale: 1 + lift * 0.18, opacity: 1 - lift * 0.5 });
              };
              const book = gsap.timeline({
                scrollTrigger: {
                  trigger: bookObject,
                  start: "top 95%",
                  end: "bottom 15%",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              });
              book.to(state, { p: 1, duration: 0.8, ease: "none", onUpdate: draw }, 0);
              book.to({}, { duration: 0.2 }, 0.8);
              draw();
            } else {
              enter(bookObject, { y: 24, rotate: desktop ? -3 : -1 });
              enter(bookCopy, { y: 18 });
              enter(bookOrbit, { y: 12 });
            }

            // Small editorial rules connect the chapters without shifting type.
            select(".chapter-line").forEach((line) => {
              const bounds = line.getBoundingClientRect();
              const horizontal = bounds.width >= bounds.height;
              gsap.from(line, {
                [horizontal ? "scaleX" : "scaleY"]: 0.12,
                transformOrigin: horizontal ? "left center" : "center top",
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: line,
                  start: "top 95%",
                  once: true,
                },
              });
            });

            // Do not transform ancestors of pinned scenes or animate the same
            // copy twice if it also carries the generic reveal attribute.
            select("[data-reveal]").forEach((element) => {
              if (handled.has(element)
                || element.closest("#cover, #equestrian, #book")
                || element.querySelector(".equestrian-stage, .book-stage")
                || Array.from(handled).some((target) => target.contains(element))) return;
              enter(element);
            });

            // One translucent page edge links the unpinned chapter boundaries.
            // Each trigger animates a private progress value, so inactive
            // timelines cannot overwrite the shared visual or flash it onscreen.
            const pageEdge = desktop ? first(".page-turn-edge") : null;
            let releasePageEdge: (() => void) | undefined;
            if (pageEdge) {
              let owner: HTMLElement | null = null;
              gsap.set(pageEdge, { x: -150, opacity: 0 });
              const edgeX = gsap.quickSetter(pageEdge, "x", "px");
              const edgeOpacity = gsap.quickSetter(pageEdge, "opacity");
              const drawEdge = (progress: number) => {
                const position = Math.max(0, Math.min(1, progress));
                const from = window.innerWidth + 120;
                edgeX(from + (-260 - from) * position);
                edgeOpacity(Math.sin(position * Math.PI) * 0.9);
              };
              const hideEdge = (chapter: HTMLElement) => {
                if (owner !== chapter) return;
                owner = null;
                edgeOpacity(0);
                edgeX(-150);
              };
              // A page edge sweeps right across once as each chapter arrives
              // (time-based, so it always completes instead of freezing
              // mid-screen when the visitor stops scrolling).
              let sweep: ReturnType<typeof gsap.to> | undefined;
              const turn = (chapter: HTMLElement) => {
                owner = chapter;
                const state = { progress: 0 };
                sweep?.kill();
                sweep = gsap.to(state, {
                  progress: 1,
                  duration: 1.9,
                  ease: "sine.inOut",
                  onUpdate: () => drawEdge(state.progress),
                  onComplete: () => hideEdge(chapter),
                });
              };
              // Once per chapter, never on the interludes between chapters.
              select("#story, #work, #equestrian, #book, #beyond, #contact").forEach((chapter) => {
                ScrollTrigger.create({
                  trigger: chapter,
                  start: "top 70%",
                  once: true,
                  onEnter: () => turn(chapter),
                });
              });
              releasePageEdge = () => { owner = null; };
            }

            // Page folds between chapters: the previous page tips
            // back and dims while the next one comes alive. Pinned scenes
            // (#equestrian, #book) and their ancestors are never transformed.
            const pages = select("main > section").filter((section) => section.id !== "cover");
            const flat = (section: HTMLElement) =>
              section.matches("#equestrian, #book, .interlude") ? null
                : section.querySelector<HTMLElement>(":scope > .section-shell");
            pages.forEach((next, index) => {
              const previous = index > 0 ? pages[index - 1] : first("#cover");
              const outgoing = previous ? (previous.id === "cover" ? previous.querySelector<HTMLElement>(".cover-inner") : flat(previous)) : null;
              const incoming = flat(next);
              if (outgoing) {
                gsap.fromTo(outgoing, { opacity: 1, scale: 1, rotationX: 0, filter: "blur(0px)" }, {
                  opacity: 0.25,
                  scale: desktop ? 0.94 : 0.97,
                  rotationX: desktop ? 7 : 0,
                  filter: desktop ? "blur(2px)" : "blur(0px)",
                  transformOrigin: "50% 100%",
                  transformPerspective: 1400,
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: { trigger: next, start: "top 85%", end: "top 5%", scrub: 0.3, invalidateOnRefresh: true },
                });
              }
              if (incoming) {
                gsap.fromTo(incoming, { opacity: 0.2, scale: desktop ? 1.04 : 1.02, rotationX: desktop ? -5 : 0 }, {
                  opacity: 1,
                  scale: 1,
                  rotationX: 0,
                  transformOrigin: "50% 0%",
                  transformPerspective: 1400,
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: { trigger: next, start: "top 100%", end: "top 30%", scrub: 0.3, invalidateOnRefresh: true },
                });
              }
            });

            // Interludes: the photo holds still while the first line reads,
            // then the second line grows in, larger. (CSS gives the section
            // its extra scroll length only while motion is running.)
            select(".interlude").forEach((interlude) => {
              const line = interlude.querySelector<HTMLElement>(".interlude-line");
              const turnLine = interlude.querySelector<HTMLElement>(".interlude-turn");
              const image = interlude.querySelector<HTMLElement>("img");
              if (!line || !turnLine) return;
              const scene = gsap.timeline({
                scrollTrigger: { trigger: interlude, start: "top 85%", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
              });
              // Words stay fully readable; only the second line grows a little.
              scene.fromTo(turnLine, { scale: 0.9 }, { scale: 1, duration: 0.6, ease: "none" }, 0)
                .to({}, { duration: 0.4 });
              if (image) scene.fromTo(image, { scale: 1.12 }, { scale: 1, duration: 1, ease: "none" }, 0);
            });

            // Chapter I: a gold frame draws itself around the portrait, which
            // leans gently towards the cursor on desktop.
            const storyFrame = first("#story .story-frame");
            if (storyFrame) {
              gsap.fromTo(storyFrame, { clipPath: "inset(0 100% 100% 0)" }, {
                clipPath: "inset(0 0% 0% 0)", duration: 1.6, ease: "power2.inOut",
                scrollTrigger: { trigger: storyFrame, start: "top 80%", once: true },
              });
            }
            const storyPhoto = first("#story .story-photo");
            const storyImageWrap = first("#story .story-image");
            if (storyPhoto && storyImageWrap && context.conditions?.fine) {
              gsap.set(storyPhoto, { transformPerspective: 900 });
              storyImageWrap.addEventListener("pointermove", (event) => {
                const box = storyImageWrap.getBoundingClientRect();
                const x = (event.clientX - box.left) / box.width - 0.5;
                const y = (event.clientY - box.top) / box.height - 0.5;
                gsap.to(storyPhoto, { rotateY: x * 8, rotateX: -y * 8, duration: 0.6, ease: "power2.out" });
              }, { signal: sceneEvents.signal });
              storyImageWrap.addEventListener("pointerleave", () => {
                gsap.to(storyPhoto, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "power3.out" });
              }, { signal: sceneEvents.signal });
            }

            // Chapter II: the concerns pop in one by one, so the eye lands on each.
            const chips = select("#work .hyp-cards li");
            if (chips.length) {
              chips.forEach((chip) => handled.add(chip));
              gsap.from(chips, {
                opacity: 0, scale: 0.6, y: 16, duration: 0.55, stagger: 0.16, ease: "back.out(2.2)",
                scrollTrigger: { trigger: chips[0], start: "top 88%", once: true },
              });
            }

            const waveform = first("#beyond .waveform");
            const bars = select("#beyond .waveform span");
            if (waveform && bars.length) {
              const heights = [0.38, 0.76, 0.5, 0.95, 0.62, 0.85, 0.44];
              const wave = gsap.to(bars, {
                scaleY: (index: number) => heights[index % heights.length],
                transformOrigin: "center center",
                duration: 0.65,
                stagger: { each: 0.045, from: "center" },
                repeat: 1,
                yoyo: true,
                ease: "sine.inOut",
                paused: true,
              });
              const waveTrigger = ScrollTrigger.create({
                trigger: waveform,
                start: "top 95%",
                end: "bottom 5%",
                onToggle: (self) => {
                  if (self.isActive && !document.hidden) wave.play();
                  else wave.pause();
                },
              });
              document.addEventListener("visibilitychange", () => {
                if (!document.hidden && waveTrigger.isActive) wave.play();
                else wave.pause();
              }, { signal: sceneEvents.signal });
            }

            return () => {
              releasePageEdge?.();
              sceneEvents.abort();
            };
          },
          root,
        );

        root.dataset.motionReady = "true";
        root.addEventListener("toggle", refresh, { capture: true, signal: events.signal });
        window.addEventListener("jody:layout", refresh, { signal: events.signal });
        // All photographs reserve their exact frame dimensions in CSS. Refreshing
        // pins for a lazy image decode adds no geometry information and can
        // interrupt an anchor jump. Fonts, disclosures and form-state changes
        // refresh only when the page geometry can actually change.
        document.fonts.ready.then(refresh).catch(() => undefined);
        refresh();
      } catch (error) {
        // Revert partial setup as well as successful setup. The server-rendered
        // page is always the fallback, including a failed animation import.
        destroy?.();
        destroy = undefined;
        if (!disposed) console.warn("Story motion could not start; the full page remains available.", error);
      }
    };

    void initialize();

    return () => {
      disposed = true;
      destroy?.();
    };
  }, []);

  return null;
}
