'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Rocket, Target, Trophy } from 'lucide-react'

interface ActionStep {
  title: string
  description: string
  timeframe: string
}

interface MomentumCardsProps {
  personalQuote: string
  actionSteps: ActionStep[]
  archetypeName: string
}

const TIMEFRAME_ICONS = [Quote, Rocket, Target, Trophy]

export default function MomentumCards({ personalQuote, actionSteps, archetypeName }: MomentumCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const cards = [
    {
      badge: 'Your Mantra',
      title: personalQuote,
      subtitle: archetypeName,
      isQuote: true,
    },
    ...actionSteps.slice(0, 3).map((step) => ({
      badge: step.timeframe,
      title: step.title,
      subtitle: step.description,
      isQuote: false,
    })),
  ]

  const total = cards.length
  const goNext = () => setActiveIndex((i) => (i + 1) % total)
  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total)

  return (
    <div>
      <p className="text-brand-plum/40 text-xs uppercase tracking-[0.25em] text-center font-bold mb-5">
        Your Momentum
      </p>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl shadow-lg bg-brand-plum min-h-[260px] sm:min-h-[300px]"
          >
            {/* Solid background, no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-plum via-brand-plum to-[#1a1020]" />

            {/* Subtle decorative element */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-pink/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-pink/3 rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Badge */}
            <div className="relative z-10 px-6 pt-6 sm:px-8 sm:pt-8 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-brand-pink text-[11px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-white/5">
                {(() => {
                  const Icon = TIMEFRAME_ICONS[activeIndex % TIMEFRAME_ICONS.length]
                  return <Icon size={12} strokeWidth={2.5} />
                })()}
                {cards[activeIndex].badge}
              </span>

              {/* Dots */}
              <div className="flex gap-1.5">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'bg-brand-pink w-5' : 'bg-white/20 w-2 hover:bg-white/40'
                    }`}
                    aria-label={`Card ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8">
              {cards[activeIndex].isQuote ? (
                <>
                  <p className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed mb-3 max-w-lg">
                    &ldquo;{cards[activeIndex].title}&rdquo;
                  </p>
                  <p className="text-brand-pink/60 text-sm font-medium">
                    {cards[activeIndex].subtitle}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight mb-3">
                    {cards[activeIndex].title}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                    {cards[activeIndex].subtitle}
                  </p>
                </>
              )}
            </div>

            {/* Nav arrows */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/8 backdrop-blur-sm flex items-center justify-center text-white/50 hover:bg-white/15 hover:text-white transition-all z-10"
              aria-label="Previous card"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/8 backdrop-blur-sm flex items-center justify-center text-white/50 hover:bg-white/15 hover:text-white transition-all z-10"
              aria-label="Next card"
            >
              <ChevronRight size={18} />
            </button>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {actionSteps.slice(0, 3).map((step, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i + 1)}
            className={`text-left p-3 rounded-2xl transition-all duration-200 ${
              activeIndex === i + 1
                ? 'bg-brand-plum text-white'
                : 'bg-white/60 border border-brand-pink/10 hover:border-brand-pink/30'
            }`}
          >
            <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${
              activeIndex === i + 1 ? 'text-brand-pink/70' : 'text-brand-plum/35'
            }`}>
              {step.timeframe}
            </p>
            <p className={`text-xs font-medium leading-tight line-clamp-2 ${
              activeIndex === i + 1 ? 'text-white/90' : 'text-brand-plum/70'
            }`}>
              {step.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
