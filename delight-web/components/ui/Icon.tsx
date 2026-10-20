/**
 * Outline glyphs (decorative — the text beside them carries the meaning).
 * One stroke weight across the site so icons read as a family.
 */
export type IconName =
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "check"
  | "sparkle"
  | "play"
  | "star"
  | "plus"
  | "close"
  | "send"
  | "calendar"
  | "users"
  | "leaf"
  | "chef"
  | "heart"
  | "briefcase"
  | "rings"
  | "party"
  | "glass"
  | "wifi"
  | "car"
  | "gym"
  | "plane"
  | "coffee"
  | "bed"
  | "shield"
  | "key"
  | "cutlery"
  | "icecream"
  | "building";

const PATHS: Record<IconName, React.ReactNode> = {
  wifi: <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.3a9.5 9.5 0 0 1 13 0M8.6 15.5a5 5 0 0 1 6.8 0M12 19h.01" />,
  car: (
    <>
      <path d="M4 16.5V12l2-5h12l2 5v4.5M4 16.5h16M4 16.5V19h3v-2.5M17 16.5V19h3v-2.5M4 12h16" />
      <circle cx="7.5" cy="14.3" r=".6" fill="currentColor" />
      <circle cx="16.5" cy="14.3" r=".6" fill="currentColor" />
    </>
  ),
  gym: <path d="M3 12h18M6 8v8M3.5 10v4M18 8v8M20.5 10v4" />,
  plane: <path d="M3 13.5l7.5-2 4-7.5h2l-1.5 7 5.5-1.5 1 1.5-6.5 3 1 6.5h-2l-3-5-6 1.5z" />,
  coffee: (
    <>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3.5c0 1 1 1.3 1 2.5M12 3.5c0 1 1 1.3 1 2.5" />
    </>
  ),
  bed: <path d="M3 18V6M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5M6.5 11.5a1.5 1.5 0 1 0 0-.01" />,
  shield: <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6zM9 12l2 2 4-4" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8.5-8.5M16 7l2.5 2.5M14 9l2 2" />
    </>
  ),
  cutlery: <path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2.2 1.2-3.3 3.7-3.3 6.8V13H17" />,
  icecream: <path d="M8 10.5a4 4 0 1 1 8 0M7 10.5h10l-5 10.5z" />,
  building: (
    <>
      <path d="M4 21V5l8-2v18M12 7l8 2v12M3 21h18" />
      <path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.1 2.8 2.7l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.6v.5c0 .4-.2.7-.6.9-1.5.7-3.6-.1-5.5-2-1.9-1.9-2.6-4-1.9-5.4z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11 16.5v-6M11 13.2c0-1.6 1-2.7 2.4-2.7s2.1 1 2.1 2.6v3.4" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  sparkle: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  send: <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0M16 4.8a3.2 3.2 0 0 1 0 6.4M18 14.2A6 6 0 0 1 21 20" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15z" />
      <path d="M5 19l8-8" />
    </>
  ),
  chef: (
    <>
      <path d="M7 14a4 4 0 1 1 1.6-7.7A4 4 0 0 1 16.4 6.3 4 4 0 1 1 17 14" />
      <path d="M7 13.5V20h10v-6.5M7 17h10" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5h6v2M3 12.5h18" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M10.5 5.5L12 4l1.5 1.5" />
    </>
  ),
  party: (
    <>
      <path d="M4 20l5-13 8 8z" />
      <path d="M14 4v2M19 9h2M17.5 5.5l1.5-1.5M15 8.5c1-1 2.4-1 3 0" />
    </>
  ),
  glass: (
    <>
      <path d="M7 3h10l-1 7a4 4 0 0 1-8 0z" />
      <path d="M12 14v6M8.5 20h7" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  className = "",
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === "star" || name === "play" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      {PATHS[name]}
    </svg>
  );
}
