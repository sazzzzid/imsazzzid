"use client";

import type { ReactNode } from "react";
import { motion } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { pageEnter } from "@/lib/motion-presets";

export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div {...pageEnter(false)} className="flex-1 flex flex-col">
      {children}
    </motion.div>
  );
}
