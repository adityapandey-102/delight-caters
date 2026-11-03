import type { MetadataRoute } from "next";
import { nav } from "@/lib/content/group";
import { abs } from "@/lib/seo";

/** Bump when page content changes; a fixed date keeps the route static (no request-time clock). */
const LAST_UPDATED = "2026-10-20";

/** Catering is the lead business; the other pages follow by weight. */
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/eatry/delight-caterers": 0.9,
  "/eatry": 0.8,
  "/hospitality": 0.8,
  "/contact": 0.8,
};

/**
 * Every public page, read from the site navigation so a new page appears here
 * once it is in the nav. /login is not in the nav and is not indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = nav.flatMap((item) => ("children" in item ? [item.href, ...item.children.map((c) => c.href)] : [item.href]));
  return paths.map((href) => ({
    url: abs(href),
    lastModified: LAST_UPDATED,
    changeFrequency: href === "/" || href === "/eatry" || href === "/hospitality" ? "weekly" : "monthly",
    priority: PRIORITY[href] ?? (href.split("/").length > 2 ? 0.7 : 0.6),
  }));
}
