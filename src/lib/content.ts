import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  parseBlogPostFrontmatter,
  parseProjectFrontmatter,
} from "@/lib/content-schemas";
import type { Project, BlogPost } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function readProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");

  return listMdxFiles(dir)
    .map((file) => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      const meta = parseProjectFrontmatter(data, filePath);

      return {
        slug: file.replace(".mdx", ""),
        ...meta,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export const getProjects = cache(readProjects);

export const getProjectBySlug = cache((slug: string) => {
  const filePath = path.join(CONTENT_DIR, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = parseProjectFrontmatter(data, filePath);

  return {
    meta: { slug, ...meta } as Project,
    content,
  };
});

export function getFeaturedProjects(): Project[] {
  return sortProjects(getProjects()).filter((project) => project.featured);
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
}

export function getPrimaryFeaturedProject(projects?: Project[]): Project | undefined {
  const list = projects ?? getProjects();
  return sortProjects(list).find((project) => project.featured);
}

export function isPrimaryFeatured(
  project: Project,
  projects?: Project[],
): boolean {
  return getPrimaryFeaturedProject(projects)?.slug === project.slug;
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

function readPosts(): BlogPost[] {
  const dir = path.join(CONTENT_DIR, "blog");

  return listMdxFiles(dir)
    .map((file) => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const meta = parseBlogPostFrontmatter(data, filePath);

      return {
        slug: file.replace(".mdx", ""),
        readingTime: readingTime(content).text,
        ...meta,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export const getPosts = cache(readPosts);

export function hasBlogPosts(): boolean {
  return getPosts().length > 0;
}

export const getPostBySlug = cache((slug: string) => {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = parseBlogPostFrontmatter(data, filePath);

  return {
    meta: {
      slug,
      readingTime: readingTime(content).text,
      ...meta,
    } as BlogPost,
    content,
  };
});

export function getFeaturedPosts(): BlogPost[] {
  return getPosts().filter((post) => post.featured);
}
