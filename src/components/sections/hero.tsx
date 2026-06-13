"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AmbientBackground, Magnetic } from "@/components/motion";
import { siteConfig } from "@/config/site";
import { availabilityConfig } from "@/config/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollContext } from "@/components/providers/smooth-scroll";
import { scrollToElement } from "@/lib/scroll";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import type { Project } from "@/types";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const nameChars = siteConfig.name.split("");

const statementLines = [
  { before: "You bring a ", highlight: "problem.", after: "" },
  { before: "I ", highlight: "ship", after: " the solution." },
  { before: "Then I refine it until it feels ", highlight: "invisible.", after: "" },
];

const openSourceLinks = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "VisualJS", href: "https://visualjs.in" },
] as const;

const instant = { duration: 0 };

export function HeroSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -80],
  );
  const statementsY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -40],
  );

  const availability = availabilityConfig[siteConfig.availability];
  const scrollContext = useScrollContext();

  const scrollTo = (id: string) => {
    if (scrollContext) {
      scrollContext.scrollToSection(id);
    } else {
      scrollToElement(id);
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative container-editorial page-shell pb-10 md:pb-14 overflow-hidden"
    >
      <AmbientBackground />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent" />

      <div className="w-full relative">
        <div className="grid grid-cols-1 gap-8 md:gap-16 lg:gap-20">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -20 }}
            animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={
              reducedMotion ? instant : { duration: 0.6, delay: 0.1, ease }
            }
            className="flex items-center gap-2"
          >
            <MapPin size={14} className="text-brand" />
            <span className="text-sm text-muted-foreground/80 tracking-wide">
              {siteConfig.author.location}
            </span>
          </motion.div>

          <motion.div style={{ y: nameY }}>
            <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-semibold leading-[0.85] tracking-[-0.045em]">
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={
                    reducedMotion ? false : { opacity: 0, y: 40, rotateX: -80 }
                  }
                  animate={
                    reducedMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
                  }
                  transition={
                    reducedMotion
                      ? instant
                      : { duration: 0.6, delay: 0.15 + i * 0.03, ease }
                  }
                  className="inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reducedMotion ? instant : { duration: 0.5, delay: 0.25, ease }
            }
            className="text-base md:text-lg text-muted-foreground/80 tracking-tight"
          >
            <span className="md:hidden">
              {siteConfig.author.role} at {siteConfig.author.company}
            </span>
            <span className="hidden md:inline">
              {siteConfig.author.role} at {siteConfig.author.company}.{" "}
              {siteConfig.author.bio}
            </span>
          </motion.p>

          <motion.div
            style={{ y: statementsY }}
            className="max-w-2xl space-y-1 md:space-y-0"
          >
            {statementLines.map((line, i) => (
              <motion.p
                key={i}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={
                  reducedMotion
                    ? instant
                    : { duration: 0.6, delay: 0.35 + i * 0.12, ease }
                }
                className={cn(
                  "text-[clamp(1.35rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] text-foreground/85",
                  i > 0 && "hidden sm:block",
                )}
              >
                {line.before}
                <span className="text-brand">{line.highlight}</span>
                {line.after}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reducedMotion ? instant : { duration: 0.4, delay: 0.3, ease }
            }
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25}>
                <Button
                  asChild
                  size="lg"
                  className="focus-ring rounded-full px-6 min-h-11"
                >
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("work");
                    }}
                  >
                    View projects
                  </a>
                </Button>
              </Magnetic>
              {siteConfig.resumeUrl && (
                <Magnetic strength={0.25}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="focus-ring rounded-full px-6 min-h-11"
                  >
                    <a
                      href={siteConfig.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View resume
                    </a>
                  </Button>
                </Magnetic>
              )}
              <Magnetic strength={0.25}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="focus-ring rounded-full px-6 min-h-11"
                >
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }}
                  >
                    Get in touch
                  </a>
                </Button>
              </Magnetic>
            </div>

            {siteConfig.availability !== "closed" && (
              <>
                <span className="hidden sm:block w-px h-4 bg-border/50" />
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground/80 min-h-11">
                  <span className="relative flex h-2 w-2">
                    {!reducedMotion && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                  {availability.label}
                </span>
              </>
            )}
          </motion.div>

          {projects.length > 0 && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                reducedMotion ? instant : { duration: 0.4, delay: 0.4, ease }
              }
              className="space-y-3"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                Recent work
              </p>
              <div
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1 scrollbar-none"
                data-lenis-prevent-touch
              >
                {projects.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.95 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    transition={
                      reducedMotion
                        ? instant
                        : { duration: 0.5, delay: 0.45 + i * 0.08, ease }
                    }
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      className="focus-ring snap-start shrink-0 w-32 sm:w-36 group block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-1 ring-1 ring-border transition-all duration-500 group-hover:ring-brand/30 group-hover:shadow-lg group-hover:shadow-brand/10 group-hover:-translate-y-1">
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
                            sizes="144px"
                          />
                          {project.coverImageDark && (
                            <Image
                              src={project.coverImageDark}
                              alt={project.title}
                              fill
                              className="object-cover hidden dark:block"
                              sizes="144px"
                            />
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                          {project.title}
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs font-medium text-muted-foreground/80 group-hover:text-brand transition-colors truncate">
                      {project.title}
                    </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reducedMotion ? instant : { duration: 0.4, delay: 0.45, ease }
            }
            className="flex flex-wrap items-center gap-2"
          >
            {openSourceLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 min-h-11 text-sm text-muted-foreground/80 hover:text-brand hover:bg-muted/40 transition-colors"
              >
                {link.label}
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 right-8 hidden md:block"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="block text-xs text-muted-foreground/50 [writing-mode:vertical-rl] tracking-widest"
          >
            scroll
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}
