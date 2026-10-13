import type { Metadata } from "next";
import { company, contact } from "@/lib/content/site";
import { ContactLanding } from "@/modules/enquiry/components/ContactLanding";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Plan your event with ${company.name}, Bengaluru. Call or WhatsApp ${contact.phoneDisplay}, email ${contact.email}, or send your enquiry in a minute.`,
};

export default function ContactPage() {
  return <ContactLanding />;
}
