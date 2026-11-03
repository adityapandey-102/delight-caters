import Image from "next/image";
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
  image: { src: string; alt: string };
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
  image: v.hero,
  address: v.contact.address,
  phone: v.contact.phone,
  email: v.contact.email,
  mapsUrl: v.contact.mapsUrl,
}));

const eateryEntries: Entry[] = [
  {
    slug: delightCaterersCard.slug,
    href: `/eatry/${delightCaterersCard.slug}`,
    name: delightCaterersCard.name,
    kind: delightCaterersCard.kind,
    image: { src: "/media/refined/caterers-hero.webp", alt: "A dish being plated at a table laid by Delight Caterers" },
    address: delightCaterersCard.address,
    phone: delightCaterersCard.phone,
    email: delightCaterersCard.email,
    mapsUrl: undefined,
  },
  ...eateries.map((v) => ({
    slug: v.slug,
    href: `/eatry/${v.slug}`,
    name: v.name,
    kind: v.kind,
    // A brand with a favourites row (Bombay Kulfi) shows its first favourite; its hero is drawn as cut-outs.
    image: v.favourites?.[0]?.image ?? v.hero,
    address: v.contact.address,
    phone: v.contact.phone,
    email: v.contact.email,
    mapsUrl: v.contact.mapsUrl,
  })),
];

/** How an enquiry works, in order. */
const ENQUIRY_STEPS = [
  "Choose the hotel, restaurant or kitchen you'd like to reach.",
  "Add a few details — the date, the guests, what you have in mind.",
  "Send it, and carry on the conversation with us on WhatsApp.",
];

const groups: { title: string; entries: Entry[] }[] = [
  { title: "Zyra Food & Beverages", entries: eateryEntries },
  { title: "Zyra Hospitality", entries: hotelEntries },
];

function Card({ e }: { e: Entry }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-[18px] border border-gold/30 bg-wall-lit/80 shadow-[0_30px_60px_-44px_rgba(18,20,16,0.45)]">
      <div className="relative aspect-[16/9] bg-wall-warm">
        <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="p-5 sm:p-6 lg:p-5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-gold-deep">{e.kind}</p>
        <h3 className="mt-1.5 font-display text-[1.4rem] font-semibold leading-snug text-onyx">{e.name}</h3>
        <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-body lg:mt-3 lg:space-y-1.5 lg:text-[14px]">
          {e.address && (
            <li className="flex items-start gap-3">
              <Icon name="pin" size={16} className="mt-1 shrink-0 text-gold-deep" />
              <span className="min-w-0 lg:line-clamp-2">{e.address}</span>
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
        <div className="mt-5 flex flex-wrap gap-x-5 lg:mt-3 gap-y-2 text-[13px] font-semibold uppercase tracking-[0.16em]">
          {e.mapsUrl && (
            <a href={e.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-gold-deep hover:text-onyx">
              Directions
            </a>
          )}
          <Link href={e.href} className="text-onyx hover:text-gold-deep">
            View page
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * The contact page body: every business in the group, each card led by its own
 * photograph (three across on desktop), then the enquiry form beside its heading.
 */
export function ContactDirectory() {
  return (
    <>
      <section id="directory" className="relative px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[5vh]">
        <div aria-hidden className="wall-sun" />
        <div className="relative mx-auto w-full max-w-[1280px] space-y-12 lg:space-y-[3vh]">
          {groups.map((g) => (
            <Reveal key={g.title}>
              <Eyebrow>{g.title}</Eyebrow>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-[2vh] lg:grid-cols-3">
                {g.entries.map((e) => (
                  <Card key={e.slug} e={e} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The enquiry: a photograph with the three steps on the left, the form on a clean panel on the right */}
      <section id="enquire" className="relative scroll-mt-24 px-5 pb-16 sm:px-8 md:pb-24 lg:px-12 lg:py-[5vh]">
        <Reveal className="mx-auto grid w-full max-w-[1280px] overflow-hidden rounded-[28px] bg-wall-lit shadow-[0_60px_110px_-60px_rgba(18,20,16,0.45)] ring-1 ring-line lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="relative isolate flex min-h-[420px] flex-col justify-end p-7 text-cream sm:p-10 lg:min-h-[640px] lg:p-12">
            <Image src="/media/real/aero-dining-room.webp" alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="-z-20 object-cover" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/10" />
            <p className="eyebrow on-dark">Enquiries</p>
            <h2 className="display on-dark mt-3 text-[clamp(2.3rem,4vw,3.4rem)]">
              Send us an <span className="display-italic">enquiry.</span>
            </h2>
            <ol className="mt-7 space-y-3 text-[15.5px] leading-snug text-cream/90">
              {ENQUIRY_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-[12px] font-semibold ring-1 ring-white/25">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <EnquiryForm tone="light" idPrefix="contact-enquiry" compact />
          </div>
        </Reveal>
      </section>
    </>
  );
}
