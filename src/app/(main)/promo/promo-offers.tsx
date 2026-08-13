"use client";

import { CheckCircle2, Crown, Fuel, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { WhatsAppIcon } from "@/components/layout/social-icons";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { PromoCountdown } from "./promo-countdown";

/**
 * PromoOffers — rebuilt from TEAM AUTOPRO's own live "Our Promotion" page
 * and its promo flyer graphic (NEO Energy's parent business,
 * client-confirmed), per direct instruction to use the exact same content.
 * Previously this held six invented small offers behind a category filter;
 * none of that survived — this is the one real bundle they're actually
 * running (a Shell Helix 5W-40 servicing package + a year of Prestige
 * Membership + a 10-year engine protection plan, $426 value for $108),
 * plus the three membership tiers their own page also lists.
 *
 * `PACKAGE_INCLUDES`, `PACKAGE_TERMS`, and the description copy are verbatim
 * from TeamAuto's own flyer/page text — including "Redemption is valid
 * exclusively at Team AutoPro Pte Ltd," kept as-is per direct instruction
 * even though that names a different registered entity than NEO's own
 * (worth the client's eyes if that line needs updating for NEO's own
 * redemption point).
 *
 * Still adapted rather than copied:
 *  - Contact buttons route to NEO's own confirmed WhatsApp/email, not
 *    TeamAuto's own phone line — a functional wiring choice, not page copy.
 *  - Dropped the Shell/Mobil/SAFRA/CaseTrust certification badges their
 *    flyer shows — those are TeamAuto's own specific accreditations, and a
 *    certification badge is a trademark/factual claim, not descriptive copy.
 *  - The 3-tier membership benefits still swap out items that don't
 *    correspond to anything an EV-battery-and-workshop business does ("VIP
 *    Concierge Pickup", "Track-Day Support", "Ceramic Coating Refreshes" —
 *    reads like a sports-car club) for equivalent-tier real benefits
 *    already established elsewhere on this site — flag if these should
 *    also go back to verbatim.
 *
 * `PROMO_END_ISO` is a proposed draft deadline (30 days out), same
 * disclosure the previous version of this file carried — not a
 * client-confirmed date, flagged here rather than on the page itself.
 */
const PROMO_END_ISO = "2026-09-12T23:59:59+08:00";

const PACKAGE_DESCRIPTION =
  "Uncompromising reliability for the ultimate driving machine. Our Kinetic Atelier Protection Program ensures your performance heart stays pristine for a decade.";

const PACKAGE_TAGLINE =
  "Rev up your savings with our amazing oil promotion—get up to 75% off and keep your engine (and wallet) running smoothly!";

const PACKAGE_INCLUDES = [
  "Shell Helix 5W40 Engine Oil (4L)",
  "Engine Oil Filter",
  "36 Points Safety Check",
  "Electronic Diagnostics",
  "1 Year Prestige Membership",
  "10 Years Engine Protection Plan (T&Cs Apply)",
];

const PACKAGE_TERMS = [
  "This servicing package allows for upgrades to other oils we offer with a top-up.",
  "This gift voucher is not redeemable for cash.",
  "Redemption is valid exclusively at Team AutoPro Pte Ltd.",
  "The voucher is valid for 6 months from the date of issue.",
  "This voucher is non-transferable and cannot be resold.",
  "An additional charge of $20 will be applied for each extra litre of engine oil required.",
  "Management reserves the right to modify these terms and conditions at any time without prior notice.",
];

type Tier = {
  icon: LucideIcon;
  eyebrow: string;
  name: string;
  benefits: string[];
  note: string;
  ctaLabel: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    icon: CheckCircle2,
    eyebrow: "Essential Care",
    name: "Premier Member",
    benefits: ["15% off regular servicing", "WhatsApp priority booking"],
    note: "No lock-in contracts.",
    ctaLabel: "Join Premier",
  },
  {
    icon: Sparkles,
    eyebrow: "Advanced Access",
    name: "Prestige Member",
    benefits: [
      "Priority service booking",
      "Free battery certification report with every inspection",
      "12 months extended warranty support",
    ],
    note: "Standard member benefits included.",
    ctaLabel: "Join Prestige",
  },
  {
    icon: Crown,
    eyebrow: "The Ultimate Tier",
    name: "Prestige+ Member",
    benefits: [
      "Everything in Prestige",
      "10-year engine protection plan bundle (see above)",
      "Up to 75% off your first bundled service",
      "Dedicated account handling for fleet & corporate accounts",
    ],
    note: "Terms and conditions apply. Limited to 50 slots annually.",
    ctaLabel: "Upgrade To Prestige+",
    featured: true,
  },
];

