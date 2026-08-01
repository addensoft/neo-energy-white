import type { RefObject } from "react";

import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * HeroCopy — the headline, subline, and NEO signature mark that close the
 * Hero's copy sequence (Creative Direction §5).
 *
 * Visibility is not a boolean prop: it's a continuous opacity/blur value the
 * GSAP timeline drives through these refs (`use-hero-sequence.ts`). Unlike the
 * scroll-scrubbed build, this block arrives once and stays — it's the Hero's
 * real content, and the film keeps looping behind it.
 *
 * White type on a deepened bottom gradient. The old dark-ink treatment relied
 * on the headline landing on the film's light closing studio shot, which a
 * looping video can't promise; see the grade comment in `index.tsx`.
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
    <>
      {/* Legibility scrim, layered on top of the section-wide grade: it
          deepens the bottom of the frame as the headline arrives, so the type
          reads cleanly whatever shot the loop happens to be on. Fades in with
          the headline, not before. */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0"
      />

      {/* `opacity-0` on each block is the pre-timeline state, in markup rather
          than left to the first `gsap.set()`. Without it the whole settled
          headline paints for the frame or two before the timeline is built,
          which reads as a flash of the Hero's last beat before its first. */}
      {/* Sits a little higher than the scroll-scrubbed build's `bottom-[14%]`:
          the scroll invitation below it is now the taller hint block (label +
          mouse glyph), not a bare chevron, and at 14% the signature mark
          crowded it on a short viewport. */}
      <div className="px-gutter absolute inset-x-0 bottom-[20%] z-10 flex flex-col items-center gap-6 text-center">
        <div ref={headlineRef} className="opacity-0">
          <Heading as="h1" size="hero" className="text-white uppercase">
            {siteConfig.tagline}
          </Heading>
        </div>

        <div ref={sublineRef} className="opacity-0">
          <Paragraph size="lead" className="max-w-xl text-balance text-white/80">
            {siteConfig.description}
          </Paragraph>
        </div>

        <div ref={signatureRef} className="opacity-0">
          <span className="font-display mt-2 inline-block text-sm tracking-[0.2em] text-white/70">
            {siteConfig.name}
          </span>
        </div>
      </div>
    </>
  );
}
