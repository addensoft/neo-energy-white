import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container } from "@/components/ui";

/**
 * GalleryGrid — real NEO imagery only, no stand-in stock categories.
 * TeamAuto's own gallery groups into "Charity" / "Our Work" / "All", but
 * this project has no real charity-event or facility photos to put in a
 * "Charity" tab — so rather than fabricate one, this is a single grid of
 * what's actually real: the flagship battery-pack film's own frames
 * (`public/hero-frames`, shot for the Hero section, unused since it moved
 * from scroll-scrubbed canvas to a looping video — repurposed here instead
 * of left dead) plus the site's real product/detail photography.
 */
const IMAGES = [
  { src: "/images/why-choose-engineering.webp", alt: "NEO ENERGY engineering detail" },
  { src: "/hero-frames/frame-0015.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/images/componennt-level.jpeg", alt: "A battery management chip glowing blue on a circuit board" },
  { src: "/hero-frames/frame-0050.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/images/why-choose-chip.webp", alt: "NEO ENERGY battery management chip detail" },
  { src: "/hero-frames/frame-0110.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/hero-frames/frame-0150.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/hero-frames/frame-0190.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/hero-frames/frame-0230.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/hero-frames/frame-0270.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/hero-frames/frame-0320.webp", alt: "NEO ENERGY flagship battery pack, film still" },
  { src: "/hero-frames/frame-0340.webp", alt: "NEO ENERGY flagship battery pack, film still" },
] as const;

export function GalleryGrid() {
  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {IMAGES.map((image, index) => (
            <RevealWrapper key={image.src} variant="fade" delay={(index % 4) * 0.06}>
              <div className="border-border relative aspect-[4/3] w-full overflow-hidden rounded-md border">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="ease-engineered object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
