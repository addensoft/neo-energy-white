import type { ReactNode } from "react";

import { Footer, Navbar } from "@/components/layout";

/**
 * Layout for the main marketing site — everything that should carry the
 * global Navbar/Footer chrome.
 *
 * This is a route *group* (`(main)`), so it adds no URL segment: the
 * homepage still lives at `/`, exactly as before. It exists purely so
 * standalone routes like `/under-construction` can opt out of the site
 * chrome — that page is a self-contained full-viewport placeholder, and the
 * footer's homepage-anchor links (`#repair`, `#flagship-battery`, ...) don't
 * resolve anywhere outside the homepage anyway.
 */
export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
