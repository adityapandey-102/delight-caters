import type { MetadataRoute } from "next";
import { company } from "@/lib/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${company.domain}/sitemap.xml`,
  };
}
