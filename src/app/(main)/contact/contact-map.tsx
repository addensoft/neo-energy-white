import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * ContactMap — closes the page with "where," after "how" (ContactInfo) and
 * "what" (ContactForm).
 *
 * Scoped to Singapore as a city, not a pinned street address: no specific
 * office address is confirmed anywhere in this codebase yet (see the
 * placeholder discipline noted in `contact-info.tsx` and `footer.tsx`), so
 * this deliberately doesn't drop a marker on a building that may not be the
 * real one. `q=Singapore` is an honest map of the region NEO ENERGY operates
 * in; swap it for a real address query the moment the client confirms one.
 */
export function ContactMap() {
  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container>
        <div className="mb-8 flex flex-col gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Service Region</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1}>
            <Heading as="h2" size="h3" className="uppercase">
              Find Us In Singapore
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              NEO ENERGY operates island-wide across Singapore — reach out on
              WhatsApp or email to arrange a facility visit or on-site
              assessment.
            </Paragraph>
          </RevealWrapper>
        </div>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="border-border overflow-hidden rounded-[22px] border shadow-[0_24px_60px_-24px_rgba(15,23,42,0.14)]">
            <iframe
              title="NEO ENERGY service region — Singapore"
              src="https://www.google.com/maps?q=Singapore&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="h-[340px] w-full lg:h-[440px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
