import Image from "next/image";
import Link from "next/link";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Heading, Paragraph } from "@/components/ui";

/**
 * DiagnosticsCta — closes on the same Earth banner used sitewide, routing
 * to Contact. Also links to `/promo`, where "Your First Battery
 * Diagnostic" (15% off for first-time customers) is a real live offer —
 * directly relevant to a visitor reading this exact page, not a generic
 * cross-link.
 */
export function DiagnosticsCta() {
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

      <div className="px-gutter lg:px-gutter-lg relative z-10 flex h-full min-h-[42vh] flex-col justify-center gap-6 py-16 lg:min-h-[54vh] lg:max-w-[38vw] lg:py-0">
        <RevealWrapper variant="blur" duration={1}>
          <Heading as="h2" size="h2" className="text-white uppercase">
            Not Sure What&apos;s
            <br />
            <span className="text-ion">Wrong? Find Out.</span>
          </Heading>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.15}>
          <Paragraph size="body" className="max-w-md text-balance text-white/80">
            Talk to the engineers who&apos;ll actually run the diagnostic —
            not a call centre.
          </Paragraph>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              href="/contact"
              variant="primary"
              className="border-white bg-transparent text-white"
            >
              Talk To Our Engineers
            </Button>
            <Link
              href="/promo"
              className="ease-engineered font-mono text-xs font-semibold tracking-[0.04em] text-white/70 uppercase underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white"
            >
              15% Off Your First Diagnostic
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
