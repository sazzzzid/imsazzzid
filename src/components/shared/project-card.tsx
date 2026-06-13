"use client";

import { motion } from "@/components/motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";
import type { Project } from "@/types";
import { isPrimaryFeaturedProject } from "@/lib/project-featured";

interface ProjectCardProps {
  project: Project;
  index?: number;
  primaryFeaturedSlug?: string;
}

export function ProjectCard({
  project,
  index = 0,
  primaryFeaturedSlug,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const showFeaturedBadge = isPrimaryFeaturedProject(
    project,
    primaryFeaturedSlug,
  );
  const inViewProps = reducedMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.8, delay: index * 0.08, ease: editorialEase },
      };

  return (
    <motion.article
      {...inViewProps}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: editorialEase }}
      className="group relative"
    >
      <Link href={`/work/${project.slug}`} className="focus-ring block space-y-5 rounded-xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-1 ring-1 ring-border transition-all duration-700 group-hover:ring-brand/20 group-hover:shadow-xl group-hover:shadow-brand/5">
          {project.coverImage && project.coverImage.startsWith("/") ? (
            <>
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className={`object-cover transition-transform duration-[1000ms] ease-editorial group-hover:scale-[1.04]${project.coverImageDark ? " dark:hidden" : ""}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {project.coverImageDark && (
                <Image
                  src={project.coverImageDark}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[1000ms] ease-editorial group-hover:scale-[1.04] hidden dark:block"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-surface-1 via-surface-2 to-surface-3 flex items-center justify-center">
              <span className="text-[4rem] font-bold text-foreground/[0.04] select-none transition-transform duration-700 group-hover:scale-110">
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,rgba(255,97,26,0.04),transparent_70%)]" />
            </div>
          )}
          <div className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/[0.02]" />
          <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,10,10,0.25)_100%)]" />

          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight size={14} className="text-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-overline">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{project.year}</span>
            {showFeaturedBadge && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span className="text-brand/90">Featured</span>
              </>
            )}
          </div>
          <h3 className="text-heading-3 transition-colors duration-300 group-hover:text-brand">
            {project.title}
          </h3>
          {project.role && (
            <p className="text-xs text-muted-foreground/70">{project.role}</p>
          )}
          <p className="text-body-sm text-muted-foreground line-clamp-2">
            {project.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground border border-border/40"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md text-muted-foreground/60">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
          {project.metrics?.[0] && (
            <p className="text-xs font-medium text-brand tabular-nums">
              {project.metrics[0].value}{" "}
              <span className="text-muted-foreground/80 font-normal">
                {project.metrics[0].label.toLowerCase()}
              </span>
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
