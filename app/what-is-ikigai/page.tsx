import type { Metadata } from 'next'
import IkigaiExplainer from '@/components/ikigai/IkigaiExplainer'

const site = 'https://danielpaul.ai'

export const metadata: Metadata = {
  title: 'What is Ikigai? — Daniel Paul',
  description:
    'A short, visual introduction to Ikigai: passion, mission, vocation, and profession — and how they overlap.',
  alternates: {
    canonical: `${site}/what-is-ikigai`,
  },
  openGraph: {
    title: 'What is Ikigai? — Daniel Paul',
    description:
      'Discover the four overlaps of Ikigai — passion, mission, vocation, and profession — in one gentle story.',
    url: `${site}/what-is-ikigai`,
    type: 'website',
  },
}

export default function WhatIsIkigaiPage() {
  return <IkigaiExplainer />
}
