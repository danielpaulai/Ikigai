import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { getCoachSystemPrompt } from '@/lib/prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, mode } = await req.json()

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 300,
      system: getCoachSystemPrompt(mode),
      messages,
    })

    const text =
      response.content[0].type === 'text'
        ? response.content[0].text
        : 'Thank you for sharing that. Let me ask you something else...'

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to get response',
        message: 'Something went wrong. Your answers are safe — please try again.',
      },
      { status: 500 }
    )
  }
}
