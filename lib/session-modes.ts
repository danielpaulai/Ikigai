/**
 * Single source of truth for Quick Session vs Deep Dive — UI, copy, and limits.
 */
export type SessionModeId = 'short' | 'long'

export const SESSION_MODES = {
  short: {
    id: 'short' as const,
    label: 'Quick Session',
    labelShort: 'Quick',
    /** Product language: "short version" */
    versionLabel: 'Short version',
    durationLabel: '15–20 min',
    questionCount: 8,
    bestFor:
      'Live teaching, workshops, or when you want a full Ikigai line and strongest money path without a long sit.',
    youGet: ['Ikigai statement', 'Archetype', 'Primary monetization path', 'PDF'],
  },
  long: {
    id: 'long' as const,
    label: 'Deep Dive',
    labelShort: 'Deep',
    /** Product language: "in-depth version" */
    versionLabel: 'In-depth version',
    durationLabel: '45–60 min',
    questionCount: 18,
    bestFor:
      'When you want the full arc: curiosity, origin story, mission, economics, and identity — before the final gut check.',
    youGet: ['Everything in Quick', 'Richer four-circle copy', 'Three monetization strategies', '90-day first step', 'PDF'],
  },
} as const

export function isSessionModeId(v: unknown): v is SessionModeId {
  return v === 'short' || v === 'long'
}
