import { siteConfig } from "@/lib/site-config";

import { WhatsAppIcon } from "./social-icons";

/**
 * WhatsAppFloat — persistent chat affordance, bottom-right on every page.
 *
 * Sits opposite Hero's own bottom-left play/pause control so the two never
 * collide. No client JS: it's a plain link, and the resting halo is a CSS
 * animation, so this stays a server component.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${siteConfig.name} on WhatsApp`}
      className="group ease-engineered focus-visible:outline-ion fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 lg:right-8 lg:bottom-8"
    >
      {/* Soft resting halo — paused for anyone who's asked for reduced motion. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping"
      />

      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
