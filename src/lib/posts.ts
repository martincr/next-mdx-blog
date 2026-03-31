import { readdir, readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export interface Post {
  slug: string;
  slugAsParams: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  image?: string;
  author?: string;
  tags: string[];
  readingTime: number;
  body: string;
}

export type PostMeta = Omit<Post, "body">;

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Approximate rehype-slug's ID generation
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    headings.push({ level, text, id });
  }
  return headings;
}

async function parsePost(filename: string): Promise<Post> {
  const slugAsParams = filename.replace(/\.mdx$/, "");
  const raw = await readFile(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: `/blog/${slugAsParams}`,
    slugAsParams,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    published: data.published ?? true,
    image: data.image,
    author: data.author,
    tags: data.tags ?? [],
    readingTime: calculateReadingTime(content),
    body: content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await readdir(POSTS_DIR);
  const posts = await Promise.all(
    files.filter((f) => f.endsWith(".mdx")).map(parsePost),
  );
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slugAsParams === slug) ?? null;
}
