import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getPosts, hasBlogPosts } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx/mdx-components";
import { BlogPostClient } from "./blog-post-client";
import { ArticleJsonLd } from "@/components/shared/json-ld";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!hasBlogPosts()) return [];
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  if (!hasBlogPosts()) return { title: "Not Found" };

  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return buildPageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    imagePath: post.meta.coverImage,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!hasBlogPosts()) {
    redirect("/");
  }

  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { meta, content } = post;

  return (
    <article className="container-editorial page-shell">
      <ArticleJsonLd
        title={meta.title}
        description={meta.description}
        publishedAt={meta.publishedAt}
        updatedAt={meta.updatedAt}
        slug={meta.slug}
      />
      <div className="mb-12">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to blog
        </Link>
      </div>

      <header className="mb-16 md:mb-24">
        <BlogPostClient>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={meta.publishedAt}>
                {new Date(meta.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{meta.readingTime}</span>
            </div>
            <h1 className="text-display">{meta.title}</h1>
            {meta.description && (
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {meta.description}
              </p>
            )}
            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full border border-border/60 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </BlogPostClient>
      </header>

      {content && content.trim().length > 0 && (
        <div className="container-prose">
          <MDXRemote source={content} components={getMDXComponents()} />
        </div>
      )}
    </article>
  );
}
