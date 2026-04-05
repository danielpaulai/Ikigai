/**
 * Chat uses NDJSON streaming from /api/chat for perceived speed.
 * Retries only when no response body has been consumed (429/502/503).
 */

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export async function fetchChatWithRetry(
  input: RequestInfo | URL,
  init: RequestInit,
  options?: { retries?: number; baseMs?: number; retryOn?: number[] }
): Promise<Response> {
  const retries = options?.retries ?? 4
  const baseMs = options?.baseMs ?? 500
  const retryOn = options?.retryOn ?? [429, 502, 503]

  let last: Response | undefined
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(input, init)
    last = res
    if (res.ok || !retryOn.includes(res.status) || attempt === retries) {
      return res
    }
    await delay(baseMs * Math.pow(2, attempt))
  }
  return last as Response
}

type NdjsonLine = { d?: string; done?: boolean; error?: string }

/**
 * Reads NDJSON lines: {"d":"delta"} chunks, optional {"error":"..."}, ends with {"done":true}.
 */
export async function readNdjsonChatStream(
  body: ReadableStream<Uint8Array> | null,
  onDelta: (delta: string) => void
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!body) {
    return { ok: false, error: 'No response body' }
  }
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        let j: NdjsonLine
        try {
          j = JSON.parse(trimmed) as NdjsonLine
        } catch {
          continue
        }
        if (typeof j.error === 'string' && j.error.length > 0) {
          return { ok: false, error: j.error }
        }
        if (typeof j.d === 'string' && j.d.length > 0) {
          onDelta(j.d)
        }
        if (j.done === true) {
          return { ok: true }
        }
      }
      if (done) break
    }
    if (buffer.trim()) {
      try {
        const j = JSON.parse(buffer.trim()) as NdjsonLine
        if (typeof j.error === 'string' && j.error.length > 0) {
          return { ok: false, error: j.error }
        }
        if (typeof j.d === 'string' && j.d.length > 0) {
          onDelta(j.d)
        }
        if (j.done === true) {
          return { ok: true }
        }
      } catch {
        /* ignore trailing garbage */
      }
    }
    return { ok: true }
  } finally {
    reader.releaseLock()
  }
}
