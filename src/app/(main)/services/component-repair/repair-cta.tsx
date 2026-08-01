import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Heading, Paragraph } from "@/components/ui";

/**
 * RepairCta — closes on the same Earth banner used sitewide, routing to the
 * real Contact page.
 */
export function RepairCta() {
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
            Got A Fault? Let&apos;s
            <br />
            <span className="text-ion">Diagnose It.</span>
          </Heading>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.15}>
          <Paragraph size="body" className="max-w-md text-balance text-white/80">
            Talk to the engineers who&apos;ll actually work on your pack —
            not a call centre.
          </Paragraph>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.3}>
          <Button
            href="/contact"
            variant="primary"
            className="border-white bg-transparent text-white"
          >
            Talk To Our Engineers
          </Button>
        </RevealWrapper>
      </div>
    </section>
  );
}
