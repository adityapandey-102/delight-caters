import Link from "next/link";

/** DUMMY sign-in entry (phase 2 preview): the person icon in the nav opens /login, customer first. */

export function PersonIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 19.5c1.3-3.3 4-5 7.2-5s5.9 1.7 7.2 5" />
    </svg>
  );
}

export function SignInLink({ light, current }: { light: boolean; current: boolean }) {
  return (
    <Link
      href="/login#customer"
      aria-label="Sign in"
      title="Sign in"
      aria-current={current ? "page" : undefined}
      className={`hidden h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 lg:flex ${light ? "hover:bg-black/[0.06]" : "hover:bg-white/15"} ${
        current ? (light ? "bg-black/[0.06]" : "bg-white/15") : ""
      }`}
    >
      <PersonIcon />
    </Link>
  );
}
