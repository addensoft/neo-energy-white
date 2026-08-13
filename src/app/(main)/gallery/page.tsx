import { Images } from "lucide-react";
import type { Metadata } from "next";

import { IconHeader } from "@/components/page-header/icon-header";
import { siteConfig } from "@/lib/site-config";

import { GalleryGrid } from "./gallery-grid";

export const metadata: Metadata = {
  title: "Our Gallery",
  description: `A look at ${siteConfig.name}'s flagship EV battery pack and engineering detail.`,
};

export default function GalleryPage() {
  return (
    <>
      <IconHeader
        icon={Images}
        eyebrow="About · Gallery"
        title="Our Gallery"
        summary="A look at our real work — the flagship battery pack, component-level detail, and the engineering behind it."
      />
      <GalleryGrid />
    </>
  );
}
