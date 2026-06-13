import type { AvailabilityStatus } from "./profile";

export const siteConfig = {
  /** Brand handle — nav, footer, hero */
  name: "imsazzzid",
  title: "imsazzzid · Software Engineer",
  description:
    "Software Engineer II at Physics Wallah. I build video streaming platforms, DRM playback systems, and interactive learning tools, including VisualJS.",
  url: "https://imsazzid.world",
  ogImage: "/opengraph-image",
  links: {
    github: "https://github.com/sazzzzid",
    linkedin: "https://www.linkedin.com/in/sazidk/",
    instagram: "https://www.instagram.com/sazid_khann",
    npm: "https://www.npmjs.com/~imsazzzid",
    email: "imsazzid@gmail.com",
    website: "https://imsazzid.world",
  },
  author: {
    /** Legal / formal name — About, structured data */
    name: "Sazid Khan",
    fullName: "Sazid Khan",
    role: "Software Engineer II",
    company: "Physics Wallah",
    location: "Noida, India",
    bio: "I build video platforms, DRM playback, and VisualJS.",
  },
  availability: "open" as AvailabilityStatus,
  resumeUrl: "/sazid_khan.pdf",
} as const;

export type SiteConfig = typeof siteConfig;
