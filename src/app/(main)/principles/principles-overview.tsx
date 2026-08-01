import { Container, Heading, Paragraph } from "@/components/ui";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { siteConfig } from "@/lib/site-config";

/**
 * PrinciplesOverview — "01. Company Overview." Every row is a fact this
 * project already has a confirmed source for: `siteConfig.legalName` and
 * `siteConfig.description` (site-config.ts), the authorised-partner list
 * (Trust Bar / About Partners), the GB 38031-2020 standard (Repair section),
 * and "Islandwide, Singapore" (used sitewide). Deliberately no founding
 * date, registered capital, or headcount row — unlike a real investor
 * profile, this project has no confirmed source for any of those, and a
 * placeholder-looking number in a fact table reads as a real one.
 */
const FACTS: { label: string; value: string }[] = [
  { label: "Registered Name", value: siteConfig.legalName },
  {
    label: "Positioning",
    value: "Singapore's authorised EV battery engineering & repair specialist",
  },
  { label: "Authorised Partners", value: "CATL · CALB · BYD" },
  { label: "Certification Standard", value: "GB 38031-2020" },
  { label: "Service Area", value: "Islandwide, Singapore" },
  { label: "Direct Contact", value: siteConfig.whatsappDisplay },
];

export function PrinciplesOverview() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-4 lg:w-[38%] lg:shrink-0">
          <RevealWrapper variant="fade">
            <div className="flex items-center gap-3">
              <span className="font-display text-ion/25 text-4xl font-bold lg:text-5xl">
                01
              </span>
              <span className="text-ion text-label-sm font-mono">Company Overview</span>
            </div>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Who NEO ENERGY Is
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-md text-balance">
              {siteConfig.description}
            </Paragraph>
          </RevealWrapper>
        </div>

        <RevealWrapper variant="fade" delay={0.2} className="flex-1">
          <div className="border-border divide-border border-y sm:border sm:border-y-0 sm:divide-y sm:rounded-md">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="border-border grid grid-cols-1 gap-1 border-t px-1 py-4 first:border-t-0 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-6 sm:border-t-0 sm:px-6 sm:py-5"
              >
                <span className="text-label-sm font-mono">{fact.label}</span>
                <span className="font-body text-foreground text-sm sm:text-base">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
