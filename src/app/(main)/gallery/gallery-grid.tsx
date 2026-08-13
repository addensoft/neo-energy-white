"use client";

import Image from "next/image";
import { useState } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * GalleryGrid — three tabs, "All" / "Charity" / "Work", matching
 * teamauto.sg's own gallery order (their "All / Charity / Our Work" filter)
 * per direct instruction.
 *
 * Work: the flagship battery-pack film's own frames (`public/hero-frames`,
 * shot for the Hero section, unused since it moved from scroll-scrubbed
 * canvas to a looping video — repurposed here instead of left dead) plus
 * NEO's real product/detail photography.
 *
 * Charity: real photos from TEAM AUTOPRO's own community events (NEO
 * Energy's parent business, client-confirmed) — genuine event photos, not
 * stock; several still carry their original iPhone EXIF data. TeamAuto's
 * live charity gallery has 100+ images across several distinct events; this
 * is a curated spread across all of them (Nov/Dec 2022, Jun/Jul 2025, an
 * April 2024 Tampines event, Feb 2026), not the full raw dump — importing
 * every single one would mostly be near-duplicate crowd shots from the same
 * events, at a cost to both page performance and how curated the rest of
 * this site is.
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

const CHARITY_IMAGES = [
  { src: "/images/gallery/charity/charity-01.jpg", alt: "Community event with volunteers and elderly residents" },
  { src: "/images/gallery/charity/charity-02.jpg", alt: "Volunteers at a community charity event" },
  { src: "/images/gallery/charity/charity-03.jpg", alt: "Community charity event activities" },
  { src: "/images/gallery/charity/charity-04.jpg", alt: "Volunteers and residents at a Tampines charity event" },
  { src: "/images/gallery/charity/charity-05.jpeg", alt: "Team members at a community outreach event" },
  { src: "/images/gallery/charity/charity-06.jpeg", alt: "Community outreach event" },
  { src: "/images/gallery/charity/charity-07.jpeg", alt: "Team volunteering at a community event" },
  { src: "/images/gallery/charity/charity-08.jpeg", alt: "Community charity drive" },
  { src: "/images/gallery/charity/charity-09.jpeg", alt: "Volunteers at a charity outreach event" },
  { src: "/images/gallery/charity/charity-10.jpg", alt: "Community event" },
  { src: "/images/gallery/charity/charity-11.jpg", alt: "Volunteers at a community event" },
  { src: "/images/gallery/charity/charity-12.jpg", alt: "Community charity event" },
  { src: "/images/gallery/charity/charity-13.jpg", alt: "Community outreach activities" },
  { src: "/images/gallery/charity/charity-14.jpg", alt: "Volunteers at a community event" },
  { src: "/images/gallery/charity/charity-15.jpg", alt: "Community charity event" },
  { src: "/images/gallery/charity/charity-16.jpeg", alt: "Community outreach event" },
  { src: "/images/gallery/charity/charity-17.jpeg", alt: "Volunteers at a community event" },
  { src: "/images/gallery/charity/charity-18.jpeg", alt: "Community charity event" },
] as const;

const ALL_IMAGES = [...CHARITY_IMAGES, ...WORK_IMAGES];

const TABS = [
  { id: "all", label: "All", images: ALL_IMAGES },
  { id: "charity", label: "Charity", images: CHARITY_IMAGES },
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
