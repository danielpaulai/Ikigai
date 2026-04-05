import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let redisSingleton: Redis | null = null
let chatLimiter: Ratelimit | null = null
let generateLimiter: Ratelimit | null = null

export function hasUpstashRedis(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

function getRedis(): Redis {
  if (!redisSingleton) {
    redisSingleton = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return redisSingleton
}

export async function upstashAllowChat(ip: string): Promise<boolean> {
  if (!hasUpstashRedis()) return true
  if (!chatLimiter) {
    const n = parseInt(process.env.RATE_LIMIT_CHAT_PER_MINUTE ?? '90', 10)
    chatLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(n, '60 s'),
      prefix: 'ikigai:chat',
    })
  }
  const { success } = await chatLimiter.limit(ip)
  return success
}

export async function upstashAllowGenerate(ip: string): Promise<boolean> {
  if (!hasUpstashRedis()) return true
  if (!generateLimiter) {
    const n = parseInt(process.env.RATE_LIMIT_GENERATE_PER_MINUTE ?? '15', 10)
    generateLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(n, '60 s'),
      prefix: 'ikigai:generate',
    })
  }
  const { success } = await generateLimiter.limit(ip)
  return success
}
