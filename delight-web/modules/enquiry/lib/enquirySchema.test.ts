import { describe, expect, it } from "vitest";
import {
  emptyEnquiry,
  enquirySchema,
  isIsoDate,
  localIsoDate,
  normaliseIndianMobile,
  validateEnquiry,
  type EnquiryValues,
} from "./enquirySchema";

const valid: EnquiryValues = {
  name: "  Ananya Rao ",
  phone: "+91 98765 43210",
  eventType: "Wedding",
  eventDate: "2026-12-05",
  guests: "250",
  foodType: "Veg",
  message: "  Live dosa counter  ",
};

const TODAY = "2026-10-13";

function errorsFor(values: Partial<EnquiryValues>) {
  const result = validateEnquiry({ ...valid, ...values }, { today: TODAY });
  return result.success ? {} : result.errors;
}

describe("normaliseIndianMobile", () => {
  it.each([
    ["9876543210", "9876543210"],
    ["98765 43210", "9876543210"],
    ["98765-43210", "9876543210"],
    ["+91 98765 43210", "9876543210"],
    ["+91-98765-43210", "9876543210"],
    ["+919876543210", "9876543210"],
    ["919876543210", "9876543210"],
    ["0091 98765 43210", "9876543210"],
    ["098765 43210", "9876543210"],
    ["(+91) 6123 456 789", "6123456789"],
    ["9198765432", "9198765432"],
  ])("accepts %s", (raw, digits) => {
    expect(normaliseIndianMobile(raw)).toBe(digits);
  });

  it.each(["", "12345", "5876543210", "98765432", "987654321012", "+1 9876543210", "98765abcde", "+44 7911 123456"])(
    "rejects %s",
    (raw) => {
      expect(normaliseIndianMobile(raw)).toBeNull();
    },
  );
});

describe("isIsoDate / localIsoDate", () => {
  it("accepts real calendar dates only", () => {
    expect(isIsoDate("2026-12-05")).toBe(true);
    expect(isIsoDate("2028-02-29")).toBe(true);
    expect(isIsoDate("2026-02-29")).toBe(false);
    expect(isIsoDate("2026-13-01")).toBe(false);
    expect(isIsoDate("05/12/2026")).toBe(false);
    expect(isIsoDate("")).toBe(false);
  });

  it("formats a local date as yyyy-mm-dd", () => {
    expect(localIsoDate(new Date(2026, 0, 7))).toBe("2026-01-07");
    expect(localIsoDate(new Date(2026, 11, 31))).toBe("2026-12-31");
  });
});

describe("enquirySchema", () => {
  it("parses and normalises a complete enquiry", () => {
    const result = enquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toEqual({
      name: "Ananya Rao",
      phone: "9876543210",
      eventType: "Wedding",
      eventDate: "2026-12-05",
      guests: 250,
      foodType: "Veg",
      message: "Live dosa counter",
    });
  });

  it("treats the additional details as optional", () => {
    expect(enquirySchema.safeParse({ ...valid, message: "" }).success).toBe(true);
    const { message: _omit, ...rest } = valid;
    void _omit;
    expect(enquirySchema.safeParse(rest).success).toBe(true);
  });
});

describe("validateEnquiry", () => {
  it("returns the parsed enquiry when everything is in order", () => {
    const result = validateEnquiry(valid, { today: TODAY });
    expect(result.success).toBe(true);
  });

  it("reports every empty required field with a friendly message", () => {
    const result = validateEnquiry(emptyEnquiry, { today: TODAY });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.errors).toEqual({
      name: "Please enter your name",
      phone: "Please enter your 10-digit mobile number",
      eventType: "Please select an event type",
      eventDate: "Please choose the date of your event",
      guests: "Please enter the number of guests",
      foodType: "Please choose Veg, Non-Veg or Both",
    });
  });

  it("checks the name length after trimming", () => {
    expect(errorsFor({ name: " A " }).name).toBe("Please enter your name");
    expect(errorsFor({ name: "Al" }).name).toBeUndefined();
    expect(errorsFor({ name: "x".repeat(81) }).name).toBe("Please keep your name under 80 characters");
  });

  it("rejects numbers that aren't Indian mobiles", () => {
    expect(errorsFor({ phone: "12345" }).phone).toBe("Please enter your 10-digit mobile number");
    expect(errorsFor({ phone: "5876543210" }).phone).toBe("Please enter your 10-digit mobile number");
  });

  it("only accepts the listed event and food types", () => {
    expect(errorsFor({ eventType: "Concert" }).eventType).toBe("Please select an event type");
    expect(errorsFor({ eventType: "Corporate Event" }).eventType).toBeUndefined();
    expect(errorsFor({ foodType: "Vegan" }).foodType).toBe("Please choose Veg, Non-Veg or Both");
    expect(errorsFor({ foodType: "Non-Veg" }).foodType).toBeUndefined();
  });

  it("needs a real date that isn't in the past", () => {
    expect(errorsFor({ eventDate: "2026-02-30" }).eventDate).toBe("Please choose the date of your event");
    expect(errorsFor({ eventDate: "2026-10-12" }).eventDate).toBe("Please choose a date from today onwards");
    expect(errorsFor({ eventDate: TODAY }).eventDate).toBeUndefined();
  });

  it("needs a whole number of guests between 1 and 1,00,000", () => {
    expect(errorsFor({ guests: "abc" }).guests).toBe("Please enter the number of guests");
    expect(errorsFor({ guests: "0" }).guests).toBe("Please enter at least 1 guest");
    expect(errorsFor({ guests: "12.5" }).guests).toBe("Please enter a whole number of guests");
    expect(errorsFor({ guests: "100001" }).guests).toBe("Please enter up to 1,00,000 guests");
    expect(errorsFor({ guests: "1,000" }).guests).toBeUndefined();
    expect(errorsFor({ guests: "100000" }).guests).toBeUndefined();
  });

  it("caps the additional details at 1000 characters", () => {
    expect(errorsFor({ message: "x".repeat(1001) }).message).toBe("Please keep the details under 1000 characters");
    expect(errorsFor({ message: "x".repeat(1000) }).message).toBeUndefined();
  });
});
