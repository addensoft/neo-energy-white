import { Mail } from "lucide-react";
import Image from "next/image";

import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/layout/social-icons";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * TeamGrid — names, titles, and focus lines, at the client's own direction.
 * Five members now have a real, client-supplied headshot (`photo`, under
 * `public/images/team/`); the remaining two still use the illustrated
 * DiceBear "notionists" placeholder (see `next.config.ts` for the
 * remote-image allowlist entry), keyed to each name as a stable seed, until
 * their own photo is supplied.
 *
 * Wang Dong is a new entry, inserted between Charles Hoon and David Chang
 * per direct instruction, titled Founder per direct instruction.
 */
const TEAM = [
  {
    name: "Alex Zhang",
    title: "Founder & Managing Director",
    focus: "Sets the engineering standard every repair is held to.",
    photo: "/images/team/alex-zhang.jpeg",
  },
  {
    name: "KC Ko",
    title: "Director",
    focus: "Cell-level diagnostics and thermal management systems.",
    photo: "/images/team/kc-ko.png",
  },
  {
    name: "Charles Hoon",
    title: "Director",
    focus: "Verifies every repair against GB 38031-2020 tolerances.",
    photo: "/images/team/charles-hoon.png",
  },
  {
    name: "Wang Dong",
    title: "Founder",
    focus: "Oversees day-to-day operations across the workshop.",
    photo: "/images/team/wang-dong.jpg",
  },
  {
    name: "David Chang",
    title: "General Manager",
    focus: "Cell, busbar, and BMS-level repair work on the bench.",
    photo: "/images/team/david-chang.jpeg",
  },
  {
    name: "Alvin Chow",
    title: "Manager",
    focus: "The first call for fleet, dealership, and corporate accounts.",
    photo: undefined,
  },
  {
    name: "Yu Mei Li",
    title: "Admin",
    focus: "Keeps islandwide assessments and servicing on schedule.",
    photo: undefined,
  },
] as const;

function avatarUrl(name: string) {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/9.x/notionists/png?seed=${seed}&backgroundColor=f1f2f5&size=480`;
}

export function TeamGrid() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-10 lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">The Roster</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              The People Behind The Work
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              Every enquiry reaches someone on this list directly — not a
              call centre.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TEAM.map((member, index) => {
            const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
              `For the attention of ${member.name}`,
            )}`;

            return (
              <RevealWrapper
                key={member.name}
                variant="blur"
                delay={index * 0.08}
                duration={0.7}
                className="h-full"
              >
                <div className="border-border bg-graphite/60 hover:border-ion/50 ease-engineered flex h-full flex-col overflow-hidden rounded-md border transition-colors duration-300">
                  <div className="bg-graphite-light relative aspect-[4/5] w-full">
                    <Image
                      src={member.photo ?? avatarUrl(member.name)}
                      alt={
                        member.photo
                          ? `Portrait of ${member.name}`
                          : `Illustrated placeholder portrait for ${member.name}`
                      }
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-3 p-6 text-center">
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-h4 text-foreground">
                        {member.name}
                      </span>
                      <span className="text-ion text-label-sm font-mono">{member.title}</span>
                    </div>

                    <p className="font-body text-muted text-sm leading-relaxed">
                      {member.focus}
                    </p>

                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <a
                        href="#"
                        aria-label={`${member.name} on LinkedIn`}
                        className="border-border text-muted ease-engineered hover:border-ion/60 hover:text-ion flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
                      >
                        <LinkedinIcon className="h-4 w-4" />
                      </a>
                      <a
                        href="#"
                        aria-label={`${member.name} on Twitter`}
                        className="border-border text-muted ease-engineered hover:border-ion/60 hover:text-ion flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
                      >
                        <TwitterIcon className="h-4 w-4" />
                      </a>
                      <a
                        href="#"
                        aria-label={`${member.name} on Instagram`}
                        className="border-border text-muted ease-engineered hover:border-ion/60 hover:text-ion flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
                      >
                        <InstagramIcon className="h-4 w-4" />
                      </a>
                      <a
                        href={mailtoHref}
                        aria-label={`Email ${siteConfig.name} for ${member.name}`}
                        className="border-border text-muted ease-engineered hover:border-ion/60 hover:text-ion flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
                      >
                        <Mail className="h-4 w-4" strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
