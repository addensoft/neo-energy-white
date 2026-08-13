"use client";

import { Crown, Percent, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { PromoCountdown } from "./promo-countdown";

/**
 * PromoOffers — matches the actual structure and text of TEAM AUTOPRO's
 * live "Our Promotion" page (NEO Energy's parent business,
 * client-confirmed), per direct instruction: same content, nothing added.
 *
 * Three pieces, same order as the source page:
 *  1. A banner (badge, heading, body, one "Enquire Now!" button) — no
 *     price shown here. The $426/$108 pricing only exists on TeamAuto's
 *     separate flyer graphic, not on this page itself — an earlier version
 *     of this file merged the two, which wasn't accurate to the source.
 *  2. The "Hot Deal! Sale Up To 75% Off" countdown banner.
 *  3. Four membership-tier cards, in the source's own order and with its
 *     own exact benefit text (including the two "Prestige+"/"Ultimate
 *     Tier" cards appearing twice, and the literal "Track-Day Support" /
 *     "Ceramic Coating Refreshes" wording) — kept verbatim per direct
 *     instruction, even though those specific items don't correspond to
 *     anything this EV-battery-and-workshop business does.
 *
 * Still adapted, not copied: CTA buttons route to NEO's own confirmed
 * WhatsApp, not TeamAuto's phone line — that's wiring, not page copy.
 *
 * `PROMO_END_ISO` is a proposed draft deadline (30 days out) — not a
 * client-confirmed date, flagged here rather than on the page itself.
 */
const PROMO_END_ISO = "2026-09-12T23:59:59+08:00";

type Tier = {
  icon: LucideIcon;
  eyebrow: string;
  name: string;
  suffix?: string;
  benefits: string[];
  note: string;
  ctaLabel: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    icon: Crown,
    eyebrow: "The Ultimate Tier",
    name: "Prestige+ Member",
    benefits: [
      "Unlimited VIP Concierge Pickup",
      "75% Off Performance Tuning",
      "Priority Track-Day Support",
      "Lifetime Ceramic Coating Refreshes",
    ],
    note: "*Terms and conditions apply. Limited to 50 slots annually.",
    ctaLabel: "Upgrade To Elite",
    featured: true,
  },
  {
    icon: Sparkles,
    eyebrow: "Advanced Access",
    name: "Prestige Member",
    benefits: ["4x Concierge Pickups / Year", "50% Off Detailing Packages", "Priority Service Booking"],
    note: "Standard member benefits included.",
    ctaLabel: "Current Plan",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Essential Care",
    name: "Premier Member",
    benefits: ["15% Off Regular Servicing", "24/7 Roadside Assistance"],
    note: "No lock-in contracts.",
    ctaLabel: "Join Premier",
  },
  {
    icon: Crown,
    eyebrow: "The Ultimate Tier",
    name: "Prestige Member+",
    suffix: "(10 Year Engine Protection)",
    benefits: [
      "Unlimited VIP Concierge Pickup",
      "75% Off Performance Tuning",
      "Priority Track-Day Support",
      "Lifetime Ceramic Coating Refreshes",
    ],
    note: "*Terms and conditions apply. Limited to 50 slots annually.",
    ctaLabel: "Upgrade To Elite",
    featured: true,
  },
];

export function PromoOffers() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi NEO ENERGY, I'd like to enquire about the 10-Year Engine Protection Plan.",
  )}`;

  return (
    <>
      {/* 1. Engine Protection banner */}
      <section className="bg-void relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/services/aircon-repair-maintenance.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>

        <Container className="relative z-10 flex flex-col items-start gap-5 py-20 lg:py-28">
          <RevealWrapper variant="fade">
            <span className="border-ion text-ion flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.08em] uppercase">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
              10 Year Warranty
            </span>
          </RevealWrapper>

          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="max-w-2xl text-white uppercase">
              10 Year
              <br />
              <span className="text-ion">Engine</span> Protection
            </Heading>
          </RevealWrapper>

          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-lg text-balance text-white/80">
              Uncompromising reliability for the ultimate driving machine. Our
              Kinetic Atelier Protection Program ensures your performance
              heart stays pristine for a decade.
            </Paragraph>
          </RevealWrapper>

          <RevealWrapper variant="fade" delay={0.3}>
            <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary">
              Enquire Now!
            </Button>
          </RevealWrapper>
        </Container>
      </section>

      {/* 2. Hot Deal + countdown */}
      <section className="bg-void relative py-16 lg:py-24">
        <Container className="relative z-10 flex flex-col gap-6">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Limited Time Offer!</span>
          </RevealWrapper>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <RevealWrapper variant="blur" delay={0.1} duration={1}>
              <Heading as="h2" size="h2" className="uppercase">
                Hot Deal!
                <br />
                Sale Up To <span className="text-ion">75% Off</span>
              </Heading>
            </RevealWrapper>

            <RevealWrapper variant="fade" delay={0.2}>
              <PromoCountdown targetIso={PROMO_END_ISO} />
            </RevealWrapper>
          </div>

          <RevealWrapper variant="fade" delay={0.15}>
            <Paragraph size="body" className="max-w-xl text-balance">
              Rev up your savings with our amazing oil promotion—get up to
              75% off and keep your engine (and wallet) running smoothly!
            </Paragraph>
          </RevealWrapper>
        </Container>
      </section>

      {/* 3. Membership tiers */}
      <section className="bg-void relative pb-16 lg:pb-24">
        <Container className="relative z-10">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, index) => (
              <RevealWrapper
                key={`${tier.name}-${index}`}
                variant="blur"
                delay={index * 0.1}
                duration={0.7}
                className="h-full"
              >
                <div
                  className={cn(
                    "ease-engineered flex h-full flex-col gap-6 rounded-md border p-6 transition-colors duration-300",
                    tier.featured
                      ? "border-ion bg-ion/[0.04] shadow-[var(--shadow-ion-glow)]"
                      : "border-border bg-background",
                  )}
                >
                  <div className="ring-ion/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                    <tier.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-label-sm font-mono">{tier.eyebrow}</span>
                    <h3 className="font-display text-h4 text-foreground uppercase">{tier.name}</h3>
                    {tier.suffix && (
                      <span className="text-muted font-mono text-xs">{tier.suffix}</span>
                    )}
                  </div>

                  <ul className="flex flex-1 flex-col gap-3">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5">
                        <Percent className="text-ion mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                        <span className="font-body text-foreground/90 text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-border flex flex-col gap-4 border-t pt-5">
                    <span className="font-body text-muted text-xs leading-relaxed">
                      {tier.note}
                    </span>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "ease-engineered flex w-full items-center justify-center gap-2 rounded-sm border px-6 py-3 font-mono text-[0.8rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-300",
                        tier.featured
                          ? "border-ion bg-ion text-white hover:bg-ion/90"
                          : "border-foreground text-foreground hover:border-ion hover:text-ion",
                      )}
                    >
                      {tier.ctaLabel}
                    </a>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper variant="fade" delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary">
                Enquire Now!
              </Button>
            </div>
          </RevealWrapper>
        </Container>
      </section>
    </>
  );
}
