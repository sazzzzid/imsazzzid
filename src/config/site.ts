import type { AvailabilityStatus } from "./profile";

export const siteConfig = {
  name: "Sazzzid",
  title: "Sazzzid · Software Engineer",
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
    name: "Sazzzid",
    fullName: "Sazid Khan",
    role: "Software Engineer II",
    company: "Physics Wallah",
    location: "Noida, India",
    bio: "I build video platforms, DRM playback, and VisualJS.",
  },
  availability: "open" as AvailabilityStatus,
  /** Set when resume.pdf is added to /public */
  resumeUrl: null as string | null,
} as const;

export type SiteConfig = typeof siteConfig;
