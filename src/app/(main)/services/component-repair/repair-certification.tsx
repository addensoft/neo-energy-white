import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Badge, Container, Paragraph } from "@/components/ui";

/**
 * RepairCertification — a compact strip, not a full section: Battery
 * Systems already covers GB 38031-2020 in depth
 * (`services/battery-systems/battery-performance.tsx`). This page just
 * confirms the same standard applies to repair work, without repeating
 * that page's full treatment.
 */
const PROOF_POINTS = [
  "Nail Penetration",
  "1m Water Immersion",
  "Vibration & Mechanical Shock",
] as const;

export function RepairCertification() {
  return (
    <section className="bg-graphite/40 relative py-12 lg:py-16">
      <Container className="relative z-10 flex flex-col items-center gap-5 text-center">
        <RevealWrapper variant="fade">
          <Paragraph size="body" className="max-w-lg text-balance">
            Every repair is verified against{" "}
            <span className="text-foreground font-semibold">GB 38031-2020</span>{" "}
            — the same standard the pack was originally built to.
          </Paragraph>
        </RevealWrapper>
        <RevealWrapper variant="fade" delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROOF_POINTS.map((point) => (
              <Badge key={point} variant="ion" className="px-4 py-2 text-[0.7rem]">
                {point}
              </Badge>
            ))}
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
