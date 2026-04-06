import { NextRequest } from 'next/server'
import { createHash } from 'crypto'

export interface GeoData {
  country: string | null
  countryCode: string | null
  region: string | null
  city: string | null
  latitude: number | null
  longitude: number | null
  timezone: string | null
  ipHash: string | null
  deviceType: 'mobile' | 'tablet' | 'desktop'
  browser: string | null
  os: string | null
}

export function extractGeo(req: NextRequest): GeoData {
  const h = (name: string) => req.headers.get(name) || null

  const ip = h('x-forwarded-for')?.split(',')[0]?.trim() || h('x-real-ip')
  const ipHash = ip ? createHash('sha256').update(ip + (process.env.IP_SALT || 'ikigai')).digest('hex').slice(0, 16) : null

  const ua = h('user-agent') || ''
  const deviceType = /Mobile|Android(?!.*Tablet)|iPhone/.test(ua)
    ? 'mobile'
    : /iPad|Tablet|PlayBook/.test(ua)
      ? 'tablet'
      : 'desktop'

  let browser: string | null = null
  if (/Edg\//.test(ua)) browser = 'Edge'
  else if (/Chrome\//.test(ua)) browser = 'Chrome'
  else if (/Firefox\//.test(ua)) browser = 'Firefox'
  else if (/Safari\//.test(ua)) browser = 'Safari'
  else if (ua) browser = 'Other'

  let os: string | null = null
  if (/Windows/.test(ua)) os = 'Windows'
  else if (/Macintosh|Mac OS/.test(ua)) os = 'macOS'
  else if (/iPhone|iPad/.test(ua)) os = 'iOS'
  else if (/Android/.test(ua)) os = 'Android'
  else if (/Linux/.test(ua)) os = 'Linux'

  const lat = h('x-vercel-ip-latitude')
  const lon = h('x-vercel-ip-longitude')

  return {
    country: h('x-vercel-ip-country-region') ? `${h('x-vercel-ip-country')}` : h('x-vercel-ip-country'),
    countryCode: h('x-vercel-ip-country'),
    region: h('x-vercel-ip-country-region'),
    city: h('x-vercel-ip-city'),
    latitude: lat ? parseFloat(lat) : null,
    longitude: lon ? parseFloat(lon) : null,
    timezone: h('x-vercel-ip-timezone'),
    ipHash,
    deviceType,
    browser,
    os,
  }
}
