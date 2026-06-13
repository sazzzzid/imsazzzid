import type { Metadata } from "next";
import { getProjects, getPrimaryFeaturedProject, sortProjects } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { WorkPageContent } from "./work-page-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Work",
  description:
    "Video platforms, streaming SDKs, and VisualJS. Selected projects and case studies from Sazid Khan.",
  path: "/work",
});

export default function WorkPage() {
  const projects = sortProjects(getProjects());
  const primaryFeaturedSlug = getPrimaryFeaturedProject(projects)?.slug;

  return (
    <WorkPageContent
      projects={projects}
      primaryFeaturedSlug={primaryFeaturedSlug}
    />
  );
}
