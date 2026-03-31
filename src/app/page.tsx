import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 4).map(({ body: _body, ...meta }) => meta);

  return (
    <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
      <section className="py-24 lg:py-32">
        <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
          Software Engineer
        </p>
        <h1 className="font-serif text-display-lg text-foreground">
          {siteConfig.author}
        </h1>
        <p className="mt-6 max-w-[52ch] text-base leading-[1.85] text-muted-foreground">
          {siteConfig.description}
        </p>
      </section>

      {recentPosts.length > 0 && (
        <section className="border-t border-border/60 py-16">
          <p className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">
            Selected Writing
          </p>
          <ol className="space-y-0">
            {recentPosts.map((post) => (
              <li
                key={post.slug}
                className="border-t border-border/40 first:border-t-0"
              >
                <Link
                  href={post.slug}
                  className="group flex items-baseline gap-8 py-5"
                >
                  <time
                    dateTime={post.date}
                    className="w-28 shrink-0 text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="text-foreground/80 transition-colors group-hover:text-foreground">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10 border-t border-border/40 pt-6">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              All posts
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
