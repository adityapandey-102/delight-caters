/**
 * The six outlets an enquiry can go to, and the words that suit each: Delight
 * Caterers books a consultation; the hotels take stay requests; Aero Bites
 * takes table reservations; Bombay Kulfi takes general enquiries.
 *
 * `whatsapp` routes an outlet's enquiries to its own number; outlets without
 * one go to the group number (lib/content/site.ts → contact.whatsappNumber).
 * Add each outlet's WhatsApp number here once the client confirms them.
 */

export const outlets = [
  { slug: "delight-caterers", name: "Delight Caterers", note: "Catering & events", division: "Delight Eatry", action: "Book a consultation", heading: ["Book a", "consultation."], whatsapp: undefined },
  { slug: "bombay-kulfi", name: "Bombay Kulfi", note: "Kulfi & street food", division: "Delight Eatry", action: "Send enquiry", heading: ["Say", "hello."], whatsapp: undefined },
  { slug: "aero-bites", name: "Aero Bites", note: "Restaurant", division: "Delight Eatry", action: "Reserve a table", heading: ["Reserve a", "table."], whatsapp: undefined },
  { slug: "sterling-inn", name: "Sterling Inn", note: "Hotel", division: "Delight Hospitality", action: "Book a stay", heading: ["Book your", "stay."], whatsapp: undefined },
  { slug: "sterling-plaza", name: "Sterling Plaza", note: "Hotel", division: "Delight Hospitality", action: "Book a stay", heading: ["Book your", "stay."], whatsapp: undefined },
  { slug: "olive", name: "Olive", note: "Hotel & banquets", division: "Delight Hospitality", action: "Book a stay", heading: ["Book your", "stay."], whatsapp: undefined },
] as const satisfies readonly {
  slug: string;
  name: string;
  note: string;
  division: string;
  action: string;
  heading: readonly [string, string];
  whatsapp: string | undefined;
}[];

export type Outlet = (typeof outlets)[number];
export type OutletSlug = Outlet["slug"];
export const outletSlugs = outlets.map((o) => o.slug) as [OutletSlug, ...OutletSlug[]];

export const outletBySlug = (slug: string): Outlet | undefined => outlets.find((o) => o.slug === slug);

/** The outlet whose page this is (/hospitality/olive → Olive), if any. */
export const outletForPath = (pathname: string): Outlet | undefined => outlets.find((o) => pathname.endsWith(`/${o.slug}`));

/** Heading when no outlet is chosen yet. */
export const genericHeading = ["How can we", "help?"] as const;

/** The site-wide enquiry button's words on a given page. */
export function enquiryLabel(pathname: string): string {
  const outlet = outletForPath(pathname);
  if (outlet) return outlet.action;
  if (pathname.startsWith("/hospitality")) return "Book a stay";
  return "Enquire now";
}
