import { NextResponse } from 'next/server'
import { ANTHROPIC_MODEL_CHAT, ANTHROPIC_MODEL_GENERATE } from '@/lib/anthropic-models'
import { hasUpstashRedis } from '@/lib/rate-limit-upstash'
import { isRateLimitEnabled } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

/**
 * Liveness / config surface for probes (no secrets).
 */
export async function GET() {
  const hasKey = Boolean(process.env.ANTHROPIC_API_KEY)

  return NextResponse.json({
    ok: hasKey,
    anthropic: hasKey ? 'configured' : 'missing_api_key',
    models: {
      chat: ANTHROPIC_MODEL_CHAT,
      generate: ANTHROPIC_MODEL_GENERATE,
    },
    rateLimit: isRateLimitEnabled() ? 'on' : 'off',
    rateLimitBackend: hasUpstashRedis() ? 'upstash' : 'memory',
    timestamp: new Date().toISOString(),
  })
}
