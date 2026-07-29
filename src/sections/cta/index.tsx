"use client";

import Image from "next/image";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Button, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

import { useCtaReveal } from "./use-cta-reveal";

/**
 * Final CTA — approved client reference (v2): the Earth image IS the section,
 * edge to edge, with no gradient/scrim washing over it — the client
 * explicitly rejected the earlier left-to-right white wash for reading as a
 * "two column" layout. Text sits directly on the image (white ink, since the
 * page's default dark-ink type isn't legible here), relying on the photo's
 * own dark upper-left starfield for contrast — the same reason Hero's
 * copy gets away with no scrim either.
 */
export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const imageFloatRef = useRef<HTMLDivElement>(null);
  const imageScaleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useCtaReveal({
    sectionRef,
    headingRef,
    paragraphRef,
    imageFloatRef,
    imageScaleRef,
    glowRef,
    sweepRef,
    ctaRef,
  });

  return (
    <Section
      id="cta"
      ref={sectionRef}
      className="bg-void relative min-h-[46vh] overflow-hidden lg:min-h-[65vh]"
    >
      {/* Earth image — the full banner background at every breakpoint (not
          just desktop): the approved mobile reference shows the headline/
          paragraph/button sitting directly on the image, not stacked below a
          separate strip of it. Absolutely positioned against Section's own
          box so its height is never at the mercy of flex-stretch vs.
          percentage-height resolution against an auto-height container. */}
      <div ref={imageFloatRef} className="absolute inset-0 h-full w-full">
        <div ref={imageScaleRef} className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/cta-earth.webp"
            alt="Earth at night from orbit, illuminated by connected global city lights"
            fill
            sizes="100vw"
            className="object-cover object-[58%_28%]"
            priority={false}
          />
          {/* Soft atmosphere glow */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="bg-ion/40 pointer-events-none absolute -top-1/4 right-0 h-[70%] w-[45%] rounded-full blur-[120px]"
          />
          {/* Light sweep across the horizon */}
          <div
            ref={sweepRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 [mix-blend-mode:screen]"
            style={{
              background:
                "linear-gradient(75deg, transparent 42%, rgba(120,190,255,0.35) 50%, transparent 58%)",
            }}
          />
        </div>
      </div>

      {/* Content — floats directly on the image, no scrim, no separate
          column. Section shrank (was min-h-screen/70vh — 30-35% smaller per
          the client), so the old lg:mt-16 downward nudge is dropped; letting
          Section's own justify-center handle balance keeps it from reading
          as dead space above the heading now that there's less room. */}
      <div className="px-gutter lg:px-gutter-lg relative z-10 flex flex-col justify-center gap-6 py-8 lg:max-w-[38vw] lg:py-0">
        <div ref={headingRef}>
          <Heading as="h2" size="h2" className="text-white uppercase">
            Let&apos;s Build The
            <br />
            Future of <span className="text-ion">Energy.</span>
          </Heading>
        </div>

        <div ref={paragraphRef}>
          <Paragraph size="body" className="max-w-md text-balance text-white/80">
            Partner with NEO ENERGY for reliable, advanced and future-ready EV
            battery solutions.
          </Paragraph>
        </div>

        <div ref={ctaRef}>
          <Button
            href={`mailto:${siteConfig.contactEmail}`}
            variant="primary"
            className="border-white bg-transparent text-white"
          >
            Request Assessment
          </Button>
        </div>
      </div>
    </Section>
  );
}
