import { Plus_Jakarta_Sans, Rethink_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
  adjustFontFallback: false,
})

const rethink = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-rethink',
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'Find Your Ikigai — Daniel Paul',
  description:
    'Discover your purpose, your path, and how to turn it into a business. A free AI-powered Ikigai discovery tool by Daniel Paul.',
  openGraph: {
    title: 'Find Your Ikigai — Daniel Paul',
    description: 'Discover your purpose and how to monetize it. Free tool by Daniel Paul.',
    url: 'https://danielpaul.ai',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${rethink.variable}`}>
      <body className="relative min-h-screen flex flex-col overflow-x-hidden bg-brand-dark text-white">
        {children}
      </body>
    </html>
  )
}
