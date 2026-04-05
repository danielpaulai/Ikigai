'use client'

import { motion } from 'framer-motion'

const circles = [
  { cx: 100, cy: 110, r: 85, fill: '#e90d41', delay: 0 },
  { cx: 180, cy: 110, r: 85, fill: '#b8bec1', delay: 0.4 },
  { cx: 140, cy: 60, r: 85, fill: '#ffffff', delay: 0.8 },
  { cx: 140, cy: 160, r: 85, fill: '#e90d41', delay: 1.2 },
]

export default function Hero() {
  const scrollToAction = () => {
    document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen hero-grid overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-brand-red/15 blur-[100px]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-20 md:pt-44 md:pb-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-brand-red text-xs font-semibold uppercase tracking-[0.2em] mb-4">By Daniel Paul</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-[64px] font-extrabold text-white leading-tight tracking-tight">
              Find Your Ikigai.
            </h1>
            <p className="font-display text-4xl md:text-6xl lg:text-[64px] font-extrabold brand-text-gradient leading-tight mt-1">
              Your purpose. Your path. Your profit.
            </p>
            <p className="mt-6 text-brand-silver text-base md:text-lg leading-relaxed max-w-[520px] mx-auto lg:mx-0">
              Most people spend years feeling stuck between what they love and what pays the bills. Your Ikigai is the
              intersection. This free tool finds it in minutes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                type="button"
                onClick={scrollToAction}
                className="brand-gradient text-white font-semibold px-6 py-3.5 rounded-xl text-sm md:text-base hover:opacity-95 transition-opacity"
              >
                Start the Quick Session — 15 min
              </button>
              <button
                type="button"
                onClick={scrollToAction}
                className="border border-brand-silver/40 text-white font-semibold px-6 py-3.5 rounded-xl text-sm md:text-base hover:border-brand-silver hover:bg-white/5 transition-colors"
              >
                Take the Deep Dive — 45 min
              </button>
            </div>

            <p className="mt-6 text-brand-silver/90 text-sm">Used by 1,000+ founders. No account needed.</p>

            <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start text-brand-silver text-xs md:text-sm">
              <span className="rounded-full bg-brand-charcoal/80 px-3 py-1 border border-brand-silver/10">🔒 Private</span>
              <span className="rounded-full bg-brand-charcoal/80 px-3 py-1 border border-brand-silver/10">🎙 Voice Input</span>
              <span className="rounded-full bg-brand-charcoal/80 px-3 py-1 border border-brand-silver/10">📄 PDF Report</span>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center mx-auto lg:mx-0">
            <svg
              viewBox="0 0 280 280"
              className="w-[260px] h-[260px] md:w-[280px] md:h-[280px]"
              aria-hidden
            >
              {circles.map((c, i) => (
                <motion.circle
                  key={i}
                  cx={c.cx}
                  cy={c.cy}
                  r={c.r}
                  fill={c.fill}
                  fillOpacity={0.15}
                  stroke={c.fill}
                  strokeOpacity={0.6}
                  strokeWidth={1.5}
                  animate={{ scale: [1, 1.04, 1], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 3 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
                />
              ))}
              <motion.circle
                cx={140}
                cy={115}
                r={6}
                fill="#e90d41"
                animate={{ scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 12px rgba(233,13,65,0.8))' }}
              />
            </svg>
            <p className="text-brand-silver text-sm italic mt-2">生き甲斐</p>
          </div>
        </div>
      </div>
    </section>
  )
}
