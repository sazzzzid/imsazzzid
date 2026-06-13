"use client";

import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from "@/components/motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { openSourceHighlights, skills } from "@/config/profile";
import { SectionHeader } from "@/components/shared/section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useEffect, useRef } from "react";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  href: string;
  external?: boolean;
  decimals?: number;
}

const metrics: Metric[] = [
  {
    value: 2.7,
    suffix: "M+",
    label: "Daily users on video platform",
    href: "/about",
    decimals: 1,
  },
  {
    value: 85,
    suffix: "+",
    label: "Interactive JS chapters",
    href: "/work/visualjs",
  },
  {
    value: 122,
    suffix: "",
    label: "VisualJS core modules",
    href: "/work/visualjs",
  },
  {
    value: 90,
    suffix: "+",
    label: "OTT admin modules shipped",
    href: "/about",
  },
];

export function Impact() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="impact" className="section-gap border-t border-border/50">
      <div className="container-editorial">
        <SectionHeader
          label="Impact"
          title="Proof in production."
          description="Metrics from video platforms and learning tools in production, not projections."
          className="mb-12 md:mb-16"
        />

        <div className="space-y-12 md:space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 md:pb-16 border-b border-border/40">
            {metrics.map((metric, i) => (
              <AnimatedMetric key={metric.label} metric={metric} index={i} />
            ))}
          </div>

          <div>
            <p className="text-overline mb-4">Capabilities</p>
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12 md:pb-16 border-b border-border/40">
              {skills.map((skill) => (
                <StaggerItem key={skill.title}>
                  <div className="rounded-xl border border-border/50 bg-surface-1/40 p-5 space-y-2 h-full">
                    <p className="text-sm font-medium">{skill.title}</p>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {skill.detail}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <p className="text-overline mb-4">Open source</p>
            <Stagger className="flex flex-col sm:flex-row gap-4">
              {openSourceHighlights.map((item) => (
                <StaggerItem key={item.label} className="flex-1">
                  <motion.a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reducedMotion ? undefined : { y: -3, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="focus-ring group flex h-full items-center justify-between rounded-xl border border-border/50 bg-surface-1/50 px-5 py-4 min-h-[3.5rem] transition-colors hover:border-brand/30 hover:shadow-md hover:shadow-brand/5"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.value}</p>
                      <p className="text-xs text-muted-foreground/80">
                        {item.label}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground/50 transition-all duration-300 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </motion.a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedMetric({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(reducedMotion ? metric.value : 0);
  const rounded = useTransform(count, (v) =>
    metric.decimals !== undefined ? v.toFixed(metric.decimals) : Math.round(v),
  );

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      count.set(metric.value);
      return;
    }

    const controls = animate(count, metric.value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      delay: index * 0.1,
    });
    return controls.stop;
  }, [isInView, count, metric.value, index, reducedMotion]);

  const label = (
    <p className="text-body-sm text-muted-foreground/80 group-hover:text-brand transition-colors">
      {metric.label}
    </p>
  );

  return (
    <motion.div
      ref={ref}
      {...(reducedMotion
        ? {}
        : {
            initial: { opacity: 0, y: 24, filter: "blur(8px)" },
            whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
            viewport: { once: true, margin: "-80px" },
            transition: { duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
          })}
      className="space-y-3 group"
    >
      <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.03em] text-brand">
        <AnimatedNumber
          value={rounded}
          fallback={
            metric.decimals !== undefined
              ? metric.value.toFixed(metric.decimals)
              : metric.value
          }
        />
        <span className="text-muted-foreground/80">{metric.suffix}</span>
      </p>
      {metric.external ? (
        <a
          href={metric.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-block rounded-sm"
        >
          {label}
        </a>
      ) : (
        <Link href={metric.href} className="focus-ring inline-block rounded-sm">
          {label}
        </Link>
      )}
    </motion.div>
  );
}

function AnimatedNumber({
  value,
  fallback,
}: {
  value: ReturnType<typeof useTransform<number, number | string>>;
  fallback: number | string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = value.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = String(v);
      }
    });
    return unsubscribe;
  }, [value]);

  return <span ref={ref}>{fallback}</span>;
}
