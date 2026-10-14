export type FilmStyle = {
  id: string
  name: string
  tagline: string
  tags: string[]
  accent: string
  accentSoft: string
  previewMode: PreviewMode
  defaultRhythm: string
  defaultReference: string
}

export type PreviewMode =
  | 'ascii-crt'
  | 'hologram-hud'
  | 'pixel-rpg'
  | 'swiss-motion'
  | 'rubber-hose'
  | 'ink-wash'
  | 'lowpoly-island'
  | 'spy-titles'

export const STYLES: FilmStyle[] = [
  {
    id: 'ascii-crt',
    name: 'ASCII / CRT',
    tagline: 'Phosphor glyphs on a curved monochrome tube.',
    tags: ['terminal', 'grid', 'amber'],
    accent: '#ffb000',
    accentSoft: '#2a1f0a',
    previewMode: 'ascii-crt',
    defaultRhythm: 'Cold pulse; typed beats; one warm surprise after silence.',
    defaultReference: '1970s monochrome terminals; early-80s synth drones (grammar only).',
  },
  {
    id: 'hologram-hud',
    name: 'Hologram HUD',
    tagline: 'Wireframe scan, target locks, rolling telemetry.',
    tags: ['sci-fi', 'wireframe', 'HUD'],
    accent: '#5dffc8',
    accentSoft: '#0a1f1a',
    previewMode: 'hologram-hud',
    defaultRhythm: 'Scan → lock → explode parts; numbers settle on brass-like ticks.',
    defaultReference: 'Iron Man–era HUD grammar; CAD exploded views (no assets copied).',
  },
  {
    id: 'pixel-rpg',
    name: '16-bit Pixel RPG',
    tagline: '320×180 indexed world; dialogue boxes as drama.',
    tags: ['pixel', 'palette', 'RPG'],
    accent: '#7ec8ff',
    accentSoft: '#12182a',
    previewMode: 'pixel-rpg',
    defaultRhythm: 'Walk cycle → dialog type → fanfare; palette depth as time.',
    defaultReference: 'Mid-90s console RPG UI grammar; ENDESGA-like palettes.',
  },
  {
    id: 'swiss-motion',
    name: 'Swiss Motion',
    tagline: 'Grid, type blocks, and snaps that feel designed.',
    tags: ['grid', 'type', 'modern'],
    accent: '#e11d48',
    accentSoft: '#f8f5f0',
    previewMode: 'swiss-motion',
    defaultRhythm: 'Hard cuts on the grid; hold one long breath, then snap.',
    defaultReference: 'International Typographic Style motion; Muller-Brockmann energy.',
  },
  {
    id: 'rubber-hose',
    name: 'Rubber Hose',
    tagline: 'Bouncy limbs, squash & stretch, looping gags.',
    tags: ['cartoon', 'loop', '1920s'],
    accent: '#f59e0b',
    accentSoft: '#1a1208',
    previewMode: 'rubber-hose',
    defaultRhythm: 'Gag every 2s; stretch into the turn; settle on a pose.',
    defaultReference: '1920s rubber-hose cartoons (grammar only; no characters).',
  },
  {
    id: 'ink-wash',
    name: 'Ink Wash',
    tagline: 'Wet blooms, flying white, and generous empty paper.',
    tags: ['ink', 'brush', 'east-asian'],
    accent: '#1f1f1f',
    accentSoft: '#f2ecde',
    previewMode: 'ink-wash',
    defaultRhythm: 'Slow bleed → sudden dry stroke → silence on blank paper.',
    defaultReference: 'Chinese ink painting grammar; 留白 as pacing.',
  },
  {
    id: 'lowpoly-island',
    name: 'Low-poly Island',
    tagline: 'Faceted isometric tiles that bounce into place.',
    tags: ['3D', 'isometric', 'pastel'],
    accent: '#67e8f9',
    accentSoft: '#0f172a',
    previewMode: 'lowpoly-island',
    defaultRhythm: 'Each tile lands with a note; sun arc changes the palette.',
    defaultReference: 'Townscaper / Monument Valley grammar (no assets).',
  },
  {
    id: 'spy-titles',
    name: '60s Spy Titles',
    tagline: 'Cut-paper silhouettes chasing through the credits.',
    tags: ['titles', 'silhouette', 'Saul Bass'],
    accent: '#dc2626',
    accentSoft: '#f5e6c8',
    previewMode: 'spy-titles',
    defaultRhythm: 'Brass stab = cut; chase → reveal title from pieces.',
    defaultReference: 'Saul Bass title grammar; Catch Me If You Can homage energy.',
  },
]

export function getStyle(id: string): FilmStyle {
  return STYLES.find((s) => s.id === id) ?? STYLES[0]
}
