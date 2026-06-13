import { z } from "zod";

export const projectMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()),
  coverImage: z.string().min(1),
  coverImageDark: z.string().min(1).optional(),
  year: z.string().min(1),
  client: z.string().optional(),
  role: z.string().optional(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  caseStudyUrl: z.string().optional(),
  featured: z.boolean(),
  publishedAt: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  impact: z.string().min(1),
  metrics: z.array(projectMetricSchema).optional(),
  techStack: z.array(z.string()),
  chronologyLabel: z.string().optional(),
});

export const blogPostFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  excerpt: z.string().min(1),
  coverImage: z.string().min(1).optional(),
  tags: z.array(z.string()),
  publishedAt: z.string().min(1),
  updatedAt: z.string().min(1).optional(),
  featured: z.boolean(),
});

function formatZodError(error: z.ZodError, file: string): string {
  const issues = error.issues
    .map((issue) => `  - ${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("\n");
  return `Invalid frontmatter in ${file}:\n${issues}`;
}

export function parseProjectFrontmatter(
  data: unknown,
  file: string,
): z.infer<typeof projectFrontmatterSchema> {
  const result = projectFrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(formatZodError(result.error, file));
  }
  return result.data;
}

export function parseBlogPostFrontmatter(
  data: unknown,
  file: string,
): z.infer<typeof blogPostFrontmatterSchema> {
  const result = blogPostFrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(formatZodError(result.error, file));
  }
  return result.data;
}
