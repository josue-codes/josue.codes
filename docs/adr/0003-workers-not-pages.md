# 3. Cloudflare Workers static assets, not Pages

Date: 2026-11-04 · Status: accepted

## Context
Both Cloudflare Pages and Workers can serve a static Astro build. Astro's deployment guide notes that Cloudflare recommends Workers for new projects.

## Decision
Serve `dist/` with Workers static assets (`wrangler.jsonc`, with no Worker script and no Astro adapter), deployed by Workers Builds from this repo.

## Consequences
A static build needs no adapter. A Worker can be added later without changing platforms. One cost: custom domains on Workers need the domain's DNS on Cloudflare, which this domain already uses.
