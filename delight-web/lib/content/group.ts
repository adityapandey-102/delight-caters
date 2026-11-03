/**
 * Zyra Group — the parent brand. The group story, values, vision and mission
 * are adapted from delighthospitality.in's company profile (the closest source
 * the group has published); the vision, mission and team are the client's own.
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
    lead: "To become a distinguished name in hospitality and catering, recognised for exceptional quality, thoughtful service and unforgettable experiences.",
  },
  mission: {
    title: "Our Mission",
    lead: "To create exceptional experiences through quality, passion and the art of hospitality.",
  },
  values: [
    { title: "Integrity", body: "We do business with honesty, transparency and respect in every relationship." },
    { title: "Excellence", body: "We set high standards and work consistently to deliver quality in everything we do." },
    { title: "People First", body: "Our guests, partners and teams are at the heart of every decision we make." },
    { title: "Sustainable Growth", body: "We build for the long term, creating lasting value for our group and our communities." },
  ],
};

/** Site navigation: two divisions with their brands (Food & Beverages first — catering is the lead business), then the group pages. */
export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Food & Beverages",
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
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Portrait under /media/real; `focus` is the CSS object-position that keeps the face in frame. */
  photo: { src: string; focus: string };
};

/** The team, in the order the client set: co-founder first, then operations, sales, the kitchen's experts and marketing. */
export const team: TeamMember[] = [
  {
    name: "Mustaqeem",
    role: "Co-founder",
    bio: "A visionary hospitality entrepreneur dedicated to building exceptional experiences through strategic leadership, innovation, and a passion for service excellence.",
    photo: { src: "/media/real/team-mustaqeem.webp", focus: "50% 45%" },
  },
  {
    name: "Mahendra Ramu K",
    role: "General Manager",
    bio: "An accomplished hospitality professional with 10–15 years of experience in strategic operations, team leadership, guest relations, and delivering exceptional service standards while driving business growth and operational excellence.",
    photo: { src: "/media/real/team-mahendra.webp", focus: "50% 0%" },
  },
  {
    name: "Nivas Bhojan",
    role: "Director of Sales",
    bio: "A seasoned hospitality sales leader with 10–15 years of experience in driving revenue growth, building strategic partnerships, and delivering exceptional business performance.",
    photo: { src: "/media/real/team-nivas.webp", focus: "50% 20%" },
  },
  {
    name: "Dt. Radhika Rani",
    role: "Nutritionist",
    bio: "A dedicated nutrition professional focused on crafting balanced, nourishing menus that elevate guest well-being while maintaining the highest standards of hospitality dining.",
    photo: { src: "/media/real/team-radhika.webp", focus: "50% 12%" },
  },
  {
    name: "Surjeet Kumar",
    role: "Executive Chef",
    bio: "Accomplished Executive Chef with 14+ years of progressive experience leading culinary operations across luxury hotels, ultra-luxury resorts, destination wedding venues, banquet facilities, and pre-opening hospitality projects. Expertise in multi-cuisine food production, menu engineering, food cost optimization, budgeting, inventory management, HACCP & FSSAI compliance, and team leadership.",
    photo: { src: "/media/real/team-surjeet.webp", focus: "50% 0%" },
  },
  {
    name: "Nida Fathima",
    role: "Marketing Head",
    bio: "A strategic hospitality marketing leader with expertise in brand positioning, market development, and creating impactful campaigns that drive growth and strengthen brand presence.",
    photo: { src: "/media/real/team-nida.webp", focus: "50% 8%" },
  },
];

/** Real, sourced figures for the group's at-a-glance band (no invented numbers). */
export const groupFacts = [
  { value: "3", label: "Hotels near Bengaluru Airport" },
  { value: "85", label: "Rooms across the Sterling hotels" },
  { value: "4.8", label: "Guest rating · Sterling Inn (269 reviews)" },
  { value: "6", label: "Businesses, one family" },
];

/** Customer and partner logins. Hidden for now at the client's request — set true to bring back the /login page and the account icon in the nav. */
export const accountsVisible = false;
