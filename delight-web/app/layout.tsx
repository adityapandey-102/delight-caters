import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { company, contact, social } from "@/lib/content/site";
import { group } from "@/lib/content/group";
import { hotels } from "@/lib/content/hospitality";

/*
 * Apple-style type: Inter Tight for display (SF Pro Display stand-in), Inter
 * for text. Self-hosted variable fonts (app/fonts, SIL Open Font License,
 * from Fontsource 5.3.0) rather than next/font/google: the build needs no
 * network, and can't break on the font URLs Google serves to some regions
 * (the Vercel build failed on those).
 */
const interTight = localFont({
  variable: "--font-inter-tight",
  src: "./fonts/inter-tight-latin-wght.woff2",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  variable: "--font-inter",
  src: "./fonts/inter-latin-wght.woff2",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(group.domain),
  title: {
    default: `${group.name} — ${group.tagline} | Hotels, Kulfi, Dining & Catering in Bengaluru`,
    template: `%s — ${group.name}`,
  },
  description:
    "Zyra Group brings together Delight Hospitality — Sterling Inn, Sterling Plaza and Olive near Bengaluru Airport — and Delight Eatry: Bombay Kulfi, Aero Bites and Delight Caterers.",
  openGraph: {
    title: `${group.name} — ${group.tagline}`,
    description: "Hotels near Bengaluru Airport, Bombay Kulfi, Aero Bites and Delight Caterers — one family of businesses.",
    type: "website",
    locale: "en_IN",
    images: ["/media/olive/lobby.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

/** The group and its businesses, for search engines. */
const GROUP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: group.name,
  slogan: group.tagline,
  url: group.domain,
  logo: `${group.domain}/brand/zyra-mark.png`,
  subOrganization: [
    ...hotels.map((h) => ({ "@type": "Hotel", name: h.name, address: h.contact.address, telephone: h.contact.phone?.display })),
    { "@type": "IceCreamShop", name: "Bombay Kulfi", address: "Commercial Street, Bengaluru" },
    { "@type": "Restaurant", name: "Aero Bites", address: "Bengaluru" },
    { "@type": "FoodEstablishment", name: company.name, telephone: "+91-9187918179", email: contact.email, address: contact.address.full, sameAs: [social.instagram.href, social.linkedin.href] },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${interTight.variable} ${inter.variable} h-full antialiased`}>
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
