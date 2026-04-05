/**
 * In-memory sliding-window rate limit (per server instance).
 * For multi-region / many instances, use Redis (e.g. Upstash) so limits are global.
 */

type Bucket = { timestamps: number[] }
const store = new Map<string, Bucket>()

function pruneWindow(timestamps: number[], windowMs: number, now: number): number[] {
  return timestamps.filter((t) => now - t < windowMs)
}

export function rateLimitAllow(key: string, max: number, windowMs: number): boolean {
  if (max <= 0) return true

  const now = Date.now()
  const bucket = store.get(key) ?? { timestamps: [] }
  bucket.timestamps = pruneWindow(bucket.timestamps, windowMs, now)

  if (bucket.timestamps.length >= max) {
    store.set(key, bucket)
    return false
  }

  bucket.timestamps.push(now)
  store.set(key, bucket)

  // avoid unbounded memory in long-running processes
  if (store.size > 50_000) {
    const cutoff = now - windowMs
    store.forEach((b, k) => {
      b.timestamps = b.timestamps.filter((t) => t > cutoff)
      if (b.timestamps.length === 0) store.delete(k)
    })
  }

  return true
}

export function isRateLimitEnabled(): boolean {
  return process.env.RATE_LIMIT_ENABLED !== 'false'
}

export function getChatRateLimit(): { max: number; windowMs: number } {
  const max = parseInt(process.env.RATE_LIMIT_CHAT_PER_MINUTE ?? '90', 10)
  return { max, windowMs: 60_000 }
}

export function getGenerateRateLimit(): { max: number; windowMs: number } {
  const max = parseInt(process.env.RATE_LIMIT_GENERATE_PER_MINUTE ?? '15', 10)
  return { max, windowMs: 60_000 }
}
