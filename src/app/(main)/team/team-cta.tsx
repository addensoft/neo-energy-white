import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container, Heading, Paragraph } from "@/components/ui";

/**
 * TeamCta — closes the page by pointing at `/career`, a real page this
 * project already built, rather than a generic mailto — a visitor reading
 * about the team is a natural audience for "join it."
 */
export function TeamCta() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
        <RevealWrapper variant="blur" duration={0.9}>
          <Heading as="h2" size="h3" className="uppercase">
            Want To Be On This List?
          </Heading>
        </RevealWrapper>
        <RevealWrapper variant="fade" delay={0.1}>
          <Paragraph size="body" className="max-w-md text-balance">
            NEO ENERGY is always open to hearing from engineers who take
            component-level work as seriously as we do.
          </Paragraph>
        </RevealWrapper>
        <RevealWrapper variant="fade" delay={0.2}>
          <Button href="/career" variant="primary">
            View Careers
          </Button>
        </RevealWrapper>
      </Container>
    </section>
  );
}
