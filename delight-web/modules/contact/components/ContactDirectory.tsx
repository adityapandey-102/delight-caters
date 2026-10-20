import Link from "next/link";
import { hotels } from "@/lib/content/hospitality";
import { eateries, delightCaterersCard } from "@/lib/content/eatry";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Icon } from "@/components/ui/Icon";
import { EnquiryForm } from "@/modules/enquiry/components/EnquiryForm";

type Entry = {
  slug: string;
  href: string;
  name: string;
  kind: string;
  address?: string;
  phone?: { display: string; href: string };
  email?: string;
  mapsUrl?: string;
};

const hotelEntries: Entry[] = hotels.map((v) => ({
  slug: v.slug,
  href: `/hospitality/${v.slug}`,
  name: v.name,
  kind: v.kind,
  address: v.contact.address,
  phone: v.contact.phone,
  email: v.contact.email,
  mapsUrl: v.contact.mapsUrl,
}));

const eateryEntries: Entry[] = [
  ...eateries.map((v) => ({
    slug: v.slug,
    href: `/eatry/${v.slug}`,
    name: v.name,
    kind: v.kind,
    address: v.contact.address,
    phone: v.contact.phone,
    email: v.contact.email,
    mapsUrl: v.contact.mapsUrl,
  })),
  {
    slug: delightCaterersCard.slug,
    href: `/eatry/${delightCaterersCard.slug}`,
    name: delightCaterersCard.name,
    kind: delightCaterersCard.kind,
    address: delightCaterersCard.address,
    phone: delightCaterersCard.phone,
    email: delightCaterersCard.email,
    mapsUrl: undefined,
  },
];

const groups: { title: string; entries: Entry[] }[] = [
  { title: "Delight Hospitality", entries: hotelEntries },
  { title: "Delight Eatry", entries: eateryEntries },
];

function Card({ e }: { e: Entry }) {
  return (
    <article className="min-w-0 rounded-[18px] border border-gold/30 bg-wall-lit/80 p-5 shadow-[0_30px_60px_-44px_rgba(18,20,16,0.45)] sm:p-6">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-gold-deep">{e.kind}</p>
      <h3 className="mt-1.5 font-display text-[1.4rem] font-semibold leading-snug text-onyx">{e.name}</h3>
      <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-body">
        {e.address && (
          <li className="flex items-start gap-3">
            <Icon name="pin" size={16} className="mt-1 shrink-0 text-gold-deep" />
            <span className="min-w-0">{e.address}</span>
          </li>
        )}
        {e.phone && (
          <li className="flex items-start gap-3">
            <Icon name="phone" size={16} className="mt-1 shrink-0 text-gold-deep" />
            <a href={e.phone.href} className="min-w-0 hover:text-gold-deep">
              {e.phone.display}
            </a>
          </li>
        )}
        {e.email && (
          <li className="flex items-start gap-3">
            <Icon name="mail" size={16} className="mt-1 shrink-0 text-gold-deep" />
            <a href={`mailto:${e.email}`} className="min-w-0 break-all hover:text-gold-deep">
              {e.email}
            </a>
          </li>
        )}
      </ul>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold uppercase tracking-[0.16em]">
        {e.mapsUrl && (
          <a href={e.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-gold-deep hover:text-onyx">
            Directions
          </a>
        )}
        <Link href={e.href} className="text-onyx hover:text-gold-deep">
          View page
        </Link>
      </div>
    </article>
  );
}

/** The contact page body: every business in the group, beside the enquiry form. */
export function ContactDirectory() {
  return (
    <section className="relative px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <div aria-hidden className="wall-sun" />
      <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
        <div className="min-w-0 space-y-12">
          {groups.map((g) => (
            <Reveal key={g.title}>
              <Eyebrow>{g.title}</Eyebrow>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {g.entries.map((e) => (
                  <Card key={e.slug} e={e} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08} className="min-w-0 lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-wall-warm p-6 sm:p-8">
            <div className="relative">
              <Eyebrow>Enquiries</Eyebrow>
              <h2 className="display mt-4 text-[clamp(2.2rem,3.6vw,3rem)]">Plan an event or a stay</h2>
              <div className="mt-6 rounded-[16px] bg-wall-lit p-5 sm:p-6">
                <EnquiryForm tone="light" idPrefix="contact-enquiry" heading={["Tell us about", "your event"]} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
