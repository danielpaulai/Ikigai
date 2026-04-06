import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-server'
import { extractGeo } from '@/lib/geo'

export async function POST(req: NextRequest) {
  const db = getSupabaseAdmin()
  if (!db) {
    return NextResponse.json({ ok: true })
  }

  try {
    const body = await req.json()
    const { event, sessionId, ...rest } = body as {
      event?: string
      sessionId?: string
      [key: string]: unknown
    }

    if (!event || typeof event !== 'string') {
      return NextResponse.json({ ok: true })
    }

    const geo = extractGeo(req)

    switch (event) {
      case 'session_start': {
        const { mode, screenWidth, referrer, utm_source, utm_medium, utm_campaign, utm_content } = rest
        if (!sessionId) break

        await db.from('sessions').upsert({
          id: sessionId,
          mode: mode === 'long' ? 'long' : 'short',
          status: 'active',
          started_at: new Date().toISOString(),
          country: geo.country,
          country_code: geo.countryCode,
          region: geo.region,
          city: geo.city,
          latitude: geo.latitude,
          longitude: geo.longitude,
          timezone: geo.timezone,
          device_type: geo.deviceType,
          browser: geo.browser,
          os: geo.os,
          screen_width: typeof screenWidth === 'number' ? screenWidth : null,
          referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : null,
          utm_source: typeof utm_source === 'string' ? utm_source : null,
          utm_medium: typeof utm_medium === 'string' ? utm_medium : null,
          utm_campaign: typeof utm_campaign === 'string' ? utm_campaign : null,
          utm_content: typeof utm_content === 'string' ? utm_content : null,
          ip_hash: geo.ipHash,
        }, { onConflict: 'id' })

        break
      }

      case 'session_complete': {
        if (!sessionId) break
        const { messages, results, mode, durationMs } = rest as {
          messages?: Array<{ role: string; content: string; circle?: string; circleLabel?: string }>
          results?: Record<string, unknown>
          mode?: string
          durationMs?: number
        }

        await db.from('sessions').update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          duration_ms: typeof durationMs === 'number' ? durationMs : null,
          question_count: Array.isArray(messages)
            ? messages.filter((m) => m.role === 'user').length
            : null,
        }).eq('id', sessionId)

        if (Array.isArray(messages) && messages.length > 0) {
          const rows = messages.map((m, i) => ({
            session_id: sessionId,
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content?.slice(0, 5000) || '',
            circle: m.circle || null,
            circle_label: m.circleLabel || null,
            message_index: i,
          }))
          await db.from('session_messages').insert(rows)
        }

        if (results && typeof results === 'object') {
          const r = results as {
            archetype?: { name?: string }
            ikigaiStatement?: string
          }
          await db.from('session_results').upsert({
            session_id: sessionId,
            results,
            archetype_name: r.archetype?.name || null,
            ikigai_statement: typeof r.ikigaiStatement === 'string'
              ? r.ikigaiStatement.slice(0, 1000)
              : null,
          }, { onConflict: 'session_id' })
        }

        break
      }

      case 'circle_complete':
      case 'pdf_download':
      case 'share_link':
      case 'session_resume':
      case 'session_reset':
      case 'session_save':
      case 'mode_view':
      default: {
        const properties: Record<string, unknown> = { ...rest }
        delete properties.timestamp
        delete properties.url

        if (geo.countryCode) properties.country_code = geo.countryCode
        if (geo.deviceType) properties.device_type = geo.deviceType

        await db.from('analytics_events').insert({
          session_id: sessionId || null,
          event,
          properties,
        })
        break
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[analytics]', err)
    return NextResponse.json({ ok: true })
  }
}
