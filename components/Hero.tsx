'use client'

import HeroIkigaiDiagram from '@/components/HeroIkigaiDiagram'

export default function Hero() {
  const goAction = () => document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative pt-20 pb-6 md:pt-24 md:pb-10 bg-brand-cream">
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div className="text-center mb-6">
          <p className="text-brand-pink-2 text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
            By Daniel Paul · Purely Personal
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-brand-plum leading-[1.1] mb-2">
            Find Your Ikigai.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-brand-pink-2 leading-tight">
            Your purpose. Your path. Your profit.
          </p>
        </div>

        <HeroIkigaiDiagram />

        <div className="text-center mt-8">
          <button type="button" onClick={goAction} className="btn-primary px-10 py-3.5 text-sm mb-3">
            Start Your Session
          </button>
          <p className="text-brand-plum/35 text-xs">
            Free · Private · No sign-up · 15–60 min
          </p>
        </div>
      </div>
    </section>
  )
}
