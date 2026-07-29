"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

export type StatConfig = {
  value: number | null;
  decimals?: number;
  suffix?: string;
};

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  /** The white trust-panel card — fades/lifts in first, ahead of its contents. */
  containerRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement[]>;
  iconsRef: RefObject<HTMLDivElement[]>;
  underlinesRef: RefObject<HTMLSpanElement[]>;
  valueRefs: RefObject<HTMLSpanElement[]>;
  statConfigs: readonly StatConfig[];
};

/**
 * One-shot GSAP reveal for the "Company Highlights" trust panel: the card
 * fades/lifts in first, then the five columns stagger in together with their
 * icons (a very slight scale-up), the ion-blue underline growing beneath each
 * title a beat after, and numeric stats counting up last. Hover state (icon
 * glow, underline widening) is plain CSS `group-hover`, not GSAP — simple
 * enough it doesn't need a scripted interaction, and it means the GSAP-driven
 * entrance transform on the underline has to be cleared once it settles (via
 * `clearProps`) so the CSS `hover:scale-x-*` class can take over cleanly
 * afterward instead of fighting a leftover inline style.
 */
export function useAuthorityReveal({
  sectionRef,
  containerRef,
  statsRef,
  iconsRef,
  underlinesRef,
  valueRefs,
  statConfigs,
}: Refs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      gsap.set([containerRef.current, ...statsRef.current, ...iconsRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      gsap.set(underlinesRef.current, { scaleX: 1 });
      return;
    }

    const stats = statsRef.current;
    const icons = iconsRef.current;
    const underlines = underlinesRef.current;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 0, y: 32 });
      gsap.set(stats, { opacity: 0, y: 14 });
      gsap.set(icons, { opacity: 0, scale: 0.82 });
      gsap.set(underlines, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
        defaults: { ease: EASE_ENGINEERED_CSS },
        onComplete: () => {
          // Hand the underline's transform back to CSS so `group-hover:scale-x-125`
          // isn't fighting a leftover inline `scaleX(1)` from the entrance tween.
          gsap.set(underlines, { clearProps: "scale,transform" });
        },
      });

      tl.to(containerRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .addLabel("columns", "-=0.4")
        .to(stats, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 }, "columns")
        .to(icons, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12 }, "columns")
        .to(underlines, { scaleX: 1, duration: 0.4, stagger: 0.12 }, "columns+=0.25");

      statConfigs.forEach((config, index) => {
        if (config.value === null) return;
        const el = valueRefs.current[index];
        if (!el) return;

        const decimals = config.decimals ?? 0;
        const suffix = config.suffix ?? "";
        const target = config.value;
        const proxy = { n: 0 };
        gsap.set(el, { textContent: `${(0).toFixed(decimals)}${suffix}` });

        tl.to(
          proxy,
          {
            n: target,
            duration: 1.3,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${proxy.n.toFixed(decimals)}${suffix}`;
            },
          },
          // Starts once this item's own column has essentially arrived, so the
          // icon/title/underline read as settling first and the number as
          // resolving shortly after, not simultaneously.
          `columns+=${(index * 0.12 + 0.35).toFixed(2)}`,
        );
      });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);
}
