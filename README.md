# Sazzzid — Portfolio

Personal portfolio site for [Sazzzid](https://imsazzid.world): selected work, case studies, about, and contact.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, and Lenis smooth scroll. Project case studies are authored as MDX in `content/projects/`.

## Stack

- **Framework:** Next.js 16, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui (Button, Sheet)
- **Content:** gray-matter + next-mdx-remote (RSC)
- **Motion:** Framer Motion, Lenis
- **Syntax highlighting:** Shiki

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run check` | Lint, typecheck, and production build |

## Content

- **Projects:** add MDX files to `content/projects/` (see `_template.mdx`)
- **Blog:** add MDX files to `content/blog/` — routes, nav, sitemap, and RSS appear automatically when at least one post exists (hidden until then)

## Configuration

Site-wide settings live in `src/config/`:

- `site.ts` — name, URL, social links, author
- `profile.ts` — experience, skills, availability
- `contact.ts` — contact methods
- `navigation.ts` — nav items and homepage sections

## Deploy

Deploy to any Node-compatible host (e.g. Vercel). Set no extra env vars for a static content setup.
