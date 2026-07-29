"use client";

import { useEffect, useRef, useState } from "react";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

import { HERO_FRAME_COUNT, HERO_TEXT_TIMING, VALUE_STATEMENT_RANGE } from "./hero-frames";
import { useImageSequence } from "./use-image-sequence";

/** Scroll distance the sequence takes to scrub through, as a viewport-height multiple. */
const SCROLL_DISTANCE = "+=350%";

/** Smoothing lag (seconds) so both frame playback and text reveal ease/catch-up to the scrollbar. */
const SCRUB_SMOOTHING = 0.8;

/** How many value statements cycle through (see hero-frames.ts for the copy
 * and the shared timing window they cycle within). */
const VALUE_STATEMENT_COUNT = 6;

/**
 * useHeroScroll — Chapter 0, scroll-scrubbing the real Hero film.
 *
 * Sprint 3 revision: the film exists now (`/public/hero-frames/*.webp`, a
 * 289-frame sequence extracted from `herovideo.mp4`), so this replaced the
 * Sprint 2 procedural SVG/CSS placeholder entirely. A canvas draws the frame
 * matching the current scroll position — see hero-frames.ts for why that's a
 * different technique from the pin/scrub *mechanism*, which is unchanged:
 * `pin: true` + `scrub` on a single ScrollTrigger still gives us bidirectional
 * scrubbing, "won't advance until 100%," and release/re-engage at the
 * boundary natively.
 *
 * Frame index, text opacity, and the scrolling value statements are all
 * driven off the SAME tweened proxy value (0→1), so everything inherits the
 * same `scrub` smoothing lag — the film, the headline, and the highlight
 * reel feel like one continuous, eased scrub, not separate systems.
 */
