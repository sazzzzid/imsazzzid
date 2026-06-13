"use client";

import { motion } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionFadeUp } from "@/lib/motion-presets";
import type { ReactNode } from "react";

export function ProjectDetailClient({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div {...motionFadeUp(reducedMotion, { y: 30, duration: 1 })}>
      {children}
    </motion.div>
  );
}
