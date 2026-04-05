import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { RESULTS_GENERATION_PROMPT } from '@/lib/prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { conversationHistory } = await req.json()

    const historyText = conversationHistory
      .map((m: { role: string; content: string }) =>
        `${m.role === 'assistant' ? 'Kai (Coach)' : 'User'}: ${m.content}`
      )
      .join('\n\n')

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2500,
      messages: [
        {
          role: 'user',
          content: `Here is an Ikigai discovery conversation:\n\n${historyText}\n\n${RESULTS_GENERATION_PROMPT}`,
        },
      ],
    })

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '{}'

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const results = JSON.parse(jsonMatch[0])
    return NextResponse.json({ results })
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json({ error: 'Failed to generate results' }, { status: 500 })
  }
}
