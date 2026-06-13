export type AvailabilityStatus = "open" | "limited" | "closed";

export const availabilityConfig = {
  open: {
    label: "Available for projects",
    shortLabel: "Open to work",
  },
  limited: {
    label: "Limited availability",
    shortLabel: "Limited availability",
  },
  closed: {
    label: "Not taking new work",
    shortLabel: "Not available",
  },
} as const;

/** First-person craft notes for About */
export const craftNotes = [
  "Video playback. DASH segments, license renewals, Safari being Safari. I’ve debugged streams at 2am with millions of people already watching.",
  "Real-time classrooms. Polls, chat, doubts over HLS metadata, WebSockets, and MQTT, with failover when any one path dies.",
  "Frontend at scale. Module Federation so teams ship without stepping on each other. Checkout flows, feature flags, the unglamorous glue that keeps product moving.",
  "VisualJS. JavaScript taught through a sandbox I wrote myself: AST instrumentation, Web Workers, no server reading your code. Because some ideas need to be seen, not read.",
] as const;

export const skills = [
  {
    title: "Playback & DRM",
    detail: "Video.js, hls.js, EME, Conviva. Live, VOD, and the edge cases in between.",
  },
  {
    title: "Platform frontend",
    detail: "React, Module Federation, subscription flows, and admin tooling operations teams rely on.",
  },
  {
    title: "Learning systems",
    detail: "Client-side execution, step-through debuggers, and curriculum designed to catch misconceptions early.",
  },
  {
    title: "Production discipline",
    detail: "Sentry, staged rollouts, and analytics you can trust when leadership asks hard questions.",
  },
] as const;

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Redux Toolkit",
  "React Query",
  "Video.js",
  "hls.js",
  "WebSockets",
  "MQTT",
  "Module Federation",
  "Tailwind CSS",
  "AWS",
  "Docker",
] as const;

export const principles = [
  {
    number: "01",
    title: "If it breaks quietly, it’s not done.",
    description:
      "Silent failures are the worst kind. I’d rather log too much early and cut later than explain a blackout to two million students.",
  },
  {
    number: "02",
    title: "Abstractions should earn their keep.",
    description:
      "Every layer needs a reason to exist. I’ve deleted more ‘clever’ code than I’ve written.",
  },
  {
    number: "03",
    title: "Measure, then argue.",
    description:
      "Hot takes lose to graphs. Conviva, Sentry, your own attempt counters. Pick one and look before you refactor.",
  },
  {
    number: "04",
    title: "Ship for the person on a bad connection.",
    description:
      "Fast Wi‑Fi lies to you. I build for the student on mobile data in a crowded room.",
  },
] as const;

export const experiences = [
  {
    period: "Apr 2023 to Present",
    role: "Software Engineer II",
    company: "Physics Wallah",
    lead: "When I joined, web playback was fragmented across products. I helped unify it into one platform for live classes, VOD, and OTT.",
    detail:
      "Built a multi-engine SDK that routes between Video.js, hls.js, AWS Live, and YouTube based on feature flags. Owned DRM end to end: Widevine, FairPlay, Safari service-worker authentication, and signed cookies. Delivered classroom transport for polls, chat, and doubts with redundant paths and Firebase-gated failover. Shipped Video Copilot with speech-to-text, frame annotations, and streamed LLM replies inside the player. Led Module Federation for the subscription product and checkout stack.",
    type: "work" as const,
  },
  {
    period: "Jul 2022 to Mar 2023",
    role: "Software Engineer I",
    company: "Physics Wallah",
    lead: "In my first year, I worked on a 90-module admin platform that supports core operations across the business.",
    detail:
      "Shipped CMS flows, subscription plans, trials, and onboarding. Built config-driven CRUD so operations teams could move without engineering bottlenecks. Implemented field-level RBAC, S3 bulk uploads with client-side validation, and CI/CD through Jenkins and ArgoCD with Sentry for production monitoring.",
    type: "work" as const,
  },
] as const;

export const education = {
  degree: "B.Tech, Computer Science and Information Technology",
  school: "Dronacharya Group of Institutions",
  period: "2018 – 2022",
} as const;

export const openSourceHighlights = [
  {
    label: "VisualJS",
    value: "85+ chapters",
    href: "https://visualjs.in",
  },
  {
    label: "GitHub",
    value: "Open source",
    href: "https://github.com/sazzzzid",
  },
] as const;
