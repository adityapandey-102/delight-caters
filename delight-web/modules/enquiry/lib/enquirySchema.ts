import { z } from "zod";
import { eventTypes, foodTypes } from "@/lib/content/site";

/**
 * The enquiry, as the form collects it. Pure and shared: the form validates
 * with it today, and phase 2's delight-api can import the same rules.
 */

export const enquiryFields = ["name", "phone", "eventType", "eventDate", "guests", "foodType", "message"] as const;
export type EnquiryField = (typeof enquiryFields)[number];

/** What the form holds: every field as the visitor typed it. */
export type EnquiryValues = Record<EnquiryField, string>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  phone: "",
  eventType: "",
  eventDate: "",
  guests: "",
  foodType: "",
  message: "",
};

const PHONE_MESSAGE = "Please enter your 10-digit mobile number";
const DATE_MESSAGE = "Please choose the date of your event";
const GUESTS_MESSAGE = "Please enter the number of guests";

/**
 * An Indian mobile number in any everyday spelling ("98765 43210",
 * "+91-98765-43210", "098765 43210", "0091 9876543210") as its 10 digits,
 * or null when it isn't one.
 */
export function normaliseIndianMobile(raw: string): string | null {
  const compact = raw.replace(/[\s\-().]/g, "");
  const match = /^(?:(?:\+|00)?91)?0?([6-9]\d{9})$/.exec(compact);
  return match ? match[1] : null;
}

/** True for a real calendar date written yyyy-mm-dd (so no 30 February). */
export function isIsoDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** A Date as the visitor's local yyyy-mm-dd (what <input type="date"> uses). */
export function localIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export const enquirySchema = z.object({
  name: z
    .string({ required_error: "Please enter your name" })
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Please keep your name under 80 characters"),
  phone: z.string({ required_error: PHONE_MESSAGE }).transform((value, ctx) => {
    const digits = normaliseIndianMobile(value);
    if (!digits) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: PHONE_MESSAGE });
      return z.NEVER;
    }
    return digits;
  }),
  eventType: z.enum(eventTypes, { errorMap: () => ({ message: "Please select an event type" }) }),
  eventDate: z.string({ required_error: DATE_MESSAGE }).refine(isIsoDate, DATE_MESSAGE),
  guests: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const cleaned = value.replace(/[,\s]/g, "");
      return cleaned === "" ? undefined : Number(cleaned);
    },
    z
      .number({ required_error: GUESTS_MESSAGE, invalid_type_error: GUESTS_MESSAGE })
      .int("Please enter a whole number of guests")
      .min(1, "Please enter at least 1 guest")
      .max(100000, "Please enter up to 1,00,000 guests"),
  ),
  foodType: z.enum(foodTypes, { errorMap: () => ({ message: "Please choose Veg, Non-Veg or Both" }) }),
  message: z.string().trim().max(1000, "Please keep the details under 1000 characters").optional(),
});

export type Enquiry = z.output<typeof enquirySchema>;

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryResult = { success: true; data: Enquiry } | { success: false; errors: EnquiryErrors };

/**
 * Runs the schema, then the one rule that needs a clock: the event can't be
 * in the past. `today` (yyyy-mm-dd) is passed in by the browser so nothing
 * here reads the time.
 */
export function validateEnquiry(values: EnquiryValues, { today }: { today: string }): EnquiryResult {
  const parsed = enquirySchema.safeParse(values);
  const errors: EnquiryErrors = {};

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as EnquiryField;
      errors[field] ??= issue.message;
    }
  }

  // yyyy-mm-dd strings compare correctly as text.
  if (!errors.eventDate && isIsoDate(values.eventDate) && values.eventDate < today) {
    errors.eventDate = "Please choose a date from today onwards";
  }

  if (!parsed.success || Object.keys(errors).length > 0) return { success: false, errors };
  return { success: true, data: parsed.data };
}
