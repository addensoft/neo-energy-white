import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { LinkedinIcon, WhatsAppIcon } from "@/components/layout/social-icons";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * ContactInfo — the direct-channels column beside the enquiry form.
 *
 * WhatsApp is listed first and is the one genuinely client-confirmed number
 * on the site (`siteConfig.whatsappNumber` — see site-config.ts); email
 * reuses the same placeholder inbox the rest of the site does pending the
 * client's real one, and the phone line reuses the exact placeholder text
 * Footer already shows, rather than inventing a different-looking fake
 * number in a second place. Location stays "Singapore" only — this project's
 * established discipline is to never fabricate a specific address that was
 * never confirmed real (see footer.tsx).
 *
 * Each method's icon is pre-wrapped to a plain `(className) => ReactNode`
 * function rather than stored as a component reference: lucide icons accept
 * a `strokeWidth` prop that the hand-drawn `WhatsAppIcon` glyph doesn't, so
 * storing them under one shared type and rendering `<Icon strokeWidth={…}/>`
 * generically doesn't type-check. Wrapping each one closes over its own
 * correct props once, here, so `MethodRow` can render any of them the same way.
 */
type Method = {
  icon: (className: string) => ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

const METHODS: Method[] = [
  {
    icon: (className) => <WhatsAppIcon className={className} />,
    label: "WhatsApp",
    value: siteConfig.whatsappDisplay,
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
    external: true,
  },
  {
    icon: (className) => <Mail className={className} strokeWidth={1.5} />,
    label: "Email",
    value: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
  },
  {
    icon: (className) => <Phone className={className} strokeWidth={1.5} />,
    label: "Phone",
    value: "+65 XXXX XXXX",
    href: "tel:+65",
  },
  {
    icon: (className) => <MapPin className={className} strokeWidth={1.5} />,
    label: "Location",
    value: "Singapore",
    href: "#",
  },
];

/** Same icon-badge treatment as Authority's `StatItem` — soft gradient fill,
 * inset highlight, resting ion glow — so the two "here's a fact" moments on
 * the site (company stats, contact methods) share one visual grammar. */
function MethodIcon({ children }: { children: ReactNode }) {
  return (
    <div className="from-background to-graphite ring-border shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(10,14,20,0.04),0_0_18px_rgba(46,143,255,0.14)] flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b ring-1">
      {children}
    </div>
  );
}

function MethodRow({ icon: Icon, label, value, href, external }: Method) {
  const isPlaceholder = href === "#";

  const content = (
    <>
      <MethodIcon>{Icon("text-ion h-5 w-5")}</MethodIcon>
      <div className="flex flex-col gap-0.5 text-left">
        <span className="text-label-sm font-mono">{label}</span>
        <span className="font-body text-foreground text-sm">{value}</span>
      </div>
    </>
  );

  const rowClass =
    "group border-border bg-graphite/40 ease-engineered flex items-center gap-4 rounded-md border p-4 transition-colors duration-300";

  if (isPlaceholder) {
    return <div className={rowClass}>{content}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${rowClass} hover:border-ion/50 hover:bg-graphite/70`}
    >
      {content}
    </a>
  );
}

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <RevealWrapper variant="fade">
          <span className="text-ion text-label-sm font-mono">Direct Channels</span>
        </RevealWrapper>
        <RevealWrapper variant="blur" delay={0.1}>
          <Heading as="h2" size="h3" className="uppercase">
            Talk To The Team Directly
          </Heading>
        </RevealWrapper>
        <RevealWrapper variant="fade" delay={0.2}>
          <Paragraph size="body" className="max-w-md text-balance">
            No call centre, no ticket queue — every enquiry reaches the
            engineers who&apos;ll actually work on it.
          </Paragraph>
        </RevealWrapper>
      </div>

      <div className="flex flex-col gap-3">
        {METHODS.map((method, index) => (
          <RevealWrapper key={method.label} variant="fade" delay={0.25 + index * 0.08}>
            <MethodRow {...method} />
          </RevealWrapper>
        ))}
      </div>

      <RevealWrapper variant="fade" delay={0.6}>
        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="LinkedIn"
            className="border-border text-muted ease-engineered hover:border-ion/60 hover:text-ion flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </RevealWrapper>
    </div>
  );
}
