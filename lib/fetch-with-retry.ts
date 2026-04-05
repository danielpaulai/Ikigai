/** Client-side retry for crowded API / rate limits — keeps UX smooth without spamming. */

export async function fetchJsonWithRetry<T>(
  input: RequestInfo | URL,
  init: RequestInit,
  options?: { retries?: number; baseMs?: number; retryOn?: number[] }
): Promise<Response> {
  const retries = options?.retries ?? 3
  const baseMs = options?.baseMs ?? 600
  const retryOn = options?.retryOn ?? [429, 503, 502]

  let last: Response | undefined
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(input, init)
    last = res
    if (res.ok || !retryOn.includes(res.status) || attempt === retries) {
      return res
    }
    await new Promise((r) => setTimeout(r, baseMs * Math.pow(2, attempt)))
  }
  return last as Response
}
