"use client";

import Image from "next/image";
import { useState } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * GalleryGrid — three tabs, "All" / "CALB Training" / "Work".
 *
 * Work: the flagship battery-pack film's own frames (`public/hero-frames`,
 * shot for the Hero section, unused since it moved from scroll-scrubbed
 * canvas to a looping video — repurposed here instead of left dead) plus
 * NEO's real product/detail photography.
 *
 * CALB Training: real photos from NEO Energy's own CALB overseas power
 * battery repair technical training session — the "Charity" tab (TeamAuto's
 * community-event photos) was removed per direct instruction and replaced
 * with these, since they're NEO's own team at NEO's own real event, not a
 * parent business's.
 */
const WORK_IMAGES = [
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

const CALB_TRAINING_IMAGES = [
  {
    src: "/images/gallery/calb-training/calb-training-01.jpeg",
    alt: "NEO ENERGY team receiving certificates at the CALB Overseas Power Battery Technology Training",
  },
  {
    src: "/images/gallery/calb-training/calb-training-02.jpeg",
    alt: "NEO ENERGY team at the CALB power battery technical training venue",
  },
  {
    src: "/images/gallery/calb-training/calb-training-03.jpeg",
    alt: "NEO ENERGY team group photo at the CALB power battery technical training venue",
  },
  {
    src: "/images/gallery/calb-training/calb-training-04.jpeg",
    alt: "NEO ENERGY team with CALB trainers at the CALB power battery repair technical training",
  },
] as const;

const ALL_IMAGES = [...CALB_TRAINING_IMAGES, ...WORK_IMAGES];

const TABS = [
  { id: "all", label: "All", images: ALL_IMAGES },
  { id: "calb-training", label: "CALB Training", images: CALB_TRAINING_IMAGES },
  { id: "work", label: "Work", images: WORK_IMAGES },
] as const;

export function GalleryGrid() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("all");
  const images = TABS.find((tab) => tab.id === activeTab)!.images;

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-10">
        <div className="flex justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={cn(
                "ease-engineered rounded-full border px-6 py-2.5 font-mono text-xs font-semibold tracking-[0.1em] uppercase transition-colors duration-300",
                activeTab === tab.id
                  ? "border-ion bg-ion text-white"
                  : "border-border text-muted hover:border-ion/50 hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {images.map((image, index) => (
            <RevealWrapper key={image.src} variant="fade" delay={(index % 4) * 0.06}>
              <div className="border-border bg-graphite/40 relative aspect-[4/3] w-full overflow-hidden rounded-md border">
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
