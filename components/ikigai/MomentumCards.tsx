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

const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
]

const CARD_GRADIENTS = [
  'from-brand-plum/80 via-brand-plum/30 to-transparent',
  'from-[#1a2f1a]/80 via-[#1a2f1a]/30 to-transparent',
  'from-[#1a1a2f]/80 via-[#1a1a2f]/30 to-transparent',
  'from-brand-plum/70 via-brand-plum/20 to-transparent',
]

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
      <p className="text-brand-plum/35 text-[10px] uppercase tracking-[0.3em] text-center font-bold mb-5">
        Your Momentum
      </p>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative overflow-hidden h-72 sm:h-80 rounded-3xl shadow-lg bg-brand-plum"
          >
            {/* Background image */}
            <img
              src={CARD_IMAGES[activeIndex % CARD_IMAGES.length]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${CARD_GRADIENTS[activeIndex % CARD_GRADIENTS.length]}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full border border-white/10">
                {(() => {
                  const Icon = TIMEFRAME_ICONS[activeIndex % TIMEFRAME_ICONS.length]
                  return <Icon size={11} strokeWidth={2.5} />
                })()}
                {cards[activeIndex].badge}
              </span>
            </div>

            {/* Dots indicator */}
            <div className="absolute top-5 right-5 flex gap-1.5">
              {cards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-white w-5' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Card ${i + 1}`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              {cards[activeIndex].isQuote ? (
                <>
                  <p className="text-xl sm:text-2xl font-serif italic text-white leading-snug mb-2 max-w-md">
                    &ldquo;{cards[activeIndex].title}&rdquo;
                  </p>
                  <p className="text-white/50 text-sm">
                    — {cards[activeIndex].subtitle}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight mb-2">
                    {cards[activeIndex].title}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed max-w-md">
                    {cards[activeIndex].subtitle}
                  </p>
                </>
              )}
            </div>

            {/* Nav arrows */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all border border-white/5"
              aria-label="Previous card"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all border border-white/5"
              aria-label="Next card"
            >
              <ChevronRight size={16} />
            </button>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Summary row below cards */}
      <div className="grid grid-cols-3 gap-2 mt-4">
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
            <p className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${
              activeIndex === i + 1 ? 'text-brand-pink/70' : 'text-brand-plum/30'
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
