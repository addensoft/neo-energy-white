import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

import { ComponentRain } from "./component-rain";

/**
 * RepairExplainer — the same explanation already published in
 * `/news/why-component-level-repair-outperforms-pack-swapping`
 * (`@/lib/news.ts`), condensed to its two core paragraphs rather than
 * duplicated in full, with a link to the complete article for anyone who
 * wants the rest — real content shared between two pages, not rewritten
 * twice.
 */
export function RepairExplainer() {
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
            <ComponentRain />
          </div>
        </RevealWrapper>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <RevealWrapper variant="fade">
              <span className="text-ion text-label-sm font-mono">
                Not A Full Pack Swap
              </span>
            </RevealWrapper>
            <RevealWrapper variant="blur" delay={0.1} duration={1}>
              <Heading as="h2" size="h2" className="uppercase">
                Why Go Component-Level?
              </Heading>
            </RevealWrapper>
          </div>

          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="text-balance">
              A battery pack isn&apos;t one component; it&apos;s an assembly
              of individual cells, busbars connecting them, and a battery
              management system (BMS) monitoring all of it. A fault in one
              cell group, a stressed busbar joint, or a BMS board reading
              incorrectly doesn&apos;t mean the other 90% of the pack has
              failed — it means one identifiable part has.
            </Paragraph>
          </RevealWrapper>

          <RevealWrapper variant="fade" delay={0.3}>
            <Paragraph size="body" className="text-balance">
              A full pack replacement discards cells that were still
              performing correctly, and a new pack still has to be
              integrated and verified against the vehicle&apos;s own
              systems. A precise component repair, verified to the same
              certification standard the pack was built to, restores exactly
              what failed — nothing more, nothing less.
            </Paragraph>
          </RevealWrapper>

          <RevealWrapper variant="fade" delay={0.4}>
            <Link
              href="/news/why-component-level-repair-outperforms-pack-swapping"
              className="text-ion ease-engineered flex w-fit items-center gap-1.5 font-mono text-sm font-semibold tracking-[0.04em] uppercase transition-transform duration-300 hover:translate-x-1"
            >
              Read The Full Explainer
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </RevealWrapper>
        </div>
      </Container>
    </section>
  );
}
