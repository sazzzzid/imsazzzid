"use client";

import Link from "next/link";
import { motion } from "@/components/motion";
import { Magnetic } from "@/components/motion/magnetic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";

export default function NotFound() {
  const reducedMotion = useReducedMotion();
  const instant = { duration: 0 };
  const ease = editorialEase;

  return (
    <section className="container-editorial page-shell flex flex-col items-center justify-center min-h-[50vh] text-center relative overflow-hidden">
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-[min(80vw,500px)] h-[min(80vw,500px)] rounded-full bg-brand/[0.03] blur-[80px]"
          />
        </motion.div>
      )}

      <motion.p
        initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={reducedMotion ? instant : { duration: 0.8, ease }}
        className="relative text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-foreground/[0.03] select-none"
      >
        404
      </motion.p>

      <motion.h1
        initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={reducedMotion ? instant : { duration: 0.7, delay: 0.1, ease }}
        className="relative text-display mb-4 -mt-8"
      >
        Page not found
      </motion.h1>

      <motion.p
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={reducedMotion ? instant : { duration: 0.6, delay: 0.2, ease }}
        className="relative text-body-lg text-muted-foreground mb-8"
      >
        The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>

      <Magnetic strength={0.3}>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reducedMotion ? instant : { duration: 0.5, delay: 0.3, ease }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/60 text-sm font-medium transition-all duration-300 hover:border-brand/40 hover:text-brand hover:shadow-lg hover:shadow-brand/10"
          >
            Go home
          </Link>
        </motion.div>
      </Magnetic>
    </section>
  );
}
