'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const phrases = [
  'Mapping the intersection of your gifts.',
  'Discovering your personal archetype.',
  'Building your monetization strategy.',
  'Crafting your 90-day first step.',
]

export default function GeneratingView() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[480px] p-12 text-center">
      <div className="relative w-48 h-48 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-brand-pink/30 animate-pulse-slow"
            style={{
              transform: `scale(${0.4 + i * 0.2})`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.8 - i * 0.15,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-serif text-brand-pink opacity-60">生き甲斐</span>
        </div>
      </div>

      <h3 className="text-2xl font-serif italic text-brand-plum mb-4">Weaving your insights together</h3>

      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-brand-plum/55 text-sm min-h-[22px] max-w-sm"
        >
          {phrases[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
