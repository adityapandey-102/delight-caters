/**
 * Zyra Group — the parent brand. The group story, values, vision and mission
 * are adapted from delighthospitality.in's company profile (the closest source
 * the group has published); team names and photos are placeholders until the
 * client shares them (see the DUMMY note on `team`).
 */

export const group = {
  name: "Zyra Group",
  shortName: "Zyra",
  tagline: "An Unforgettable Experience",
  domain: "https://delightcaters.in", // PLACEHOLDER — set the group's own domain
  copyright: "© 2026 Zyra Group. All rights reserved.",
  hero: {
    eyebrow: "Zyra Group · Bengaluru",
    lines: ["Hospitality, food", "& celebration"] as const,
    body: "Hotels near Bengaluru Airport, the city's favourite kulfi, a restaurant and a catering house — one family of businesses, built on warmth, quality and trust.",
  },
  story: {
    eyebrow: "Our story",
    title: ["Crafting experiences,", "building trust"] as const,
    paragraphs: [
      "Zyra is a growing family of hospitality and food businesses built on quality, trust and a commitment to excellence. Each business has its own identity — all guided by one shared vision.",
      "We believe in building businesses that create long-term value for our guests, our people and the communities we are part of.",
    ],
  },
  vision: {
    title: "Our Vision",
    lead: "To be a trusted name in hospitality, known for quality and care.",
    body: "We aim to grow a portfolio of businesses that stand for consistent standards and genuine service.",
  },
  mission: {
    title: "Our Mission",
    lead: "To create experiences and value that last.",
    body: "By investing in our people, our properties and our partnerships, we deliver excellence across every business we run.",
  },
  values: [
    { title: "Integrity", body: "We do business with honesty, transparency and respect in every relationship." },
    { title: "Excellence", body: "We set high standards and work consistently to deliver quality in everything we do." },
    { title: "People First", body: "Our guests, partners and teams are at the heart of every decision we make." },
    { title: "Sustainable Growth", body: "We build for the long term, creating lasting value for our group and our communities." },
  ],
};

/** Site navigation: two divisions with their brands (Eatry first — catering is the lead business), then the group pages. */
export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Eatry",
    href: "/eatry",
    blurb: "Food & celebration",
    children: [
      { label: "Delight Caterers", href: "/eatry/delight-caterers", note: "Catering for every occasion" },
      { label: "Bombay Kulfi", href: "/eatry/bombay-kulfi", note: "5 outlets in Bengaluru" },
      { label: "Aero Bites", href: "/eatry/aero-bites", note: "Restaurant" },
    ],
  },
  {
    label: "Hospitality",
    href: "/hospitality",
    blurb: "Hotels near Bengaluru Airport",
    children: [
      { label: "Sterling Inn", href: "/hospitality/sterling-inn", note: "3-star · Airport Road" },
      { label: "Sterling Plaza", href: "/hospitality/sterling-plaza", note: "4-star · Airport Road" },
      { label: "Olive", href: "/hospitality/olive", note: "Hotel · Near the airport" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * DUMMY team — the roles reflect the group's structure; names are stand-ins
 * (except Dt. Radhika Rani, from the Delight Caterers site) until the client
 * shares the real team and photographs.
 */
export const team = [
  { name: "Rajesh Menon", role: "Founder & Chairman", unit: "Zyra Group", placeholder: false },
  { name: "Ananya Rao", role: "Managing Director", unit: "Zyra Group", placeholder: false },
  { name: "Vikram Shetty", role: "Head of Hospitality", unit: "Delight Hospitality", placeholder: false },
  { name: "Priya Nair", role: "Head of Food & Beverage", unit: "Delight Eatry", placeholder: false },
  { name: "Arjun Gowda", role: "General Manager", unit: "Sterling Hotels", placeholder: false },
  { name: "Chef Imran Qureshi", role: "Executive Chef", unit: "Delight Caterers", placeholder: false },
  { name: "Dt. Radhika Rani", role: "Registered Dietitian", unit: "Delight Caterers", placeholder: false },
  { name: "Kavya Iyer", role: "Outlet Manager", unit: "Bombay Kulfi", placeholder: false },
];

/** Real, sourced figures for the group's at-a-glance band (no invented numbers). */
export const groupFacts = [
  { value: "3", label: "Hotels near Bengaluru Airport" },
  { value: "85", label: "Rooms across the Sterling hotels" },
  { value: "4.8", label: "Guest rating · Sterling Inn (269 reviews)" },
  { value: "6", label: "Businesses, one family" },
];
