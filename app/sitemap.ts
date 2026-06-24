import type { MetadataRoute } from "next";

import { navigationItems, siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return navigationItems.map((item) => ({
    url: `${siteConfig.siteUrl}${item.href}`,
    lastModified: now
  }));
}
