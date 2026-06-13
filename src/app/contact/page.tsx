import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/metadata";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} for full-time roles, advisory work, and select freelance projects.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
