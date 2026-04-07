/**
 * Model outputs often include markdown fences, preamble, or prose around JSON.
 * A greedy /\{[\s\S]*\}/ match breaks when there are multiple objects or braces inside strings.
 */

export function stripMarkdownCodeFence(text: string): string {
  let t = text.trim()
  const fullFence = /^```(?:json)?\s*([\s\S]*?)\s*```$/m.exec(t)
  if (fullFence) return fullFence[1].trim()

  const innerFence = /```(?:json)?\s*([\s\S]*?)\s*```/.exec(t)
  if (innerFence) {
    const inner = innerFence[1].trim()
    if (inner.startsWith('{')) return inner
  }
  return t
}

/**
 * Extract the first complete top-level JSON object using brace depth, respecting string escapes.
 */
export function extractBalancedJsonObject(text: string): string | null {
  const t = stripMarkdownCodeFence(text)
  const start = t.indexOf('{')
  if (start === -1) return null

  let depth = 0
  let inString = false
  let escape = false

  for (let i = start; i < t.length; i++) {
    const c = t[i]
    if (inString) {
      if (escape) {
        escape = false
      } else if (c === '\\') {
        escape = true
      } else if (c === '"') {
        inString = false
      }
    } else {
      if (c === '"') {
        inString = true
      } else if (c === '{') {
        depth++
      } else if (c === '}') {
        depth--
        if (depth === 0) {
          return t.slice(start, i + 1)
        }
      }
    }
  }
  return null
}

/**
 * Models sometimes emit trailing commas before } or ].
 */
export function tryParseJsonLenient(raw: string): unknown | null {
  let s = raw.trim()
  for (let pass = 0; pass < 5; pass++) {
    try {
      return JSON.parse(s)
    } catch {
      const next = s.replace(/,(\s*[}\]])/g, '$1')
      if (next === s) break
      s = next
    }
  }
  return null
}

export function parseJsonFromModelText(text: string): unknown | null {
  const stripped = stripMarkdownCodeFence(text)
  const direct = tryParseJsonLenient(stripped)
  if (direct !== null) return direct

  const candidates: string[] = []
  const balanced = extractBalancedJsonObject(text)
  if (balanced) candidates.push(balanced)

  const balancedStripped = extractBalancedJsonObject(stripped)
  if (balancedStripped && balancedStripped !== balanced) candidates.push(balancedStripped)

  const greedy = stripped.match(/\{[\s\S]*\}/)
  if (greedy) {
    if (!candidates.includes(greedy[0])) candidates.push(greedy[0])
  }

  for (const c of candidates) {
    const parsed = tryParseJsonLenient(c)
    if (parsed !== null) return parsed
  }
  return null
}
