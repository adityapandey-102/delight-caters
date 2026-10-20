import type { Metadata } from "next";
import { group } from "@/lib/content/group";
import { BrandHero } from "@/modules/brand/components/BrandHero";
import { ContactDirectory } from "@/modules/contact/components/ContactDirectory";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacts for Sterling Inn, Sterling Plaza, Olive, Bombay Kulfi, Aero Bites and Delight Caterers — or send an enquiry for an event or a stay.",
};

/** Every business's contacts, and the enquiry form. */
export default function ContactPage() {
  return (
    <>
      <BrandHero
        eyebrow={`${group.name} · Contact`}
        lines={["Let's make it", "unforgettable"]}
        body="Reach any of our hotels and food brands directly, or tell us about your event and we'll take it from there."
        tagline={group.tagline}
        image={{ src: "/media/olive/banquet.webp", alt: "The banquet hall at Olive" }}
      />
      <ContactDirectory />
    </>
  );
}
