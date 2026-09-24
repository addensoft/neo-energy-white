"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { WhatsAppIcon } from "@/components/layout/social-icons";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container, Heading } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import type { PromoBrochure } from "@/lib/promo-brochures";

/**
 * PromoBrochures — the two real posters NEO Energy's own design team
 * produced (see `@/lib/promo-brochures.ts`), shown as clickable cards.
 * Clicking either opens a full-screen lightbox with Left/Right
 * navigation between the two (wraps at both ends) — same interaction
 * language as `CertificateGrid`'s lightbox, kept as its own copy here
 * rather than extracted into a shared component: the caption content
 * differs (a WhatsApp enquiry CTA per poster here, a name/issuer pair
 * there), so sharing would mean threading render-prop-shaped captions
 * through a generic wrapper for just two call sites.
 *
 * `object-contain` throughout — these are print posters, not photos;
 * cropping would cut off real pricing or contact details.
 */
export function PromoBrochures({ brochures }: { brochures: PromoBrochure[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + brochures.length) % brochures.length,
    );
  }, [brochures.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % brochures.length));
  }, [brochures.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex === null ? null : brochures[activeIndex];

  const whatsappHrefFor = (brochure: PromoBrochure) =>
    `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      `Hi ${siteConfig.name}, I'd like to enquire about "${brochure.title}".`,
    )}`;

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Current Brochures</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Live Promotions
            </Heading>
          </RevealWrapper>
        </div>

        <div className="mx-auto grid w-[90%] grid-cols-1 gap-6 sm:grid-cols-2">
          {brochures.map((brochure, index) => (
            <RevealWrapper
              key={brochure.src}
              variant="blur"
              delay={index * 0.1}
              duration={0.7}
              className="h-full"
            >
              <div className="group border-border bg-background ease-engineered hover:border-ion/50 flex h-full flex-col overflow-hidden rounded-md border transition-colors duration-300">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View brochure: ${brochure.title}`}
                  className="bg-graphite-light relative aspect-[3/4] w-full overflow-hidden"
                >
                  <Image
                    src={brochure.src}
                    alt={brochure.title}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-contain"
                  />
                  <div className="ease-engineered pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                    <ZoomIn className="h-7 w-7 text-white" strokeWidth={1.5} />
                  </div>
                </button>
                <div className="border-border flex flex-1 flex-col gap-3 border-t px-5 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-foreground text-base font-semibold">
                      {brochure.title}
                    </span>
                    <span className="font-body text-muted text-sm leading-relaxed">
                      {brochure.summary}
                    </span>
                  </div>
                  <Button
                    href={whatsappHrefFor(brochure)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className="mt-auto w-full"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Enquire Via WhatsApp
                  </Button>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm lg:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="ease-engineered hover:border-ion/60 hover:text-ion absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 lg:top-8 lg:right-8"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            aria-label="Previous brochure"
            className="ease-engineered hover:border-ion/60 hover:text-ion absolute left-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 lg:left-8 lg:h-14 lg:w-14"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next brochure"
            className="ease-engineered hover:border-ion/60 hover:text-ion absolute right-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 lg:right-8 lg:h-14 lg:w-14"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.5} />
          </button>

          <div
            className="relative flex max-h-[70vh] w-full max-w-2xl flex-1 items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.title}
              width={1130}
              height={1600}
              sizes="(min-width: 1024px) 640px, 90vw"
              className="max-h-[70vh] w-auto rounded-md object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div
            className="mt-4 flex flex-col items-center gap-3 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="font-display text-base font-semibold text-white">
              {active.title}
            </span>
            <span className="mb-1 font-mono text-[0.7rem] tracking-[0.08em] text-white/50 uppercase">
              {(activeIndex ?? 0) + 1} / {brochures.length}
            </span>
            <Button
              href={whatsappHrefFor(active)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Enquire Via WhatsApp
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
