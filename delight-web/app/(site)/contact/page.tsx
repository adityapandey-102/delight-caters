import type { Metadata } from "next";
import { group } from "@/lib/content/group";
import { ContactHero } from "@/modules/contact/components/ContactHero";
import { contact, whatsappHref } from "@/lib/content/site";
import { sterlingInn } from "@/lib/content/hospitality";
import { ContactDirectory } from "@/modules/contact/components/ContactDirectory";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacts for Sterling Inn, Sterling Plaza, Olive, Bombay Kulfi, Aero Bites and Delight Caterers — or send an enquiry for an event or a stay.",
};

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
          { icon: "phone", title: "Stay with us", line: `Sterling hotels · ${sterlingInn.contact.phone?.display ?? ""}`, href: sterlingInn.contact.phone?.href ?? "#directory" },
          { icon: "sparkle", title: "Send an enquiry", line: "Stays, tables or catering — we’ll connect you", href: "#enquiry" },
          { icon: "whatsapp", title: "Chat on WhatsApp", line: `Delight Caterers · ${contact.phoneDisplay}`, href: whatsappHref, external: true },
        ]}
      />
      <ContactDirectory />
    </>
  );
}
