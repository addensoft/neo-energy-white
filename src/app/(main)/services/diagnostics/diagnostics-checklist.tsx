import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * DiagnosticsChecklist — what a diagnostic actually measures, built from the
 * same real performance facts `services/battery-systems/battery-
 * performance.tsx` already states (cycle life, thermal management,
 * certification tolerances) plus the busbar/BMS scope
 * `services/component-repair` already covers — reframed as what gets
 * checked, not restated as new figures.
 */
const CHECKLIST = [
  "Cycle life and remaining capacity, measured against the cell's rated retention",
  "Busbar connection integrity and BMS board readings",
  "Cooling system performance under simulated fast-charge load",
  "Full compliance check against GB 38031-2020 and manufacturer tolerances",
] as const;

export function DiagnosticsChecklist() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <RevealWrapper variant="blur" duration={0.9}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-[0_20px_50px_-24px_rgba(15,23,42,0.28)]">
            <Image
              src="/images/componennt-level.jpeg"
              alt="A battery management chip glowing blue on a circuit board"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </RevealWrapper>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <RevealWrapper variant="fade">
              <span className="text-ion text-label-sm font-mono">What Gets Checked</span>
            </RevealWrapper>
            <RevealWrapper variant="blur" delay={0.1} duration={1}>
              <Heading as="h2" size="h2" className="uppercase">
                Every Diagnostic Covers This
              </Heading>
            </RevealWrapper>
            <RevealWrapper variant="fade" delay={0.2}>
              <Paragraph size="body" className="text-balance">
                The same checks whether it&apos;s a routine assessment or the
                first step before a repair.
              </Paragraph>
            </RevealWrapper>
          </div>

          <ul className="flex flex-col gap-4">
            {CHECKLIST.map((item, index) => (
              <RevealWrapper key={item} variant="fade" delay={0.3 + index * 0.08}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-ion mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
                  <span className="font-body text-foreground text-base leading-[1.8]">
                    {item}
                  </span>
                </li>
              </RevealWrapper>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
