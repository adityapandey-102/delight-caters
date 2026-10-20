import { contact } from "@/lib/content/site";
import { outletBySlug } from "@/lib/content/outlets";
import type { Enquiry } from "./enquirySchema";

/** The WhatsApp message: which outlet, what the visitor wants, and how to reach them. */
export function buildEnquiryMessage(e: Enquiry): string {
  const outlet = outletBySlug(e.outlet);
  return (
    "Hi Team,\n" +
    `I'd like to ${outlet ? outlet.action.toLowerCase() : "get in touch"} at ${outlet?.name ?? e.outlet}.\n\n` +
    "Name: " + e.name + "\n" +
    "Phone: " + e.phone + "\n" +
    (e.message ? "Additional details: " + e.message + "\n" : "") +
    "\nPlease get in touch."
  );
}

/** A wa.me link to the outlet's number (or the group's), the message typed in. */
export function whatsappEnquiryUrl(e: Enquiry): string {
  const number = outletBySlug(e.outlet)?.whatsapp ?? contact.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(buildEnquiryMessage(e))}`;
}
