import Image from "next/image";
import Link from "next/link";
import type { Venue } from "@/lib/content/types";
import { reviewsBySlug } from "@/lib/content/reviews";
import { Reveal, LineReveal } from "@/components/ui/motion";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";
import FaqAccordion from "@/modules/home/components/FaqAccordion";
import GoogleReviews from "@/modules/home/components/GoogleReviews";
import { Gallery } from "@/modules/gallery/components/Gallery";
import { BrandHero } from "./BrandHero";
import { ReelsSection } from "./ReelsSection";
import { Location } from "./Location";
import { LocalNav } from "./LocalNav";
import { offersFor } from "@/lib/content/offers";
import { OffersSection } from "@/modules/showcase/components/OffersSection";

const DIVISION = {
  hospitality: { name: "Delight Hospitality", href: "/hospitality" },
  eatry: { name: "Delight Eatry", href: "/eatry" },
} as const;

/** "01 / The stay" — the numbered chapter label used through the page (after Loam House). */
function Chapter({ n, label }: { n: number; label: string }) {
  return (
    <p className="flex items-center gap-3 border-t border-line pt-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted">
      <span className="text-gold-deep lining-nums">{String(n).padStart(2, "0")}</span>
      <span aria-hidden>/</span>
      {label}
    </p>
  );
}

/**
 * One brand's page, told in chapters: the cinematic hero (the brand's own logo
 * on the photograph), the story with the visit card, what's on offer, the
 * spaces, an interactive gallery, the location on a map, guest reviews, FAQs
 * and reels. Driven entirely by the brand's Venue record.
 */
export function VenuePage({ venue }: { venue: Venue }) {
  const division = DIVISION[venue.division];
  const location = venue.contact.address?.split(",").slice(-3, -1).join(",").trim() || venue.kind;
  const isHotel = venue.division === "hospitality";
  const logo = venue.logoOnDark ?? venue.logo;
  const reviews = reviewsBySlug[venue.slug];
  const venueOffers = offersFor({ slug: venue.slug });
  const photos = [venue.hero, ...venue.spaces.map((s) => s.image), ...venue.gallery].filter((p, i, a) => a.findIndex((q) => q.src === p.src) === i);

  return (
    <>
      <BrandHero
        eyebrow={`${division.name} · ${venue.kind}`}
        lines={[venue.name, venue.tagline]}
        tagline={location}
        body={venue.intro[0]}
        image={venue.hero}
        inset={venue.heroInset}
        logo={logo ? { ...logo, alt: venue.name } : null}
        primary={venue.cta}
        secondary={
          venue.contact.phone
            ? { label: `Call ${venue.contact.phone.display}`, href: venue.contact.phone.href }
            : venue.contact.mapsUrl && venue.cta.href !== venue.contact.mapsUrl
              ? { label: "Get directions", href: venue.contact.mapsUrl, external: true }
              : { label: "Plan Your Event", href: "#enquiry" }
        }
      />

      <LocalNav
        name={venue.name}
        cta={{ label: isHotel ? "Book" : venue.cta.label, href: venue.cta.href, external: venue.cta.external }}
        links={[
          { label: "Overview", href: "#overview" },
          { label: isHotel ? "Amenities" : "Highlights", href: "#offer" },
          ...(venue.spaces.length ? [{ label: isHotel ? "Rooms & spaces" : "Spaces", href: "#spaces" }] : []),
          ...(venueOffers.length ? [{ label: "Offers", href: "#offers" }] : []),
          ...(photos.length > 1 ? [{ label: "Gallery", href: "#gallery" }] : []),
          { label: "Location", href: "#location" },
          ...(reviews ? [{ label: "Reviews", href: "#reviews" }] : []),
        ]}
      />

      <nav aria-label="Breadcrumb" className="px-5 pt-6 text-[12.5px] text-muted sm:px-8 lg:px-12">
        <ol className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={division.href} className="hover:text-ink">{division.name}</Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">{venue.name}</li>
        </ol>
      </nav>

      {/* 01–03: the story, on offer, spaces — beside the visit card */}
      <section className="relative px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div aria-hidden className="wall-sun" />
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="min-w-0 space-y-16">
            <div id="overview" className="scroll-mt-[120px]">
              <Chapter n={1} label={isHotel ? "The stay" : "The place"} />
              <LineReveal lines={isHotel ? ["Arrive easy.", "Stay a while."] : ["Come hungry.", "Leave happy."]} italicFrom={1} className="display mt-6 text-[clamp(2.8rem,6vw,5.2rem)]" />
              <Reveal className="mt-7 max-w-[62ch] space-y-4 text-[16px] leading-[1.8] text-body">
                {(venue.intro.length > 1 ? venue.intro.slice(1) : venue.intro).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </Reveal>
              <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-4">
                {venue.facts.map((f) => (
                  <div key={f.label} className="bg-wall-lit px-4 py-4">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted">{f.label}</dt>
                    <dd className="mt-1.5 font-display text-[1.25rem] leading-snug text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div id="offer" className="scroll-mt-[120px]">
              <Chapter n={2} label="On offer" />
              <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,3.8rem)]">
                Everything <span className="display-italic">you need.</span>
              </h2>
              <Reveal as="ul" stagger className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                {venue.highlights.map((h) => (
                  <li key={h.label} className="flex items-center gap-3 text-[14.5px] text-body">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
                      <Icon name={h.icon} size={18} />
                    </span>
                    {h.label}
                  </li>
                ))}
              </Reveal>
            </div>

            {venue.spaces.length > 0 && (
              <div id="spaces" className="scroll-mt-[120px]">
                <Chapter n={3} label="Spaces" />
                <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,3.8rem)]">
                  Room <span className="display-italic">to breathe.</span>
                </h2>
                <Reveal as="ul" stagger className="mt-8 grid gap-6 sm:grid-cols-3">
                  {venue.spaces.map((s) => (
                    <li key={s.title}>
                      <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-wall-warm">
                        <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 640px) 280px, 100vw" className="object-cover" />
                      </ImageReveal>
                      <h3 className="mt-4 font-display text-[1.7rem] leading-none tracking-[-0.02em] text-ink">{s.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.6] text-muted">{s.body}</p>
                    </li>
                  ))}
                </Reveal>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <VisitCard venue={venue} />
          </aside>
        </div>
      </section>

      {/* What's on: this outlet's offers, events and collaborations */}
      <OffersSection eyebrow="What's on" title={`Offers at ${venue.name}.`} items={venueOffers} />

      {/* 04 — gallery */}
      {photos.length > 1 && (
        <section id="gallery" className="relative scroll-mt-[120px] overflow-hidden px-5 pb-16 sm:px-8 md:pb-24 lg:px-12">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="mb-8">
              <Chapter n={4} label="Gallery" />
            </div>
            <Gallery photos={photos} title="Look around." eyebrow={venue.name} />
          </div>
        </section>
      )}

      {/* 05 — location */}
      <Location n={5} name={venue.name} address={venue.contact.address} mapsUrl={venue.contact.mapsUrl} phone={venue.contact.phone} query={venue.contact.mapQuery} />

      {reviews && (
        <div id="reviews" className="scroll-mt-[104px]">
          <GoogleReviews data={reviews} title={["In their", "own words."]} eyebrow={`${venue.name} · Google reviews`} />
        </div>
      )}

      {venue.faqs && venue.faqs.length > 0 && (
        <section className="relative px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <Chapter n={6} label="Good to know" />
              <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,3.8rem)]">
                Before <span className="display-italic">you arrive.</span>
              </h2>
            </div>
            <FaqAccordion items={venue.faqs} />
          </div>
        </section>
      )}

      {venue.reels && <ReelsSection eyebrow={`${venue.name} on Instagram`} title={["Watch &", "savour"]} reels={venue.reels} />}
    </>
  );
}

