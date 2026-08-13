import Image from "next/image";
import type { ReactNode } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Heading, Paragraph } from "@/components/ui";

/**
 * EarthCta — the same closing Earth-orbit banner every inner page ends on
 * (`about-cta.tsx`, `career-cta.tsx`, and each existing Services sub-page's
 * own `*-cta.tsx`). Those were each a one-off copy of the same JSX; this is
 * the shared version, introduced because the 13 new workshop-service pages
 * would otherwise be a 13th–19th copy of it. The pre-existing copies are
 * left as they are — not a target of this change.
 */
type EarthCtaProps = {
  heading: ReactNode;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
};

export function EarthCta({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  secondaryExternal,
}: EarthCtaProps) {
  return (
    <section className="bg-void relative min-h-[42vh] overflow-hidden lg:min-h-[54vh]">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/cta-earth.webp"
          alt="Earth at night from orbit, illuminated by connected global city lights"
          fill
          sizes="100vw"
          className="object-cover object-[58%_28%]"
          priority={false}
        />
      </div>

      <div className="px-gutter lg:px-gutter-lg relative z-10 flex h-full min-h-[42vh] flex-col justify-center gap-6 py-16 lg:min-h-[54vh] lg:max-w-[50vw] lg:py-0">
        <RevealWrapper variant="blur" duration={1}>
          <Heading as="h2" size="h2" className="text-white uppercase">
            {heading}
          </Heading>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.15}>
          <Paragraph size="body" className="max-w-md text-balance text-white/80">
            {body}
          </Paragraph>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.3}>
          {/* `flex` with each Button `flex-1`, not `flex-wrap` — the two
              actions stay side by side as equal columns at every viewport
              width, rather than the second one dropping to its own row on
              narrow screens. */}
          <div className="flex items-center gap-3">
            <Button
              href={primaryHref}
              variant="primary"
              className="flex-1 justify-center border-white bg-transparent px-4 text-white sm:px-8"
            >
              {primaryLabel}
            </Button>

            {secondaryLabel && secondaryHref && (
              <Button
                href={secondaryHref}
                {...(secondaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                variant="primary"
                className="flex-1 justify-center border-white bg-transparent px-4 text-white sm:px-8"
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
