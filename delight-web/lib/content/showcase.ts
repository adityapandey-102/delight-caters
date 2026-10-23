import type { Listing } from "@/modules/brand/components/ListingCards";
import type { DiagramItem } from "@/modules/home/components/ImpactDiagram";
import type { FinderTab } from "@/modules/group/components/Finder";
import type { ShowcaseContent } from "@/modules/home/components/Cuisines";
import { hotels, hospitality } from "./hospitality";
import { aeroBites, bombayKulfi, delightCaterersCard } from "./eatry";

/**
 * Derived views of the group's businesses, shared by the home and division
 * pages: property-style listings, the "four ways" diagram, the hero finder and
 * the hotels' index. All facts come from the brand records.
 */

const AIRPORT_ROAD = "Hunasamaranahalli, KIA Road";

export const hotelListings: Listing[] = [
  { href: "/hospitality/sterling-plaza", name: "Sterling Plaza", kind: "4-star hotel", location: AIRPORT_ROAD, image: { src: "/media/sterling-plaza/room.webp", alt: "A room at Sterling Plaza" }, specs: ["Deluxe & Suites", "Kitchenettes", "Conference", "Airport shuttle"], logo: { src: "/brand/sterling-plaza.png", width: 376, height: 46 } },
  { href: "/hospitality/sterling-inn", name: "Sterling Inn", kind: "3-star hotel", location: AIRPORT_ROAD, image: { src: "/media/sterling-inn/room.webp", alt: "A room at Sterling Inn" }, specs: ["4.8 · 269 reviews", "Conference hall", "Gym", "Café"], logo: { src: "/brand/sterling-inn.png", width: 341, height: 43 } },
  { href: "/hospitality/olive", name: "Olive", kind: "Hotel", location: "Near Bengaluru Airport", image: { src: "/media/olive/room.webp", alt: "A room at Olive" }, specs: ["Restaurant", "Banquet hall", "Twin & double rooms"], logo: { src: "/brand/olive.png", width: 217, height: 70 } },
];

export const eatryListings: Listing[] = [
  { href: "/eatry/delight-caterers", name: delightCaterersCard.name, kind: "Catering", location: "Bengaluru", image: { src: "/images/svc-wedding.webp", alt: "A wedding spread by Delight Caterers" }, specs: ["Weddings", "Corporate", "Events", "8 cuisines"], logo: { src: "/brand/logo-gold.png", width: 1200, height: 634 } },
  { href: "/eatry/bombay-kulfi", name: bombayKulfi.name, kind: "Ice creams & street food", location: "Commercial Street, Bengaluru", image: { src: "/media/bombay-kulfi/kulfi-cup.webp", alt: "A cup of kulfi at Bombay Kulfi" }, specs: ["Kulfi with A2 milk", "Mojitos & boba", "Momos"], logo: bombayKulfi.logo },
  { href: "/eatry/aero-bites", name: aeroBites.name, kind: "Restaurant", location: "Bengaluru", image: { src: "/images/cuisine-continental.webp", alt: "A plated dish at Aero Bites" }, specs: ["All-day dining", "North Indian · Coastal", "Group tables"], logo: null },
];

/** The home page's "four ways to experience Zyra" diamond. */
export const experiences: DiagramItem[] = [
  { key: "stay", title: "Stay", short: "Stay", icon: "bed", body: "Three hotels near Kempegowda International Airport, for business and leisure.", items: ["Sterling Plaza", "Sterling Inn", "Olive", "Near the airport"], image: "/media/sterling-plaza/room.webp", imageAlt: "A room at Sterling Plaza", href: "/hospitality", cta: "Explore our hotels" },
  { key: "celebrate", title: "Celebrate", short: "Celebrate", icon: "rings", body: "Delight Caterers — weddings, corporate events and every occasion in between.", items: ["Weddings", "Corporate", "Events", "House parties"], image: "/images/svc-wedding.webp", imageAlt: "A wedding spread", href: "/eatry/delight-caterers", cta: "Plan a celebration" },
  { key: "dine", title: "Dine", short: "Dine", icon: "cutlery", body: "Aero Bites — an all-day restaurant on the airport road, for travellers, families and teams.", items: ["All-day dining", "North Indian", "Coastal plates", "Group tables"], image: "/images/cuisine-continental.webp", imageAlt: "A plated dish", href: "/eatry/aero-bites", cta: "See Aero Bites" },
  { key: "treats", title: "Treats", short: "Treats", icon: "icecream", body: "Bombay Kulfi on Commercial Street — kulfi made with A2 milk, drinks and bites.", items: ["Kulfi", "Mojitos & boba", "Momos", "Commercial St."], image: "/media/bombay-kulfi/kulfi-cup.webp", imageAlt: "A cup of kulfi", href: "/eatry/bombay-kulfi", cta: "Visit Bombay Kulfi" },
];

export const finderTabs: FinderTab[] = [
  { label: "Stay", icon: "bed", href: "/hospitality", links: hotels.map((h) => ({ label: h.name, note: h.kind.split(" · ")[0], href: `/hospitality/${h.slug}` })) },
  { label: "Dine", icon: "cutlery", href: "/eatry", links: [{ label: "Aero Bites", note: "Restaurant", href: "/eatry/aero-bites" }, { label: "Bombay Kulfi", note: "Street food & drinks", href: "/eatry/bombay-kulfi" }] },
  { label: "Treats", icon: "icecream", href: "/eatry/bombay-kulfi", links: [{ label: "Bombay Kulfi", note: "Commercial Street", href: "/eatry/bombay-kulfi" }] },
  { label: "Celebrate", icon: "rings", href: "/eatry/delight-caterers", links: [{ label: "Delight Caterers", note: "Weddings & events", href: "/eatry/delight-caterers" }, { label: "Banquet at Olive", note: "Hall near the airport", href: "/hospitality/olive" }, { label: "Conferences", note: "Sterling Plaza", href: "/hospitality/sterling-plaza" }] },
];

/** The Hospitality page's hotel index (the Cuisines-style index and plate). */
export const hotelIndex: ShowcaseContent = {
  eyebrow: "Choose your stay",
  title: "Our hotels near the airport",
  split: 2,
  body: hospitality.intro[1],
  cta: "View hotel",
  items: hotels.map((h) => ({ title: h.name, body: h.intro[0], image: h.hero.src, imageAlt: h.hero.alt, href: `/hospitality/${h.slug}` })),
};
