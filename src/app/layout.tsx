import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { AppProviders } from "@/components/providers/app-providers";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

/**
 * SEO base — title template, canonical description, Open Graph/Twitter defaults.
 * Per-chapter content will enrich this in later sprints (e.g. structured data
 * once §2's chapter copy is finalised); this establishes the site-wide fallback
 * every page inherits until it defines its own `metadata` export.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout — document shell and app-wide providers only. The global
 * Navbar/Footer chrome lives in the `(main)` route group's own layout
 * instead, so standalone routes (e.g. `/under-construction`) can render
 * without it. Providers stay here so *every* route gets them.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
