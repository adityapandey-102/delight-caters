import type { Venue } from "./types";
import { contact as caterers, company as catering } from "./site";

/**
 * Delight Eatry — the group's food businesses. Bombay Kulfi copy is drawn from
 * the outlets' own posts and reels (A2-milk kulfi, five branches in Bengaluru); its
 * menu shots are used without the priced posts. Aero Bites has no public
 * listing yet: its page carries DUMMY content (story, dishes, timings, address)
 * until the client shares the real details.
 */

export const eatry = {
  name: "Delight Eatry",
  slug: "eatry",
  eyebrow: "Food & celebration",
  title: ["Flavours worth", "coming back for"] as const,
  intro: [
    "Delight Eatry brings the group's love of food to the city — from the creamy kulfi of Bombay Kulfi across Bengaluru to the plates of Aero Bites and the celebrations catered by Delight Caterers.",
  ],
  hero: { src: "/media/bombay-kulfi/kulfi-cup.webp", alt: "Kulfi at Bombay Kulfi" },
  reels: [
    { caption: "Serving cool vibes and creamy bites", poster: "/media/eatry/kulfi-drive.webp", video: "/media/eatry/kulfi-drive.mp4", href: "/eatry/bombay-kulfi" },
    { caption: "One bite? That's not happening", poster: "/media/eatry/kulfi-bite.webp", video: "/media/eatry/kulfi-bite.mp4", href: "/eatry/bombay-kulfi" },
    { caption: "The place that has it all", poster: "/media/eatry/kulfi-pov.webp", video: "/media/eatry/kulfi-pov.mp4", href: "/eatry/bombay-kulfi" },
    { caption: "Always finds its way to the perfect bite", poster: "/media/eatry/kulfi-fork.webp", video: "/media/eatry/kulfi-fork.mp4", href: "/eatry/bombay-kulfi" },
  ],
};

/**
 * Bombay Kulfi's outlets in Bengaluru, in one place for every page that names
 * them. Mall names and areas only: the street addresses could not be confirmed
 * online, so each Directions link searches Google Maps for the outlet.
 */
