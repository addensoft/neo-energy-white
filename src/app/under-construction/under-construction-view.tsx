"use client";

import {
  BatteryCharging,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";
import { siteConfig } from "@/lib/site-config";

/** WhatsApp contact — digits only for the wa.me deep link, plus the
 * human-readable form shown in the footer bar. */
const WHATSAPP_NUMBER = "6580712233";
const WHATSAPP_DISPLAY = "+65 8071 2233";

const FEATURES = [
  { icon: BatteryCharging, label: ["Innovative", "Technology"] },
  { icon: ShieldCheck, label: ["Premium", "Quality"] },
  { icon: Wrench, label: ["Expert", "Service"] },
  { icon: Leaf, label: ["Sustainable", "Future"] },
] as const;

/**
 * UnderConstructionView — the approved standalone placeholder, built to the
 * client's supplied design: the NEO ENERGY battery/robot render as a
 * full-bleed background, centred brand lockup and UNDER/CONSTRUCTION
 * headline over its light upper sky, a four-item capability strip, a
 * closing line + CTA sitting over the floor, and a dark contact bar.
 *
 * Self-contained by design — it uses the brand's colour/spacing tokens and
 * `ease-engineered` curve but none of the homepage's section components, so
 * it can front any not-yet-built route without coupling to them. Motion is
 * a single restrained fade-up on load, skipped entirely under
 * `prefers-reduced-motion`.
 */
export function UnderConstructionView() {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = revealRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(els, { opacity: 0, y: 22 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.14,
        ease: EASE_ENGINEERED_CSS,
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const setRevealRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) revealRefs.current[index] = el;
  };

  return (
    <div ref={rootRef} className="flex min-h-[100dvh] flex-col">
      {/* ---------- Main stage: content over the full-bleed artwork ---------- */}
      <div className="bg-background relative flex flex-1 flex-col overflow-hidden">
        {/* The artwork is anchored to the lower portion of the stage rather
            than full-bleed — matching the approved design, where the brand
            lockup, headline and capability strip sit on clean white space
            and the render begins beneath them. Full-bleed put the battery
            directly behind the capability strip. */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-between gap-8 px-6 py-10 text-center lg:gap-10 lg:px-10 lg:py-14">
          {/* Top: logo → headline → rule → intro → capability strip.
              `relative z-10` keeps it above the render, which becomes an
              absolutely-positioned sibling at `lg`. */}
          <div className="relative z-10 flex w-full flex-col items-center gap-6 lg:gap-7">
            <div ref={setRevealRef(0)}>
              <Image
                src="/images/footer-logo.webp"
                alt={siteConfig.name}
                width={1597}
                height={828}
                priority
                className="h-16 w-auto lg:h-20"
              />
            </div>

            <div ref={setRevealRef(1)} className="flex flex-col items-center">
              <h1 className="font-display text-foreground text-[clamp(2.2rem,8.5vw,4.75rem)] leading-[1.04] font-bold tracking-[0.14em] uppercase">
                Under
              </h1>
              <span className="font-display text-ion text-[clamp(2.2rem,8.5vw,4.75rem)] leading-[1.04] font-bold tracking-[0.03em] uppercase">
                Construction
              </span>
            </div>

            {/* Hairline rule with the brand's blue accent at its centre */}
            <div ref={setRevealRef(2)} className="flex items-center gap-2">
              <span className="via-foreground/25 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
              <span className="bg-ion h-1 w-1 rotate-45" />
              <span className="via-foreground/25 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
            </div>

            <div ref={setRevealRef(3)}>
              <p className="font-body text-foreground/80 text-[0.95rem] leading-relaxed text-balance lg:text-lg">
                We&apos;re building something exceptional.
                <br />
                Our site is under construction.
              </p>
            </div>

            {/* Capability strip — hairline dividers between items on the
                wider layouts, a plain 2-up grid on small screens. */}
            <div
              ref={setRevealRef(4)}
              className="grid w-full max-w-2xl grid-cols-2 gap-y-7 sm:grid-cols-4 sm:gap-y-0"
            >
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.label.join(" ")}
                  className={
                    index > 0
                      ? "sm:border-foreground/15 flex flex-col items-center gap-2.5 sm:border-l"
                      : "flex flex-col items-center gap-2.5"
                  }
                >
                  <feature.icon className="text-ion h-7 w-7" strokeWidth={1.5} />
                  <span className="font-body text-foreground/85 text-[0.68rem] leading-[1.5] tracking-[0.1em] uppercase lg:text-[0.72rem]">
                    {feature.label[0]}
                    <br />
                    {feature.label[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* The render. Two different jobs by breakpoint, one element:
              - mobile: an in-flow band between the strip above and the copy
                below. Absolutely positioning it here (as desktop does) put
                the battery straight through the labels on a narrow, tall
                viewport.
              - lg and up: lifted out of flow into the stage's lower 72% so
                the closing line and CTA sit over the render's floor, as the
                approved design shows. */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative -mx-6 h-56 w-[calc(100%+3rem)] shrink-0 sm:h-72 lg:absolute lg:inset-x-0 lg:bottom-0 lg:z-0 lg:mx-0 lg:h-[72%] lg:w-full"
          >
            <Image
              src="/images/construction-page-artwork.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            {/* Dissolves the render's own top edge into the white page so
                there's no visible seam where it starts. */}
            <div
              className="absolute inset-x-0 top-0 h-2/5"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 35%, rgba(255,255,255,0.35) 70%, transparent 100%)",
              }}
            />
          </div>

          {/* Bottom: closing line + CTA, sitting over the artwork's floor */}
          <div ref={setRevealRef(5)} className="relative z-10 flex flex-col items-center gap-6">
            <p className="font-body text-foreground/80 max-w-md text-[0.95rem] leading-relaxed text-balance lg:text-base">
              We&apos;re working hard to bring you the best experience in EV battery
              solutions.
            </p>

            <Button href={`mailto:${siteConfig.contactEmail}`} variant="primary">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- Contact bar ---------- */}
      <footer className="bg-foreground text-background">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-5 px-6 py-6 lg:px-10">
          <div className="flex w-full flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:gap-6">
            <span className="flex items-center gap-2.5 text-[0.8rem]">
              <MapPin className="text-ion h-4 w-4 shrink-0" strokeWidth={1.5} />
              Singapore · Worldwide Service
            </span>

            {/* Design shows a handset here; the number is the client's
                WhatsApp line, so it deep-links to wa.me. */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message NEO ENERGY on WhatsApp at ${WHATSAPP_DISPLAY}`}
              className="hover:text-ion ease-engineered focus-visible:outline-ion flex items-center gap-2.5 text-[0.8rem] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Phone className="text-ion h-4 w-4 shrink-0" strokeWidth={1.5} />
              {WHATSAPP_DISPLAY}
            </a>

            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="hover:text-ion ease-engineered focus-visible:outline-ion flex items-center gap-2.5 text-[0.8rem] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Mail className="text-ion h-4 w-4 shrink-0" strokeWidth={1.5} />
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="bg-background/15 h-px w-full" />

          <span className="text-background/60 text-center text-[0.75rem]">
            © {new Date().getFullYear()} {siteConfig.legalName} All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
