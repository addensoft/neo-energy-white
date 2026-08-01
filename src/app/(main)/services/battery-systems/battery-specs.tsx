import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph, Stat, StatRow } from "@/components/ui";

/**
 * BatterySpecs — the pack's real structural figures, the exact same numbers
 * `sections/exploded-view/spec-row.tsx` already states (that chapter is
 * on-hold/unshipped — see its own file comment — but the figures themselves
 * are from the real engineering dossier this project was given, not
 * invented for this page). Reuses the site's own `Stat`/`StatRow`
 * primitives rather than a bespoke tile grid, so this reads as the same
 * "quantitative proof" voice used everywhere else specs appear.
 */
export function BatterySpecs() {
  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">The Pack, By The Numbers</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Real Engineering, Real Figures
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              Not marketing numbers — the same specification sheet every pack
              is built and repaired to.
            </Paragraph>
          </RevealWrapper>
        </div>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="border-border bg-graphite/60 rounded-md border p-6 lg:p-8">
            <StatRow>
              <Stat value="77.94 kWh" label="Total Energy" />
              <Stat value="≤ 550 kg" label="Pack Weight" />
              <Stat value="1878 × 1320mm" label="Footprint" />
              <Stat value="22" label="Mounting Points" />
              <Stat value="214Ah" label="Cell Capacity" />
            </StatRow>
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
