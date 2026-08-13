import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EarthCta } from "@/components/cta/earth-cta";
import { IconHeader } from "@/components/page-header/icon-header";
import { ServiceBody } from "@/components/services/service-body";
import { siteConfig } from "@/lib/site-config";
import { getWorkshopService, workshopServices } from "@/lib/workshop-services";

type Props = {
  params: Promise<{ slug: string }>;
};

/** All 13 workshop-service pages are pre-rendered at build time from the
 * fixed `workshopServices` data set — same pattern as `/news/[slug]`. */
export function generateStaticParams() {
  return workshopServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getWorkshopService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${service.summary} ${siteConfig.name}, Singapore.`,
  };
}

export default async function WorkshopServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getWorkshopService(slug);

  if (!service) notFound();

  const whatsappMessage = `Hi ${siteConfig.name}, I'd like to enquire about ${service.title}.`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <IconHeader
        icon={service.icon}
        eyebrow="Services · Workshop"
        title={service.title}
        summary={service.summary}
      />
      <ServiceBody
        overview={service.overview}
        includes={service.includes}
        signs={service.signs}
        image={service.image}
        imageAlt={service.imageAlt}
      />
      <EarthCta
        heading={
          <>
            Book <span className="text-ion">{service.title}?</span>
          </>
        }
        body="Talk directly to the team who'll actually do the work — not a call centre."
        primaryLabel="Get In Touch"
        primaryHref="/contact"
        secondaryLabel="WhatsApp Us"
        secondaryHref={whatsappHref}
        secondaryExternal
      />
    </>
  );
}
