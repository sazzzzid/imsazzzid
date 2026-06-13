// ─── Content Types ────────────────────────────────────────────────────────────

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverImageDark?: string;
  year: string;
  client?: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  publishedAt: string;
  problem: string;
  solution: string;
  impact: string;
  metrics?: ProjectMetric[];
  techStack: string[];
  /** Chronology label like "CURRENT PROJECT", "PREVIOUS ROLE" */
  chronologyLabel?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  featured: boolean;
}

// ─── Component Types ─────────────────────────────────────────────────────────

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export interface AnimationProps {
  delay?: number;
  duration?: number;
  once?: boolean;
}
