import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, extractHeadings } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import "@/styles/mdx.css";

import Image from "next/image";
import { Mdx } from "@/components/mdx-component";
import { TableOfContents } from "@/components/table-of-contents";
import Link from "next/link";

interface BlogPageItemProps {
  params: Promise<{ slug: string[] }>;
}

async function getBlogFromParams(params: BlogPageItemProps["params"]) {
  const { slug } = await params;
  return getPostBySlug(slug.join("/"));
}

export async function generateMetadata({
  params,
}: BlogPageItemProps): Promise<Metadata> {
  const blog = await getBlogFromParams(params);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description,
    authors: { name: blog.author },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function BlogPageItem({ params }: BlogPageItemProps) {
  const blog = await getBlogFromParams(params);

  if (!blog) {
    notFound();
  }

  const headings = extractHeadings(blog.body);

  return (
    <article className="mx-auto max-w-screen-xl px-6 lg:px-12 py-16 lg:py-20">
      <header className="mb-16 max-w-prose">
        {blog.date && (
          <time
            dateTime={blog.date}
            className="block text-xs tracking-widest uppercase text-muted-foreground"
          >
            {formatDate(blog.date)}
            <span className="mx-3 opacity-40">/</span>
            {blog.readingTime} min read
          </time>
        )}
        <h1 className="mt-5 font-serif text-display-md leading-tight text-foreground">
          {blog.title}
        </h1>
        {blog.description && (
          <p className="mt-5 max-w-[55ch] text-base leading-[1.85] text-muted-foreground">
            {blog.description}
          </p>
        )}
      </header>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-16 xl:grid-cols-[18rem_1fr]">
        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}

        <div>
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              width={720}
              height={405}
              priority
              className="mb-12 w-full"
            />
          )}

          <Mdx source={blog.body} />

          <footer className="mt-16 border-t border-border/40 pt-8">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              All posts
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
