import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getProjects, getPosts, hasBlogPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/contact"];
  if (hasBlogPosts()) staticRoutes.push("/blog");

  const routes = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projects = getProjects().map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified: project.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = hasBlogPosts()
    ? getPosts().map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    : [];

  return [...routes, ...projects, ...posts];
}
