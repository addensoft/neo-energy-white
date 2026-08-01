import type { Metadata } from "next";

import { Container } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { ContactMap } from "./contact-map";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name}. Reach our engineering team directly by WhatsApp, email, or the enquiry form below.`,
};

/**
 * /contact — the site's second real page (see `hero-phase-provider.tsx` and
 * `site-config.ts`'s `primaryNav` for the changes that made a second page
 * possible: the navbar no longer waits on a Hero that doesn't exist here,
 * and "Home"/"Contact Us" are real routes rather than homepage-only anchors).
 *
 * Same cinematic language as the homepage — the film-banner hero, the ion-blue
 * ambient glow, the bordered/shadowed card treatment from Authority — applied
 * to a plain content page rather than a scrollytelling chapter sequence.
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-void relative py-16 lg:py-28">
        <div
          aria-hidden="true"
          className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        />

        <Container className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </Container>
      </section>

      <ContactMap />
    </>
  );
}
