import React from "react";
import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { getAllPosts, PostMeta } from "@/lib/posts";
import { BlogList } from "@/components/blog-list";

export const metadata: Metadata = {
  title: "Writing",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const postMeta: PostMeta[] = posts.map(({ body: _body, ...meta }) => meta);

  return (
    <div className="mx-auto max-w-screen-xl px-6 lg:px-12 py-16 lg:py-24">
      <PageHeader
        title="Writing"
        description="Technical essays on TypeScript, React, and software design"
      />
      <div className="mt-16">
        <BlogList posts={postMeta} />
      </div>
    </div>
  );
}
