"use client";

import { motion, useScroll, useTransform } from "@/components/motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/motion/reveal";
import { useRef, useState } from "react";
import type { Project } from "@/types";
import { isPrimaryFeaturedProject } from "@/lib/project-featured";

export function SelectedWork({
  projects,
  primaryFeaturedSlug,
}: {
  projects: Project[];
  primaryFeaturedSlug?: string;
}) {
  return (
    <section
      id="work"
      className="section-gap border-t border-border/50 relative"
    >
      <div className="container-editorial relative">
        <SectionHeader
          label="Selected Work"
          title="Video platforms, streaming SDKs, and learning tools built and shipped in production."
          action={{ label: "View all", href: "/work" }}
          className="mb-12 md:mb-20"
        />

        {projects.length === 0 ? (
          <p className="text-body-lg text-muted-foreground/80">
            Featured projects are being updated.{" "}
            <Link
              href="/work"
              className="focus-ring text-brand hover:underline rounded-sm"
            >
              Browse all work
            </Link>
          </p>
        ) : (
          <div className="space-y-12 md:space-y-16">
            <FeaturedProject
              project={projects[0]}
              index={0}
              isPrimary
              primaryFeaturedSlug={primaryFeaturedSlug}
            />
            {projects.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {projects.slice(1, 3).map((project, i) => (
                  <CompactProject
                    key={project.slug}
                    project={project}
                    index={i + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <Reveal variant="blur" delay={0.1} className="mt-16 md:mt-24 text-center">
          <Link
            href="/work"
            className="focus-ring group inline-flex items-center gap-3 px-8 py-3 min-h-11 rounded-full border border-border/60 text-sm font-medium transition-all duration-300 hover:border-brand/40 hover:shadow-[0_0_30px_rgba(255,97,26,0.08)] hover:-translate-y-0.5"
          >
            View all projects
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectProblemSolution({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  const content = (
    <>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-brand/80">
          Problem
        </p>
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          {project.problem}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-brand/80">
          Solution
        </p>
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          {project.solution}
        </p>
      </div>
    </>
  );

  return (
    <>
      <div className="hidden md:grid md:grid-cols-1 gap-4 pt-2">{content}</div>

      <div className="md:hidden pt-2">
        {expanded && <div className="space-y-4 mb-3">{content}</div>}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="focus-ring inline-flex items-center gap-2 min-h-11 px-4 -ml-4 rounded-lg text-sm font-medium text-brand hover:bg-muted/40 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read problem & solution"}
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform duration-300",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>
    </>
  );
}

function FeaturedProject({
  project,
  index,
  isPrimary,
  primaryFeaturedSlug,
}: {
  project: Project;
  index: number;
  isPrimary: boolean;
  primaryFeaturedSlug?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [reducedMotion ? 0 : 40, reducedMotion ? 0 : -40],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [reducedMotion ? 0 : 20, reducedMotion ? 0 : -20],
  );
  const isEven = index % 2 === 0;
  const showFeaturedBadge =
    isPrimary && isPrimaryFeaturedProject(project, primaryFeaturedSlug);

  return (
    <div
      ref={ref}
      className={cn(
        isPrimary &&
          "rounded-2xl border border-brand/20 bg-surface-1/30 p-5 md:p-8 lg:p-10",
      )}
    >
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <span className="text-sm font-mono text-brand tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        {showFeaturedBadge && (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20">
            Featured
          </span>
        )}
        {project.chronologyLabel && (
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/80">
            {project.chronologyLabel}
          </span>
        )}
        <div className="flex-1 gradient-line" />
      </div>

      <article className="group">
        <div
          className={cn(
            "grid grid-cols-1 gap-8 items-start",
            isPrimary
              ? "lg:gap-10"
              : cn(
                  "lg:grid-cols-12 lg:gap-12",
                  !isEven && "lg:[direction:rtl] lg:*:[direction:ltr]",
                ),
          )}
        >
          <motion.div
            style={{ y: isPrimary ? undefined : imageY }}
            className={cn(isPrimary ? "w-full" : "lg:col-span-7")}
          >
            <Link
              href={`/work/${project.slug}`}
              className="focus-ring relative block overflow-hidden rounded-2xl bg-surface-1 ring-1 ring-border transition-all duration-500 group-hover:ring-brand/20 group-hover:shadow-2xl group-hover:shadow-brand/5"
            >
              <div
                className={cn(
                  "relative w-full",
                  isPrimary ? "aspect-[21/9]" : "aspect-[16/10]",
                )}
              >
                {project.coverImage && project.coverImage.startsWith("/") ? (
                  <>
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]",
                        project.coverImageDark && "dark:hidden",
                      )}
                      sizes={
                        isPrimary
                          ? "(max-width: 1024px) 100vw, 64rem"
                          : "(max-width: 1024px) 100vw, 60vw"
                      }
                    />
                    {project.coverImageDark && (
                      <Image
                        src={project.coverImageDark}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03] hidden dark:block"
                        sizes={
                          isPrimary
                            ? "(max-width: 1024px) 100vw, 64rem"
                            : "(max-width: 1024px) 100vw, 60vw"
                        }
                      />
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-surface-1 via-surface-2 to-surface-3 flex items-center justify-center">
                    <span className="text-[5rem] md:text-[7rem] font-bold text-foreground/[0.03] select-none">
                      {project.title
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/[0.02]" />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-xs font-medium opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                View case study →
              </div>
            </Link>
          </motion.div>

          <motion.div
            style={{ y: isPrimary ? undefined : contentY }}
            className={cn(
              "space-y-5",
              isPrimary
                ? "lg:grid lg:grid-cols-2 lg:gap-10 lg:pt-2"
                : "lg:col-span-5 lg:py-4",
            )}
          >
            <div className={cn("space-y-3", isPrimary && "lg:col-span-1")}>
              <div className="flex items-center gap-3 text-overline">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span>{project.year}</span>
              </div>
              <h3
                className={cn(
                  "transition-colors duration-300 group-hover:text-brand",
                  isPrimary ? "text-heading-1" : "text-heading-2",
                )}
              >
                {project.title}
              </h3>
              <p className="text-body text-muted-foreground/80 leading-relaxed">
                {project.excerpt}
              </p>
            </div>

            <div className={cn(isPrimary && "lg:col-span-1 space-y-5")}>
              <ProjectProblemSolution project={project} />

              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/50">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="space-y-0.5">
                      <p className="text-xl font-semibold tracking-tight text-brand">
                        {metric.value}
                      </p>
                      <p className="text-[11px] text-muted-foreground/80 uppercase tracking-wide">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground/80 border border-border/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group/link inline-flex items-center gap-1.5 min-h-11 px-2 text-sm font-medium transition-colors hover:text-brand rounded-lg"
                  >
                    View live site
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                )}
                <Link
                  href={`/work/${project.slug}`}
                  className="focus-ring inline-flex items-center gap-1.5 min-h-11 px-2 text-sm text-muted-foreground/80 transition-colors hover:text-foreground rounded-lg"
                >
                  Case study
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}

function CompactProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const topMetric = project.metrics?.[0];

  return (
    <Reveal variant="slide-left" delay={index * 0.1}>
      <Link
        href={`/work/${project.slug}`}
        className="focus-ring group grid grid-cols-[6.5rem_1fr] gap-4 rounded-xl border border-border/50 bg-surface-1/40 p-4 transition-all duration-500 hover:border-brand/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5"
      >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-1 ring-1 ring-border">
        {project.coverImage?.startsWith("/") ? (
          <>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className={cn(
                "object-cover",
                project.coverImageDark && "dark:hidden",
              )}
              sizes="104px"
            />
            {project.coverImageDark && (
              <Image
                src={project.coverImageDark}
                alt={project.title}
                fill
                className="object-cover hidden dark:block"
                sizes="104px"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted-foreground/80">
            {project.title}
          </div>
        )}
      </div>

      <div className="space-y-2 min-w-0">
        <div className="flex items-center gap-2 text-[10px] font-mono text-brand">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="text-muted-foreground/80">{project.year}</span>
        </div>
        <h3 className="text-heading-4 truncate group-hover:text-brand transition-colors">
          {project.title}
        </h3>
        <p className="text-body-sm text-muted-foreground/80 line-clamp-2">
          {project.excerpt}
        </p>
        {topMetric && (
          <p className="text-xs text-brand font-medium">
            {topMetric.value} {topMetric.label.toLowerCase()}
          </p>
        )}
      </div>
      </Link>
    </Reveal>
  );
}
