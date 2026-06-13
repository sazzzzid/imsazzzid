"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/shared/project-card";
import type { Project } from "@/types";
import { isPrimaryFeaturedProject } from "@/lib/project-featured";

import { editorialEase, motionFadeUp } from "@/lib/motion-presets";

import { cn } from "@/lib/utils";

function FeaturedSpotlight({
  project,
  reducedMotion,
  showFeaturedBadge,
}: {
  project: Project;
  reducedMotion: boolean;
  showFeaturedBadge: boolean;
}) {
  const metrics = project.metrics?.slice(0, 3) ?? [];

  return (
    <motion.article
      {...motionFadeUp(reducedMotion, { y: 24, duration: 0.7 })}
      className="mb-14 md:mb-20 rounded-2xl border border-brand/20 bg-surface-1/30 p-5 md:p-8 lg:p-10"
    >
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-sm font-mono text-brand tabular-nums">01</span>
        {showFeaturedBadge && (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20">
            Featured
          </span>
        )}
        <div className="flex-1 gradient-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <Link
          href={`/work/${project.slug}`}
          className="focus-ring group relative block overflow-hidden rounded-2xl bg-surface-1 ring-1 ring-border transition-all duration-500 hover:ring-brand/20 hover:shadow-2xl hover:shadow-brand/5 lg:col-span-7"
        >
          <div className="relative aspect-[16/10] lg:aspect-[21/10]">
            {project.coverImage?.startsWith("/") ? (
              <>
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]",
                    project.coverImageDark && "dark:hidden",
                  )}
                  sizes="(max-width: 1024px) 100vw, 45rem"
                  priority
                />
                {project.coverImageDark && (
                  <Image
                    src={project.coverImageDark}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03] hidden dark:block"
                    sizes="(max-width: 1024px) 100vw, 45rem"
                    priority
                  />
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-surface-1 via-surface-2 to-surface-3 flex items-center justify-center">
                <span className="text-[4rem] font-bold text-foreground/[0.04] select-none">
                  {project.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/[0.02]" />
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-xs font-medium">
            View case study →
          </div>
        </Link>

        <div className="space-y-5 lg:col-span-5 lg:py-2">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-overline">
              <span>{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{project.year}</span>
              {project.role && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>{project.role}</span>
                </>
              )}
            </div>
            <h2 className="text-heading-1 text-balance">{project.title}</h2>
            <p className="text-body text-muted-foreground/80 leading-relaxed">
              {project.excerpt}
            </p>
          </div>

          {metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/50">
              {metrics.map((metric) => (
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
              Read case study
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function WorkGrid({
  projects,
  primaryFeaturedSlug,
}: {
  projects: Project[];
  primaryFeaturedSlug?: string;
}) {
  const reducedMotion = useReducedMotion();
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const [active, setActive] = useState("All");

  const spotlight = useMemo(
    () =>
      primaryFeaturedSlug
        ? projects.find((p) => p.slug === primaryFeaturedSlug)
        : projects.find((p) => p.featured) ?? projects[0],
    [projects, primaryFeaturedSlug],
  );

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active);

    if (active === "All" && spotlight) {
      return list.filter((p) => p.slug !== spotlight.slug);
    }

    return list;
  }, [active, projects, spotlight]);

  const visibleCount = useMemo(() => {
    if (active === "All") return projects.length;
    return projects.filter((p) => p.category === active).length;
  }, [active, projects]);

  const showSpotlight = active === "All" && spotlight;

  return (
    <>
      <motion.div
        {...motionFadeUp(reducedMotion, { y: 10, duration: 0.6, delay: 0.15 })}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10"
      >
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                "focus-ring relative shrink-0 px-4 py-2.5 min-h-11 text-sm rounded-full border transition-colors duration-300",
                active === cat
                  ? "text-foreground border-brand/40"
                  : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border",
              )}
            >
              {active === cat && !reducedMotion && (
                <motion.div
                  layoutId="work-active-tab"
                  className="absolute inset-0 rounded-full bg-brand/5 border border-brand/40"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {active === cat && reducedMotion && (
                <div className="absolute inset-0 rounded-full bg-brand/5 border border-brand/40" />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground/80 shrink-0">
          {visibleCount} project{visibleCount !== 1 && "s"}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { duration: 0.35, ease: editorialEase },
              })}
        >
          {showSpotlight && (
            <FeaturedSpotlight
              project={spotlight}
              reducedMotion={reducedMotion}
              showFeaturedBadge={isPrimaryFeaturedProject(
                spotlight,
                primaryFeaturedSlug,
              )}
            />
          )}

          {filtered.length > 0 ? (
            <>
              {showSpotlight && (
                <p className="text-overline mb-6 md:mb-8">More projects</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-14">
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={i}
                    primaryFeaturedSlug={primaryFeaturedSlug}
                  />
                ))}
              </div>
            </>
          ) : (
            !showSpotlight && (
              <div className="rounded-2xl border border-border/50 bg-surface-1/30 px-6 py-16 text-center">
                <p className="text-body-lg text-muted-foreground/80 mb-4">
                  No projects in this category yet.
                </p>
                <button
                  type="button"
                  onClick={() => setActive("All")}
                  className="focus-ring text-sm font-medium text-brand hover:underline rounded-sm"
                >
                  View all projects
                </button>
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
