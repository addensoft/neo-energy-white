"use client";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";
import { PartnerMark } from "@/sections/trust-bar/partner-mark";

/**
 * BatteryPartners — the same official partner marks the homepage's Trust
 * Bar and `/about` already use (`sections/trust-bar/partner-mark.tsx`), for
 * visitors who land on this service page directly.
 *
 * `"use client"`: `PartnerMark` requires a function `innerRef` prop, and a
 * Server Component can't pass a plain closure across that boundary — same
 * reasoning `about-partners.tsx` documents.
 */
const PARTNERS = [
  { name: "CATL", src: "/logos/catl.svg", aspect: 1024 / 216, sizeClassName: "h-6 lg:h-7" },
  { name: "CALB", src: "/logos/calb.png", aspect: 1660 / 300, sizeClassName: "h-6 lg:h-7" },
  { name: "BYD", src: "/logos/byd.svg", aspect: 1920 / 480, sizeClassName: "h-5 lg:h-6" },
  { name: "NIO", src: "/logos/nio.svg", aspect: 2500 / 931, sizeClassName: "h-9 lg:h-10" },
  {
    name: "Mazda",
    src: "/logos/mazda.svg",
    aspect: 2489.78 / 601.44,
    sizeClassName: "h-7 lg:h-8",
    suffix: "(TBC)",
  },
] as const;

export function BatteryPartners() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Authorised By</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h3" className="uppercase">
              Direct Agent Of The Top 2 EV / Hybrid Battery
            </Heading>
          </RevealWrapper>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PARTNERS.map((partner, index) => (
            <RevealWrapper key={partner.name} variant="fade" delay={index * 0.08}>
              <PartnerMark
                name={partner.name}
                src={partner.src}
                aspect={partner.aspect}
                sizeClassName={partner.sizeClassName}
                suffix={"suffix" in partner ? partner.suffix : undefined}
                innerRef={() => {}}
              />
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
