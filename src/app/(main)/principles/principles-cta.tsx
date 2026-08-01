import { Mail, MapPin } from "lucide-react";

import { WhatsAppIcon } from "@/components/layout/social-icons";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container, Heading } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * PrinciplesCta — "07. Contact." Closes the same way CATL's own reference
 * document closes (a contact block), but with only NEO ENERGY's real,
 * already-confirmed channels — `siteConfig.whatsappNumber` (client-
 * confirmed) and `siteConfig.contactEmail` (the same placeholder inbox used
 * everywhere else on the site) — not a fabricated address or phone line.
 */
export function PrinciplesCta() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}`;
  const mailtoHref = `mailto:${siteConfig.contactEmail}`;

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col items-center gap-8 text-center">
        <RevealWrapper variant="fade">
          <div className="flex items-center gap-3">
            <span className="font-display text-ion/25 text-4xl font-bold lg:text-5xl">07</span>
            <span className="text-ion text-label-sm font-mono">Contact</span>
          </div>
        </RevealWrapper>

        <RevealWrapper variant="blur" delay={0.1} duration={1}>
          <Heading as="h2" size="h2" className="max-w-xl uppercase">
            Talk To The Engineers Directly
          </Heading>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.2}>
          <div className="text-muted flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <MapPin className="text-ion h-4 w-4" strokeWidth={1.5} />
              Islandwide, Singapore
            </span>
            <span className="flex items-center gap-2">
              <Mail className="text-ion h-4 w-4" strokeWidth={1.5} />
              {siteConfig.contactEmail}
            </span>
            <span className="flex items-center gap-2">
              <WhatsAppIcon className="text-ion h-4 w-4" />
              {siteConfig.whatsappDisplay}
            </span>
          </div>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </Button>
            <Button href={mailtoHref} variant="primary" className="border-foreground">
              Email Us
            </Button>
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
