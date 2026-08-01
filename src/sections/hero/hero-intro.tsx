import type { RefObject } from "react";

import { Heading, Paragraph } from "@/components/ui";

/**
 * HeroIntro — the opening title card ("WELCOME TO / NEO ENERGY / Engineering
 * the Future of EV Battery Technology.").
 *
 * Presentational only: it fades in once the film is playable, holds, then
 * dissolves. Both beats are driven from `use-hero-sequence.ts` — the same
 * timeline the value statements and the headline ride — rather than a
 * self-contained timer here, so the card can never fall out of step with the
 * rest of the copy. (It used to be dismissed by scroll and brought back by
 * scrolling up; the Hero no longer pins, so it simply plays.)
 *
 * Purely decorative (`pointer-events-none`, `aria-hidden`) — it never blocks
 * scrolling, and the real accessible headline/subline/name live in `HeroCopy`.
 */
export function HeroIntro({ introRef }: { introRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={introRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0"
    >
      {/* Soft ambient glow behind the title card — same restrained blue-white
          "engineered" glow language used site-wide, not a heavy effect. */}
      <div
        aria-hidden="true"
        className="bg-ion/20 absolute h-[26rem] w-[26rem] rounded-full blur-[130px]"
      />

      <div className="px-gutter relative flex flex-col items-center gap-5 text-center">
        <span className="font-mono text-[0.75rem] font-semibold tracking-[0.4em] text-white/70 uppercase">
          Welcome To
        </span>

        <Heading as="p" size="hero" className="text-white uppercase">
          NEO ENERGY
        </Heading>

        <Paragraph size="lead" className="max-w-lg text-balance text-white/80">
          Engineering the Future of EV Battery Technology.
        </Paragraph>
      </div>
    </div>
  );
}
