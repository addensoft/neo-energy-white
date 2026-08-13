import { HelpCircle } from "lucide-react";
import type { Metadata } from "next";

import { IconHeader } from "@/components/page-header/icon-header";
import { siteConfig } from "@/lib/site-config";

import { FaqList } from "./faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about booking, warranty, and services at ${siteConfig.name}.`,
};

export default function FaqPage() {
  return (
    <>
      <IconHeader
        icon={HelpCircle}
        eyebrow="About · FAQ"
        title="Frequently Asked Questions"
        summary="Booking, warranty, payment, and more — the answers we get asked most."
      />
      <FaqList />
    </>
  );
}
