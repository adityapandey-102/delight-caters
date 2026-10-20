import { z } from "zod";
import { outletSlugs } from "@/lib/content/outlets";

/**
 * The enquiry, as the form collects it: who, how to reach them, which outlet
 * they want, and anything else they'd like to say. Pure and shared: the form
 * validates with it today, and phase 2's delight-api can import the same rules.
 */

export const enquiryFields = ["name", "phone", "outlet", "message"] as const;
export type EnquiryField = (typeof enquiryFields)[number];

/** What the form holds: every field as the visitor typed it. */
export type EnquiryValues = Record<EnquiryField, string>;

export const emptyEnquiry: EnquiryValues = { name: "", phone: "", outlet: "", message: "" };

const PHONE_MESSAGE = "Please enter your 10-digit mobile number";

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
  outlet: z.enum(outletSlugs, { errorMap: () => ({ message: "Please choose who you'd like to reach" }) }),
  message: z.string().trim().max(1000, "Please keep the details under 1000 characters").optional(),
});

export type Enquiry = z.output<typeof enquirySchema>;

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryResult = { success: true; data: Enquiry } | { success: false; errors: EnquiryErrors };

export function validateEnquiry(values: EnquiryValues): EnquiryResult {
  const parsed = enquirySchema.safeParse(values);
  if (parsed.success) return { success: true, data: parsed.data };
  const errors: EnquiryErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as EnquiryField;
    errors[field] ??= issue.message;
  }
  return { success: false, errors };
}
