import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * CareerProcess — the three steps that are true of any hiring process (send
 * something, get a response, meet the team), not a fabricated multi-stage
 * pipeline with specific timelines this project has no authority to promise.
 */
const STEPS = [
  {
    number: "01",
    title: "Send Your Resume",
    description:
      "Email your resume and the area you're interested in — no application form to wrestle with.",
  },
  {
    number: "02",
    title: "We Review & Reach Out",
    description: "A real person on the team looks at every application personally.",
  },
  {
    number: "03",
    title: "Meet The Team",
    description: "A conversation about the role, the work, and whether it's a fit both ways.",
  },
] as const;

export function CareerProcess() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">How It Works</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              A Straightforward Process
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
          {STEPS.map((step, index) => (
            <RevealWrapper key={step.number} variant="blur" delay={index * 0.12} duration={0.7}>
              <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
                <span className="font-display text-ion/30 text-4xl font-bold lg:text-5xl">
                  {step.number}
                </span>
                <h3 className="font-display text-h4 text-foreground">{step.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
