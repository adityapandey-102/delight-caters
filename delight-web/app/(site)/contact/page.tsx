import type { Metadata } from "next";
import { group } from "@/lib/content/group";
import { pageMetadata } from "@/lib/seo";
import { ContactHero } from "@/modules/contact/components/ContactHero";
import { contact, whatsappHref } from "@/lib/content/site";
import { sterlingInn } from "@/lib/content/hospitality";
import { ContactDirectory } from "@/modules/contact/components/ContactDirectory";

export const metadata: Metadata = pageMetadata({
  title: "Contact and enquiries — catering, hotels, kulfi",
  description:
    "Contact Delight Caterers, Bombay Kulfi, Aero Bites, Sterling Inn, Sterling Plaza and Olive in Bengaluru — or send an enquiry for a catered event or a hotel stay.",
  path: "/contact",
  image: { src: "/media/refined/caterers-hero.webp", alt: "A server plating a dish at a long table laid by Delight Caterers" },
});

/** Every business's contacts, and the enquiry form. */
export default function ContactPage() {
  return (
    <>
      <ContactHero
        kicker={`Contact ${group.shortName}`}
        title="Let's make it"
        accent="unforgettable."
        body="Reach any of our hotels and food brands directly, or tell us about your event and we'll take it from there."
        ways={[
          { icon: "sparkle", title: "Book a catering consultation", line: "Weddings, corporate events and celebrations", href: "#enquiry" },
          { icon: "whatsapp", title: "Chat on WhatsApp", line: `Delight Caterers · ${contact.phoneDisplay}`, href: whatsappHref, external: true },
          { icon: "phone", title: "Stay with us", line: `Zyra Hospitality · ${sterlingInn.contact.phone?.display ?? ""}`, href: sterlingInn.contact.phone?.href ?? "#directory" },
        ]}
        photos={[
          { src: "/media/refined/caterers-hero.webp", alt: "A server plating a dish at a long table laid by Delight Caterers" },
          { src: "/media/real/plaza-room-terracotta.webp", alt: "A deluxe room at Sterling Plaza" },
          { src: "/media/real/kulfi-mango-shake.webp", alt: "A mango shake from Bombay Kulfi" },
        ]}
      />
      <ContactDirectory />
    </>
  );
}
