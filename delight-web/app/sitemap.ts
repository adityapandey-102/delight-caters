import type { MetadataRoute } from "next";
import { group, nav } from "@/lib/content/group";

/** Bump when page content changes; a fixed date keeps the route static (no request-time clock). */
const LAST_UPDATED = "2026-10-20";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = nav.flatMap((item) => ["children" in item ? [item.href, ...item.children.map((c) => c.href)] : [item.href]]).flat();
  return paths.map((href) => ({
    url: `${group.domain}${href === "/" ? "" : href}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : href.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
