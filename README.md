# MDX Static Blog Template

A markdown static blog built with Next.js 15, MDX, and Tailwind CSS. Luxury minimal aesthetic with an editorial serif/sans/mono type stack.

<img src="screenshot/mdx-blog-template.jpg" alt="MDX Blog Template" width="100%">

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Run Locally](#run-locally)
- [Adding Blog Posts](#adding-blog-posts)

## Features

- **Luxury minimal design** — warm near-neutral palette, single amber accent, no visual clutter
- **Editorial typography** — DM Serif Display headings, Lexend body, GeistMono code
- **MDX content** with syntax highlighting (Dracula theme via rehype-pretty-code)
- **Dark / light mode** toggle (defaults to dark, respects system preference)
- **Reading time** on every post
- **Table of contents** — sticky left-column sidebar on post pages (lg+)
- **Tag filtering** on the blog listing page
- **RSS feed** at `/feed.xml`
- **Responsive** — mobile-first, two-column post layout on large screens
- Static generation via `generateStaticParams`

## Technologies

- **Next.js 15** — App Router, static site generation
- **React 19**
- **next-mdx-remote** — MDX compilation via React Server Components
- **gray-matter** — frontmatter parsing
- **next-themes** — dark/light mode
- **DM Serif Display** — editorial display font (Google Fonts)
- **rehype-pretty-code** — syntax highlighting
- **shadcn/ui** — UI primitives
- **Tailwind CSS v3** — utility-first styling

## Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/martincr/next-mdx-blog.git
   cd next-mdx-blog
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**

   ```bash
   pnpm build
   ```

## Adding Blog Posts

Add `.mdx` files to `src/content/blog/`. Use kebab-case filenames (e.g. `my-new-post.mdx`).

Each file requires this frontmatter:

```yaml
---
title: "Post title"
description: "Short description"
image: "/images/blog/my-image.webp"
date: "2024-06-01"
author: "your-name"
tags: ["typescript", "react"]
---
```

- `published: false` hides a post from the listing without deleting it
- `tags` is optional — when present, tag filter buttons appear on the blog page
- `image` path is relative to the `public/` directory
- The slug is derived from the filename: `my-new-post.mdx` → `/blog/my-new-post`

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL used in the RSS feed | `https://example.com` |

## Customisation

Edit `src/config/site.ts` to update your name, description, and social links.

Edit `src/styles/globals.css` to adjust the colour palette (all values are HSL CSS custom properties).
