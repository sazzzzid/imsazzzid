"use client";

import { motion } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  mode?: "words" | "chars";
}

export function TextReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  mode = "words",
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const motionTags = {
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    p: motion.p,
    span: motion.span,
  } as const;
  const MotionTag = motionTags[Tag];

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const units =
    mode === "chars"
      ? text.split("")
      : text.split(/(\s+)/).filter((w) => w.length > 0);

  return (
    <MotionTag
      className={cn(
        mode === "chars" ? "inline-flex whitespace-nowrap" : "inline",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: mode === "chars" ? 0.02 : 0.06, delayChildren: delay } },
      }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          className={mode === "chars" ? "inline-block shrink-0" : "inline-block"}
          variants={{
            hidden: { opacity: 0, y: mode === "chars" ? 20 : 28, rotateX: mode === "chars" ? -40 : 0 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.55, ease: editorialEase },
            },
          }}
          style={{ transformOrigin: "bottom", whiteSpace: unit.trim() === "" ? "pre" : undefined }}
        >
          {unit}
        </motion.span>
      ))}
    </MotionTag>
  );
}