function CtaButton({ venue, className = "" }: { venue: Venue; className?: string }) {
  const { cta } = venue;
  const cls = `btn-onyx shine group ${className}`;
  if (cta.external)
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {cta.label} <Arrow />
      </a>
    );
  if (!cta.href.startsWith("/"))
    return (
      <a href={cta.href} className={cls}>
        {cta.label} <Arrow />
      </a>
    );
  return (
    <Link href={cta.href} className={cls}>
      {cta.label} <Arrow />
    </Link>
  );
}

/** The sticky side card: the main action, then phone, email, address and Instagram. */
function VisitCard({ venue }: { venue: Venue }) {
  const { contact } = venue;
  return (
    <div className="rounded-[20px] border border-line bg-wall-lit p-6 shadow-[0_30px_60px_-40px_rgba(18,20,16,0.45)]">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gold-deep">Plan your visit</p>
      <p className="mt-3 font-display text-[2.1rem] leading-none tracking-[-0.03em] text-ink">{venue.name}</p>
      <CtaButton venue={venue} className="mt-6 w-full" />
      <ul className="mt-6 space-y-4 border-t border-line pt-6 text-[14px] text-body">
        {contact.phone && (
          <li>
            <a href={contact.phone.href} className="flex items-center gap-3 hover:text-ink">
              <Icon name="phone" size={17} className="text-gold-deep" /> {contact.phone.display}
            </a>
          </li>
        )}
        {contact.email && (
          <li>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all hover:text-ink">
              <Icon name="mail" size={17} className="shrink-0 text-gold-deep" /> {contact.email}
            </a>
          </li>
        )}
        {contact.address && (
          <li className="flex items-start gap-3">
            <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-gold-deep" />
            <span className="leading-[1.6]">{contact.address}</span>
          </li>
        )}
      </ul>
      {contact.instagram && (
        <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 w-full">
          <Icon name="instagram" size={15} /> Instagram
        </a>
      )}
    </div>
  );
}
