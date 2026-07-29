import type { RefObject } from "react";

import { Paragraph } from "@/components/ui";

import { VALUE_STATEMENTS } from "./hero-frames";

/**
 * HeroValueStatements — one engineering credibility line visible at a time
 * while scrolling through the film's B-roll (see `use-hero-scroll.ts` for the
 * GSAP timeline driving each line's fade/translate in and out). All six sit
 * stacked in the exact same spot so swapping between them never shifts
 * layout — only opacity/transform differ, driven entirely by the refs below.
 *
 * White type (this sits over the raw cinematic footage, before the film's
 * light closing scrim appears — same reasoning as Hero's other pre-scrim
 * copy) and positioned clear of both the main headline zone (bottom-14%)
 * and the scroll hint/play button (bottom-8), so it never competes with
 * either for the same space.
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
              className="text-white/90 max-w-xl text-base text-balance text-center sm:text-lg"
            >
              {text}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
}
