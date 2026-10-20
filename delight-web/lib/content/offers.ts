/**
 * Offers, events and collaborations — ONE list that feeds the marketing
 * ribbon under the nav (every page), the home highlights, each division's
 * "Offers & events" section and each outlet's own offers.
 *
 * DUMMY content (no prices, by brief): replace with the group's live calendar.
 * To add an offer, add an entry here — it appears everywhere it belongs.
 * Phase 2 moves this list into the admin panel (see docs/STATUS.md, "Phase 2
 * backlog"); keep pages reading it only through offersFor() / offersForPath().
 */

export type OfferKind = "Offer" | "Event" | "Collaboration" | "Season" | "Launch";
export type Division = "hospitality" | "eatry";

export type Offer = {
  id: string;
  kind: OfferKind;
  /** Outlet slug, as in its URL (/hospitality/<slug>, /eatry/<slug>). */
  slug: "sterling-inn" | "sterling-plaza" | "olive" | "bombay-kulfi" | "aero-bites" | "delight-caterers";
  brand: string;
  division: Division;
  title: string;
  /** One short line for the ribbon. */
  line: string;
  summary: string;
  dates: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
  /** Shown in the home highlights. */
  featured?: boolean;
};

const D = (name: string) => `/media/dummy/${name}.webp`;

