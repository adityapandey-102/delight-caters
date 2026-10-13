import { contact } from "@/lib/content/site";
import type { Enquiry } from "./enquirySchema";

/** "2026-12-05" → "05/12/2026", as the old site wrote it. Anything else passes through. */
export function formatEventDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : iso;
}

/** The WhatsApp message, word for word as the old site's form composed it. */
export function buildEnquiryMessage(e: Enquiry): string {
  return (
    "Hi Team,\n" +
    "It is my details -\n\n" +
    "Name: " + e.name + "\n" +
    "Phone: " + e.phone + "\n" +
    "Event type: " + e.eventType + "\n" +
    "Date of event: " + formatEventDate(e.eventDate) + "\n" +
    "Number of guests: " + e.guests + "\n" +
    "Veg / Non-Veg / Both: " + e.foodType + "\n" +
    (e.message ? "Additional details: " + e.message + "\n" : "") +
    "\nPlease check and contact us."
  );
}

/** A wa.me link that opens a chat with the team, the message typed in. */
export function whatsappEnquiryUrl(e: Enquiry): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(buildEnquiryMessage(e))}`;
}
