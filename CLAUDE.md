# CLAUDE.md

Project context for Claude Code.

## Stack

- **Next.js 15** App Router, React 19, TypeScript (strict)
- **Package manager**: pnpm
- **Styling**: Tailwind CSS v3 (class-based dark mode via next-themes, defaults to dark)
- **Content**: MDX files in `src/content/blog/`, parsed with gray-matter, rendered with next-mdx-remote/rsc
- **Themes**: next-themes (defaults to dark, `enableSystem: true`)

## Design system

**Aesthetic**: Luxury Minimal. Warm near-neutral palette + single amber accent. No purple.

**Typography (three-font stack):**
- `font-serif` → DM Serif Display (`--font-serif`) — h1, h2, page titles, blockquotes
- `font-lexend` → Lexend (`--font-lexend`) — all body/UI text (default)
- `font-code` → GeistMonoVF (`--font-code`) — code blocks only

**Display sizes** (defined in `tailwind.config.ts`):
- `text-display-xl` — 5.5rem / lh 1.05
- `text-display-lg` — 4rem / lh 1.1 (used on home hero h1)
- `text-display-md` — 2.75rem / lh 1.15 (used on page headers and post titles)

**Colour palette** (HSL CSS variables in `src/styles/globals.css`):
- Dark bg: `30 5% 6%` — warm near-black, NOT purple
- Amber accent: `--primary: 38 85% 58%` (dark) / `38 75% 45%` (light)
- All borders: `border-border/40` or `border-border/60` — whisper-weight

**Spatial conventions** (used consistently on every page):
- Page container: `mx-auto max-w-screen-xl px-6 lg:px-12`
- Section spacing: `py-16 lg:py-24`
- Body line height: `leading-[1.85]`
- Meta labels: `text-xs uppercase tracking-widest text-muted-foreground`

## Key files

| Path | Purpose |
|---|---|
| `src/lib/posts.ts` | Content layer — `getAllPosts()`, `getPostBySlug()`, `extractHeadings()`, reading time |
| `src/components/mdx-component.tsx` | MDX renderer (RSC) with rehype-slug, rehype-pretty-code (Dracula), rehype-autolink-headings |
| `src/components/blog-list.tsx` | Client component — text-only tag filter + editorial date\|title list |
| `src/components/table-of-contents.tsx` | Borderless TOC, rendered in sticky `<aside>` on post pages |
| `src/components/theme-provider.tsx` | next-themes wrapper (client) |
| `src/components/theme-toggle.tsx` | Sun/moon toggle (client), neutral colours |
| `src/app/feed.xml/route.ts` | RSS feed — reads `NEXT_PUBLIC_SITE_URL` env var |
| `src/config/site.ts` | Site name, description, author, social links (GitHub, LinkedIn, Instagram) |
| `src/constants/index.ts` | Nav links and social icons |
| `src/styles/globals.css` | HSL CSS custom properties for both light/dark modes + page-enter animation |
| `src/styles/mdx.css` | rehype-pretty-code styles + `.subheading-anchor` |

## Content schema

Frontmatter fields for `src/content/blog/*.mdx`:

```ts
title: string          // required
description: string    // required
date: string           // ISO date, required
image?: string         // path under public/
author?: string
tags?: string[]        // enables tag filter UI when present
published?: boolean    // defaults to true
```

Slug is derived from filename: `my-post.mdx` → `/blog/my-post`

## Commands

```bash
pnpm dev       # start dev server on :3000
pnpm build     # production build (runs lint + type check)
pnpm lint      # ESLint
pnpm prettier  # format all files with Prettier
```

## Conventions

- **Page container**: every page uses `mx-auto max-w-screen-xl px-6 lg:px-12` directly — `app.tsx` does NOT add a container to `<main>`
- **`PostMeta`** (= `Post` without `body`) is passed to client components to keep RSC/client boundary payloads small
- **Next.js 15 async params**: always `await params` in page components and `generateMetadata`
- **ESLint config**: uses `eslint-config-standard` + `eslint-plugin-tailwindcss`. No `@typescript-eslint` rules — don't add eslint-disable comments referencing them
- **Tailwind class order**: run `pnpm prettier` to auto-fix `tailwindcss/classnames-order` warnings
- **h3 is NOT serif** — intentional. Typography hierarchy: serif h1/h2 → Lexend-medium h3 → body
- **Amber is for interactive elements only** — links, focus rings, active states. Hover states use `text-foreground`, not `text-primary`
- **No card borders** on blog listing — rows are separated by `border-t border-border/40` only
