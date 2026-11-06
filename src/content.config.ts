import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    outcome: z.string().min(1),
    date: z.coerce.date(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    draft: z.boolean().default(false),
  }),
});

// Legal pages (privacy, terms, cookies, accessibility). The file name is the URL: privacy.md -> /privacy/.
// The TL;DR lines render as a summary box above the full text.
const legal = defineCollection({
  loader: glob({ base: './src/content/legal', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    tldr: z.array(z.string()).min(1),
  }),
});

export const collections = { work, legal };
