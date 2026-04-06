/**
 * Fire-and-forget analytics. Never awaited, never blocks UI.
 * Silently drops if the network call fails — analytics should
 * never degrade the user experience.
 */
export function track(event: string, properties?: Record<string, unknown>): void {
  try {
    const payload: Record<string, unknown> = {
      event,
      ...properties,
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      timestamp: Date.now(),
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const utm_source = params.get('utm_source')
      const utm_medium = params.get('utm_medium')
      const utm_campaign = params.get('utm_campaign')
      const utm_content = params.get('utm_content')
      if (utm_source) payload.utm_source = utm_source
      if (utm_medium) payload.utm_medium = utm_medium
      if (utm_campaign) payload.utm_campaign = utm_campaign
      if (utm_content) payload.utm_content = utm_content
    }

    void fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Never throw from analytics
  }
}
