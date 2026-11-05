# josue.codes

Source for my portfolio site: a few case studies, each built around a measured before-and-after.

It's a static [Astro](https://astro.build) site served from Cloudflare Workers static assets. There's no server code, no database and no CMS. Each case study is a Markdown file.

## How it's put together

| Path | What it holds |
|---|---|
| `src/content/work/` | One Markdown file per case study. The schema is in `src/content.config.ts`. |
| `src/site.ts` | Name, positioning line, contact links and the optional `photo` path. These live in one place. |
| `src/components/` | `Mark` (the monogram), `Portrait` (photo, or the monogram tile until there is one) and `WorkCard` (a case study entry). |
| `public/fonts/` | Source Serif 4 (OFL), the one self-hosted font. Everything else uses the system font stack. |
| `src/pages/` | Home, work list, `/work/[id]`, about and 404. |
| `wrangler.jsonc` | Workers config: serves `dist/`, and unknown paths get the custom 404. |
| `docs/adr/` | Short records of the main decisions and why they were made. |

**Themes:** visitors pick one of four palettes (Dimmed, Monokai, Cursor Teal, Ayu Gold), each derived from a code-editor theme, and switch light or dark separately. The default is Dimmed in dark mode, set on `<html>` so it also works without JavaScript. The choice is saved in `localStorage` and applied by a small script in `<head>` before first paint. The palette list is `src/themes.ts`; the tokens for each palette and mode are at the top of `src/styles/global.css`.

**The photo:** `src/assets/portrait.jpg` is a square (800×800) shown as a circle in the header and on the About page. It lives in `src/` rather than `public/` so Astro's `<Image>` can resize it at build time to small WebP files at 1x and 2x. To replace it, drop in another square of at least 800px at the same path; set `photo` to `undefined` in `src/site.ts` to show the monogram instead.

**Writing a case study:** add a Markdown file to `src/content/work/`. Frontmatter needs `title`, `summary`, `role` and `outcome`. Set `draft: true` to keep it out of every listing and route. If the file ends with a `## Glossary` list (`- **Term:** definition`), the first use of each term in the body becomes a tooltip that works with tap, keyboard focus or hover. Without JavaScript, readers still see the glossary at the end.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Build the static site to `dist/` |
| `npm run cf:dev` | Build, then serve through the Workers runtime (`wrangler dev`) |
| `npm run cf:check` | Build, then `wrangler deploy --dry-run` |

Node is pinned in `.nvmrc`.

## Deploys

Cloudflare Workers Builds deploys on every push to `main`: build `npx astro build`, deploy `npx wrangler deploy`. Other branches get preview URLs. No deploy credentials live in this repo.
