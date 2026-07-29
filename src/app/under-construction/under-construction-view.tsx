"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { Button, Heading, Paragraph } from "@/components/ui";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";
import { siteConfig } from "@/lib/site-config";

const PARTICLE_COUNT = 5;

/**
 * UnderConstructionView — the animated body of `/under-construction`.
 *
 * Deliberately self-contained: it borrows only the site's shared design
 * primitives (Button/Heading/Paragraph, the colour + spacing tokens, the
 * `ease-engineered` curve) and none of the homepage's section components or
 * layouts, so this placeholder can be pointed at any not-yet-built route
 * without coupling it to homepage internals.
 *
 * Motion mirrors the restraint used across the rest of the site: one
 * entrance timeline, then a slow float on the artwork, a low-intensity
 * breathing glow behind it, and a few near-invisible drifting particles for
 * depth. All of it is skipped outright under `prefers-reduced-motion`, which
 * settles everything into its final resting state instead.
 */
export function UnderConstructionView() {
  const rootRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<HTMLDivElement[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const animatedEls = [artworkRef.current, contentRef.current];

    if (prefersReducedMotion) {
      gsap.set(animatedEls, { opacity: 1, y: 0, scale: 1 });
      gsap.set(glowRef.current, { opacity: 0.5 });
      return;
    }

    const idleTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      gsap.set(artworkRef.current, { opacity: 0, y: 24, scale: 0.96 });
      gsap.set(contentRef.current, { opacity: 0, y: 20 });
      gsap.set(glowRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: EASE_ENGINEERED_CSS },
        onComplete: () => {
          // Gentle perpetual float — ~10px of travel over a slow cycle.
          idleTweens.push(
            gsap.to(artworkRef.current, {
              y: "+=10",
              duration: 4.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }),
          );

          // Breathing glow, kept low-intensity so it reads as ambient depth.
          idleTweens.push(
            gsap.to(glowRef.current, {
              opacity: 0.75,
              duration: 5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }),
          );

          // Faint drifting particles.
          particleRefs.current.forEach((particle, index) => {
            idleTweens.push(
              gsap.to(particle, {
                x: index % 2 === 0 ? 14 : -14,
                y: -18,
                opacity: 0.55,
                duration: 13 + index * 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              }),
            );
          });
        },
      });

      tl.to(glowRef.current, { opacity: 0.45, duration: 1.4 }, 0)
        .to(artworkRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 0.1)
        .to(contentRef.current, { opacity: 1, y: 0, duration: 1 }, 0.5);
    }, root);

    return () => {
      idleTweens.forEach((tween) => tween.kill());
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={rootRef}
      className="bg-background relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 lg:px-16"
    >
      {/* Engineering grid texture — very low opacity, masked to fade out at
          the edges so it reads as paper texture rather than a visible grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,14,20,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,14,20,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 85%)",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center gap-10 text-center">
        {/* Artwork + its ambient glow */}
        <div className="relative flex w-full justify-center">
          <div
            ref={glowRef}
            aria-hidden="true"
            className="bg-ion/25 pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[100px] lg:h-80 lg:w-80"
          />

          {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) particleRefs.current[index] = el;
              }}
              aria-hidden="true"
              className="bg-ion/40 pointer-events-none absolute h-1 w-1 rounded-full blur-[0.5px]"
              style={{
                top: `${18 + index * 16}%`,
                left: `${20 + index * 15}%`,
              }}
            />
          ))}

          <div
            ref={artworkRef}
            className="relative aspect-[3/2] w-full max-w-md opacity-0"
          >
            {/* The source artwork places the chip in its right-hand third (it
                was authored as a wide banner with left-side negative space),
                so cropping to the far right pulls the chip as close to this
                frame's own centre as `object-position` allows. */}
            <Image
              src="/images/why-choose-engineering.webp"
              alt="NEO ENERGY battery chip on an engineering circuit board"
              fill
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover object-[100%_50%]"
              priority
            />
          </div>
        </div>

        {/* Copy + actions */}
        <div ref={contentRef} className="flex flex-col items-center gap-6 opacity-0">
          <span className="text-ion font-mono text-[0.75rem] font-semibold tracking-[0.28em] uppercase">
            Coming Soon
          </span>

          <Heading as="h1" size="h2" className="max-w-xl">
            This Page Is Under Construction
          </Heading>

          <Paragraph size="body" className="max-w-xl text-balance">
            We&apos;re building something exceptional. Our engineering team is
            preparing this experience with the same precision and quality that
            defines NEO ENERGY&apos;s advanced EV battery solutions. Please check back
            soon.
          </Paragraph>

          <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="/" variant="primary" className="w-full sm:w-auto">
              Return to Homepage
            </Button>
            <Button
              href={`mailto:${siteConfig.contactEmail}`}
              variant="ghost"
              className="w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </div>

          {/* Status indicator */}
          <div className="border-border mt-4 flex items-center gap-2.5 rounded-full border px-4 py-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="bg-ion absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-ion relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="text-muted font-mono text-[0.7rem] tracking-[0.16em] uppercase">
              Development In Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
