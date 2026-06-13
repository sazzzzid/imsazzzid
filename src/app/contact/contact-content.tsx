"use client";

import { motion } from "@/components/motion";
import { Magnetic } from "@/components/motion/magnetic";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { availabilityConfig } from "@/config/profile";
import { contactMethodsWithResume } from "@/config/contact";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const socialMethods = contactMethodsWithResume.filter(
  (method) => method.label !== "Email",
);

export function ContactContent() {
  const reducedMotion = useReducedMotion();
  const availability = availabilityConfig[siteConfig.availability];
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="container-editorial page-shell page-shell-viewport">
      <div className="page-shell-body max-w-xl w-full mx-auto space-y-10">
        <header className="space-y-4 text-center sm:text-left">
          <motion.p
            {...motionProps}
            transition={{ duration: 0.5, ease }}
            className="text-overline"
          >
            Contact
          </motion.p>
          <motion.h1
            {...motionProps}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.05, ease }}
            className="text-display"
          >
            Get in touch
          </motion.h1>
          <motion.p
            {...motionProps}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.1, ease }}
            className="text-body-lg text-muted-foreground/80"
          >
            Open to full-time roles, advisory work, and select freelance
            projects.
          </motion.p>
          {siteConfig.availability !== "closed" && (
            <motion.p
              {...motionProps}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.12, ease }}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground/80"
            >
              <span className="relative flex h-2 w-2">
                {!reducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {availability.label}
            </motion.p>
          )}
        </header>

        <motion.div
          {...motionProps}
          transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.15, ease }}
          className="flex flex-wrap justify-center sm:justify-start items-center gap-3"
        >
          <Magnetic strength={0.25}>
            <Button
              asChild
              size="lg"
              className="focus-ring rounded-full px-6 min-h-11"
            >
              <a href={`mailto:${siteConfig.links.email}`}>
                <span className="sm:hidden">Email me</span>
                <span className="hidden sm:inline">
                  Email {siteConfig.links.email}
                </span>
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
        </motion.div>

        <motion.div
          {...motionProps}
          transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.2, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {socialMethods.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={
                method.newTab || method.href.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                method.newTab || method.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: reducedMotion ? 0 : 0.25 + i * 0.05,
                ease,
              }}
              className="focus-ring group flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-surface-1/50 px-4 py-3.5 min-h-11 transition-all duration-300 hover:border-brand/30 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand/5"
            >
              <div className="flex items-center gap-3 min-w-0">
                <method.icon
                  size={16}
                  className="text-muted-foreground/80 group-hover:text-brand transition-colors shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{method.label}</p>
                  {method.value && (
                    <p className="text-xs font-mono text-muted-foreground/80 truncate">
                      {method.value}
                    </p>
                  )}
                </div>
              </div>
              <ArrowUpRight
                size={14}
                className="text-muted-foreground/50 shrink-0 transition-all duration-300 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
