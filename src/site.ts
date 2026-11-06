import type { ImageMetadata } from 'astro';
import portrait from './assets/portrait.jpg';

// Single home for identity and contact details. Personal channels only, never an employer address.
export const site = {
  name: 'Joshua Andujar',
  // The name most people use.
  aka: 'Josue',
  // How the name appears in headings and page titles.
  displayName: 'Joshua (Josue) Andujar',
  // Short role line used as the eyebrow on the home page.
  role: 'Leader & Engineer',
  positioning:
    'I help teams agree on what the problem really is, then write the code that makes the fix last.',
  email: 'josue@josue.codes',
  // Shown only on the legal pages, as a second way to reach me.
  phone: '+1 (407) 902-9897',
  phoneHref: 'tel:+14079029897',
  linkedin: 'https://www.linkedin.com/in/jandujar1/',
  github: 'https://github.com/josue-codes',
  // This site's own repository, linked as "Source" in the header and footer.
  source: 'https://github.com/josue-codes/josue.codes',
  // Square portrait in src/assets/ (so Astro can resize it), shown as a circle. Set to undefined to fall back to
  // the monogram.
  photo: portrait as ImageMetadata | undefined,
  // Set when the owner supplies them; the pages hide these until then (no placeholders on the live site).
  resumeUrl: undefined as string | undefined,
  openTo: undefined as string | undefined,
};

/** Initials for the monogram, derived from the name ("Joshua Andujar" -> "JA"). */
export const initials = site.name
  .split(/\s+/)
  .map((part) => part[0] ?? '')
  .join('')
  .toUpperCase();
