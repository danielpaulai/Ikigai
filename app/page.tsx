'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Vision from '@/components/Vision'
import HowItWorks from '@/components/HowItWorks'
import Action from '@/components/Action'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-brand-red selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Vision />
        <HowItWorks />
        <Action />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
