import { Headset, PaintBucket, UserRound, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container } from "@/components/ui";

/**
 * CareerAreas — "Open Positions", matching TEAM AUTOPRO's own "Join Us"
 * page verbatim (NEO Energy's parent business, client-confirmed): all four
 * role titles and descriptions are their exact text, per direct
 * instruction. Icons are the one thing not from the source (their page
 * doesn't expose distinct per-card icons in its markup) — picked to fit
 * each role, a design choice rather than content.
 */
const POSITIONS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wrench,
    title: "Continental & Asian Make Mechanics",
    description:
      "Diagnose, service, and repair a wide range of vehicles with expert knowledge across both European and Asian makes.",
  },
  {
    icon: Headset,
    title: "Service Advisors",
    description:
      "Be the bridge between our customers and workshop team — advising on services, managing jobs, and ensuring satisfaction.",
  },
  {
    icon: UserRound,
    title: "Front Desk Administrator",
    description:
      "Keep operations running smoothly — handle appointments, walk-ins, and ensure every customer feels welcome from the first hello.",
  },
  {
    icon: PaintBucket,
    title: "Panel Beaters",
    description:
      "Restore vehicles to their former glory — skilled work in panel repair, reshaping, and bodywork finishing.",
  },
];

export function CareerAreas() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <RevealWrapper variant="fade">
          <span className="text-ion font-mono text-sm font-semibold tracking-[0.1em] uppercase">
            Open Positions
          </span>
        </RevealWrapper>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
          {POSITIONS.map((position, index) => (
            <RevealWrapper key={position.title} variant="fade" delay={index * 0.08}>
              <div className="border-border bg-background flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
                <div className="ring-ion/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                  <position.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-h4 text-foreground">{position.title}</span>
                  <span className="font-body text-muted text-sm leading-relaxed">
                    {position.description}
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
