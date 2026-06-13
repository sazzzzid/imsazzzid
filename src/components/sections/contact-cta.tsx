"use client";

import { motion } from "@/components/motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contactMethodsWithResume } from "@/config/contact";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem, TextReveal, Magnetic } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";

export function ContactCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact" className="section-gap-lg border-t border-border/50 relative overflow-hidden">
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 w-[min(60vw,500px)] h-[min(60vw,500px)] rounded-full bg-brand/[0.04] blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="container-editorial relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <Stagger className="space-y-6">
            <StaggerItem>
              <p className="text-overline">Contact</p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-display">
                <span className="block">Let&rsquo;s build something</span>
                <span className="block text-brand">
                  <TextReveal
                    text="together."
                    as="span"
                    mode="words"
                    delay={0.25}
                  />
                </span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-body-lg text-muted-foreground/80 max-w-md">
                I&rsquo;m open to full-time roles, advisory work, and select
                freelance projects. If you have a hard problem and need someone
                who cares about the details, let&rsquo;s talk.
              </p>
            </StaggerItem>
            <StaggerItem>
              <Magnetic strength={0.2}>
                <Button
                  asChild
                  size="lg"
                  className="focus-ring rounded-full px-6 min-h-11"
                >
                  <a href={`mailto:${siteConfig.links.email}`}>
                    Email {siteConfig.links.email}
                  </a>
                </Button>
              </Magnetic>
            </StaggerItem>
          </Stagger>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {contactMethodsWithResume.map((method) => (
              <StaggerItem key={method.label}>
                <motion.a
                  href={method.href}
                  target={
                    method.href.startsWith("http") || method.newTab
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    method.href.startsWith("http") || method.newTab
                      ? "noopener noreferrer"
                      : undefined
                  }
                  whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: editorialEase }}
                  className="focus-ring group flex flex-col gap-3 rounded-xl border border-border/50 bg-surface-1/50 p-5 min-h-[8rem] transition-colors hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <method.icon
                      size={18}
                      className="text-muted-foreground/80 group-hover:text-brand transition-colors shrink-0 mt-0.5"
                    />
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground/50 transition-all duration-300 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{method.label}</p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">
                      {method.description}
                    </p>
                    {method.value && (
                      <p className="text-xs font-mono text-muted-foreground/80 pt-1">
                        {method.value}
                      </p>
                    )}
                  </div>
                </motion.a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
