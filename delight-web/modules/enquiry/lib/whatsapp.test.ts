import { describe, expect, it } from "vitest";
import { buildEnquiryMessage, formatEventDate, whatsappEnquiryUrl } from "./whatsapp";
import type { Enquiry } from "./enquirySchema";

const base: Enquiry = {
  name: "Ananya Rao",
  phone: "9876543210",
  eventType: "Wedding",
  eventDate: "2026-12-05",
  guests: 250,
  foodType: "Both",
  message: "South Indian breakfast, live dosa counter",
};

describe("formatEventDate", () => {
  it("turns yyyy-mm-dd into dd/mm/yyyy", () => {
    expect(formatEventDate("2026-12-05")).toBe("05/12/2026");
    expect(formatEventDate("2027-01-31")).toBe("31/01/2027");
  });

  it("leaves anything else untouched", () => {
    expect(formatEventDate("")).toBe("");
    expect(formatEventDate("05/12/2026")).toBe("05/12/2026");
  });
});

describe("buildEnquiryMessage", () => {
  it("reproduces the old site's message exactly", () => {
    expect(buildEnquiryMessage(base)).toBe(
      "Hi Team,\n" +
        "It is my details -\n\n" +
        "Name: Ananya Rao\n" +
        "Phone: 9876543210\n" +
        "Event type: Wedding\n" +
        "Date of event: 05/12/2026\n" +
        "Number of guests: 250\n" +
        "Veg / Non-Veg / Both: Both\n" +
        "Additional details: South Indian breakfast, live dosa counter\n" +
        "\nPlease check and contact us.",
    );
  });

  it("leaves out the additional details line when there are none", () => {
    const expected =
      "Hi Team,\nIt is my details -\n\nName: Ananya Rao\nPhone: 9876543210\nEvent type: Wedding\n" +
      "Date of event: 05/12/2026\nNumber of guests: 250\nVeg / Non-Veg / Both: Both\n\nPlease check and contact us.";
    expect(buildEnquiryMessage({ ...base, message: undefined })).toBe(expected);
    expect(buildEnquiryMessage({ ...base, message: "" })).toBe(expected);
  });
});

describe("whatsappEnquiryUrl", () => {
  it("points at the business number with the message encoded", () => {
    const url = whatsappEnquiryUrl(base);
    expect(url.startsWith("https://wa.me/919187918179?text=")).toBe(true);
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe(buildEnquiryMessage(base));
  });

  it("encodes characters that would otherwise break the link", () => {
    const url = whatsappEnquiryUrl({ ...base, message: "Budget ₹2,00,000 & up #veg?\nThanks" });
    const query = url.slice(url.indexOf("?text=") + 6);
    expect(query).not.toMatch(/[\s&#?\n]/);
    expect(decodeURIComponent(query)).toContain("Additional details: Budget ₹2,00,000 & up #veg?\nThanks\n");
  });
});
