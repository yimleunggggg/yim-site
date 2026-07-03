import type { MetadataRoute } from "next";
import { getFrameSlugs } from "@/lib/demo/demo-frames";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const frameEntries: MetadataRoute.Sitemap = getFrameSlugs().map((slug) => ({
    url: `${base}/frames/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${base}/frames`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...frameEntries,
  ];
}
