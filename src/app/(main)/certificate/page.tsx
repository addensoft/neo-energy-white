import { Award } from "lucide-react";
import type { Metadata } from "next";

import { IconHeader } from "@/components/page-header/icon-header";
import { certificates } from "@/lib/certificates";
import { siteConfig } from "@/lib/site-config";

import { CertificateGrid } from "./certificate-grid";

export const metadata: Metadata = {
  title: "Certificates",
  description: `Real training and manufacturer certificates held by the ${siteConfig.name} team.`,
};

export default function CertificatePage() {
  return (
    <>
      <IconHeader
        icon={Award}
        eyebrow="About · Certificates"
        title="Our Certificates"
        summary="Manufacturer and technical training certificates held by our team — click any certificate to view it full size."
      />
      <CertificateGrid certificates={certificates} />
    </>
  );
}
