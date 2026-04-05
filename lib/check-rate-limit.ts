import type { NextRequest } from 'next/server'
import { getClientIp } from '@/lib/get-client-ip'
import {
  getChatRateLimit,
  getGenerateRateLimit,
  isRateLimitEnabled,
  rateLimitAllow,
} from '@/lib/rate-limit'
import { upstashAllowChat, upstashAllowGenerate, hasUpstashRedis } from '@/lib/rate-limit-upstash'

/** Returns true if request should be blocked (429). */
export async function isRateLimited(req: NextRequest, kind: 'chat' | 'generate'): Promise<boolean> {
  if (!isRateLimitEnabled()) return false

  const ip = getClientIp(req)

  if (hasUpstashRedis()) {
    const ok = kind === 'chat' ? await upstashAllowChat(ip) : await upstashAllowGenerate(ip)
    return !ok
  }

  const { max, windowMs } = kind === 'chat' ? getChatRateLimit() : getGenerateRateLimit()
  return !rateLimitAllow(`${kind}:${ip}`, max, windowMs)
}
