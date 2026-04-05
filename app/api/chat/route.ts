import Anthropic from '@anthropic-ai/sdk'
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { NextRequest, NextResponse } from 'next/server'
import { ANTHROPIC_MODEL_CHAT } from '@/lib/anthropic-models'
import { isRateLimited } from '@/lib/check-rate-limit'
import { getCoachSystemPrompt } from '@/lib/prompts'

export const maxDuration = 60

let _anthropic: Anthropic | null = null
function getAnthropicClient(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
  }
  return _anthropic
}

/**
 * NDJSON stream: lines of {"d":"token"} … then {"done":true}.
 * On failure mid-stream: {"error":"…"} then {"done":true}.
 */
export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'Server misconfigured', message: 'Anthropic API key is not set.' },
      { status: 500 }
    )
  }

  if (await isRateLimited(req, 'chat')) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: 'High traffic — try again in a few seconds.',
      },
      { status: 429 }
    )
  }

  let messages: MessageParam[]
  let coachMode: 'short' | 'long' = 'short'
  try {
    const body = await req.json()
    messages = body.messages
    coachMode = body.mode === 'long' ? 'long' : 'short'
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid body', message: 'Missing messages.' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON', message: 'Could not read request.' }, { status: 400 })
  }

  const anthropic = getAnthropicClient()
  const encoder = new TextEncoder()

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const push = (obj: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`))
      }

      let ms
      try {
        ms = anthropic.messages.stream({
          model: ANTHROPIC_MODEL_CHAT,
          max_tokens: 420,
          system: getCoachSystemPrompt(coachMode),
          messages: messages as MessageParam[],
        })
      } catch (err) {
        console.error('Chat stream init error:', err)
        const msg = err instanceof Error ? err.message : 'Failed to start response'
        push({ error: msg })
        push({ done: true })
        controller.close()
        return
      }

      try {
        ms.on('text', (delta) => {
          if (delta) push({ d: delta })
        })
        await ms.finalText()
        push({ done: true })
      } catch (err) {
        console.error('Chat stream error:', err)
        const msg = err instanceof Error ? err.message : 'Stream failed'
        push({ error: msg })
        push({ done: true })
      } finally {
        try {
          controller.close()
        } catch {
          /* already closed */
        }
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
