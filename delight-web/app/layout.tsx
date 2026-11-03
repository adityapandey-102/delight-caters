import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { company, contact, social } from "@/lib/content/site";
import { group } from "@/lib/content/group";
import { hotels } from "@/lib/content/hospitality";
import { aeroBites, bombayKulfi } from "@/lib/content/eatry";
import { abs, defaultOgImage, venuePath } from "@/lib/seo";

/*
 * Cormorant Garamond for display (upright and italic), DM Sans for text.
 * Self-hosted variable fonts (app/fonts, SIL Open Font License, from
 * Fontsource 5.3.0) rather than next/font/google: the build needs no network,
 * and can't break on the font URLs Google serves to some regions (a Vercel
 * build failed on those).
 */
const cormorant = localFont({
  variable: "--font-cormorant",
  src: [
    { path: "./fonts/cormorant-garamond-latin-wght.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  display: "swap",
});

const dmSans = localFont({
  variable: "--font-dm-sans",
  src: "./fonts/dm-sans-latin-wght.woff2",
  weight: "100 1000",
  display: "swap",
});

const SITE_TITLE = `${group.name} — Catering, Kulfi, Dining & Hotels in Bengaluru`;
const SITE_DESCRIPTION =
  "Zyra Group brings together Zyra Food & Beverages — Delight Caterers, Bombay Kulfi and Aero Bites — and Zyra Hospitality: Sterling Inn, Sterling Plaza and Olive, hotels near Bengaluru Airport.";

export const metadata: Metadata = {
  metadataBase: new URL(group.domain),
  title: { default: SITE_TITLE, template: `%s · ${group.name}` },
  description: SITE_DESCRIPTION,
  applicationName: group.name,
  keywords: [
    "catering in Bengaluru",
    "wedding catering Bengaluru",
    "corporate catering Bengaluru",
    "Delight Caterers",
    "Bombay Kulfi Bengaluru",
    "Aero Bites",
    "hotels near Bengaluru airport",
    "Sterling Inn",
    "Sterling Plaza",
    "Olive hotel",
    "Zyra Group",
  ],
  openGraph: {
    type: "website",
    siteName: group.name,
    locale: "en_IN",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: defaultOgImage.src, alt: defaultOgImage.alt }],
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [{ url: defaultOgImage.src, alt: defaultOgImage.alt }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

/** The group and its businesses, for search engines. Each brand's own page adds the full record (address, amenities, outlets). */
const GROUP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: group.name,
  slogan: group.tagline,
  url: group.domain,
  logo: `${group.domain}/brand/zyra-mark.png`,
  subOrganization: [
    ...hotels.map((h) => ({ "@type": "Hotel", name: h.name, url: abs(venuePath(h)), address: h.contact.address, telephone: h.contact.phone?.display })),
    ...(bombayKulfi.contact.locations ?? []).map((o) => ({ "@type": "IceCreamShop", name: `Bombay Kulfi, ${o.name}`, url: abs(venuePath(bombayKulfi)), address: `${o.name}, ${o.area}, Bengaluru` })),
    { "@type": "Restaurant", name: "Aero Bites", url: abs(venuePath(aeroBites)), address: aeroBites.contact.address },
    { "@type": "FoodEstablishment", name: company.name, url: abs("/eatry/delight-caterers"), telephone: "+91-9187918179", email: contact.email, address: contact.address.full, sameAs: [social.instagram.href, social.linkedin.href] },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col text-body">
        <script
          type="application/ld+json"
          // Static facts from our own constants; "<" is escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GROUP_JSON_LD).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
