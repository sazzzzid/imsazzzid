import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getPosts, hasBlogPosts } from "@/lib/content";
import { BlogListContent } from "./blog-list-content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on engineering, design, and building for the web.",
};

export default function BlogPage() {
  if (!hasBlogPosts()) {
    redirect("/");
  }

  const posts = getPosts();

  return <BlogListContent posts={posts} />;
}
