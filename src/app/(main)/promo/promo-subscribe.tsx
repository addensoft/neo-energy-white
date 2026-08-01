import { Percent } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * PromoSubscribe — closing banner inviting a visitor to be told about future
 * offers, not just the ones live today. "Subscribe" hands off to a
 * `mailto:` with a pre-filled subject rather than a real mailing-list
 * signup — there's no newsletter/CRM backend in this project to wire a form
 * to, same reasoning `career-cta.tsx` and `app-download.tsx` give for the
 * same pattern.
 */
export function PromoSubscribe() {
  const subject = `Subscribe me to ${siteConfig.name} promotion updates`;
  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}`;

  return (
    <section className="bg-void relative pb-16 lg:pb-24">
      <Container className="relative z-10">
        <RevealWrapper variant="fade">
          <div className="bg-ion/[0.06] border-ion/20 flex flex-col items-center justify-between gap-6 rounded-[18px] border p-6 text-center sm:p-8 lg:flex-row lg:text-left">
            <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center">
              <div className="ring-ion/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                <Percent className="text-ion h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-h4 text-foreground">
                  New Offers Every Month
                </span>
                <p className="font-body text-muted max-w-md text-sm leading-relaxed">
                  We regularly launch new promotions tailored to your needs.
                  Stay tuned and don&apos;t miss out.
                </p>
              </div>
            </div>

            <Button href={mailtoHref} variant="primary" className="shrink-0">
              Subscribe For Updates
            </Button>
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