const kulfiOutlets = [
  { name: "Commercial Street", area: "Shivajinagar", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bombay%20Kulfi%2C%20Commercial%20Street%2C%20Bengaluru" },
  { name: "Bhartiya Mall", area: "Bhartiya City, Thanisandra", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bombay%20Kulfi%2C%20Bhartiya%20Mall%20of%20Bengaluru%2C%20Thanisandra%2C%20Bengaluru" },
  { name: "Kapali Mall", area: "Gandhi Nagar, Majestic", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bombay%20Kulfi%2C%20Kapali%20Mall%2C%20Majestic%2C%20Bengaluru" },
  { name: "Lulu Mall", area: "Rajajinagar", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bombay%20Kulfi%2C%20Lulu%20Mall%2C%20Rajajinagar%2C%20Bengaluru" },
  { name: "M5 E-City Mall", area: "Electronic City", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bombay%20Kulfi%2C%20M5%20E-City%20Mall%2C%20Electronic%20City%2C%20Bengaluru" },
];

/** "Commercial Street, Bhartiya Mall, … and M5 E-City Mall", for sentences. */
export const kulfiOutletNames = kulfiOutlets.map((o) => o.name).join(", ").replace(/, ([^,]*)$/, " and $1");

export const bombayKulfi: Venue = {
  slug: "bombay-kulfi",
  division: "eatry",
  name: "Bombay Kulfi",
  kind: "Ice creams & street food · 5 outlets in Bengaluru",
  tagline: "Kulfi made with A2 milk",
  logo: { src: "/brand/bombay-kulfi.png", width: 226, height: 129 },
  hero: { src: "/media/bombay-kulfi/kulfi-cup.webp", alt: "Kulfi at Bombay Kulfi" },
  heroInset: true,
  heroCutouts: [
    { src: "/media/refined/kulfi-cup.webp", alt: "A cup of Bombay Kulfi ice cream", width: 1374, height: 1145 },
    { src: "/media/refined/kulfi-matka.webp", alt: "Kulfi served in a clay matka", width: 1266, height: 1242 },
    { src: "/media/refined/kulfi-shake.webp", alt: "A mango kulfi shake", width: 1074, height: 1464 },
  ],
  heroBadge: "Bengaluru's first & only master franchise",
  heroBody: "Creamy kulfi, cool mojitos and boba, and street food done right — at five outlets across Bengaluru.",
  intro: [
    "The group runs the Bombay Kulfi master franchise in Bengaluru, with five outlets across the city. Varieties of kulfi made with A2 milk sit beside the city's favourite cravings — refreshing drinks, crispy bites and comfort food.",
    "Some heroes save the city… others save your cravings: from a guava-chilli kulfi slice to mint mojito boba, momos and pav bhaji, there is always something cool, creamy or crispy waiting.",
  ],
  facts: [
    { label: "Outlets", value: "5 across Bengaluru" },
    { label: "Signature", value: "Kulfi made with A2 milk" },
    { label: "Also serving", value: "Mojitos & boba, momos, pav bhaji, vada pav" },
    { label: "Franchise", value: "Bengaluru's first & only master franchise" },
  ],
  highlights: [
    { icon: "icecream", label: "Kulfi & ice creams" },
    { icon: "glass", label: "Mojitos & boba" },
    { icon: "cutlery", label: "Street food & snacks" },
    { icon: "heart", label: "Made with A2 milk" },
  ],
  spaces: [
    { title: "Kulfi & ice creams", body: "Classic and new kulfi varieties, like the bold guava-chilli slice.", image: { src: "/media/bombay-kulfi/guava-kulfi.webp", alt: "Guava chilli kulfi slice" } },
    { title: "Drinks", body: "Mint mojitos and boba — the perfect crunch-and-chill combo.", image: { src: "/media/bombay-kulfi/mojito.webp", alt: "A mojito at Bombay Kulfi" } },
    { title: "Street food", body: "Pav bhaji, vada pav, momos, noodles and more for every craving.", image: { src: "/media/bombay-kulfi/momos.webp", alt: "Momos at Bombay Kulfi" } },
  ],
  // Highlights are removed and spaces/gallery hidden temporarily at the client's request; the data stays so they can be switched back on.
  hide: { highlights: true, spaces: true, gallery: true },
  gallery: [
    { src: "/media/bombay-kulfi/storefront.webp", alt: "The Bombay Kulfi sign on Commercial Street" },
    { src: "/media/bombay-kulfi/kulfi-cup.webp", alt: "A cup of kulfi" },
    { src: "/media/bombay-kulfi/guava-kulfi.webp", alt: "Guava chilli kulfi slice" },
    { src: "/media/bombay-kulfi/mojito.webp", alt: "A mojito" },
    { src: "/media/bombay-kulfi/boba.webp", alt: "Taro boba" },
    { src: "/media/bombay-kulfi/noodles.webp", alt: "Chilli garlic noodles" },
    { src: "/media/bombay-kulfi/sandwich.webp", alt: "A cheese toastie" },
    { src: "/media/bombay-kulfi/momos.webp", alt: "Momos" },
    { src: "/media/bombay-kulfi/momos-2.webp", alt: "Momos, fresh from the steamer" },
    { src: "/media/bombay-kulfi/interior.webp", alt: "Inside Bombay Kulfi" },
  ],
  reels: eatry.reels,
  contact: {
    // The embedded map searches the brand, so it shows every branch.
    mapQuery: "Bombay Kulfi Bengaluru",
    locations: kulfiOutlets,
  },
  cta: { label: "Find an outlet", href: "#location" },
};

export const aeroBites: Venue = {
  // DUMMY content — replace with the restaurant's real story, menu, photos and contacts.
  slug: "aero-bites",
  division: "eatry",
  name: "Aero Bites",
  kind: "Restaurant · Bengaluru Airport Road",
  tagline: "Bites worth a layover",
  logo: null,
  hero: { src: "/media/refined/aero-hero.webp", alt: "Plates of pizza and grilled dishes with fresh juice at Aero Bites" },
  intro: [
    "Aero Bites is the group's all-day restaurant on the airport road — a relaxed, polished dining room for travellers between flights, families on the way home and teams after a long day of meetings.",
    "The kitchen moves easily between North Indian classics, coastal favourites and modern plates, with quick lunches, generous dinners and desserts worth staying for.",
  ],
  facts: [
    { label: "Cuisine", value: "North Indian · Coastal · Modern" },
    { label: "Open", value: "Daily · 11 AM – 11 PM" },
    { label: "Seating", value: "Dine-in & private tables" },
    { label: "Good for", value: "Families, teams, travellers" },
  ],
  highlights: [
    { icon: "cutlery", label: "All-day dining" },
    { icon: "users", label: "Group tables" },
    { icon: "glass", label: "Mocktails & coolers" },
    { icon: "plane", label: "On the airport road" },
    { icon: "car", label: "Parking" },
    { icon: "clock", label: "Quick lunch menu" },
  ],
  // Spaces and gallery hidden for now at the client's request; the data stays so they can be switched back on.
  hide: { spaces: true, gallery: true },
  spaces: [
    { title: "Signature plates", body: "Tandoor favourites, rich curries and coastal specials.", image: { src: "/images/cuisine-north-indian-alt.webp", alt: "North Indian dishes" } },
    { title: "From the wok", body: "Noodles, dim sum and Indo-Chinese plates, made to order.", image: { src: "/images/cuisine-asian.webp", alt: "Momos and wok dishes" } },
    { title: "Something sweet", body: "Classic mithai and plated desserts to finish.", image: { src: "/images/cuisine-desserts.webp", alt: "Desserts" } },
  ],
  gallery: [
    { src: "/images/cuisine-coastal.webp", alt: "Coastal seafood" },
    { src: "/images/cuisine-north-indian.webp", alt: "A North Indian spread" },
    { src: "/images/cuisine-mediterranean.webp", alt: "A Mediterranean plate" },
    { src: "/images/hero-buffet.webp", alt: "A buffet spread" },
    { src: "/images/cuisine-asian.webp", alt: "Momos and wok dishes" },
    { src: "/images/cuisine-continental.webp", alt: "Pasta and bread" },
    { src: "/images/cuisine-desserts.webp", alt: "Desserts" },
    { src: "/images/svc-corporate.webp", alt: "A table set for a team lunch" },
  ],
  contact: {
    address: "KIA Road, Hunasamaranahalli, Bengaluru, Karnataka 562157",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aero+Bites+restaurant+Bengaluru",
    mapQuery: "KIA Road, Hunasamaranahalli, Bengaluru 562157",
  },
  cta: { label: "Reserve a table", href: "#enquiry" },
};

/** Delight Caterers keeps its full content in ./site.ts; this is its card in the group. */
export const delightCaterersCard = {
  slug: "delight-caterers",
  name: catering.name,
  kind: "Catering · Bengaluru",
  tagline: catering.tagline,
  logo: { src: "/brand/logo-gold.png", width: 1200, height: 634 },
  image: { src: "/images/svc-wedding.webp", alt: "A wedding spread by Delight Caterers" },
  phone: { display: caterers.phoneDisplay, href: caterers.phoneHref },
  email: caterers.email,
  address: caterers.address.full,
};

export const eateries = [bombayKulfi, aeroBites];
