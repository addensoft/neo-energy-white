"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ScrollTrigger } from "@/lib/gsap";

/** Full start-to-end auto-play watch time, in seconds — a natural "video"
 * pace, not a rushed scrub. Resuming partway through scales proportionally
 * so the pace stays constant regardless of where playback starts. */
const FULL_PLAY_DURATION = 10;

type Refs = {
  ready: boolean;
  sectionRef: RefObject<HTMLElement | null>;
  scrollTriggerRef: RefObject<ScrollTrigger | null>;
};

/**
 * useHeroAutoplay — the play/pause button's brain. There's no literal
 * `<video>` to pause here (Hero is a scroll-scrubbed canvas frame sequence —
 * see `use-hero-scroll.ts`), so "play" instead drives Lenis's own
 * `scrollTo()` smoothly through the *exact same* pinned scroll range the
 * film already scrubs from on manual scroll. That reuses the entire
 * existing scroll-scrub system as-is — no second animation driver, nothing
 * that can fall out of sync with it.
 *
 * Any genuine user scroll input (wheel/touch) during auto-play cancels it
 * immediately and hands control back — manual scroll always wins.
 */
export function useHeroAutoplay({ ready, sectionRef, scrollTriggerRef }: Refs) {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);

  const stopAutoPlay = useCallback(() => {
    if (!lenis) return;
    lenis.scrollTo(lenis.scroll, { duration: 0, immediate: true });
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, [lenis]);

  // Manual scroll input always cancels auto-play and hands control back.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleManualInput = () => {
      if (isPlayingRef.current) stopAutoPlay();
    };

    section.addEventListener("wheel", handleManualInput, { passive: true });
    section.addEventListener("touchstart", handleManualInput, { passive: true });
    return () => {
      section.removeEventListener("wheel", handleManualInput);
      section.removeEventListener("touchstart", handleManualInput);
    };
  }, [sectionRef, stopAutoPlay]);

  const togglePlay = useCallback(() => {
    const st = scrollTriggerRef.current;
    if (!lenis || !st) return;

    if (isPlayingRef.current) {
      stopAutoPlay();
      return;
    }

    const totalDistance = st.end - st.start;
    const remainingDistance = Math.max(st.end - lenis.scroll, 0);
    const duration =
      totalDistance > 0
        ? Math.max(1.5, (remainingDistance / totalDistance) * FULL_PLAY_DURATION)
        : FULL_PLAY_DURATION;

    isPlayingRef.current = true;
    setIsPlaying(true);
    lenis.scrollTo(st.end, {
      duration,
      easing: (t) => t,
      onComplete: () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
      },
    });
  }, [lenis, scrollTriggerRef, stopAutoPlay]);

  return {
    isPlaying,
    togglePlay,
    controlVisible: ready && Boolean(lenis) && !prefersReducedMotion,
  };
}
