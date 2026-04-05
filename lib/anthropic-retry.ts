import type Anthropic from '@anthropic-ai/sdk'
import type { Message, MessageCreateParamsNonStreaming } from '@anthropic-ai/sdk/resources/messages'

function getErrorStatus(err: unknown): number | undefined {
  if (err && typeof err === 'object' && 'status' in err) {
    const s = (err as { status?: number }).status
    return typeof s === 'number' ? s : undefined
  }
  return undefined
}

/**
 * Retries on rate limit / overloaded / transient server errors (429, 529, 503, 500).
 */
export async function createMessageWithRetry(
  anthropic: Anthropic,
  params: MessageCreateParamsNonStreaming,
  options?: { maxRetries?: number; baseDelayMs?: number }
): Promise<Message> {
  const maxRetries = options?.maxRetries ?? 4
  const baseDelayMs = options?.baseDelayMs ?? 400
  let lastError: unknown

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await anthropic.messages.create(params)
    } catch (e) {
      lastError = e
      const status = getErrorStatus(e)
      const retryable = status === 429 || status === 529 || status === 503 || status === 500
      if (!retryable || attempt === maxRetries - 1) {
        throw e
      }
      const delay = baseDelayMs * Math.pow(2, attempt)
      await new Promise((r) => setTimeout(r, delay))
    }
  }

  throw lastError
}
