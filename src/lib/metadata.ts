import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  imagePath,
  path,
}: {
  title: string;
  description: string;
  imagePath?: string;
  path?: string;
}): Metadata {
  const image = imagePath?.startsWith("/")
    ? absoluteUrl(imagePath)
    : absoluteUrl(siteConfig.ogImage);

  const canonical = path ? absoluteUrl(path) : undefined;

  return {
    title,
    description,
    ...(canonical && { alternates: { canonical } }),
    openGraph: {
      title,
      description,
      ...(canonical && { url: canonical }),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
