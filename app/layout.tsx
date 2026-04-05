import { Playfair_Display, Roboto_Flex } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['italic', 'normal'],
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: false,
})

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-roboto-flex',
  display: 'swap',
  adjustFontFallback: false,
})

const site = 'https://danielpaul.ai'
const title = 'Find Your Ikigai — Daniel Paul'
const description =
  'Discover your purpose, your path, and how to turn it into a business. A free AI-powered Ikigai discovery tool by Daniel Paul.'

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  keywords: [
    'Ikigai',
    'Daniel Paul',
    'purpose',
    'founders',
    'AI coach',
    'Purely Personal',
    'monetization',
  ],
  authors: [{ name: 'Daniel Paul', url: site }],
  alternates: {
    canonical: site,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Daniel Paul',
    title,
    description: 'Discover your purpose and how to monetize it. Free tool by Daniel Paul.',
    url: site,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Find Your Ikigai — Daniel Paul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Discover your purpose and how to monetize it. Free tool by Daniel Paul.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${robotoFlex.variable}`}>
      <body className="relative min-h-screen flex flex-col overflow-x-hidden bg-brand-cream text-brand-plum font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
