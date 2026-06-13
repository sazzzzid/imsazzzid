"use client";

import { motion, useScroll, useTransform } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useRef } from "react";

export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -80]);
  const orb1Scale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
      aria-hidden="true"
    >
      <motion.div style={{ opacity }} className="absolute inset-0">
        <motion.div
          style={{ y: orb1Y, scale: orb1Scale }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[min(70vw,600px)] h-[min(70vw,600px)] rounded-full bg-brand/[0.07] blur-[100px]"
        />
        <motion.div
          style={{ y: orb2Y }}
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 25, -10, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] -left-[15%] w-[min(50vw,400px)] h-[min(50vw,400px)] rounded-full bg-highlight/[0.06] blur-[80px] dark:bg-highlight/[0.04]"
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[40%] w-[min(40vw,300px)] h-[min(40vw,300px)] rounded-full bg-brand/[0.03] blur-[60px]"
        />
      </motion.div>

      <div className="absolute inset-0 dot-grid opacity-[0.03]" />
    </div>
  );
}
