"use client";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { Section } from "@/components/section";

import { HERO_POSTER_SRC, HERO_VIDEO_SRC } from "./hero-film";
import { HeroCopy } from "./hero-copy";
import { HeroIntro } from "./hero-intro";
import { HeroPlayButton } from "./hero-play-button";
import { HeroScrollHint } from "./hero-scroll-hint";
import { HeroValueStatements } from "./hero-value-statements";
import { useHeroSequence } from "./use-hero-sequence";
import { useHeroVideo } from "./use-hero-video";

/**
 * Chapter 0 — Hero. Creative Direction §2, §5, §9 (revised).
 *
 * The film plays as a looping background video: it starts on its own, repeats
 * forever, and the Hero is one ordinary full-viewport section, so the visitor
 * can scroll on to Trust & Technology whenever they like. The previous
 * scroll-scrubbed build (a pinned section scrubbing a 361-frame canvas
 * sequence off the scrollbar, +350vh of scroll to get through it) was removed
 * per direct instruction — see `use-hero-sequence.ts`.
 *
 * The copy is unchanged: the keynote-style title card on load (`HeroIntro`),
 * the cycling reel of engineering statements (`HeroValueStatements`), and the
 * headline that settles in and stays (`HeroCopy`). All three now run on a
 * real-time timeline instead of a scroll position.
 */
export function Hero() {
  const {
    videoRef,
    headlineRef,
    sublineRef,
    signatureRef,
    scrimRef,
    introRef,
    statementRefs,
    sectionRef,
  } = useHeroSequence();
  const { phase } = useHeroPhase();
  const { isPlaying, togglePlay } = useHeroVideo(videoRef);

  return (
    <Section
      id="hero"
      ref={sectionRef}
      // Near-black base rather than the site's white `bg-void`: it sits under
      // the film's dark opening shot, so the white title card is legible from
      // the first paint, before the poster has even decoded.
      className="bg-foreground min-h-[100dvh] lg:min-h-screen"
    >
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        poster={HERO_POSTER_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/*
        Permanent grade over the film. The old build could tune each overlay to
        the shot underneath it, because scroll position and frame number were
        the same number — white type over the dark opening, dark ink over the
        light closing studio shot. A looping video has no such guarantee: every
        beat now has to stay legible over both extremes, so the film carries a
        constant bottom-weighted darkening and all Hero type is white.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/15"
      />

      <HeroIntro introRef={introRef} />

      <HeroValueStatements statementRefs={statementRefs} />

      <HeroCopy
        scrimRef={scrimRef}
        headlineRef={headlineRef}
        sublineRef={sublineRef}
        signatureRef={signatureRef}
      />

      <HeroPlayButton isPlaying={isPlaying} onToggle={togglePlay} />

      {/* Appears with the navbar, once the title card has cleared, and stays:
          the film loops forever, so there is no "finished" moment to wait for
          before inviting the visitor onward. */}
      <HeroScrollHint visible={phase === "settled"} />
    </Section>
  );
}
