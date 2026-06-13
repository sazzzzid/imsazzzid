import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { hasBlogPosts } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: hasBlogPosts() ? ["/api/"] : ["/api/", "/blog", "/blog/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
