import type { Project } from "@/types";

export function isPrimaryFeaturedProject(
  project: Project,
  primaryFeaturedSlug?: string,
): boolean {
  return !!primaryFeaturedSlug && project.slug === primaryFeaturedSlug;
}
