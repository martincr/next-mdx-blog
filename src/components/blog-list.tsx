"use client";
import { useState } from "react";
import { PostMeta } from "@/lib/posts";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";

interface BlogListProps {
  posts: PostMeta[];
}

export function BlogList({ posts }: BlogListProps) {
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      {allTags.length > 0 && (
        <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "text-sm transition-colors",
              activeTag === null
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "text-sm transition-colors",
                activeTag === tag
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length ? (
        <ol className="space-y-0">
          {filtered.map((post) => (
            <li key={post.slug} className="border-t border-border/40">
              <Link
                href={post.slug}
                className="group grid grid-cols-[9rem_1fr] items-baseline gap-6 py-7 md:grid-cols-[12rem_1fr]"
              >
                <div className="space-y-1">
                  <time
                    dateTime={post.date}
                    className="block text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    {formatDate(post.date)}
                  </time>
                  {post.readingTime && (
                    <span className="block text-xs text-muted-foreground/60">
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="font-serif text-xl leading-snug text-foreground/85 transition-colors group-hover:text-foreground">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
          <li className="border-t border-border/40" aria-hidden />
        </ol>
      ) : (
        <p className="text-sm text-muted-foreground">No posts found.</p>
      )}
    </>
  );
}
