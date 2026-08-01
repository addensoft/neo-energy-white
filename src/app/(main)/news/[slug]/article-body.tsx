import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Button, Container, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import type { NewsArticle } from "@/lib/news";

/**
 * ArticleBody — the article text plus a closing engineering-team CTA. No
 * rich-text/markdown renderer: `NewsArticle.body` is a plain string array,
 * one paragraph per entry, which is all three articles in `@/lib/news.ts`
 * currently need — reach for a real content pipeline if that stops holding.
 */
export function ArticleBody({ article }: { article: NewsArticle }) {
  const whatsappMessage = `Hi ${siteConfig.name}, I read "${article.title}" and had a question.`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container size="narrow" className="flex flex-col gap-6">
        {article.body.map((paragraph, index) => (
          <Paragraph key={index} size="body">
            {paragraph}
          </Paragraph>
        ))}

        <div className="border-border mt-6 flex flex-col items-start gap-4 rounded-md border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-display text-h4 text-foreground">
              Questions About This?
            </span>
            <p className="font-body text-muted text-sm">
              Talk directly to the engineering team, not a call centre.
            </p>
          </div>
          <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="primary">
            <WhatsAppIcon className="h-4 w-4" />
            Ask On WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
