'use client'

import { motion } from 'framer-motion'

interface ModeSelectorProps {
  onSelect: (mode: 'short' | 'long') => void
}

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="bg-brand-smoke rounded-3xl border border-brand-silver/10 p-6 md:p-8">
      <p className="text-center text-brand-silver text-sm mb-6">Your answers are private. Nothing is stored after this session.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="card-red-border p-6 md:p-8 flex flex-col"
        >
          <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center text-xl mb-4">⚡</div>
          <h3 className="font-display text-2xl font-bold text-white">Quick Session</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-block bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">15-20 min</span>
            <span className="text-brand-silver text-sm">8 questions</span>
          </div>
          <ul className="mt-6 space-y-2 text-brand-silver text-sm flex-1">
            <li>✓ Your personal Ikigai statement</li>
            <li>✓ Your archetype</li>
            <li>✓ Top monetization path</li>
            <li>✓ PDF download</li>
          </ul>
          <button
            type="button"
            onClick={() => onSelect('short')}
            className="mt-8 w-full brand-gradient text-white font-semibold py-4 rounded-xl text-sm hover:opacity-95 transition-opacity"
          >
            Start Quick Session →
          </button>
          <p className="text-center text-brand-silver/80 text-xs mt-3">Perfect for live sessions and workshops</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="rounded-2xl bg-brand-smoke border border-brand-silver/15 p-6 md:p-8 flex flex-col"
        >
          <div className="w-12 h-12 rounded-full bg-brand-silver/20 flex items-center justify-center text-xl mb-4">🌊</div>
          <h3 className="font-display text-2xl font-bold text-white">Deep Dive</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-block bg-brand-silver text-brand-dark text-xs font-semibold px-3 py-1 rounded-full">45-60 min</span>
            <span className="text-brand-silver text-sm">18 questions</span>
          </div>
          <ul className="mt-6 space-y-2 text-brand-silver text-sm flex-1">
            <li>✓ Everything in Quick Session</li>
            <li>✓ Full 4-circle breakdown</li>
            <li>✓ 3 monetization strategies</li>
            <li>✓ 90-day action plan</li>
            <li>✓ Detailed PDF report</li>
          </ul>
          <button
            type="button"
            onClick={() => onSelect('long')}
            className="mt-8 w-full border border-brand-silver/40 text-white font-semibold py-4 rounded-xl text-sm hover:bg-white/5 transition-colors"
          >
            Begin Deep Dive →
          </button>
          <p className="text-center text-brand-silver/80 text-xs mt-3">The complete Ikigai experience</p>
        </motion.div>
      </div>
    </div>
  )
}
