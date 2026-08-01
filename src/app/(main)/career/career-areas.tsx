import { CircuitBoard, Headset, Truck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * CareerAreas — broad functions the business is built from (battery
 * engineering, component repair, fleet/client support, operations — same
 * domains the Repair section and client brief already describe), not a list
 * of specific open roles. There's no confirmed live job requisition data
 * anywhere in this project, so naming specific titles, headcounts, or
 * application deadlines here would be presenting vacancies that may not
 * exist — see the same discipline `contact-map.tsx` applies to addresses and
 * `app-download.tsx` applies to store links.
 */
const AREAS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: CircuitBoard,
    title: "Battery Engineering & Diagnostics",
    description: "Cell-level and pack-level testing, thermal management, BMS analysis.",
  },
  {
    icon: Wrench,
    title: "Component-Level Repair",
    description: "Hands-on diagnostics-led repair down to the busbar and cell.",
  },
  {
    icon: Headset,
    title: "Fleet & Client Support",
    description: "Direct engineering contact for taxi fleets, dealerships, and corporates.",
  },
  {
    icon: Truck,
    title: "Operations & Logistics",
    description: "Keeping assessments, parts, and islandwide service moving on schedule.",
  },
];

export function CareerAreas() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Where You Could Work</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Areas We Hire For
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              We don&apos;t always have every role open — reach out and
              we&apos;ll match you to what&apos;s available.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
          {AREAS.map((area, index) => (
            <RevealWrapper key={area.title} variant="fade" delay={index * 0.08}>
              <div className="border-border bg-background flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
                <div className="ring-ion/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                  <area.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-h4 text-foreground">{area.title}</span>
                  <span className="font-body text-muted text-sm leading-relaxed">
                    {area.description}
                  </span>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
