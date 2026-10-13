import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { company, contact, social } from "@/lib/content/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

/* "Taste of Tradition" — the logo's script, used only for the tagline. */
const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.domain),
  title: {
    default: `${company.name} — Catering in Bengaluru | ${company.tagline}`,
    template: `%s — ${company.name}`,
  },
  description:
    "Delight Caterers is a Bengaluru-based catering company under Delight Hospitality, delivering exceptional food and hospitality experiences across corporate, institutional, wedding, and special events.",
  openGraph: {
    title: `${company.name} — More than catering, we create Experience`,
    description:
      "Corporate, wedding, event and casual catering in Bengaluru — North Indian, South Indian, Asian, Coastal, Continental, Mediterranean and more.",
    type: "website",
    locale: "en_IN",
    images: ["/images/hero-buffet.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#014923",
};

/** The business, for search engines — the same facts the footer shows. */
const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: company.name,
  slogan: company.tagline,
  url: company.domain,
  image: `${company.domain}/images/hero-buffet.webp`,
  logo: `${company.domain}/brand/logo-gold.png`,
  telephone: "+91-9187918179",
  email: contact.email,
  servesCuisine: ["North Indian", "South Indian", "Asian", "Seafood", "Continental", "Mediterranean", "Desserts"],
  openingHours: "Mo-Su 09:00-22:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.address.street}, ${contact.address.road}`,
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: "IN",
  },
  parentOrganization: { "@type": "Organization", name: company.parent },
  sameAs: [social.instagram.href, social.linkedin.href],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${jost.variable} ${pinyon.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col text-body">
        <script
          type="application/ld+json"
          // Static facts from our own constants; "<" is escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
