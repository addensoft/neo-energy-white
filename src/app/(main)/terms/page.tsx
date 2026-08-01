import type { Metadata } from "next";

import { LegalHeader, LegalSection, type LegalSectionData } from "@/components/legal";
import { Container } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing your use of the ${siteConfig.name} website.`,
};

const LAST_UPDATED = "1 August 2026";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "Acceptance Of Terms",
    paragraphs: [
      `These Terms of Use govern your access to and use of ${siteConfig.url.replace("https://", "")} (the "Site"), operated by ${siteConfig.legalName} By using this Site, you agree to be bound by these terms. If you do not agree, please do not use this Site.`,
    ],
  },
  {
    heading: "Use Of This Website",
    paragraphs: [
      "This Site is provided to give you information about our EV battery engineering, repair, maintenance, and diagnostic services, and to let you get in touch with us. You agree to use it only for lawful purposes, and not in any way that could damage, disable, or impair the Site or interfere with anyone else's use of it.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      `All content on this Site — including text, graphics, logos, images, and video — is the property of ${siteConfig.legalName} or its licensors, and is protected by copyright and trademark law. You may not reproduce, distribute, or create derivative works from any part of this Site without our prior written consent.`,
    ],
  },
  {
    heading: "Service Information",
    paragraphs: [
      "We make reasonable efforts to keep the descriptions of our services, pricing, and promotions on this Site accurate and up to date. However, service availability, pricing, and specific offer terms are ultimately confirmed directly with our team — please contact us before making a decision based solely on information found on this Site.",
    ],
  },
  {
    heading: "Third-Party Links",
    paragraphs: [
      "This Site may link out to third-party platforms, such as WhatsApp or our social media profiles. We are not responsible for the content or practices of any third-party site or service you access through these links.",
    ],
  },
  {
    heading: "Limitation Of Liability",
    paragraphs: [
      `To the fullest extent permitted by law, ${siteConfig.legalName} shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this Site.`,
    ],
  },
  {
    heading: "Governing Law",
    paragraphs: [
      "These Terms of Use are governed by the laws of Singapore, and any disputes arising from them will be subject to the exclusive jurisdiction of the courts of Singapore.",
    ],
  },
  {
    heading: "Changes To These Terms",
    paragraphs: [
      "We may revise these Terms of Use at any time. The \"Last Updated\" date at the top of this page reflects the most recent revision. Continued use of the Site after changes are posted constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      `If you have any questions about these Terms of Use, contact us at ${siteConfig.contactEmail}.`,
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <LegalHeader title="Terms of Use" lastUpdated={LAST_UPDATED} />
      <section className="bg-void relative py-16 lg:py-24">
        <Container size="narrow" className="flex flex-col gap-10">
          {SECTIONS.map((section, index) => (
            <LegalSection key={section.heading} index={index} section={section} />
          ))}
        </Container>
      </section>
    </>
  );
}
