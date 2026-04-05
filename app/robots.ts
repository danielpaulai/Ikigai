import type { MetadataRoute } from 'next'

const site = 'https://danielpaul.ai'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  }
}
