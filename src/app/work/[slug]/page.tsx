import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import { getProjectBySlug, getProjects, sortProjects } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx/mdx-components";
import { CoverImage } from "@/components/shared/cover-image";
import { ProjectDetailClient } from "./project-detail-client";
import { SoftwareJsonLd } from "@/components/shared/json-ld";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return buildPageMetadata({
    title: project.meta.title,
    description: project.meta.description,
    imagePath: project.meta.coverImage,
    path: `/work/${slug}`,
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { meta, content } = project;

  const allProjects = sortProjects(getProjects());
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[currentIndex + 1] ?? allProjects[0];
  const prevProject =
    currentIndex > 0
      ? allProjects[currentIndex - 1]
      : allProjects[allProjects.length - 1];

  return (
    <article className="container-editorial page-shell">
      <SoftwareJsonLd
        name={meta.title}
        description={meta.description}
        url={meta.liveUrl}
        applicationCategory={meta.category}
      />
      <div className="mb-12">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to work
        </Link>
      </div>

      <header className="mb-16 md:mb-24">
        <ProjectDetailClient>
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{meta.category}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{meta.year}</span>
              {meta.role && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>{meta.role}</span>
                </>
              )}
            </div>
            <h1 className="text-display">{meta.title}</h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              {meta.description}
            </p>

            <div className="flex items-center gap-6 pt-4">
              {meta.liveUrl && (
                <a
                  href={meta.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand text-white text-sm font-medium transition-all hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20"
                >
                  View live site
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              )}
              {meta.githubUrl && (
                <a
                  href={meta.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink size={14} />
                  Source
                </a>
              )}
            </div>
          </div>
        </ProjectDetailClient>
      </header>

      {meta.coverImage && meta.coverImage.startsWith("/") && (
        <div className="mb-16 md:mb-24">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-1 ring-1 ring-border shadow-2xl shadow-black/5">
            <CoverImage
              src={meta.coverImage}
              srcDark={meta.coverImageDark}
              alt={meta.title}
              priority
            />
            <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(10,10,10,0.2)_100%)]" />
          </div>
        </div>
      )}

      <div className="mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {meta.problem && (
            <div className="space-y-3 p-6 rounded-xl bg-surface-1/50 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Problem
                </h3>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {meta.problem}
              </p>
            </div>
          )}
          {meta.solution && (
            <div className="space-y-3 p-6 rounded-xl bg-surface-1/50 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand/60" />
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Solution
                </h3>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {meta.solution}
              </p>
            </div>
          )}
          {meta.impact && (
            <div className="space-y-3 p-6 rounded-xl bg-surface-1/50 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Impact
                </h3>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {meta.impact}
              </p>
            </div>
          )}
        </div>
      </div>

      {meta.metrics && meta.metrics.length > 0 && (
        <div className="mb-16 md:mb-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-8 border-y border-border/50">
            {meta.metrics.map((metric) => (
              <div key={metric.label} className="space-y-1 text-center">
                <p className="text-3xl md:text-4xl font-semibold tracking-tight text-brand">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {meta.techStack && meta.techStack.length > 0 && (
        <div className="mb-16 md:mb-24">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/70 mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {meta.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {content && content.trim().length > 0 && (
        <div className="container-prose">
          <MDXRemote source={content} components={getMDXComponents()} />
        </div>
      )}

      {(nextProject && nextProject.slug !== slug) ||
      (prevProject && prevProject.slug !== slug) ? (
        <div className="mt-24 md:mt-32 pt-12 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-8">
          {prevProject && prevProject.slug !== slug && (
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Previous
              </p>
              <Link
                href={`/work/${prevProject.slug}`}
                className="group inline-flex items-center gap-3"
              >
                <span className="text-heading-3 transition-colors duration-300 group-hover:text-brand">
                  {prevProject.title}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground transition-all duration-300 group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1 rotate-180"
                />
              </Link>
            </div>
          )}
          {nextProject && nextProject.slug !== slug && (
            <div className="md:text-right">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Next
              </p>
              <Link
                href={`/work/${nextProject.slug}`}
                className="group inline-flex items-center gap-3 md:flex-row-reverse"
              >
                <span className="text-heading-3 transition-colors duration-300 group-hover:text-brand">
                  {nextProject.title}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground transition-all duration-300 group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                {nextProject.excerpt}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </article>
  );
}
