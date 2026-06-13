"use client";

import { motion } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionFadeUp } from "@/lib/motion-presets";
import { WorkGrid } from "./work-grid";
import type { Project } from "@/types";

export function WorkPageContent({
  projects,
  primaryFeaturedSlug,
}: {
  projects: Project[];
  primaryFeaturedSlug?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="container-editorial page-shell">
      <header className="page-header max-w-3xl">
        <motion.p
          {...motionFadeUp(reducedMotion, { y: 10, duration: 0.6 })}
          className="text-overline mb-4"
        >
          Work
        </motion.p>
        <motion.h1
          {...motionFadeUp(reducedMotion, { y: 16, duration: 0.7, delay: 0.05 })}
          className="text-display mb-6 text-balance"
        >
          Video platforms, streaming tools, and side projects that shipped.
        </motion.h1>
        <motion.p
          {...motionFadeUp(reducedMotion, { y: 16, duration: 0.7, delay: 0.1 })}
          className="text-body-lg text-muted-foreground/90 max-w-2xl leading-relaxed"
        >
          Production work at Physics Wallah, open-source SDKs, and VisualJS.
          Each project includes the problem, what I built, and what changed.
        </motion.p>
      </header>

      <WorkGrid
        projects={projects}
        primaryFeaturedSlug={primaryFeaturedSlug}
      />
    </section>
  );
}
