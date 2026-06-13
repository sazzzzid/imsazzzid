"use client";

import { motion } from "@/components/motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const reducedMotion = useReducedMotion();
  const inViewProps = reducedMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: {
          duration: 0.6,
          delay: index * 0.08,
          ease: editorialEase,
        },
      };

  return (
    <motion.article
      {...inViewProps}
      whileHover={reducedMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.3, ease: editorialEase }}
      className="group border-b border-border/50 py-6 md:py-8"
    >
      <Link href={`/blog/${post.slug}`} className="focus-ring relative block space-y-2 rounded-lg overflow-hidden">
        {!reducedMotion && (
          <motion.span
            className="absolute inset-0 bg-brand/[0.03] origin-left -z-10"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: editorialEase }}
            aria-hidden="true"
          />
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-brand">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>{post.readingTime}</span>
        </div>
      </Link>
    </motion.article>
  );
}
