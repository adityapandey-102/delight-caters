import { describe, expect, it } from "vitest";
import { buildEnquiryMessage, whatsappEnquiryUrl } from "./whatsapp";
import { enquiryLabel } from "@/lib/content/outlets";
import type { Enquiry } from "./enquirySchema";

const base: Enquiry = {
  name: "Ananya Rao",
  phone: "9876543210",
  outlet: "delight-caterers",
  message: "Wedding in December, about 250 guests",
};

describe("buildEnquiryMessage", () => {
  it("names the outlet and what the visitor wants", () => {
    expect(buildEnquiryMessage(base)).toBe(
      "Hi Team,\n" +
        "I'd like to book a consultation at Delight Caterers.\n\n" +
        "Name: Ananya Rao\n" +
        "Phone: 9876543210\n" +
        "Additional details: Wedding in December, about 250 guests\n" +
        "\nPlease get in touch.",
    );
    expect(buildEnquiryMessage({ ...base, outlet: "sterling-plaza" })).toContain("I'd like to book a stay at Sterling Plaza.");
    expect(buildEnquiryMessage({ ...base, outlet: "aero-bites" })).toContain("I'd like to reserve a table at Aero Bites.");
  });

  it("leaves out the additional details line when there are none", () => {
    const expected = "Hi Team,\nI'd like to book a consultation at Delight Caterers.\n\nName: Ananya Rao\nPhone: 9876543210\n\nPlease get in touch.";
    expect(buildEnquiryMessage({ ...base, message: undefined })).toBe(expected);
    expect(buildEnquiryMessage({ ...base, message: "" })).toBe(expected);
  });
});

describe("whatsappEnquiryUrl", () => {
  it("points at the business number with the message encoded", () => {
    const url = whatsappEnquiryUrl(base);
    expect(url.startsWith("https://wa.me/919187918179?text=")).toBe(true);
    expect(new URL(url).searchParams.get("text")).toBe(buildEnquiryMessage(base));
  });

  it("encodes characters that would otherwise break the link", () => {
    const url = whatsappEnquiryUrl({ ...base, message: "Lunch & dinner #veg?\nThanks" });
    const query = url.slice(url.indexOf("?text=") + 6);
    expect(query).not.toMatch(/[\s&#?\n]/);
    expect(decodeURIComponent(query)).toContain("Additional details: Lunch & dinner #veg?\nThanks\n");
  });
});

describe("enquiryLabel", () => {
  it("only Delight Caterers books a consultation", () => {
    expect(enquiryLabel("/eatry/delight-caterers")).toBe("Book a consultation");
    expect(enquiryLabel("/hospitality/olive")).toBe("Book a stay");
    expect(enquiryLabel("/hospitality")).toBe("Book a stay");
    expect(enquiryLabel("/eatry/aero-bites")).toBe("Reserve a table");
    expect(enquiryLabel("/")).toBe("Enquire now");
    expect(enquiryLabel("/about")).toBe("Enquire now");
  });
});
