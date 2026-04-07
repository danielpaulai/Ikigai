import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { ANTHROPIC_MODEL_GENERATE } from '@/lib/anthropic-models'
import { createMessageWithRetry } from '@/lib/anthropic-retry'
import { isRateLimited } from '@/lib/check-rate-limit'
import { getResultsGenerationPrompt } from '@/lib/prompts'
import { isSessionModeId } from '@/lib/session-modes'
import { parseJsonFromModelText } from '@/lib/extract-json-from-model-text'
import { isValidIkigaiResults } from '@/lib/validate-ikigai-results'

export const maxDuration = 120

function getAnthropicClient(): Anthropic {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'Server misconfigured', message: 'Anthropic API key is not set.' },
      { status: 500 }
    )
  }

  if (await isRateLimited(req, 'generate')) {
    return NextResponse.json(
      { error: 'Too many requests', message: 'High traffic — try again in a few seconds.' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()
    const { conversationHistory, mode: rawMode } = body
    const mode = isSessionModeId(rawMode) ? rawMode : 'short'

    if (!Array.isArray(conversationHistory) || conversationHistory.length === 0) {
      return NextResponse.json(
        { error: 'Bad request', message: 'Missing conversation history.' },
        { status: 400 }
      )
    }

    const historyText = conversationHistory
      .map((m: { role: string; content: string }) =>
        `${m.role === 'assistant' ? 'Kai (Coach)' : 'User'}: ${m.content}`
      )
      .join('\n\n')

    const resultsPrompt = getResultsGenerationPrompt(mode)
    const outputDiscipline = `
FINAL OUTPUT (non-negotiable): Your entire reply must be ONLY one JSON object. The first character must be "{" and the last must be "}". No markdown, no code fences, no preamble, no commentary after the JSON.`

    const anthropic = getAnthropicClient()
    const userContent = `Session mode: ${mode === 'long' ? 'Deep Dive (in-depth)' : 'Quick Session (short)'}.\n\nHere is an Ikigai discovery conversation:\n\n${historyText}\n\n${resultsPrompt}${outputDiscipline}`

    const maxOut = mode === 'long' ? 6400 : 5200

    const response = await createMessageWithRetry(
      anthropic,
      {
        model: ANTHROPIC_MODEL_GENERATE,
        max_tokens: maxOut,
        messages: [
          {
            role: 'user',
            content: userContent,
          },
        ],
      },
      { maxRetries: 3, baseDelayMs: 600 }
    )

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '{}'

    let parsed: unknown | null = parseJsonFromModelText(text)

    if (parsed === null) {
      const snippet = text.length > 22000 ? `${text.slice(0, 22000)}\n...[truncated]` : text
      const repair = await createMessageWithRetry(
        anthropic,
        {
          model: ANTHROPIC_MODEL_GENERATE,
          max_tokens: maxOut,
          messages: [
            {
              role: 'user',
              content: `You must fix the following text into ONE valid JSON object only. Rules:
- Preserve as much of the original field values and wording as you can.
- Remove markdown code fences if present.
- Fix any JSON syntax errors (commas, quotes, trailing commas).
- If the JSON was cut off, complete missing closing brackets and strings using sensible minimal fixes so the object parses.
- Reply with ONLY the JSON. First character "{", last character "}".

Broken output:
${snippet}`,
            },
          ],
        },
        { maxRetries: 2, baseDelayMs: 700 }
      )
      const repairText =
        repair.content[0].type === 'text' ? repair.content[0].text : '{}'
      parsed = parseJsonFromModelText(repairText)
    }

    if (parsed === null) {
      return NextResponse.json(
        {
          error: 'Parse error',
          message: 'Could not read the profile JSON. Try again.',
        },
        { status: 422 }
      )
    }

    if (!isValidIkigaiResults(parsed)) {
      return NextResponse.json(
        {
          error: 'Invalid profile',
          message: 'The profile came back incomplete. Try again in a moment.',
        },
        { status: 422 }
      )
    }

    return NextResponse.json({ results: parsed })
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate results',
        message: 'Something went wrong building your profile. Your answers are safe — try again.',
      },
      { status: 500 }
    )
  }
}
