"use client";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { Section } from "@/components/section";

import { HeroCopy } from "./hero-copy";
import { HeroIntro } from "./hero-intro";
import { HeroPlayButton } from "./hero-play-button";
import { HeroScrollHint } from "./hero-scroll-hint";
import { HeroValueStatements } from "./hero-value-statements";
import { ScrollCue } from "./scroll-cue";
import { useHeroAutoplay } from "./use-hero-autoplay";
import { useHeroScroll } from "./use-hero-scroll";

/**
 * Chapter 0 — Hero, scroll-scrubbed. Creative Direction §2, §5, §9 (revised).
 *
 * The real Hero film (new-hero-video.mp4 → 361-frame WebP sequence) plays
 * back entirely under scroll control. See use-hero-scroll.ts for why this is
 * a canvas frame sequence rather than `<video>.currentTime` scrubbing, and
 * hero-frames.ts for the source specs.
 *
 * Final client-approved polish layers four premium touches on top of the
 * unchanged scroll-scrub mechanism: a brief keynote-style title card on
 * load (`HeroIntro`), a "scroll to discover" hint that teaches first-time
 * visitors the film responds to scroll, a play/pause control that drives
 * the same scroll range programmatically for visitors who'd rather watch
 * than scroll, and a cycling highlight reel of engineering statements
 * during the film's B-roll.
 */
export function Hero() {
  const {
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
    loadProgress,
    ready,
  } = useHeroScroll();
  const { phase } = useHeroPhase();
  const { isPlaying, togglePlay, controlVisible } = useHeroAutoplay({
    ready,
    sectionRef,
    scrollTriggerRef,
  });

  return (
    <Section
      id="hero"
      ref={sectionRef}
      className="bg-void min-h-[100dvh] lg:min-h-screen"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* No frame has painted onto the canvas yet at this point, so this
              sits directly on the Section's own (light) background — dark ink,
              not light text. */}
          <span className="text-foreground/70 font-mono text-xs tracking-[0.16em] uppercase">
            Loading {Math.round(loadProgress * 100)}%
          </span>
        </div>
      )}

      <HeroIntro introRef={introRef} />

      <HeroValueStatements statementRefs={statementRefs} />

      <HeroCopy
        scrimRef={scrimRef}
        headlineRef={headlineRef}
        sublineRef={sublineRef}
        signatureRef={signatureRef}
      />

      {/* `phase !== "settled"` also covers `prefers-reduced-motion`: that
          path resolves straight to "settled" on mount (see use-hero-scroll.ts),
          so the hint correctly never appears when there's nothing left to
          scroll and discover. */}
      <HeroScrollHint visible={ready && !hasStartedScrolling && phase !== "settled"} />

      <HeroPlayButton visible={controlVisible} isPlaying={isPlaying} onToggle={togglePlay} />

      <ScrollCue visible={phase === "settled"} />
    </Section>
  );
}
