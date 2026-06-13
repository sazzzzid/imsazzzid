"use client";

import Link from "next/link";
import { motion } from "@/components/motion";
import { Magnetic } from "@/components/motion/magnetic";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  availabilityConfig,
  craftNotes,
  education,
  principles,
  stack,
} from "@/config/profile";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease },
  }),
};

export function AboutContent() {
  const availability = availabilityConfig[siteConfig.availability];

  return (
    <>
      <section className="container-editorial page-shell">
        <header className="page-header max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-overline mb-4"
          >
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="text-display mb-6 text-balance"
          >
            I build things that have to work when a million people are watching.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-body-lg text-muted-foreground/90 max-w-2xl leading-relaxed"
          >
            {siteConfig.author.fullName}. {siteConfig.author.role} at{" "}
            {siteConfig.author.company}. Based in {siteConfig.author.location}.
            Most days: video pipelines, DRM, and the kind of frontend problems
            that don&apos;t fit in a Jira ticket.
          </motion.p>
          {siteConfig.resumeUrl && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-8"
            >
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
            </motion.div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20">
          <div className="md:col-span-7 space-y-12">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-5"
            >
              <h2 className="text-heading-3">Background</h2>
              <p className="text-body-lg text-muted-foreground/90 leading-relaxed">
                I didn&apos;t set out to become “the video guy.” I set out to
                fix things that broke in front of users. At Physics Wallah,
                video breaks loudly. Live classes, recorded lectures, OTT
                playback: one player layer, 2.7M+ people a day, zero room for
                “we&apos;ll patch it tomorrow.”
              </p>
              <p className="text-body-lg text-muted-foreground/90 leading-relaxed">
                So I learned manifests, license servers, and codec edge cases
                the hard way. Built routing that picks the right engine per
                stream. Wired analytics so we know when quality drops before
                students do. Added AI inside the player, not as a demo, as a
                doubt-solving tool with real latency constraints.
              </p>
              <p className="text-body-lg text-muted-foreground/90 leading-relaxed">
                On my own time I run{" "}
                <Link
                  href="https://visualjs.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring text-foreground underline decoration-brand/40 underline-offset-4 hover:text-brand transition-colors rounded-sm"
                >
                  VisualJS
                </Link>
                : 85+ chapters, a live JavaScript visualizer, everything runs in
                your browser. Same obsession: make the invisible visible.
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="gradient-line origin-left"
            />

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-5"
            >
              <h2 className="text-heading-3">What I actually work on</h2>
              <div className="space-y-4">
                {craftNotes.map((note) => (
                  <p
                    key={note.slice(0, 32)}
                    className="text-body text-muted-foreground/90 leading-relaxed border-l-2 border-brand/30 pl-4"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-6"
            >
              <h2 className="text-heading-3">How I work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {principles.map((item) => (
                  <div
                    key={item.number}
                    className="rounded-xl border border-border/50 bg-surface-1/40 p-5 space-y-2"
                  >
                    <p className="text-[10px] font-mono text-brand tabular-nums">
                      {item.number}
                    </p>
                    <p className="text-sm font-medium leading-snug">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <aside className="md:col-span-5 space-y-6 lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="space-y-4 p-6 rounded-xl border border-border/50 bg-surface-1/50"
            >
              <h3 className="text-heading-4">At a glance</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground shrink-0">Name</dt>
                  <dd className="text-foreground text-right">
                    {siteConfig.author.fullName}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground shrink-0">Role</dt>
                  <dd className="text-foreground text-right">
                    {siteConfig.author.role}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground shrink-0">Company</dt>
                  <dd className="text-foreground text-right">
                    {siteConfig.author.company}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground shrink-0">Location</dt>
                  <dd className="text-foreground text-right">
                    {siteConfig.author.location}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground shrink-0">Education</dt>
                  <dd className="text-foreground text-right max-w-[11rem]">
                    {education.school}, {education.period}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground shrink-0">Status</dt>
                  <dd className="text-foreground text-right">
                    {availability.shortLabel}
                  </dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="space-y-4 p-6 rounded-xl border border-border/50 bg-surface-1/50"
            >
              <h3 className="text-heading-4">Tools I reach for</h3>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full border border-border/60 text-muted-foreground/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="space-y-3"
            >
              {siteConfig.resumeUrl && (
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex items-center justify-between rounded-xl border border-border/50 bg-surface-1/50 px-5 py-4 transition-colors hover:border-brand/30"
                >
                  <span className="text-sm font-medium">View resume</span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground/50 transition-all group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
              <Link
                href="/contact"
                className="focus-ring group flex items-center justify-between rounded-xl border border-border/50 bg-surface-1/50 px-5 py-4 transition-colors hover:border-brand/30"
              >
                <span className="text-sm font-medium">Want to talk?</span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground/50 transition-all group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </aside>
        </div>
      </section>

      <ExperienceTimeline />
    </>
  );
}
