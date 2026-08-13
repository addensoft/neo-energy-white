import { AlertTriangle, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * ServiceBody — Overview copy, an optional banner image, an "Includes"
 * checklist, and an optional "Signs You Need This" list, in that order. The
 * one repeating shape all 13 workshop-service pages share; pages without a
 * natural "warning signs" list (e.g. Insurance Claims, Fleet Management)
 * just omit `signs`. `image` is likewise optional — Tyres Repair has none:
 * the only image on its TeamAuto source page was mislabelled (a brake-disc
 * photo on the tyres page), so rather than carry that mismatch over, it's
 * left as text-only.
 */
export function ServiceBody({
  overview,
  includes,
  signs,
  image,
  imageAlt,
}: {
  overview: string[];
  includes: string[];
  signs?: string[];
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container size="narrow" className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          {overview.map((paragraph, index) => (
            <RevealWrapper key={index} variant="fade" delay={index * 0.08}>
              <Paragraph size="body">{paragraph}</Paragraph>
            </RevealWrapper>
          ))}
        </div>

        {image && (
          <RevealWrapper variant="blur" duration={0.9}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-[0_20px_50px_-24px_rgba(15,23,42,0.28)]">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>
          </RevealWrapper>
        )}

        <div className="flex flex-col gap-5">
          <RevealWrapper variant="fade">
            <Heading as="h2" size="h4" className="uppercase">
              What&apos;s Included
            </Heading>
          </RevealWrapper>
          <ul className="flex flex-col gap-4">
            {includes.map((item, index) => (
              <RevealWrapper key={item} variant="fade" delay={0.08 + index * 0.05}>
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

        {signs && signs.length > 0 && (
          <div className="border-border bg-graphite/40 flex flex-col gap-5 rounded-md border p-6 lg:p-8">
            <RevealWrapper variant="fade">
              <Heading as="h2" size="h4" className="uppercase">
                Signs You Need This
              </Heading>
            </RevealWrapper>
            <ul className="flex flex-col gap-3">
              {signs.map((item, index) => (
                <RevealWrapper key={item} variant="fade" delay={0.08 + index * 0.05}>
                  <li className="flex items-start gap-3">
                    <AlertTriangle
                      className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                      strokeWidth={1.5}
                    />
                    <span className="font-body text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                </RevealWrapper>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
