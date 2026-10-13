import type { MetadataRoute } from "next";
import { company, nav } from "@/lib/content/site";

/** Bump when page content changes; a fixed date keeps the route static (no request-time clock). */
const LAST_UPDATED = "2026-10-13";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: `${company.domain}${item.href === "/" ? "" : item.href}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
