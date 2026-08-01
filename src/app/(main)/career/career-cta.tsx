import Image from "next/image";

import { WhatsAppIcon } from "@/components/layout/social-icons";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * CareerCta — closes the page on the same Earth banner About and the
 * homepage both end on (see `about-cta.tsx` for why: no scrim, white type
 * relying on the photo's own dark upper-left starfield, per direct client
 * feedback on the homepage version).
 *
 * Two ways to apply, not one: `mailto:` hands off to the visitor's own email
 * client with the subject pre-filled, same "no backend" mechanism
 * `contact-form.tsx` and `app-download.tsx` already use — but it can't
 * attach a resume for them (no browser allows that) and does nothing
 * visible on a device with no configured mail app. WhatsApp is the site's
 * one genuinely confirmed, always-reachable channel (`siteConfig.whatsappNumber`)
 * and works from any phone as a real attachment, so it sits right beside
 * Apply Now rather than replacing it — an applicant picks whichever they
 * actually have open.
 */
export function CareerCta() {
  const subject = `Job Application — ${siteConfig.name}`;
  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}`;

  const whatsappMessage = `Hi ${siteConfig.name}, I'm interested in applying for a role with your team.`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-void relative min-h-[42vh] overflow-hidden lg:min-h-[54vh]">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/cta-earth.webp"
          alt="Earth at night from orbit, illuminated by connected global city lights"
          fill
          sizes="100vw"
          className="object-cover object-[58%_28%]"
          priority={false}
        />
      </div>

      <div className="px-gutter lg:px-gutter-lg relative z-10 flex h-full min-h-[42vh] flex-col justify-center gap-6 py-16 lg:min-h-[54vh] lg:max-w-[38vw] lg:py-0">
        <RevealWrapper variant="blur" duration={1}>
          <Heading as="h2" size="h2" className="text-white uppercase">
            Ready To Build The
            <br />
            Future With <span className="text-ion">Us?</span>
          </Heading>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.15}>
          <Paragraph size="body" className="max-w-md text-balance text-white/80">
            Send us your resume and where you&apos;d like to work — a real
            person on the team will read it.
          </Paragraph>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              href={mailtoHref}
              variant="primary"
              className="border-white bg-transparent text-white"
            >
              Apply Now
            </Button>

            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="border-white bg-transparent text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
