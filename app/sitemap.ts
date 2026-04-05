import type { MetadataRoute } from 'next'

const site = 'https://danielpaul.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: site,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
