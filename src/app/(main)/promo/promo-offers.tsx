"use client";

import {
  Boxes,
  ClipboardCheck,
  FileCheck2,
  LayoutGrid,
  ShieldCheck,
  Smartphone,
  Truck,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { WhatsAppIcon } from "@/components/layout/social-icons";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { PromoCountdown } from "./promo-countdown";

/**
 * PromoOffers — every current offer, filterable by account type.
 *
 * `PROMO_END_ISO` is the one real deadline the featured offer's
 * `PromoCountdown` counts down to for every visitor — update this (and the
 * copy below) whenever the offer is renewed or replaced, since the
 * countdown has no separate source of truth to keep in sync. The other six
 * offers share the same window rather than tracking individual expiries —
 * one promotional period, not staggered ones needing separate upkeep — so
 * `VALID_UNTIL` below is the display string for that same date.
 *
 * All seven offers are built from services this site already confirms are
 * real (component-level diagnostics, islandwide fleet servicing, dealership
 * inspections, preventive maintenance, the app's own booking flow — see
 * Repair/About/App), not discounts invented for this page alone. Discount
 * amounts and the exact end date are still a proposed draft, not client-
 * confirmed figures — flagged separately, not on the page itself.
 */
const PROMO_END_ISO = "2026-08-31T23:59:59+08:00";
const VALID_UNTIL = "31 Aug 2026";

type Category = "fleet" | "dealerships" | "private" | "service";

const CATEGORIES: { id: Category | "all"; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All Offers", icon: LayoutGrid },
  { id: "fleet", label: "Fleet & Corporate", icon: Truck },
  { id: "dealerships", label: "Dealerships", icon: FileCheck2 },
  { id: "private", label: "Private Owners", icon: User },
  { id: "service", label: "Service & Maintenance", icon: ShieldCheck },
];

const CATEGORY_LABEL: Record<Category, string> = {
  fleet: "Fleet & Corporate Accounts",
  dealerships: "Dealerships",
  private: "Private Owners",
  service: "Service & Maintenance",
};

type Offer = {
  category: Category;
  icon: LucideIcon;
  highlight: string;
  title: string;
  description: string;
};

/** The one featured offer — its own large card, countdown, and dual claim
 * buttons — shown above the grid whenever the active filter includes it. */
const FEATURED_OFFER: Offer = {
  category: "fleet",
  icon: Truck,
  highlight: "Complimentary",
  title: "Complimentary Battery Health Assessment",
  description:
    "Sign an islandwide fleet servicing contract before the offer ends and get a full diagnostic assessment for your first vehicle, on us.",
};

const GRID_OFFERS: Offer[] = [
  {
    category: "private",
    icon: ClipboardCheck,
    highlight: "15% Off",
    title: "Your First Battery Diagnostic",
    description:
      "New to NEO ENERGY? Get 15% off your first component-level diagnostic, any battery.",
  },
  {
    category: "dealerships",
    icon: FileCheck2,
    highlight: "Free Report",
    title: "Battery Certification With Every Inspection",
    description:
      "A free battery certification report bundled with every pre-purchase inspection you book.",
  },
  {
    category: "service",
    icon: ShieldCheck,
    highlight: "10% Off",
    title: "Scheduled Preventive Maintenance",
    description: "Book a preventive maintenance plan and save 10% on the first service.",
  },
  {
    category: "fleet",
    icon: Boxes,
    highlight: "Up To 8% Off",
    title: "Bulk Battery Purchase Discount",
    description: "Save up to 8% on bulk battery orders for fleets of 5 vehicles or more.",
  },
  {
    category: "dealerships",
    icon: ShieldCheck,
    highlight: "12 Months",
    title: "Extended Warranty Support",
    description: "Get up to 12 months of extended warranty support with eligible replacements.",
  },
  {
    category: "service",
    icon: Smartphone,
    highlight: "5% Off",
    title: "App Booking Special",
    description: "Book your battery service through the NEO ENERGY app and get 5% off.",
  },
];

export function PromoOffers() {
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

  const showFeatured = activeFilter === "all" || activeFilter === FEATURED_OFFER.category;
  const visibleGridOffers = GRID_OFFERS.filter(
    (offer) => activeFilter === "all" || offer.category === activeFilter,
  );

  const featuredWhatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${siteConfig.name}, I'd like to claim the complimentary battery health assessment offer.`,
  )}`;
  const featuredMailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    "Claiming: Complimentary Battery Health Assessment",
  )}`;

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Limited-Time Offers</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Explore Our Latest Promotions
            </Heading>
          </RevealWrapper>
        </div>

        {/* Filter tabs */}
        <RevealWrapper variant="fade" delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((category) => {
              const isActive = activeFilter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveFilter(category.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "ease-engineered flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.75rem] font-semibold tracking-[0.04em] uppercase transition-colors duration-300",
                    isActive
                      ? "border-ion bg-ion text-white"
                      : "border-border text-muted hover:border-ion/50 hover:text-foreground",
                  )}
                >
                  <category.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </RevealWrapper>

        {/* Featured offer */}
        {showFeatured && (
          <RevealWrapper variant="blur" duration={0.9}>
            <div className="border-border relative w-full overflow-hidden rounded-[22px] border shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)]">
              <div aria-hidden="true" className="absolute inset-0">
                <Image
                  src="/videos/flagship-battery-poster.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1600px) 1600px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
              </div>

              <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-10 lg:p-14">
                <div className="flex flex-col gap-3">
                  <span className="bg-ion flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.1em] text-white uppercase">
                    Limited Time Offer
                  </span>
                  <span className="font-mono text-[0.7rem] font-semibold tracking-[0.28em] text-white/70 uppercase">
                    {CATEGORY_LABEL[FEATURED_OFFER.category]}
                  </span>
                  <Heading as="h2" size="h2" className="max-w-lg text-white uppercase">
                    {FEATURED_OFFER.title}
                  </Heading>
                  <Paragraph size="body" className="max-w-md text-balance text-white/80">
                    {FEATURED_OFFER.description}
                  </Paragraph>
                </div>

                <PromoCountdown targetIso={PROMO_END_ISO} />

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    href={featuredWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Claim Via WhatsApp
                  </Button>
                  <Button
                    href={featuredMailtoHref}
                    variant="primary"
                    className="border-white bg-transparent text-white"
                  >
                    Claim Via Email
                  </Button>
                </div>
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* Grid */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleGridOffers.map((offer, index) => {
            const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              `Hi ${siteConfig.name}, I'd like to claim the "${offer.title}" offer.`,
            )}`;

            return (
              <RevealWrapper
                key={offer.title}
                variant="blur"
                delay={index * 0.08}
                duration={0.6}
                className="h-full"
              >
                <div className="border-border bg-background hover:border-ion/50 ease-engineered flex h-full flex-col gap-4 rounded-md border p-6 transition-colors duration-300 lg:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="ring-ion/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                      <offer.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <span className="bg-ion/10 text-ion rounded-full px-3 py-1 font-mono text-xs font-bold tracking-[0.04em] uppercase">
                      {offer.highlight}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-label-sm font-mono">
                      {CATEGORY_LABEL[offer.category]}
                    </span>
                    <h3 className="font-display text-h4 text-foreground">{offer.title}</h3>
                    <p className="font-body text-muted text-sm leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  <div className="border-border mt-auto flex items-center justify-between gap-3 border-t pt-4">
                    <span className="font-mono text-muted text-[0.65rem] tracking-[0.06em] uppercase">
                      Valid until {VALID_UNTIL}
                    </span>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Claim the ${offer.title} offer via WhatsApp`}
                      className="text-ion ease-engineered flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.04em] uppercase transition-colors duration-300 hover:text-foreground"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      Enquire
                    </a>
                  </div>
                </div>
              </RevealWrapper>
            );
          })}

          {!showFeatured && visibleGridOffers.length === 0 && (
            <p className="font-body text-muted col-span-full py-8 text-center text-sm">
              No offers in this category right now — check back soon.
            </p>
          )}
        </div>

        <p className="font-body text-muted max-w-2xl text-xs leading-relaxed">
          One offer per account, per category. Cannot be combined with other
          promotions. NEO ENERGY reserves the right to amend or withdraw any
          offer at any time.
        </p>
      </Container>
    </section>
  );
}
