"use client";

import Link from "next/link";
import { motion, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";
import type { BlogPost } from "@/types";

export function FeaturedPosts({ posts }: { posts: BlogPost[] }) {
  const reducedMotion = useReducedMotion();

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="section-gap border-t border-border/50">
      <div className="container-editorial">
        <SectionHeader
          label="Writing"
          title="Thinking in public."
          description="On AI engineering, system design, automation, and lessons from production."
          className="mb-12 md:mb-16"
        />

        <Stagger className="space-y-0">
          {posts.slice(0, 4).map((post) => (
            <StaggerItem key={post.slug}>
              <article className="group border-t border-border/40 last:border-b">
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-ring relative flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-8 py-6 md:py-7 min-h-11 rounded-sm overflow-hidden"
                >
                  {!reducedMotion && (
                    <motion.span
                      className="absolute inset-0 bg-brand/[0.03] origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.45, ease: editorialEase }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex-1 space-y-1">
                    <h3 className="text-heading-4 transition-colors duration-300 group-hover:text-brand">
                      {post.title}
                    </h3>
                    <p className="text-body-sm text-muted-foreground/80 line-clamp-1 max-w-lg">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="relative flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground/80">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                      <span>{post.readingTime}</span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground/50 transition-all duration-300 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal variant="fade-up" delay={0.2} className="mt-10">
          <Link
            href="/blog"
            className="focus-ring inline-flex items-center gap-2 min-h-11 px-1 text-sm font-medium transition-all hover:gap-3 group rounded-lg"
          >
            All writing
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
