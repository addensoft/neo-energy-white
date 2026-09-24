"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container } from "@/components/ui";
import { type Certificate } from "@/lib/certificates";

/**
 * CertificateGrid — certificates grouped into their own section by issuer
 * (CALB, then CATL, then Ngee Ann Polytechnic, per `@/lib/certificates.ts`'s
 * order), each section a 4-per-row grid (down to 2 on mobile) that starts
 * on a fresh row — so a single-certificate issuer like CATL sits alone
 * rather than sharing a row with the next issuer's certificates. Grouping
 * assumes same-issuer certificates are already adjacent in the source
 * array, which is how that file is maintained.
 *
 * Every certificate opens a full-screen lightbox on click. The lightbox
 * tracks the clicked certificate's index into the full flat list (not the
 * section), so Left/Right navigation and the "X / total" counter move
 * across every certificate regardless of which section it's in, wrapping
 * at both ends, plus Escape/backdrop-click/✕ to close.
 *
 * `object-contain` (not `object-cover`) in both the grid tiles and the
 * lightbox — these are scanned documents, not photos: cropping into one
 * could cut off a name, date, or seal, which a photo can absorb but a
 * certificate can't.
 */
export function CertificateGrid({ certificates }: { certificates: Certificate[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + certificates.length) % certificates.length,
    );
  }, [certificates.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % certificates.length));
  }, [certificates.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);

    // Lightbox open == the page behind it shouldn't also scroll.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex === null ? null : certificates[activeIndex];

  const sections: { issuer: string; items: { certificate: Certificate; index: number }[] }[] = [];
  certificates.forEach((certificate, index) => {
    const currentSection = sections[sections.length - 1];
    if (currentSection && currentSection.issuer === certificate.issuer) {
      currentSection.items.push({ certificate, index });
    } else {
      sections.push({ issuer: certificate.issuer, items: [{ certificate, index }] });
    }
  });

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-10 lg:gap-14">
        {sections.map((sectionGroup) => (
          <div key={`${sectionGroup.issuer}-${sectionGroup.items[0].index}`} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-ion font-mono text-xs font-semibold tracking-[0.08em] uppercase">
                {sectionGroup.issuer}
              </span>
              <span className="bg-border h-px flex-1" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {sectionGroup.items.map(({ certificate, index }) => (
                <RevealWrapper key={certificate.src} variant="fade" delay={(index % 4) * 0.06}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View certificate: ${certificate.name}, ${certificate.issuer}`}
                    className="group border-border bg-background ease-engineered hover:border-ion/50 flex h-full w-full flex-col overflow-hidden rounded-md border text-left transition-colors duration-300"
                  >
                    <div className="bg-graphite-light relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={certificate.src}
                        alt={`Certificate — ${certificate.name}, ${certificate.issuer}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-contain p-3"
                      />
                      <div className="ease-engineered pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                        <ZoomIn className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="border-border flex flex-col gap-0.5 border-t px-4 py-3">
                      <span className="font-display text-foreground text-sm font-semibold">
                        {certificate.name}
                      </span>
                      <span className="text-ion font-mono text-[0.65rem] tracking-[0.08em] uppercase">
                        {certificate.issuer}
                      </span>
                    </div>
                  </button>
                </RevealWrapper>
              ))}
            </div>
          </div>
        ))}
      </Container>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate — ${active.name}, ${active.issuer}`}
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
            aria-label="Previous certificate"
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
            aria-label="Next certificate"
            className="ease-engineered hover:border-ion/60 hover:text-ion absolute right-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 lg:right-8 lg:h-14 lg:w-14"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.5} />
          </button>

          <div
            className="relative flex max-h-[80vh] w-full max-w-3xl flex-1 items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={`Certificate — ${active.name}, ${active.issuer}`}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 768px, 90vw"
              className="max-h-[80vh] w-auto rounded-md object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="mt-4 flex flex-col items-center gap-1 text-center">
            <span className="font-display text-base font-semibold text-white">
              {active.name}
            </span>
            <span className="text-ion font-mono text-xs tracking-[0.08em] uppercase">
              {active.issuer}
            </span>
            <span className="mt-1 font-mono text-[0.7rem] tracking-[0.08em] text-white/50 uppercase">
              {(activeIndex ?? 0) + 1} / {certificates.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
