"use client";

import { BadgeCheck, Cpu, Handshake, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Button, Container, Heading, Paragraph } from "@/components/ui";

import { FeatureItem } from "./feature-item";
import { useWhyChooseUsReveal } from "./use-why-choose-us-reveal";

// Client-approved copy (the typed feature list takes priority over the
// reference mockup's own labels where the two differ, e.g. item 4).
const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Global Trust",
    description: "Worldwide authorised service agent",
  },
  {
    icon: Handshake,
    title: "Engineering Expertise",
    description: "Component-level battery diagnostics and repair",
  },
  {
    icon: Cpu,
    title: "Advanced Technology",
    description: "Battery testing, thermal management and engineering",
  },
  {
    icon: BadgeCheck,
    title: "Safety & Reliability",
    description: "Certified repair standards and quality assurance",
  },
  {
    icon: Users,
    title: "Industry Trusted",
    description: "Trusted by fleets, dealerships and enterprise customers",
  },
] as const;

const PULSE_COUNT = 4;
const PARTICLE_COUNT = 4;

/**
 * Why Choose NEO ENERGY — no card. The engineering artwork is the section's
 * own full-width background (same pattern CTA's Earth image uses), not an
 * image sitting inside a bordered/shadowed panel — per direct client
 * feedback, a floating white card here read as "another SaaS card," not a
 * continuation of the homepage's own cinematic scenes. A wide radial mask
 * (not a hard-edged box) is what blends the artwork into the surrounding
 * `bg-void` page in every direction, so there's no visible boundary between
 * this section and the ones around it.
 */
export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pulseRefs = useRef<HTMLDivElement[]>([]);
  const particleRefs = useRef<HTMLDivElement[]>([]);

  useWhyChooseUsReveal({
    sectionRef,
    contentRef,
    artworkRef,
    glowRef,
    pulseRefs,
    particleRefs,
  });

  return (
    <Section
      id="why-choose-us"
      ref={sectionRef}
      className="bg-void relative min-h-0 py-[100px]"
    >
      {/* Ambient blue lighting */}
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 right-1/4 h-[36rem] w-[36rem] translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      {/* Artwork — mobile: a normal-flow block above the content; desktop: the
          section's own full-bleed background, not a boxed image. Zoomed +
          anchored right (via `scale`/`origin-right`) so the battery sits
          close to the section's true right edge. The wide radial mask fades
          it out smoothly in every direction — left (where the text sits),
          and top/bottom (so it blends into the sections above/below instead
          of cutting off hard at this section's own boundary). */}
      <div
        ref={artworkRef}
        className="relative z-0 h-56 w-full overflow-hidden sm:h-72 lg:absolute lg:inset-0 lg:h-full lg:w-full lg:overflow-visible"
        style={{
          maskImage:
            "radial-gradient(ellipse 78% 92% at 78% 46%, black 25%, black 50%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 92% at 78% 46%, black 25%, black 50%, transparent 92%)",
        }}
      >
        <Image
          src="/images/why-choose-engineering.webp"
          alt="NEO ENERGY battery chip glowing on a circuit board, engineered for reliability"
          fill
          sizes="(min-width: 1024px) 100vw, 100vw"
          className="origin-right scale-[1.15] object-cover object-right"
          priority={false}
        />

        {/* Soft breathing glow behind the chip — low intensity, never flashy */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="bg-ion/25 pointer-events-none absolute top-1/2 right-[12%] h-40 w-40 -translate-y-1/2 rounded-full opacity-30 blur-[70px] lg:right-[18%] lg:h-56 lg:w-56"
        />

        {/* Tiny energy pulses branching across the PCB traces near the chip */}
        {Array.from({ length: PULSE_COUNT }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) pulseRefs.current[index] = el;
            }}
            aria-hidden="true"
            className="bg-ion pointer-events-none absolute h-1.5 w-1.5 rounded-full"
            style={{
              top: `${34 + index * 11}%`,
              right: `${10 + index * 8}%`,
              boxShadow: "0 0 4px 1px rgba(46,143,255,0.9), 0 0 20px 6px rgba(46,143,255,0.22)",
            }}
          />
        ))}

        {/* Faint floating dust particles — depth, not attention */}
        {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) particleRefs.current[index] = el;
            }}
            aria-hidden="true"
            className="bg-ion/40 pointer-events-none absolute h-1 w-1 rounded-full blur-[0.5px]"
            style={{
              top: `${28 + index * 13}%`,
              right: `${6 + index * 11}%`,
            }}
          />
        ))}
      </div>

      {/* Content — normal flow on mobile (below the artwork), overlaid on
          the left ~58% of the section on desktop. No container/panel
          styling — sits directly on the page/artwork. */}
      <Container className="relative z-10">
        <div
          ref={contentRef}
          className="flex flex-col items-center gap-8 text-center lg:max-w-[58%] lg:items-start lg:text-left"
        >
          <span className="text-ion font-mono text-[0.8rem] font-semibold tracking-[0.14em] uppercase">
            Engineered for excellence. Built for reliability.
          </span>

          <Heading as="h2" size="h2">
            Powering the Future
            <br />
            with Advanced Energy Solutions
          </Heading>

          <Paragraph size="body" className="max-w-xl">
            Singapore&apos;s authorised EV battery engineering specialist delivering
            advanced battery solutions, diagnostics, lifecycle support and
            component-level expertise for fleets, dealerships and enterprise
            customers.
          </Paragraph>

          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className={
                  index === FEATURES.length - 1 ? "col-span-2 lg:col-span-1" : undefined
                }
              >
                <FeatureItem
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>

          <Button href="#cta" variant="primary" className="w-full lg:w-auto">
            About NEO Energy
          </Button>
        </div>
      </Container>
    </Section>
  );
}
