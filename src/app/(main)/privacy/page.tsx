import type { Metadata } from "next";

import { LegalHeader, LegalSection, type LegalSectionData } from "@/components/legal";
import { Container } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal data, in line with Singapore's Personal Data Protection Act (PDPA).`,
};

const LAST_UPDATED = "1 August 2026";

/**
 * Content mirrors what this site actually does, not generic boilerplate
 * padded with unconfirmed claims — see `contact-form.tsx`, `career-cta.tsx`,
 * and `promo-subscribe.tsx`: every form on this site hands off to the
 * visitor's own email client via `mailto:` rather than posting to a server,
 * and `app-providers.tsx` confirms there is no analytics/tracking provider
 * wired in yet. Both facts are stated plainly below instead of describing a
 * data pipeline that doesn't exist.
 */
const SECTIONS: LegalSectionData[] = [
  {
    heading: "Overview",
    paragraphs: [
      `${siteConfig.legalName} ("${siteConfig.name}", "we", "us", or "our") respects your privacy. This policy explains what personal data we collect through this website, how we use it, and the choices you have — in line with Singapore's Personal Data Protection Act 2012 (PDPA).`,
      "By using this website, you agree to the collection and use of information as described here.",
    ],
  },
  {
    heading: "Information We Collect",
    paragraphs: [
      "We only collect personal data you choose to give us directly, through the forms on this site — the Contact page enquiry form, a job application, or a promotion sign-up. Depending on which one you use, this may include your name, email address, phone number, and any message or resume details you provide.",
      "We do not use cookies, trackers, or third-party analytics on this site to collect information about your browsing behaviour.",
    ],
  },
  {
    heading: "How Your Information Reaches Us",
    paragraphs: [
      `Every form on this site is built to hand off directly to your own email application, addressed to ${siteConfig.contactEmail} — it does not submit to, or get stored on, a ${siteConfig.name} server or database. Nothing is sent unless you review and send the email yourself.`,
      "Once your message reaches our inbox, it's handled the same way any other business correspondence is: read by our team, used to respond to you, and kept only as long as reasonably needed for that purpose.",
    ],
  },
  {
    heading: "How We Use Your Information",
    paragraphs: ["We use the information you send us only to:"],
    list: [
      "Respond to enquiries about our battery engineering, repair, maintenance, and diagnostic services",
      "Process job applications",
      "Send you information you've asked to receive, such as promotion updates",
      "Improve how we communicate with and serve our customers",
    ],
  },
  {
    heading: "Disclosure To Third Parties",
    paragraphs: [
      "We do not sell, rent, or trade your personal data. We only disclose it where required by law, to protect our legal rights, or with your explicit consent.",
    ],
  },
  {
    heading: "Data Security & Retention",
    paragraphs: [
      "We take reasonable technical and organisational precautions to protect any personal data we hold from unauthorised access, alteration, or disclosure. We retain personal data only for as long as it's needed for the purpose it was collected for, or as required by law.",
    ],
  },
  {
    heading: "Your Rights Under The PDPA",
    paragraphs: ["Under Singapore's PDPA, you have the right to:"],
    list: [
      "Ask what personal data of yours we hold",
      "Request a correction to inaccurate personal data",
      "Withdraw consent to our collection, use, or disclosure of your personal data",
    ],
  },
  {
    heading: "Changes To This Policy",
    paragraphs: [
      "We may update this policy from time to time to reflect changes in our practices or for legal reasons. The \"Last Updated\" date at the top of this page reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      `If you have any questions about this Privacy Policy or how we handle your personal data, contact us at ${siteConfig.contactEmail}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHeader title="Privacy Policy" lastUpdated={LAST_UPDATED} />
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
