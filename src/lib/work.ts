import { getCollection } from 'astro:content';

/** Published case studies, newest first. Drafts never reach listings or routes. */
export async function getPublishedWork() {
  const entries = await getCollection('work', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
