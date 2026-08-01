import { Award } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Badge, Container, Heading, Paragraph } from "@/components/ui";

/**
 * DiagnosticsStandard — GB 38031-2020, the standard every diagnostic is
 * measured against. Same standard and test categories `/principles` and
 * `services/battery-systems` already state, and the same explanation
 * already published in
 * `/news/understanding-gb-38031-2020-battery-certification` — given fuller
 * treatment here than `services/component-repair`'s compact strip, since
 * this page is specifically about how verification works.
 */
const PROOF_POINTS = [
  "Nail Penetration",
  "1m Water Immersion",
  "Vibration & Mechanical Shock",
] as const;

export function DiagnosticsStandard() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-12">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">The Standard</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Tested To GB 38031-2020
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              The Chinese national standard for EV traction battery safety —
              the same one every pack was originally certified to, and the
              one every NEO ENERGY diagnostic measures against.
            </Paragraph>
          </RevealWrapper>
        </div>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROOF_POINTS.map((point) => (
              <Badge key={point} variant="ion" className="px-4 py-2 text-[0.7rem]">
                <Award className="h-3.5 w-3.5" strokeWidth={1.5} />
                {point}
              </Badge>
            ))}
          </div>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.4}>
          <Paragraph size="body" className="max-w-2xl text-balance">
            A pack that fails a check at the cell or busbar level, but passes
            at a glance, is a genuine risk hiding behind a working dashboard
            light. Testing to this standard is how that gap gets closed —
            not just for repairs, but for any pack a diagnostic is run on.
          </Paragraph>
        </RevealWrapper>
      </Container>
    </section>
  );
}
