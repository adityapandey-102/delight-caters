import Link from "next/link";
import Image from "next/image";
import { group, nav } from "@/lib/content/group";
import { contact as caterers, social as caterersSocial } from "@/lib/content/site";
import { sterlingInn } from "@/lib/content/hospitality";
import { Icon } from "@/components/ui/Icon";

const divisions = nav.filter((n) => "children" in n);

/** Onyx footer: the Zyra mark, both divisions with their brands, the key contacts, and the copyright line. */
export default function Footer() {
  return (
    <footer className="onyx-velvet relative overflow-hidden">
      <div aria-hidden className="grain" />
      <div className="gold-hairline absolute inset-x-0 top-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-28 pt-16 sm:px-8 sm:pb-10 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label={`${group.name} — home`} className="inline-flex items-center gap-3">
              <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="56px" className="h-14 w-auto" />
              <Image src="/brand/zyra-word.png" alt={group.shortName} width={698} height={187} sizes="140px" className="h-8 w-auto" />
            </Link>
            <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-gold-light/80">{group.tagline}</p>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.8] text-cream-muted">
              Hospitality, food and celebration in Bengaluru — one family of businesses.
            </p>
          </div>

          {divisions.map((d) => (
            <div key={d.href}>
              <h3 className="text-[10.5px] font-medium uppercase tracking-[0.26em] text-gold-light/80">
                <Link href={d.href} className="transition-colors hover:text-gold-light">
                  Delight {d.label}
                </Link>
              </h3>
              <ul className="mt-5 space-y-3">
                {"children" in d &&
                  d.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="ulink text-[14px] text-cream/85 transition-colors hover:text-gold-light">
                        {c.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[10.5px] font-medium uppercase tracking-[0.26em] text-gold-light/80">Get in touch</h3>
            <ul className="mt-5 space-y-3.5 text-[14px] text-cream/85">
              <li>
                <a href={caterers.phoneHref} className="inline-flex items-start gap-3 transition-colors hover:text-gold-light">
                  <Icon name="phone" size={16} className="mt-0.5 text-gold-light" />
                  <span>
                    {caterers.phoneDisplay}
                    <span className="block text-[11.5px] text-cream-muted">Delight Caterers</span>
                  </span>
                </a>
              </li>
              {sterlingInn.contact.phone && (
                <li>
                  <a href={sterlingInn.contact.phone.href} className="inline-flex items-start gap-3 transition-colors hover:text-gold-light">
                    <Icon name="phone" size={16} className="mt-0.5 text-gold-light" />
                    <span>
                      {sterlingInn.contact.phone.display}
                      <span className="block text-[11.5px] text-cream-muted">Sterling hotels · reservations</span>
                    </span>
                  </a>
                </li>
              )}
              <li>
                <Link href="/contact" className="inline-flex items-center gap-3 font-semibold text-gold-light">
                  <Icon name="mail" size={16} /> All contacts
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { href: caterersSocial.instagram.href, label: "Delight Caterers on Instagram", icon: "instagram" as const },
                { href: sterlingInn.contact.instagram!, label: "Sterling Inn on Instagram", icon: "instagram" as const },
                { href: caterersSocial.linkedin.href, label: "Delight Caterers on LinkedIn", icon: "linkedin" as const },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass-icon-dark flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-gold-light/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55">{group.copyright}</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55">Bengaluru · Karnataka</p>
        </div>
      </div>
    </footer>
  );
}
