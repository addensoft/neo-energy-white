import { Apple, PlayCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Button, Container, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * AppDownload — the store badges, styled in the site's own design language
 * rather than reproducing Apple's/Google's official badge artwork (which
 * this project doesn't have licensed assets for, same reasoning
 * `social-icons.tsx` gives for hand-drawing WhatsApp/LinkedIn instead of
 * using brand-supplied files).
 *
 * Both tiles are deliberately non-interactive (`aria-disabled`, no `href`):
 * there is no real App Store / Google Play listing yet (confirmed with the
 * client — see the "Coming Soon" framing throughout this page), and a
 * clickable badge that goes nowhere would be a worse experience than an
 * honestly inert one. "Notify Me" is the one real action available today —
 * a `mailto:` hand-off, the same mechanism the Contact page's form already
 * uses for exactly this reason.
 */
type StoreBadgeProps = {
  icon: LucideIcon;
  eyebrow: string;
  label: string;
};

function StoreBadge({ icon: Icon, eyebrow, label }: StoreBadgeProps) {
  return (
    <div
      aria-disabled="true"
      className="border-border bg-foreground relative flex w-56 items-center gap-3 rounded-lg border px-5 py-3"
    >
      <span className="bg-ion absolute -top-2.5 -right-2.5 rounded-full px-2 py-0.5 font-mono text-[0.6rem] font-semibold tracking-[0.08em] text-white uppercase">
        Soon
      </span>
      <Icon className="h-7 w-7 shrink-0 text-white" strokeWidth={1.5} />
      <div className="flex flex-col leading-tight">
        <span className="font-body text-[0.65rem] text-white/60">{eyebrow}</span>
        <span className="font-display text-base text-white">{label}</span>
      </div>
    </div>
  );
}

export function AppDownload() {
  const subject = `Notify me when the ${siteConfig.name} app launches`;
  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}`;

  return (
    <section className="bg-graphite/40 relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Get It Once We Launch</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h3" className="uppercase">
              Available Soon On iOS &amp; Android
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="text-balance">
              The app isn&apos;t live yet — leave your email and we&apos;ll
              let you know the moment it is.
            </Paragraph>
          </RevealWrapper>
        </div>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <StoreBadge icon={Apple} eyebrow="Coming soon to the" label="App Store" />
            <StoreBadge icon={PlayCircle} eyebrow="Coming soon to" label="Google Play" />
          </div>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.4}>
          <Button href={mailtoHref} variant="primary">
            Notify Me At Launch
          </Button>
        </RevealWrapper>
      </Container>
    </section>
  );
}
