import { Bell, CalendarClock, History, Home, MessageCircle, User } from "lucide-react";

/**
 * AppPhoneMockup — an illustrative phone screen, not a real screenshot.
 * Nothing in this component is a captured product screen: no app has
 * shipped yet (see `app-download.tsx`), so this is concept art of what the
 * app's home screen might look like, built entirely from CSS/SVG in the
 * site's own palette — the same honesty line the custom WhatsApp/LinkedIn
 * glyphs in `social-icons.tsx` already draw (hand-built in the site's own
 * language rather than passed off as an official asset).
 *
 * Every piece of copy on the screen itself (name, "92%", "14 days ago") is
 * placeholder data and marked `aria-hidden` for that reason; the real,
 * accessible feature descriptions live in the numbered callouts around it
 * in `app-showcase.tsx`, not inside this decorative screen.
 */
export function AppPhoneMockup() {
  return (
    <div
      aria-hidden="true"
      className="border-foreground bg-foreground relative mx-auto aspect-[9/19] w-[240px] shrink-0 rounded-[2.75rem] border-[10px] shadow-[0_30px_70px_-20px_rgba(15,23,42,0.45)] lg:w-[260px]"
    >
      {/* Notch */}
      <div className="bg-foreground absolute top-0 left-1/2 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl" />

      <div className="from-background to-graphite-light absolute inset-0 flex flex-col overflow-hidden rounded-[2rem] bg-gradient-to-b">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 text-[0.65rem] font-semibold text-foreground/70">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="bg-foreground/50 h-1.5 w-1.5 rounded-full" />
            <span className="bg-foreground/50 h-1.5 w-1.5 rounded-full" />
            <span className="bg-foreground/70 h-2 w-3.5 rounded-[2px]" />
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-2">
            <div className="ring-ion/20 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1">
              <User className="text-ion h-4 w-4" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.6rem] text-foreground/50">Welcome back</span>
              <span className="font-display text-xs font-semibold text-foreground">
                Fleet Manager
              </span>
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Bell className="text-ion h-4 w-4" strokeWidth={1.5} />
          </div>
        </div>

        {/* Battery health gauge card */}
        <div className="mx-5 mt-4 flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.3)]">
          <div
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#2e8fff 0% 92%, rgba(46,143,255,0.15) 92% 100%)`,
            }}
          >
            <div className="bg-background flex h-10 w-10 items-center justify-center rounded-full">
              <span className="font-display text-[0.65rem] font-bold text-foreground">
                92%
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.65rem] font-semibold text-foreground">Pack Health</span>
            <span className="text-[0.6rem] text-foreground/50">
              Last diagnostic · 14 days ago
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-3 flex gap-2 px-5">
          <div className="bg-ion flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2">
            <CalendarClock className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
            <span className="text-[0.6rem] font-semibold text-white">Book Visit</span>
          </div>
          <div className="border-border flex flex-1 items-center justify-center gap-1.5 rounded-lg border bg-white py-2">
            <MessageCircle className="text-ion h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="text-[0.6rem] font-semibold text-foreground">Message</span>
          </div>
        </div>

        {/* Reminders */}
        <div className="mt-3 flex flex-col gap-2 px-5">
          <div className="rounded-lg bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[0.6rem] font-semibold text-foreground">
                Certification Status
              </span>
              <span className="text-certified text-[0.55rem] font-semibold">Valid</span>
            </div>
            <div className="bg-graphite-light mt-1.5 h-1 w-full rounded-full">
              <div className="bg-certified h-1 w-[85%] rounded-full" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[0.6rem] font-semibold text-foreground">
                Next Scheduled Service
              </span>
              <span className="text-ion text-[0.55rem] font-semibold">30 days</span>
            </div>
            <div className="bg-graphite-light mt-1.5 h-1 w-full rounded-full">
              <div className="bg-ion h-1 w-[45%] rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="border-border mt-auto flex items-center justify-around border-t bg-white px-5 py-3">
          <Home className="text-ion h-4 w-4" strokeWidth={1.5} />
          <CalendarClock className="h-4 w-4 text-foreground/30" strokeWidth={1.5} />
          <History className="h-4 w-4 text-foreground/30" strokeWidth={1.5} />
          <User className="h-4 w-4 text-foreground/30" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
