import { Award } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Badge, Container, Heading, Paragraph } from "@/components/ui";

/**
 * PrinciplesStandards — "04. Certification & Safety Standards." GB
 * 38031-2020 is the same standard the Repair section already cites
 * ("Every repair verified against GB 38031-2020 and manufacturer
 * tolerances"); the three test categories below restate what that standard
 * itself actually requires (nail penetration, water immersion, vibration/
 * mechanical shock) — the same factual explanation already published in
 * `/news/understanding-gb-38031-2020-battery-certification` — rather than
 * a new claim invented for this page.
 */
const PROOF_POINTS = [
  "Nail Penetration",
  "Water Immersion",
  "Vibration & Mechanical Shock",
] as const;

export function PrinciplesStandards() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex flex-col gap-4 lg:w-[42%] lg:shrink-0">
          <RevealWrapper variant="fade">
            <div className="flex items-center gap-3">
              <span className="font-display text-ion/25 text-4xl font-bold lg:text-5xl">
                04
              </span>
              <span className="text-ion text-label-sm font-mono">
                Certification &amp; Safety
              </span>
            </div>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Tested To GB 38031-2020
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-md text-balance">
              The Chinese national standard for EV traction battery safety —
              and the standard every NEO ENERGY repair is verified against,
              not just the standard a pack was originally built to.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <RevealWrapper variant="fade" delay={0.25}>
            <div className="flex flex-wrap gap-3">
              {PROOF_POINTS.map((point) => (
                <Badge key={point} variant="ion" className="px-4 py-2 text-[0.7rem]">
                  <Award className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {point}
                </Badge>
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper variant="fade" delay={0.3}>
            <Paragraph size="body" className="max-w-xl text-balance">
              Nail penetration confirms a pierced cell won&apos;t ignite or
              explode. Water immersion confirms sealing integrity holds under
              sustained submersion. Vibration and mechanical shock simulate
              years of ordinary driving — potholes, kerbs, daily wear. A
              repair that doesn&apos;t hold to these same tolerances hasn&apos;t
              actually fixed the problem, it&apos;s created a battery that
              looks repaired without being proven safe.
            </Paragraph>
          </RevealWrapper>
        </div>
      </Container>
    </section>
  );
}
