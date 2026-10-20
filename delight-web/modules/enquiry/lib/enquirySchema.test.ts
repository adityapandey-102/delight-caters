import { describe, expect, it } from "vitest";
import { emptyEnquiry, enquirySchema, normaliseIndianMobile, validateEnquiry, type EnquiryValues } from "./enquirySchema";

const valid: EnquiryValues = {
  name: "  Ananya Rao ",
  phone: "+91 98765 43210",
  outlet: "delight-caterers",
  message: "  Wedding in December, about 250 guests  ",
};

function errorsFor(values: Partial<EnquiryValues>) {
  const result = validateEnquiry({ ...valid, ...values });
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

describe("enquirySchema", () => {
  it("parses and normalises a complete enquiry", () => {
    const result = enquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toEqual({
      name: "Ananya Rao",
      phone: "9876543210",
      outlet: "delight-caterers",
      message: "Wedding in December, about 250 guests",
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
    expect(validateEnquiry(valid).success).toBe(true);
  });

  it("reports every empty required field with a friendly message", () => {
    const result = validateEnquiry(emptyEnquiry);
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.errors).toEqual({
      name: "Please enter your name",
      phone: "Please enter your 10-digit mobile number",
      outlet: "Please choose who you'd like to reach",
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

  it("only accepts the group's outlets", () => {
    expect(errorsFor({ outlet: "taj" }).outlet).toBe("Please choose who you'd like to reach");
    expect(errorsFor({ outlet: "sterling-plaza" }).outlet).toBeUndefined();
  });

  it("caps the additional details at 1000 characters", () => {
    expect(errorsFor({ message: "x".repeat(1001) }).message).toBe("Please keep the details under 1000 characters");
    expect(errorsFor({ message: "x".repeat(1000) }).message).toBeUndefined();
  });
});