export const offers: Offer[] = [
  {
    id: "inn-three-nights",
    kind: "Offer",
    slug: "sterling-inn",
    brand: "Sterling Inn",
    division: "hospitality",
    title: "Stay three nights, breakfast is on us",
    line: "Stay three nights, breakfast is on us.",
    summary: "Book three nights or more and wake up to breakfast on the house, every morning of your stay.",
    dates: "Till 31 Dec 2026",
    image: { src: D("room-classic"), alt: "A bright hotel room with the bed made" },
    cta: { label: "Book now", href: "/hospitality/sterling-inn" },
    featured: true,
  },
  {
    id: "plaza-long-stay",
    kind: "Collaboration",
    slug: "sterling-plaza",
    brand: "Sterling Plaza",
    division: "hospitality",
    title: "Corporate long-stay programme",
    line: "Corporate long-stay programme for airport-area companies.",
    summary: "Flexible terms, suites with kitchenettes, meals on request and one point of contact for your team.",
    dates: "Ongoing · 2026",
    image: { src: "/media/sterling-plaza/suite-lounge.webp", alt: "The suite lounge at Sterling Plaza" },
    cta: { label: "Talk to us", href: "#enquiry" },
    featured: true,
  },
  {
    id: "plaza-conference-season",
    kind: "Season",
    slug: "sterling-plaza",
    brand: "Sterling Plaza",
    division: "hospitality",
    title: "Conference season at Sterling Plaza",
    line: "Conference season — offsites, launches and annual meets.",
    summary: "Boardroom-ready halls, seamless AV and tailored catering, minutes from the airport.",
    dates: "Sep–Dec 2026",
    image: { src: "/media/sterling-plaza/conference.webp", alt: "The conference hall at Sterling Plaza" },
    cta: { label: "Plan your event", href: "#enquiry" },
  },
  {
    id: "olive-navratri",
    kind: "Event",
    slug: "olive",
    brand: "Olive",
    division: "hospitality",
    title: "Navratri Evenings at Olive",
    line: "Navratri Evenings — nine festive nights.",
    summary: "Garba-inspired gatherings, a vegetarian thali spread and live music in the Olive banquet.",
    dates: "Oct 2026",
    image: { src: D("celebration"), alt: "Guests celebrating under festive lights" },
    cta: { label: "Reserve an evening", href: "#enquiry" },
    featured: true,
  },
  {
    id: "olive-weekend",
    kind: "Offer",
    slug: "olive",
    brand: "Olive",
    division: "hospitality",
    title: "Weekend getaway, late check-out",
    line: "Weekend stays come with a late check-out.",
    summary: "Slow down on Sunday: weekend guests keep their room until 2 pm, subject to availability.",
    dates: "Every weekend",
    image: { src: "/media/olive/room.webp", alt: "A room at Olive" },
    cta: { label: "Enquire", href: "#enquiry" },
  },
  {
    id: "caterers-tastings",
    kind: "Season",
    slug: "delight-caterers",
    brand: "Delight Caterers",
    division: "eatry",
    title: "Wedding-season tastings",
    line: "Wedding-season tastings, weekends in Nov–Dec.",
    summary: "Sit down with our chefs, sample signature menus and plan every course before the season begins.",
    dates: "Weekends · Nov–Dec 2026",
    image: { src: D("event-table"), alt: "A long table set for a tasting" },
    cta: { label: "Book a tasting", href: "#enquiry" },
    featured: true,
  },
  {
    id: "caterers-corporate",
    kind: "Collaboration",
    slug: "delight-caterers",
    brand: "Delight Caterers",
    division: "eatry",
    title: "Corporate catering partnerships",
    line: "Corporate catering partnerships for offices and campuses.",
    summary: "Daily meal service, leadership lunches and event buffets, with menus curated around your team.",
    dates: "Ongoing · 2026",
    image: { src: D("buffet"), alt: "A catered buffet" },
    cta: { label: "Start a conversation", href: "#enquiry" },
  },
  {
    id: "kulfi-of-the-month",
    kind: "Launch",
    slug: "bombay-kulfi",
    brand: "Bombay Kulfi",
    division: "eatry",
    title: "Kulfi of the month: Guava Chilli",
    line: "Kulfi of the month: Guava Chilli.",
    summary: "Sweet, tangy and gently spiced — inspired by Bengaluru street flavours, at our Commercial Street counter.",
    dates: "Oct 2026",
    image: { src: D("cones"), alt: "Colourful ice cream cones" },
    cta: { label: "Visit us", href: "/eatry/bombay-kulfi" },
    featured: true,
  },
  {
    id: "kulfi-friends",
    kind: "Offer",
    slug: "bombay-kulfi",
    brand: "Bombay Kulfi",
    division: "eatry",
    title: "Bring-a-friend Tuesdays",
    line: "Bring-a-friend Tuesdays — the second kulfi is on us.",
    summary: "Every Tuesday, come with a friend and the second kulfi is our treat.",
    dates: "Every Tuesday",
    image: { src: "/media/bombay-kulfi/kulfi-cup.webp", alt: "A cup of kulfi" },
    cta: { label: "Find us", href: "/eatry/bombay-kulfi" },
  },
  {
    id: "aero-launch",
    kind: "Event",
    slug: "aero-bites",
    brand: "Aero Bites",
    division: "eatry",
    title: "Launch evening with guest chefs",
    line: "Launch evening with guest chefs from the city.",
    summary: "Chef-led tasting plates and signature bites, made for travellers and neighbours alike.",
    dates: "Nov 2026",
    image: { src: D("fine-dining"), alt: "A plated dish at a restaurant table" },
    cta: { label: "Reserve a table", href: "#enquiry" },
    featured: true,
  },
  {
    id: "aero-breakfast",
    kind: "Offer",
    slug: "aero-bites",
    brand: "Aero Bites",
    division: "eatry",
    title: "Early-flight breakfast from 6 am",
    line: "Early flight? Breakfast is served from 6 am.",
    summary: "Hot breakfast and coffee to go, ready before your airport run.",
    dates: "Daily",
    image: { src: D("restaurant"), alt: "A restaurant dining room" },
    cta: { label: "See Aero Bites", href: "/eatry/aero-bites" },
  },
];

export const offersFor = (filter: { division?: Division; slug?: string }) =>
  offers.filter((o) => (!filter.division || o.division === filter.division) && (!filter.slug || o.slug === filter.slug));

/** The ribbon's order for a page: offers for the outlet in view first, then its division, then the rest. */
export function offersForPath(pathname: string): Offer[] {
  const rank = (o: Offer) => (pathname.endsWith(`/${o.slug}`) ? 0 : pathname.startsWith(`/${o.division}`) ? 1 : 2);
  return [...offers].sort((a, b) => rank(a) - rank(b));
}

/** As cards for the Highlights carousel. */
export const asHighlights = (list: Offer[]) =>
  list.map((o) => ({ image: o.image, kicker: `${o.kind} · ${o.brand} · ${o.dates}`, title: o.title, body: o.summary, cta: o.cta }));
