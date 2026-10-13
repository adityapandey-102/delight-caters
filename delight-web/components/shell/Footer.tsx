import Link from "next/link";
import Image from "next/image";
import { company, contact, nav, social } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";

/** Green velvet footer: the mark, the old footer's Visit Us / Contact / Follow Us, and the copyright line. */
export default function Footer() {
  return (
    <footer className="green-velvet relative overflow-hidden">
      <div aria-hidden className="grain" />
      <div className="gold-hairline absolute inset-x-0 top-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-28 pt-20 sm:px-8 sm:pb-10 lg:px-12">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1.1fr_1fr]">
          <div>
            <Image
              src="/brand/logo-gold.png"
              alt={company.name}
              width={1200}
              height={634}
              sizes="200px"
              className="h-24 w-auto object-contain"
            />
            <p className="mt-6 max-w-xs text-[14px] leading-[1.8] text-cream-muted">
              A Bengaluru-based catering company under {company.parent}.
            </p>
            <p className="mt-4 font-script text-[28px] leading-none text-gold-light">{company.tagline}</p>
          </div>

          <div>
            <h3 className="text-[10.5px] font-medium uppercase tracking-[0.26em] text-gold-light/80">Navigate</h3>
            <ul className="mt-6 space-y-3.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="ulink text-[14px] text-cream/85 transition-colors hover:text-gold-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10.5px] font-medium uppercase tracking-[0.26em] text-gold-light/80">Visit Us</h3>
            <address className="mt-6 text-[14px] not-italic leading-[1.8] text-cream/85">{contact.address.full}</address>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-gold-light"
            >
              <Icon name="pin" size={15} /> Get directions
            </a>
          </div>

          <div>
            <h3 className="text-[10.5px] font-medium uppercase tracking-[0.26em] text-gold-light/80">Contact</h3>
            <ul className="mt-6 space-y-3.5 text-[14px] text-cream/85">
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-3 transition-colors hover:text-gold-light">
                  <Icon name="phone" size={16} className="text-gold-light" /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 transition-colors hover:text-gold-light">
                  <Icon name="mail" size={16} className="text-gold-light" /> {contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <Icon name="clock" size={16} className="text-gold-light" /> {contact.hours}
              </li>
            </ul>

            <h3 className="mt-10 text-[10.5px] font-medium uppercase tracking-[0.26em] text-gold-light/80">Follow Us</h3>
            <div className="mt-5 flex gap-3">
              <a
                href={social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram — ${social.instagram.label}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-light/30 text-gold-light transition-colors hover:border-gold-light hover:bg-gold-light/10"
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href={social.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-light/30 text-gold-light transition-colors hover:border-gold-light hover:bg-gold-light/10"
              >
                <Icon name="linkedin" size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-gold-light/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55">{company.copyright}</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55">A {company.parent} company</p>
        </div>
      </div>
    </footer>
  );
}
