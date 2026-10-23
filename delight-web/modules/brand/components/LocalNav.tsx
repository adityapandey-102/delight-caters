import Link from "next/link";

/**
 * Apple's product-page bar: sticks under the global nav once the hero has
 * passed — the brand's name on the left, jump links and one small pill on the
 * right. Links collapse away on phones; the name and the pill stay.
 */
export function LocalNav({
  name,
  links,
  cta,
}: {
  name: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string; external?: boolean };
}) {
  const pill = "btn-onyx shine !px-3.5 !py-1.5 !text-[12px]";
  return (
    <div className="sticky top-[var(--header-h)] z-30 border-b border-black/[0.08] bg-[rgba(250,250,248,0.78)] backdrop-blur-2xl backdrop-saturate-[1.8]">
      <div className="mx-auto flex h-[52px] w-full max-w-[1080px] items-center justify-between gap-6 px-6">
        <p className="font-display text-[19px] font-semibold tracking-[-0.01em] text-ink md:text-[21px]">{name}</p>
        <nav aria-label={`${name} sections`} className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[12px] text-body transition-colors hover:text-gold-deep">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {cta.external ? (
            <a href={cta.href} target="_blank" rel="noopener noreferrer" className={pill}>
              {cta.label}
            </a>
          ) : cta.href.startsWith("/") ? (
            <Link href={cta.href} className={pill}>
              {cta.label}
            </Link>
          ) : (
            <a href={cta.href} className={pill}>
              {cta.label}
            </a>
          )}
        </nav>
      </div>
    </div>
  );
}
