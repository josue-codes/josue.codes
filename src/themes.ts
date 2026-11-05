// Palettes a visitor can pick. Each id matches a [data-palette] block in global.css, which holds its dark and
// light tokens. The first entry and DEFAULT_MODE are what a first visit (or a visit without JavaScript) gets.
export const palettes = [
  { id: 'dimmed', label: 'Dimmed', source: 'Monokai Dimmed' },
  { id: 'monokai', label: 'Monokai', source: 'Monokai' },
  { id: 'cursor', label: 'Cursor Teal', source: 'Cursor Dark and Cursor Light' },
  { id: 'ayu', label: 'Ayu Gold', source: 'Ayu Dark and Ayu Light' },
] as const;

export type PaletteId = (typeof palettes)[number]['id'];

export const DEFAULT_PALETTE: PaletteId = palettes[0].id;
export const DEFAULT_MODE = 'dark' as const;
