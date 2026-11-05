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

export const collections = { work };
