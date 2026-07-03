import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/frames", "/frames/"],
      disallow: ["/about", "/life", "/writing"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
