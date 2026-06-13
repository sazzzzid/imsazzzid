"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "@/components/motion";
import { experiences } from "@/config/profile";
import { experienceDateTime } from "@/lib/experience-dates";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";

interface ExperienceTimelineProps {
  showAboutCta?: boolean;
}

export function ExperienceTimeline({ showAboutCta = false }: ExperienceTimelineProps) {
  const reducedMotion = useReducedMotion();
  const instant = { duration: 0 };
  const ease = editorialEase;

  return (
    <section id="experience" className="section-gap border-t border-border/50">
      <div className="container-editorial">
        <SectionHeader
          label="Experience"
          title="Two roles at one company. Production impact at scale."
          description={
            showAboutCta
              ? "Production work at Physics Wallah, from admin platforms to the playback layer used by millions of students each day."
              : undefined
          }
          className="mb-12 md:mb-16"
        />

        <div className="relative overflow-visible">
          <div className="absolute left-0 md:left-[7.5rem] top-0 bottom-0 w-px bg-border/50 hidden md:block" />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.article
                key={exp.period}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  reducedMotion ? instant : { duration: 0.7, delay: i * 0.08, ease }
                }
                className="relative grid grid-cols-1 md:grid-cols-[7.5rem_1fr] gap-4 md:gap-12 py-10 md:py-12 border-b border-border/30 last:border-b-0"
              >
                <div className="relative shrink-0 min-w-[7.5rem]">
                  <time
                    dateTime={experienceDateTime(exp.period)}
                    className="text-xs font-mono text-muted-foreground whitespace-nowrap lg:hidden"
                  >
                    {exp.period}
                  </time>
                  <div className="absolute right-[-1.3rem] top-1.5 hidden md:block">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-background" />
                  </div>
                </div>

                <div className="space-y-4 md:pl-8 min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-heading-4">{exp.role}</h3>
                      <p className="text-caption">{exp.company}</p>
                    </div>
                    <time
                      dateTime={experienceDateTime(exp.period)}
                      className="hidden lg:block text-xs font-mono text-muted-foreground whitespace-nowrap shrink-0"
                    >
                      {exp.period}
                    </time>
                  </div>

                  <p className="text-body-lg text-foreground/90 max-w-2xl leading-relaxed">
                    {exp.lead}
                  </p>
                  <p className="text-body text-muted-foreground/85 max-w-2xl leading-relaxed">
                    {exp.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {showAboutCta && (
          <Reveal
            variant="fade-up"
            delay={0.15}
            className="mt-10 md:mt-12 flex justify-end"
          >
            <Link
              href="/about"
              className="focus-ring group inline-flex items-center gap-2 min-h-11 px-1 text-sm font-medium text-muted-foreground/80 hover:text-brand transition-colors rounded-lg"
            >
              See background and principles on About
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
