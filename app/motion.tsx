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
            const equestrianPin = desktop && equestrianStage
              && equestrianStage.scrollHeight <= window.innerHeight - 70;
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
              enter(equestrianImage, { y: 14 });
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
            const bookPin = desktop && bookStage
              && bookStage.scrollHeight <= window.innerHeight - 70;

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
              const book = gsap.timeline({
                scrollTrigger: {
                  trigger: bookStage,
                  pin: bookStage,
                  pinSpacing: true,
                  start: pinStart,
                  end: () => `+=${Math.round(window.innerHeight * 0.8)}`,
                  scrub: 0.5,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });
              book.from(bookObject, {
                rotationY: -38,
                rotationZ: 7,
                y: 42,
                scale: resting.scale * 0.89,
                duration: 0.38,
                ease: "power2.out",
              }, 0);
              book.to(bookObject, {
                rotationY: 16,
                rotationZ: resting.rotationZ + 3,
                y: resting.y - 12,
                scale: resting.scale * 1.025,
                duration: 0.25,
                ease: "power1.inOut",
              }, 0.35);
              book.to(bookObject, {
                ...resting,
                duration: 0.2,
                ease: "power2.out",
              }, 0.6);
              if (bookFront) {
                const coverRotation = Number(gsap.getProperty(bookFront, "rotationY")) || 0;
                gsap.set(bookFront, {
                  transformOrigin: "left center",
                  backfaceVisibility: "hidden",
                });
                book.to(bookFront, {
                  rotationY: coverRotation - 48,
                  duration: 0.23,
                  ease: "power1.inOut",
                }, 0.36);
                book.to(bookFront, {
                  rotationY: coverRotation,
                  duration: 0.2,
                  ease: "power2.out",
                }, 0.59);
              }
              if (bookCopy) {
                book.from(bookCopy, {
                  x: 34,
                  y: 12,
                  duration: 0.32,
                  ease: "power2.out",
                }, 0);
              }
              if (bookOrbit) {
                book.fromTo(bookOrbit, { rotation: -16 }, {
                  rotation: 20,
                  duration: 0.8,
                  ease: "none",
                }, 0);
              }
              book.to({}, { duration: 0.25 }, 0.8);
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
                edgeX(from + (-150 - from) * position);
                edgeOpacity(Math.sin(position * Math.PI) * 0.7);
              };
              const hideEdge = (chapter: HTMLElement) => {
                if (owner !== chapter) return;
                owner = null;
                edgeOpacity(0);
                edgeX(-150);
              };
              select("#story, #work, #beyond, #contact").forEach((chapter) => {
                const state = { progress: 0 };
                const sweep = gsap.to(state, {
                  progress: 1,
                  duration: 1,
                  ease: "none",
                  paused: true,
                  onUpdate: () => {
                    if (owner === chapter) drawEdge(state.progress);
                  },
                });
                ScrollTrigger.create({
                  trigger: chapter,
                  start: "top 90%",
                  end: "top 20%",
                  animation: sweep,
                  scrub: 0.2,
                  invalidateOnRefresh: true,
                  onToggle: (self) => {
                    if (self.isActive) {
                      owner = chapter;
                      drawEdge(state.progress);
                    } else hideEdge(chapter);
                  },
                  onRefresh: (self) => {
                    if (self.isActive) {
                      owner = chapter;
                      drawEdge(self.progress);
                    } else hideEdge(chapter);
                  },
                });
              });
              releasePageEdge = () => { owner = null; };
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
        root.querySelectorAll("img").forEach((image) => {
          if (!image.complete) {
            image.addEventListener("load", refresh, { once: true, signal: events.signal });
            image.addEventListener("error", refresh, { once: true, signal: events.signal });
          }
        });
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
