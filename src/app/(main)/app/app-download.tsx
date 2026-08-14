import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * AppDownload — real store badges linking to the real, live app listings
 * (TEAM AUTOPRO's own app — NEO Energy's parent business, client-confirmed),
 * per direct instruction to use the same app image and download links.
 * Badge artwork is the official Apple/Google download badges (standard,
 * unbranded-to-any-single-company assets every app uses), downloaded to
 * `public/images/app/`. The store listings themselves are named "Team Auto"
 * (App Store ID 6449909588 / Play package com.upfue.teamauto) — that's the
 * real, only app this business group has shipped, so the listing itself
 * still says "Team Auto" once a visitor reaches the store; worth the
 * client's confirmation if NEO should have (or eventually get) its own
 * distinct store listing instead.
 */
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.upfue.teamauto&hl=en";
const APP_STORE_URL = "https://apps.apple.com/sg/app/team-auto/id6449909588";

export function AppDownload() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Get The App</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h3" className="uppercase">
              Available Now On iOS &amp; Android
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="text-balance">
              Download it today — free, and ready to book your first
              appointment.
            </Paragraph>
          </RevealWrapper>
        </div>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className="ease-engineered relative h-[52px] w-[175px] shrink-0 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/images/app/app-store-badge.png"
                alt="Download on the App Store"
                fill
                sizes="175px"
                className="object-contain"
              />
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="ease-engineered relative h-[52px] w-[175px] shrink-0 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/images/app/google-play-badge.png"
                alt="Get it on Google Play"
                fill
                sizes="175px"
                className="object-contain"
              />
            </a>
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
