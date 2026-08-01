import { Container } from "@/components/ui";

/**
 * LegalHeader — the plain, no-video header shared by Privacy Policy and
 * Terms of Use. Same reasoning `ArticleHero` gives for skipping `PageBanner`'s
 * looping film: a legal document is read once for reference, not a standing
 * destination, so ambient motion is autoplay weight with no payoff. Dark
 * solid ground instead of a photo — there's no real footage of "policy",
 * unlike every other inner page which has a genuine service/product shot to
 * show.
 */
export function LegalHeader({ title, lastUpdated }: { title: string; lastUpdated: string }) {
  return (
    <section className="bg-foreground relative flex w-full items-center justify-center overflow-hidden py-24 lg:py-32">
      <Container className="relative z-10 flex flex-col items-center gap-4 text-center">
        <span className="text-ion font-mono text-xs font-semibold tracking-[0.14em] uppercase">
          Legal
        </span>
        <h1 className="font-display text-h2 text-balance text-white uppercase">{title}</h1>
        <span className="font-mono text-xs tracking-[0.04em] text-white/60 uppercase">
          Last Updated: {lastUpdated}
        </span>
      </Container>
    </section>
  );
}
