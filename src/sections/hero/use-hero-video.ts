"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * useHeroVideo — auto-play, loop, and the play/pause control for the Hero film.
 *
 * Replaces `use-hero-autoplay.ts`, which had no literal video to drive: it
 * faked playback by scrolling Lenis through the pinned scrub range. Now there
 * IS a video, so the control just plays and pauses it.
 *
 * Two things this hook exists for beyond the obvious:
 *
 * 1. Auto-play is not guaranteed. Even muted+playsInline, `play()` can reject
 *    (low-power mode, a data-saver setting, some in-app browsers). We track
 *    the real element state via its own play/pause events rather than
 *    assuming, so the button always shows what's actually happening and
 *    offers a way to start it manually.
 * 2. WCAG 2.2.2 — motion that starts automatically and runs more than five
 *    seconds needs a mechanism to pause it. The film loops forever, so that
 *    control is a requirement, not a nicety. Under `prefers-reduced-motion`
 *    the film doesn't auto-play at all; it holds on its poster frame and the
 *    button becomes opt-in playback.
 */
export function useHeroVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  /** Distinguishes "the visitor pressed pause" from "the browser stopped it" —
   * only the latter is ours to undo. */
  const userPausedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    if (prefersReducedMotion) {
      video.pause();
    } else {
      // A rejected auto-play is a normal outcome, not an error — the button
      // is the recovery path, so swallow it rather than logging noise.
      video.play().catch(() => setIsPlaying(false));
    }

    // Browsers pause media in a backgrounded tab and don't always restart it
    // on return, which would leave the "always looping" film frozen on a
    // random frame. Resume it — unless the visitor is the one who stopped it.
    const onVisibility = () => {
      if (document.hidden || prefersReducedMotion || userPausedRef.current) return;
      if (video.paused) video.play().catch(() => setIsPlaying(false));
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoRef, prefersReducedMotion]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => setIsPlaying(false));
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  }, [videoRef]);

  return { isPlaying, togglePlay };
}
