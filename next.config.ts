import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compile-time-checked `href`s (Link, redirect, etc.) — catches broken
  // in-app links (e.g. a stale chapter anchor) at build time.
  typedRoutes: true,

  experimental: {
    // Narrows barrel imports from these packages to only the modules actually
    // used, keeping GSAP/Framer/icon imports out of bundles that don't need them.
    optimizePackageImports: ["gsap", "framer-motion", "lucide-react"],
  },

  images: {
    // Every real chapter asset still ships from /public — the one exception
    // is `/team`'s placeholder avatars (see `team-grid.tsx`), generated
    // illustrations from DiceBear rather than photos of real people, fetched
    // as PNG specifically so this doesn't need `dangerouslyAllowSVG`. Remove
    // this pattern once the real team roster (with real photos, if any)
    // replaces the placeholder one.
    remotePatterns: [{ protocol: "https", hostname: "api.dicebear.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
