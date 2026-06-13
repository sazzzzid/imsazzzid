"use client";

import { motion } from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionFadeUp } from "@/lib/motion-presets";
import { BlogCard } from "@/components/shared/blog-card";
import type { BlogPost } from "@/types";

export function BlogListContent({ posts }: { posts: BlogPost[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="container-editorial page-shell">
      <header className="page-header">
        <motion.p
          {...motionFadeUp(reducedMotion, { y: 10, duration: 0.8 })}
          className="text-overline mb-4"
        >
          Writing
        </motion.p>
        <motion.h1
          {...motionFadeUp(reducedMotion, { y: 20, duration: 1, delay: 0.1 })}
          className="text-display mb-4"
        >
          Blog
        </motion.h1>
        <motion.p
          {...motionFadeUp(reducedMotion, { y: 20, duration: 1, delay: 0.2 })}
          className="text-body-lg text-muted-foreground max-w-2xl"
        >
          Thoughts on engineering, design, and building for the web.
        </motion.p>
      </header>

      {posts.length === 0 ? (
        <motion.p
          {...motionFadeUp(reducedMotion, { duration: 0.6, delay: 0.3 })}
          className="text-body text-muted-foreground"
        >
          No posts yet. Check back soon.
        </motion.p>
      ) : (
        <div className="space-y-0">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
