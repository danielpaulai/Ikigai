'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const phrases = [
  'Mapping the intersection of your gifts...',
  'Discovering your personal archetype...',
  'Building your monetization strategy...',
  'Crafting your 90-day first step...',
]

const circles = [
  { cx: 100, cy: 100, r: 70, fill: '#e90d41', delay: 0 },
  { cx: 160, cy: 100, r: 70, fill: '#b8bec1', delay: 0.3 },
  { cx: 130, cy: 70, r: 70, fill: '#ffffff', delay: 0.6 },
  { cx: 130, cy: 130, r: 70, fill: '#e90d41', delay: 0.9 },
]

export default function GeneratingView() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-brand-smoke rounded-3xl border border-brand-silver/10 min-h-[480px] flex flex-col items-center justify-center px-6 py-16">
      <svg viewBox="0 0 200 200" className="w-[200px] h-[200px]" aria-hidden>
        {circles.map((c, i) => (
          <motion.circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={c.fill}
            fillOpacity={0.15}
            stroke={c.fill}
            strokeOpacity={0.55}
            strokeWidth={1.5}
            animate={{ scale: [1, 1.05, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
          />
        ))}
      </svg>

      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="mt-8 text-brand-silver text-sm text-center max-w-md min-h-[48px]"
        >
          {phrases[idx]}
        </motion.p>
      </AnimatePresence>

      <h3 className="mt-4 font-display text-[22px] text-white text-center">Weaving your insights together</h3>
    </div>
  )
}
