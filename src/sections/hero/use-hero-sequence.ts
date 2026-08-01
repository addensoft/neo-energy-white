"use client";

import { useEffect, useRef, useState } from "react";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

import { HEADLINE_START, HERO_TIMING } from "./hero-film";

/**
 * useHeroSequence — the Hero's copy timeline.
 *
 * Replaces `use-hero-scroll.ts`. That hook pinned the section and scrubbed a
 * 361-frame canvas sequence off the scrollbar; per direct instruction the
 * film is now an ordinary auto-playing, looping background `<video>` and the
 * Hero occupies exactly one viewport, so the visitor can scroll on to the
 * next section at any moment.
 *
 * With the scroll driver gone, the copy needs its own clock: a single GSAP
 * timeline running in real time. It plays once — title card, then the six
 * value statements one at a time, then the headline, which stays put — while
 * the film loops behind it independently. The two are deliberately NOT
 * synced: a beat that had to land on a particular shot would break the moment
 * the video looped, so each overlay carries its own legibility treatment
 * instead.
 *
 * The timeline waits for the video to be playable (with a fallback timer, so
 * a stalled or failed video can never leave the Hero wordless).
 */

/** Longest we'll wait on the video before starting the copy regardless. */
const VIDEO_READY_FALLBACK_MS = 2500;

export function useHeroSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const statementRefs = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const { setPhase } = useHeroPhase();
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  // "Ready" means the browser has enough of the film to start playing it, so
  // the copy and the footage come up together. The fallback timer matters
  // more than it looks: if the video 404s or the decoder refuses it,
  // `canplay` never fires, and the copy is hidden until this flips — the Hero
  // would sit blank forever. It must fire in every environment, so it's
  // deliberately not conditional on anything else.
  useEffect(() => {
    const video = videoRef.current;
    const markReady = () => setReady(true);

    if (video && video.readyState >= 3) markReady();
    video?.addEventListener("canplay", markReady);
    const fallback = window.setTimeout(markReady, VIDEO_READY_FALLBACK_MS);

    return () => {
      video?.removeEventListener("canplay", markReady);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const heroEl = sectionRef.current;
    if (!heroEl) return;

    const textEls = [
      headlineRef.current,
      sublineRef.current,
      signatureRef.current,
      scrimRef.current,
    ];
    const statementEls = statementRefs.current;

    if (prefersReducedMotion) {
      // No sequence at all: the headline is simply there, the film holds on
      // its poster frame (see `use-hero-video.ts`), and the navbar is up.
      gsap.set(textEls, { autoAlpha: 1, filter: "blur(0px)" });
      gsap.set(statementEls, { autoAlpha: 0 });
      gsap.set(introRef.current, { autoAlpha: 0 });
      setPhase("settled");
      return;
    }

    gsap.set(textEls, { autoAlpha: 0, filter: "blur(20px)" });
    gsap.set(statementEls, { autoAlpha: 0, y: 14 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Opening title card — arrives, holds, dissolves.
      tl.fromTo(
        introRef.current,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: HERO_TIMING.introInDuration,
          ease: EASE_ENGINEERED_CSS,
        },
        HERO_TIMING.introIn,
      );
      tl.to(
        introRef.current,
        {
          autoAlpha: 0,
          y: -18,
          duration: HERO_TIMING.introOutDuration,
          ease: "power2.in",
        },
        HERO_TIMING.introOut,
      );

      // Value statements — one visible at a time, each in its own slot: fade
      // and lift in, hold, fade out, then a clean gap before the next (a hard
      // cut, not a crossfade — "only one at a time").
      statementEls.forEach((el, index) => {
        const slotStart =
          HERO_TIMING.statementsStart + index * HERO_TIMING.statementSlot;

        tl.to(
          el,
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
          slotStart,
        );
        tl.to(
          el,
          { autoAlpha: 0, y: -14, duration: 0.4, ease: "power2.in" },
          slotStart + HERO_TIMING.statementSlot - 0.4,
        );
      });

      // The headline block takes over once the reel is done, and stays for
      // good — it's the Hero's real content, not another passing beat.
      tl.to(
        scrimRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 1 },
        HEADLINE_START,
      );
      tl.to(
        headlineRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.9 },
        HEADLINE_START + 0.15,
      );
      tl.to(
        sublineRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.8 },
        HEADLINE_START + 0.45,
      );
      tl.to(
        signatureRef.current,
        { autoAlpha: 1, filter: "blur(0px)", duration: 0.7 },
        HEADLINE_START + 0.75,
      );
    }, heroEl);

    // The navbar stays hidden for the title card and comes back as soon as it
    // clears. It can't wait for the whole sequence any more — the page scrolls
    // freely from the first second now, so the nav has to be there.
    //
    // A timer rather than a callback on the timeline above: GSAP runs with
    // `lagSmoothing(0)` on this site, so a tab that was backgrounded advances
    // the playhead across several seconds in a single tick, and a position
    // callback stepped over that way doesn't reliably fire. `setTimeout` keeps
    // running (throttled, but running) in exactly that situation.
    const navTimer = window.setTimeout(
      () => setPhase("settled"),
      HERO_TIMING.settleNavAt * 1000,
    );

    return () => {
      window.clearTimeout(navTimer);
      ctx.revert();
    };
  }, [ready, prefersReducedMotion, setPhase]);

  return {
    videoRef,
    headlineRef,
    sublineRef,
    signatureRef,
    scrimRef,
    introRef,
    statementRefs,
    sectionRef,
    ready,
  };
}
