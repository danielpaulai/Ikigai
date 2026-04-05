'use client'

import { Lock, Mic, FileText } from 'lucide-react'
import HeroIkigaiDiagram from '@/components/HeroIkigaiDiagram'

export default function Hero() {
  const goAction = () => document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })
  const goCta = () => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen pt-28 md:pt-36 pb-20 overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full bg-brand-pink/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(45,27,34,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45,27,34,0.4) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-brand-pink-2 text-[11px] font-bold uppercase tracking-[0.35em] mb-6">
              By Daniel Paul · Purely Personal
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-serif italic text-brand-plum leading-[1.05] mb-4">
              Find Your Ikigai.
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-brand-pink-2 leading-tight mb-8">
              Your purpose. Your path. Your profit.
            </p>

            <p className="text-brand-plum/65 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              Most people feel stuck between what they love and what pays. Your Ikigai is the intersection. This free tool
              finds it in one focused session.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <button type="button" onClick={goAction} className="btn-primary px-8 py-3.5 text-sm">
                Start the Quick Session — 15 min
              </button>
              <button
                type="button"
                onClick={goAction}
                className="px-8 py-3.5 text-sm rounded-full border-2 border-brand-plum/20 text-brand-plum hover:bg-brand-pink/10 transition-colors font-medium"
              >
                Take the Deep Dive — 45 min
              </button>
            </div>

            <p className="text-brand-plum/45 text-sm mb-8">Used by 1,000+ founders. No account needed.</p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-brand-plum/50 text-xs font-medium uppercase tracking-wider">
              <span className="inline-flex items-center gap-2">
                <Lock size={14} className="text-brand-pink-2" strokeWidth={2} />
                Private
              </span>
              <span className="inline-flex items-center gap-2">
                <Mic size={14} className="text-brand-pink-2" strokeWidth={2} />
                Voice input
              </span>
              <span className="inline-flex items-center gap-2">
                <FileText size={14} className="text-brand-pink-2" strokeWidth={2} />
                PDF report
              </span>
            </div>

            <button
              type="button"
              onClick={goCta}
              className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-brand-plum/40 hover:text-brand-pink-2 transition-colors block mx-auto lg:mx-0"
            >
              Newsletter & weekly systems →
            </button>
          </div>

          <div className="flex justify-center lg:justify-end pt-4">
            <HeroIkigaiDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
