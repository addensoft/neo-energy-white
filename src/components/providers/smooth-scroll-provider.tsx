"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { WithChildren } from "@/types";

/**
 * LenisContext — exposes the live Lenis instance (once instantiated) so a
 * few chapters can drive scroll programmatically — currently just Hero's
 * play/pause control, which calls `lenis.scrollTo()` to auto-advance through
 * the pinned film instead of requiring a manual scroll gesture. `null` until
 * the instance exists (not yet mounted, or `prefers-reduced-motion`, which
 * never instantiates Lenis at all — see below).
 */
const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * SmoothScrollProvider — wires Lenis smooth scrolling into GSAP's ScrollTrigger
 * so both libraries agree on scroll position. This is library *configuration*
 * (Sprint 1 scope, item 2), not chapter animation — no chapter-level scroll
 * choreography (§3 scroll-jacking, §9 timelines) is implemented here.
 *
 * Respects `prefers-reduced-motion`: Lenis is never instantiated for users who
 * have opted out, so the page falls back to native browser scrolling — the
 * correct accessible default for a scroll-jacked, cinematic experience.
 */
export function SmoothScrollProvider({ children }: WithChildren) {
  const prefersReducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenisInstance = new Lenis({
      autoRaf: false,
    });
    setLenis(lenisInstance);

    lenisInstance.on("scroll", ScrollTrigger.update);

    const syncLenisToGsapTicker = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(syncLenisToGsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Both Lenis and every section's ScrollTrigger measure page/element
    // positions once, at creation time. Async content that settles afterward
    // — Hero's frame sequence preload, Flagship Battery's video, web fonts —
    // can still shift layout, leaving those cached boundaries stale (the
    // same root cause documented for an earlier Chapter 2 pin-registration
    // bug in this project). A section whose trigger boundary lands past
    // where it actually renders never fires its own reveal on a normal
    // scroll-through — an anchor jump masks it because Lenis recalculates on
    // its own `scrollTo`, but that's not how most visitors reach it. Re-measure
    // both once the window has fully loaded, plus a couple of deferred passes
    // to catch the slowest-settling content.
    const refresh = () => {
      lenisInstance.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    const refreshTimeouts = [300, 1000, 2500].map((delay) =>
      window.setTimeout(refresh, delay),
    );

    return () => {
      lenisInstance.destroy();
      setLenis(null);
      gsap.ticker.remove(syncLenisToGsapTicker);
      window.removeEventListener("load", refresh);
      refreshTimeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [prefersReducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
