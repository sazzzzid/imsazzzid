import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/metadata";
import { AboutContent } from "./about-content";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `${siteConfig.author.fullName}, ${siteConfig.author.role} at ${siteConfig.author.company}. Video playback, DRM, and VisualJS.`,
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
