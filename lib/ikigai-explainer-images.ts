/**
 * Unsplash assets verified HTTP 200 on images.unsplash.com (imgix).
 * Many older Unsplash IDs 404 — keep this file as the single source of truth.
 */
const q = 'w=1920&q=85&auto=format&fit=crop'

export type ExplainerImageKey = 'hero' | 'roots' | 'passion' | 'mission' | 'vocation' | 'profession' | 'center'

export const ikigaiExplainerImages: Record<
  ExplainerImageKey,
  { src: string; alt: string }
> = {
  hero: {
    src: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?${q}`,
    alt:
      'Mount Fuji above clouds and forest — Japan’s iconic horizon, a steady point in changing weather',
  },
  roots: {
    src: `https://images.unsplash.com/photo-1522383225653-ed111181a951?${q}`,
    alt:
      'Cherry blossoms along a river in Japan — soft pink light, the season that does not stay',
  },
  passion: {
    src: `https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?${q}`,
    alt:
      'Hands preparing food with care — craft and repetition, a familiar rhythm in Japanese kitchens',
  },
  mission: {
    src: `https://images.unsplash.com/photo-1545569341-9eb8b30979d9?${q}`,
    alt: 'Fushimi Inari torii gates in Kyoto — a path walked one step at a time',
  },
  vocation: {
    src: `https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?${q}`,
    alt:
      'Tokyo at night — neon, motion, and millions of small exchanges of skill and time',
  },
  profession: {
    src: `https://images.unsplash.com/photo-1528360983277-13d401cdc186?${q}`,
    alt: 'Street scene in Japan — signs, rhythm, and the long arc of learning a craft',
  },
  center: {
    src: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${q}`,
    alt:
      'Misty mountain ridges — distance, patience, returning to the same path in new weather',
  },
}
