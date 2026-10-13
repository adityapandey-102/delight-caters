/** The long right arrow used on every CTA; nudges right on parent `group` hover. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 16"
      aria-hidden="true"
      className={`h-3 w-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 8h16M12 3l5 5-5 5" />
    </svg>
  );
}
