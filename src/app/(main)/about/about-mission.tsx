import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * AboutMission — the one non-product moment on this page, carrying over
 * Creative Direction §2 Chapter 3 ("The One Thing" / manifesto), which was
 * written and approved but never shipped anywhere on the live site (see
 * `sections/manifesto.tsx` — still an empty on-hold shell). Reusing it here
 * rather than leaving it to rot unused: it says exactly what an About page's
 * mission statement should, in the site's own already-approved voice.
 *
 * Full black, huge minimal type, one line at a time, generous holds — the
 * original spec calls this "the chapter most likely to be remembered a week
 * after the meeting." A standalone page can't scroll-jack a dedicated pinned
 * timeline the way the homepage would, so the same pacing is approximated
 * with a mount-triggered stagger instead (`RevealWrapper`'s `whileInView`).
 *
 * The visual lines are `aria-hidden` and a single real sentence carries the
 * accessible content — same split HeroIntro/HeroValueStatements already use,
 * because `RevealWrapper` always renders a `div`, which can't nest inside a
 * heading element.
 */
const LINES = ["Every EV.", "Every taxi.", "Every fleet.", "Every journey.", "Depends on one thing."];

export function AboutMission() {
  return (
    <section id="mission" className="bg-foreground relative overflow-hidden py-24 lg:py-40">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
      />

      <Heading as="h2" size="h2" className="sr-only">
        Every EV, every taxi, every fleet, every journey depends on one thing. We see all of it.
      </Heading>

      <Container className="relative z-10 flex flex-col items-center gap-3 text-center" aria-hidden="true">
        {LINES.map((line, index) => (
          <RevealWrapper key={line} variant="blur" delay={index * 0.35} duration={1}>
            <span className="font-display block text-3xl font-semibold tracking-tight text-white uppercase sm:text-4xl lg:text-6xl">
              {line}
            </span>
          </RevealWrapper>
        ))}

        <RevealWrapper variant="fade" delay={LINES.length * 0.35 + 0.4} duration={1.2}>
          <span className="font-display text-ion mt-6 block text-2xl italic sm:text-3xl lg:text-4xl">
            We see all of it.
          </span>
        </RevealWrapper>
      </Container>
    </section>
  );
}
