import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Heading, Paragraph } from "@/components/ui";

/**
 * AboutCta — closes the page the same way the homepage closes (§2 Chapter 8):
 * the Earth image, edge to edge, no scrim, white type relying on the photo's
 * own dark upper-left starfield for contrast (see `sections/cta/index.tsx`
 * for why — the client explicitly rejected a gradient wash here). Routes to
 * the real Contact page this project built, rather than the homepage's own
 * `#cta` mailto button, since a visitor already reading About is one click
 * from a dedicated contact experience, not a bare mailto link.
 */
export function AboutCta() {
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
            Your Battery Has A<br />
            Future. <span className="text-ion">Let&apos;s Engineer It.</span>
          </Heading>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.15}>
          <Paragraph size="body" className="max-w-md text-balance text-white/80">
            Talk to the engineers who&apos;ll actually work on your fleet —
            not a call centre.
          </Paragraph>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.3}>
          <Button href="/contact" variant="primary" className="border-white bg-transparent text-white">
            Talk To Our Engineers
          </Button>
        </RevealWrapper>
      </div>
    </section>
  );
}
