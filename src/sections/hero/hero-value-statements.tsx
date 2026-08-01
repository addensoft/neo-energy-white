import type { RefObject } from "react";

import { Paragraph } from "@/components/ui";

import { VALUE_STATEMENTS } from "./hero-film";

/**
 * HeroValueStatements — one engineering credibility line visible at a time
 * over the film's B-roll (see `use-hero-sequence.ts` for the GSAP timeline
 * driving each line's fade/translate in and out). All six sit stacked in the
 * exact same spot so swapping between them never shifts layout — only
 * opacity/transform differ, driven entirely by the refs below.
 *
 * Each line rides its own glass chip. The scroll-scrubbed build could place
 * these lines on known-dark frames; a looping video can't, and the film's
 * closing studio shot is near-white, so plain white type would vanish on it.
 * Positioned clear of both the headline zone (bottom-14%) and the scroll
 * hint/play button (bottom-8), so it never competes for the same space.
 */
type HeroValueStatementsProps = {
  statementRefs: RefObject<HTMLDivElement[]>;
};

export function HeroValueStatements({ statementRefs }: HeroValueStatementsProps) {
  return (
    <div
      className="px-gutter pointer-events-none absolute inset-x-0 bottom-[26%] z-10 flex justify-center"
      aria-hidden="true"
    >
      <div className="relative flex h-16 w-full max-w-2xl items-center justify-center sm:h-12">
        {VALUE_STATEMENTS.map((text, index) => (
          <div
            key={text}
            ref={(el) => {
              if (el) statementRefs.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-center opacity-0"
          >
            <Paragraph
              size="lead"
              className="rounded-full border border-white/20 bg-black/50 px-6 py-2.5 text-center text-base text-balance text-white backdrop-blur-md sm:px-7"
            >
              {text}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
}
