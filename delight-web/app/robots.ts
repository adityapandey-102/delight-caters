import type { MetadataRoute } from "next";
import { group } from "@/lib/content/group";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${group.domain}/sitemap.xml`,
  };
}