export function useHeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const statementRefs = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const currentFrameRef = useRef(0);

  const { setPhase } = useHeroPhase();
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { imagesRef, loadedCount, total, ready } = useImageSequence();

  const drawFrame = (frameIndex: number) => {
    currentFrameRef.current = frameIndex;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    const { width, height } = canvasSizeRef.current;
    if (
      !canvas ||
      !ctx ||
      !img ||
      !img.complete ||
      img.naturalWidth === 0 ||
      !width ||
      !height
    ) {
      return;
    }

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let sx: number;
    let sy: number;
    let sw: number;
    let sh: number;

    // Always a full "cover" fill — the canvas's destination rect is the
    // entire box (0,0,width,height), no exceptions. An earlier mobile
    // letterboxing safeguard (floor the visible source width, shrink the
    // destination to match) was removed: on a short mobile Hero height
    // against 16:9 footage, it was letterboxing away roughly half the
    // screen — the opposite of "the video fills the viewport" the site
    // needs. Trade-off accepted: narrow viewports crop more aggressively
    // into the frame's edges, but there's never a visible gap.
    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  };

  // Canvas sizing — independent of scroll readiness so the first frame is
  // already correctly sized the instant loading finishes.
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvasSizeRef.current = { width, height };
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const textEls = [
      headlineRef.current,
      sublineRef.current,
      signatureRef.current,
      scrimRef.current,
    ];
    const statementEls = statementRefs.current;

    if (prefersReducedMotion) {
      drawFrame(HERO_FRAME_COUNT - 1);
      gsap.set(textEls, { autoAlpha: 1, filter: "blur(0px)" });
      gsap.set(statementEls, { autoAlpha: 0 });
      // Reduced motion lands straight on the film's settled end state, so
      // the opening title card has nothing left to introduce.
      gsap.set(introRef.current, { autoAlpha: 0 });
      setPhase("settled");
      return;
    }

    gsap.set(textEls, { autoAlpha: 0, filter: "blur(20px)" });
    gsap.set(statementEls, { autoAlpha: 0, y: 14 });
    drawFrame(0);

    // The title card's one-shot arrival. It deliberately has no auto
    // fade-out — dismissing it is the scroll timeline's job below, so it
    // stays up as long as the visitor hasn't moved.
    const introEntrance = gsap.fromTo(
      introRef.current,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 1.1, ease: EASE_ENGINEERED_CSS },
    );

    const ctx = gsap.context(() => {
      const frameProxy = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: SCROLL_DISTANCE,
          pin: true,
          scrub: SCRUB_SMOOTHING,
          anticipatePin: 1,
          onUpdate: (self) => {
            setPhase(self.progress >= 0.995 ? "settled" : "film");
            if (self.progress > 0.001) setHasStartedScrolling(true);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      tl.to(
        frameProxy,
        {
          frame: HERO_FRAME_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate: () => drawFrame(Math.round(frameProxy.frame)),
        },
        0,
      );

      // The title card's exit, driven by scroll rather than a timer: it
      // dissolves as the visitor scrolls down and — because the whole
      // timeline is scrubbed — comes straight back if they scroll up.
      // `immediateRender: false` matters: without it GSAP would apply this
      // tween's start values the moment the timeline is built, stomping the
      // one-shot entrance above. It clears well before the first value
      // statement (VALUE_STATEMENT_RANGE.start) so the two never overlap.
      tl.fromTo(
        introRef.current,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0,
          y: -18,
          duration: VALUE_STATEMENT_RANGE.start * 0.7,
          ease: "power2.in",
          immediateRender: false,
        },
        0,
      );

      // Scrolling value statements — one visible at a time, each in its own
      // evenly-spaced slot across VALUE_STATEMENT_RANGE, well before the
      // headline reveal begins (HERO_TEXT_TIMING.scrimStart) so the two
      // never overlap. Fade+translate in, hold, fade+translate out, with a
      // clean gap before the next one starts (a hard cut, not a crossfade —
      // "only one at a time").
      const { start: rangeStart, end: rangeEnd } = VALUE_STATEMENT_RANGE;
      const slotWidth = (rangeEnd - rangeStart) / VALUE_STATEMENT_COUNT;
      statementEls.forEach((el, index) => {
        const slotStart = rangeStart + index * slotWidth;
        const fadeInDuration = slotWidth * 0.12;
        const fadeOutStart = slotStart + slotWidth * 0.7;
        const fadeOutDuration = slotWidth * 0.2;

        tl.to(
          el,
          { autoAlpha: 1, y: 0, duration: fadeInDuration, ease: "power2.out" },
          slotStart,
        );
        tl.to(
          el,
          { autoAlpha: 0, y: -14, duration: fadeOutDuration, ease: "power2.in" },
          fadeOutStart,
        );
      });

      tl.to(
        scrimRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.16 },
        HERO_TEXT_TIMING.scrimStart,
      );
      tl.to(
        headlineRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.14 },
        HERO_TEXT_TIMING.headlineStart,
      );
      tl.to(
        sublineRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.12 },
        HERO_TEXT_TIMING.sublineStart,
      );
      tl.to(
        signatureRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.1 },
        HERO_TEXT_TIMING.signatureStart,
      );
    }, heroEl);

    ScrollTrigger.refresh();

    // Mobile browsers (iOS Safari in particular) resize the *visual*
    // viewport as the address bar/toolbar collapses or expands mid-scroll,
    // without always firing a plain `window.resize` GSAP's own ScrollTrigger
    // auto-refresh listens for. Left unhandled, the pin-spacer's height
    // (calculated from Hero's dvh-based height at setup time) can drift out
    // of sync with the real viewport, leaving blank scrollable space before
    // or after the pinned film. `visualViewport.resize` is the reliable,
    // purpose-built signal for exactly this — debounced so a fast toolbar
    // animation doesn't thrash `refresh()` mid-transition.
    let refreshTimeout: number | undefined;
    const handleViewportResize = () => {
      window.clearTimeout(refreshTimeout);
      refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    window.visualViewport?.addEventListener("resize", handleViewportResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
      window.clearTimeout(refreshTimeout);
      introEntrance.kill();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, prefersReducedMotion, setPhase]);

  return {
    canvasRef,
    headlineRef,
    sublineRef,
    signatureRef,
    scrimRef,
    introRef,
    statementRefs,
    sectionRef,
    scrollTriggerRef,
    hasStartedScrolling,
    loadProgress: total > 0 ? loadedCount / total : 0,
    ready,
  };
}
