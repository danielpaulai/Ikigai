'use client'

import HeroIkigaiDiagram from '@/components/HeroIkigaiDiagram'

export default function Hero() {
  const goAction = () => document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative pt-20 pb-8 md:pt-24 md:pb-12 bg-brand-cream">
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        {/* Compact heading */}
        <div className="text-center mb-6 md:mb-10">
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

        {/* Big diagram */}
        <div className="max-w-md mx-auto mb-8 md:mb-12">
          <HeroIkigaiDiagram />
        </div>

        {/* Brief explainer + CTA */}
        <div className="text-center max-w-lg mx-auto">
          <p className="text-brand-plum/55 text-sm md:text-base leading-relaxed mb-6">
            Ikigai is the Japanese concept for your &ldquo;reason for being&rdquo; — the intersection of
            what you love, what you&apos;re good at, what the world needs, and what you can be paid for.
            This AI coach finds yours in one session.
          </p>

          <button type="button" onClick={goAction} className="btn-primary px-10 py-3.5 text-sm mb-4">
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
