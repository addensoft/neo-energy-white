/**
 * Minimal stroke-based LinkedIn glyph, matching lucide's own visual language
 * (1.5 stroke, rounded joins) since lucide-react doesn't ship brand icons in
 * the version pinned here.
 */
type IconProps = { className?: string };

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7" y1="10.5" x2="7" y2="17" />
      <circle cx="7" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
      <line x1="11" y1="10.5" x2="11" y2="17" />
      <path d="M11 13.25a2.5 2.5 0 0 1 5 0V17" />
    </svg>
  );
}
