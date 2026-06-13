"use client";

import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { motion } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  motionBlurReveal,
  motionScaleIn,
  motionFadeUp,
  staggerContainer,
  staggerItem,
  viewportTight,
  smoothEase,
} from "@/lib/motion-presets";

type RevealVariant = "fade-up" | "blur" | "scale" | "slide-left" | "slide-right";

interface RevealProps extends Omit<ComponentPropsWithoutRef<typeof motion.div>, "children"> {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

function getRevealProps(
  reducedMotion: boolean,
  variant: RevealVariant,
  delay: number,
  duration: number,
) {
  switch (variant) {
    case "blur":
      return motionBlurReveal(reducedMotion, { delay, duration });
    case "scale":
      return motionScaleIn(reducedMotion, { delay, duration });
    case "slide-left":
      return reducedMotion
        ? { initial: false as const }
        : {
            initial: { opacity: 0, x: -32, filter: "blur(6px)" },
            whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
            transition: { duration, delay, ease: smoothEase },
          };
    case "slide-right":
      return reducedMotion
        ? { initial: false as const }
        : {
            initial: { opacity: 0, x: 32, filter: "blur(6px)" },
            whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
            transition: { duration, delay, ease: smoothEase },
          };
    default:
      return {
        ...motionFadeUp(reducedMotion, { delay, duration }),
        whileInView: reducedMotion ? undefined : { opacity: 1, y: 0 },
        initial: reducedMotion ? false : { opacity: 0, y: 24 },
      };
  }
}

export function Reveal({
  children,
  variant = "blur",
  delay = 0,
  duration = 0.8,
  once = true,
  amount,
  className,
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const props = getRevealProps(reducedMotion, variant, delay, duration);

  return (
    <motion.div
      {...props}
      viewport={
        reducedMotion
          ? undefined
          : { once, margin: "-80px", amount: amount ?? 0.2 }
      }
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  tight?: boolean;
}

export function Stagger({
  children,
  className,
  delay = 0,
  tight = false,
}: StaggerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      {...staggerContainer(false, delay)}
      viewport={tight ? viewportTight : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div {...staggerItem(false)} className={className}>
      {children}
    </motion.div>
  );
}
