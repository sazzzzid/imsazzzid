import {
  createLucideIcon,
  Mail,
  Code2,
  Briefcase,
  FileText,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

const Instagram = createLucideIcon("instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "0" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "2" }],
]);

export interface ContactMethod {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  value?: string;
  newTab?: boolean;
}

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    icon: Mail,
    description: "For serious inquiries. I reply within 24 hours.",
    value: siteConfig.links.email,
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    icon: Code2,
    description: "See what I'm building in the open.",
    value: "@sazzzzid",
    newTab: true,
  },
  {
    label: "npm",
    href: siteConfig.links.npm,
    icon: Package,
    description: "Packages and libraries I publish.",
    value: "@imsazzzid",
    newTab: true,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: Briefcase,
    description: "Professional background and connections.",
    value: "in/sazidk",
    newTab: true,
  },
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    icon: Instagram,
    description: "Life, work, and the occasional build update.",
    value: "@sazid_khann",
    newTab: true,
  },
];

export const contactMethodsWithResume: ContactMethod[] = [
  ...contactMethods,
  ...(siteConfig.resumeUrl
    ? [
        {
          label: "Resume",
          href: siteConfig.resumeUrl,
          icon: FileText,
          description: "Download PDF",
          newTab: true,
        },
      ]
    : []),
];
