import type { RefObject } from "react";

import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * HeroCopy — the headline, subline, and NEO signature mark that land on the
 * scroll-scrubbed film's hold (Creative Direction §5, virtual 15–18s).
 *
 * Unlike Sprint 2's time-based version, visibility here is NOT a boolean
 * prop animated by Framer Motion — it's a continuous opacity/blur value the
 * GSAP scroll timeline drives directly via these refs (`use-hero-scroll.ts`).
 * That's what makes scrubbing backward correctly fade the text back out
 * fractionally, instead of it snapping in/out at a fixed duration regardless
 * of scroll speed or direction.
 */
type HeroCopyProps = {
  scrimRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLDivElement | null>;
  sublineRef: RefObject<HTMLDivElement | null>;
  signatureRef: RefObject<HTMLDivElement | null>;
};

export function HeroCopy({
  scrimRef,
  headlineRef,
  sublineRef,
  signatureRef,
}: HeroCopyProps) {
  return (
    <div className="px-gutter absolute inset-x-0 bottom-[14%] z-10 flex flex-col items-center gap-6 text-center">
      {/*
        Legibility scrim — the headline lands on the film's closing beat, a
        light studio shot of the assembled pack, not a dark scene. A soft
        light vignette (not a dark one) keeps dark ink type crisp against that
        backdrop without hiding the object. Fades in with the headline, not before.
      */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 scale-125 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.6)_50%,transparent_78%)]"
      />

      {/* Dark ink, matching the site's default text color — this lands on the
          film's light closing shot (see scrim comment above), not a dark scene. */}
      <div ref={headlineRef}>
        <Heading as="h1" size="hero" className="text-foreground uppercase">
          {siteConfig.tagline}
        </Heading>
      </div>

      <div ref={sublineRef}>
        <Paragraph size="lead" className="text-foreground/70 max-w-xl text-balance">
          {siteConfig.description}
        </Paragraph>
      </div>

      <div ref={signatureRef}>
        <span className="font-display text-foreground/70 mt-2 inline-block text-sm tracking-[0.2em]">
          {siteConfig.name}
        </span>
      </div>
    </div>
  );
}
