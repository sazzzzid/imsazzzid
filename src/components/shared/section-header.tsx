"use client";

import Link from "next/link";
import { motion, TextReveal } from "@/components/motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase, motionBlurReveal } from "@/lib/motion-presets";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  animate?: boolean;
  className?: string;
  action?: { label: string; href: string };
}

export function SectionHeader({
  label,
  title,
  description,
  animate = true,
  className,
  action,
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();

  const content = (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <motion.p
            {...(animate && !reducedMotion
              ? {
                  initial: { opacity: 0, x: -12 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, margin: "-80px" },
                  transition: { duration: 0.5, ease: editorialEase },
                }
              : {})}
            className="text-overline mb-4"
          >
            {label}
          </motion.p>
          {animate && !reducedMotion ? (
            <h2 className="text-heading-1 max-w-3xl">
              <TextReveal text={title} as="span" mode="words" />
            </h2>
          ) : (
            <h2 className="text-heading-1 max-w-3xl">{title}</h2>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="focus-ring group inline-flex items-center gap-2 min-h-11 text-sm font-medium text-muted-foreground/80 hover:text-brand transition-colors shrink-0 sm:ml-8 self-start sm:self-end"
          >
            {action.label}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
      {description && (
        <motion.p
          {...(animate && !reducedMotion
            ? motionBlurReveal(false, { y: 16, duration: 0.7, delay: 0.15 })
            : {})}
          className="text-body-lg text-muted-foreground/80 mt-4 max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </>
  );

  if (!animate || reducedMotion) {
    return <div className={className}>{content}</div>;
  }

  return <div className={className}>{content}</div>;
}
