import type { IkigaiResults } from '@/lib/types'

export function isValidIkigaiResults(data: unknown): data is IkigaiResults {
  if (!data || typeof data !== 'object') return false
  const o = data as Record<string, unknown>

  if (typeof o.ikigaiStatement !== 'string' || !o.ikigaiStatement.trim()) return false
  if (typeof o.ninetyDayStep !== 'string' || !o.ninetyDayStep.trim()) return false
  if (typeof o.closingMessage !== 'string') return false

  const arch = o.archetype
  if (!arch || typeof arch !== 'object') return false
  const a = arch as Record<string, unknown>
  if (typeof a.name !== 'string' || typeof a.tagline !== 'string' || typeof a.description !== 'string')
    return false
  if (!Array.isArray(a.strengths) || a.strengths.length < 1) return false
  for (const s of a.strengths) {
    if (typeof s !== 'string' || !s.trim()) return false
  }
  if (typeof a.watchOut !== 'string') return false

  const ck = o.circleKeywords
  if (ck && typeof ck === 'object') {
    const k = ck as Record<string, unknown>
    for (const key of ['love', 'skills', 'world', 'money']) {
      if (!Array.isArray(k[key])) return false
      for (const item of k[key] as unknown[]) {
        if (typeof item !== 'string') return false
      }
    }
  }

  const ci = o.circleInsights
  if (!ci || typeof ci !== 'object') return false
  const c = ci as Record<string, unknown>
  if (
    typeof c.love !== 'string' ||
    typeof c.skills !== 'string' ||
    typeof c.mission !== 'string' ||
    typeof c.profession !== 'string'
  ) {
    return false
  }

  if (!Array.isArray(o.monetizationStrategies) || o.monetizationStrategies.length < 1) return false
  for (const s of o.monetizationStrategies) {
    if (!s || typeof s !== 'object') return false
    const m = s as Record<string, unknown>
    if (
      typeof m.title !== 'string' ||
      typeof m.description !== 'string' ||
      typeof m.firstOffer !== 'string' ||
      typeof m.timeToRevenue !== 'string' ||
      typeof m.incomeRange !== 'string'
    ) {
      return false
    }
  }

  if (Array.isArray(o.actionSteps)) {
    for (const step of o.actionSteps) {
      if (!step || typeof step !== 'object') return false
      const st = step as Record<string, unknown>
      if (typeof st.title !== 'string' || typeof st.description !== 'string' || typeof st.timeframe !== 'string')
        return false
    }
  }

  if (o.personalQuote !== undefined && typeof o.personalQuote !== 'string') return false

  return true
}