export function PromoOffers() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi NEO ENERGY, I'd like to enquire about the 10-Year Engine Protection Plan bundle.",
  )}`;
  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    "Enquiry: 10-Year Engine Protection Plan",
  )}`;

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-16">
        {/* Featured bundle */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <RevealWrapper variant="fade">
              <span className="text-ion text-label-sm font-mono">Limited-Time Bundle</span>
            </RevealWrapper>
            <RevealWrapper variant="blur" delay={0.1} duration={1}>
              <Heading as="h2" size="h2" className="uppercase">
                10-Year Engine Protection Plan
              </Heading>
            </RevealWrapper>
          </div>

          <RevealWrapper variant="blur" duration={0.9}>
            <div className="border-border relative w-full overflow-hidden rounded-[22px] border shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)]">
              <div aria-hidden="true" className="absolute inset-0">
                <Image
                  src="/images/services/aircon-repair-maintenance.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1600px) 1600px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/75 to-black/50" />
              </div>

              <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-start lg:justify-between lg:p-14">
                <div className="flex max-w-lg flex-col gap-4">
                  <span className="bg-ion flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.1em] text-white uppercase">
                    <Fuel className="h-3 w-3" strokeWidth={2} />
                    Shell Helix 5W-40 Servicing Package
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-lg text-white/50 line-through">$426</span>
                    <span className="font-display text-4xl font-semibold text-white lg:text-5xl">
                      $108
                    </span>
                    <span className="bg-ion/20 text-ion rounded-full px-2.5 py-1 font-mono text-xs font-bold tracking-[0.04em] uppercase">
                      Save $318
                    </span>
                  </div>

                  <Paragraph size="body" className="text-balance text-white/80">
                    {PACKAGE_DESCRIPTION}
                  </Paragraph>

                  <Paragraph size="body" className="text-balance text-white/70">
                    {PACKAGE_TAGLINE}
                  </Paragraph>

                  <ul className="flex flex-col gap-2.5">
                    {PACKAGE_INCLUDES.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="text-ion mt-0.5 h-4 w-4 shrink-0"
                          strokeWidth={1.5}
                        />
                        <span className="font-body text-sm text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Enquire Via WhatsApp
                    </Button>
                    <Button
                      href={mailtoHref}
                      variant="primary"
                      className="border-white bg-transparent text-white"
                    >
                      Enquire Via Email
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <span className="font-mono text-[0.7rem] font-semibold tracking-[0.28em] text-white/70 uppercase">
                    Offer Ends In
                  </span>
                  <PromoCountdown targetIso={PROMO_END_ISO} />
                </div>
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper variant="fade" delay={0.1}>
            <details className="group border-border bg-graphite/40 rounded-md border p-5">
              <summary className="text-label-sm ease-engineered flex cursor-pointer list-none items-center justify-between font-mono uppercase [&::-webkit-details-marker]:hidden">
                Terms &amp; Conditions
                <span className="text-muted ease-engineered transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="mt-4 flex flex-col gap-2">
                {PACKAGE_TERMS.map((term) => (
                  <li key={term} className="font-body text-muted text-xs leading-relaxed">
                    — {term}
                  </li>
                ))}
              </ul>
            </details>
          </RevealWrapper>
        </div>

        {/* Membership tiers */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <RevealWrapper variant="fade">
              <span className="text-ion text-label-sm font-mono">Membership</span>
            </RevealWrapper>
            <RevealWrapper variant="blur" delay={0.1} duration={1}>
              <Heading as="h2" size="h2" className="uppercase">
                What Membership Gets You
              </Heading>
            </RevealWrapper>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {TIERS.map((tier, index) => (
              <RevealWrapper
                key={tier.name}
                variant="blur"
                delay={index * 0.1}
                duration={0.7}
                className="h-full"
              >
                <div
                  className={cn(
                    "ease-engineered flex h-full flex-col gap-6 rounded-md border p-7 transition-colors duration-300 lg:p-8",
                    tier.featured
                      ? "border-ion bg-ion/[0.04] shadow-[var(--shadow-ion-glow)]"
                      : "border-border bg-background",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="ring-ion/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                      <tier.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                    </div>
                    {tier.featured && (
                      <span className="bg-ion rounded-full px-3 py-1 font-mono text-[0.65rem] font-bold tracking-[0.04em] text-white uppercase">
                        Best Value
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-label-sm font-mono">{tier.eyebrow}</span>
                    <h3 className="font-display text-h4 text-foreground">{tier.name}</h3>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="text-ion mt-0.5 h-4 w-4 shrink-0"
                          strokeWidth={1.5}
                        />
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
        </div>

        <p className="font-body text-muted max-w-2xl text-xs leading-relaxed">
          One bundle per account. Cannot be combined with other promotions.
          NEO ENERGY reserves the right to amend or withdraw any offer at any
          time.
        </p>
      </Container>
    </section>
  );
}
