# josue.codes

Source for my portfolio site: a few case studies, each built around a measured before-and-after.

It's a static [Astro](https://astro.build) site served from Cloudflare Workers static assets. There's no server code, no database and no CMS. Each case study is a Markdown file.

## How it's put together

| Path | What it holds |
|---|---|
| `src/content/work/` | One Markdown file per case study. The schema is in `src/content.config.ts`. |
| `src/site.ts` | Name, positioning line and contact links. These live in one place. |
| `src/pages/` | Home, work list, `/work/[id]`, about and 404. |
| `wrangler.jsonc` | Workers config: serves `dist/`, and unknown paths get the custom 404. |
| `docs/adr/` | Short records of the main decisions and why they were made. |

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
