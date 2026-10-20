import Link from "next/link";
import Image from "next/image";
import { group, nav } from "@/lib/content/group";
import { contact as caterers, social as caterersSocial } from "@/lib/content/site";
import { sterlingInn } from "@/lib/content/hospitality";
import { Icon } from "@/components/ui/Icon";

const divisions = nav.filter((n) => "children" in n);

/** Apple-style footer: quiet grey type on the light page — a line of fine print, link columns per division, contacts, then the legal bar. */
export default function Footer() {
  return (
    <footer className="bg-wall text-[12px] leading-[1.5] text-muted">
      <div className="mx-auto w-full max-w-[1080px] px-6 pb-28 pt-6 sm:pb-8">
        <p className="border-b border-line pb-4">
          {group.name} — {group.tagline}. Hospitality, food and celebration in Bengaluru: Delight Hospitality and Delight Eatry, one family of businesses.
        </p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 py-8 md:grid-cols-4">
          {divisions.map((d) => (
            <div key={d.href}>
              <h3 className="font-semibold text-ink">
                <Link href={d.href} className="hover:underline">
                  Delight {d.label}
                </Link>
              </h3>
              <ul className="mt-2.5 space-y-2">
                {"children" in d &&
                  d.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="hover:text-ink hover:underline">
                        {c.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold text-ink">Zyra Group</h3>
            <ul className="mt-2.5 space-y-2">
              <li>
                <Link href="/about" className="hover:text-ink hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#enquiry" className="hover:text-ink hover:underline">
                  Plan your event
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink">Get in touch</h3>
            <ul className="mt-2.5 space-y-2">
              <li>
                <a href={caterers.phoneHref} className="hover:text-ink hover:underline">
                  {caterers.phoneDisplay} · Delight Caterers
                </a>
              </li>
              {sterlingInn.contact.phone && (
                <li>
                  <a href={sterlingInn.contact.phone.href} className="hover:text-ink hover:underline">
                    {sterlingInn.contact.phone.display} · Sterling hotels
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-4 flex gap-2">
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
                  className="glass-icon flex h-9 w-9 items-center justify-center rounded-full"
                >
                  <Icon name={s.icon} size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="20px" className="h-5 w-auto" />
            <p>{group.copyright}</p>
          </div>
          <p>Bengaluru, Karnataka · India</p>
        </div>
      </div>
    </footer>
  );
}
