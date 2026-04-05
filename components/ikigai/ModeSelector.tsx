'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SESSION_MODES } from '@/lib/session-modes'

interface ModeSelectorProps {
  onSelect: (mode: 'short' | 'long') => void
}

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  const quick = SESSION_MODES.short
  const deep = SESSION_MODES.long

  return (
    <div className="p-8 md:p-12">
      <p className="text-center text-brand-plum/45 text-xs uppercase tracking-[0.3em] mb-2">Choose your session</p>
      <p className="text-center text-brand-plum/70 text-sm font-serif italic mb-2">Short version vs in-depth version</p>
      <p className="text-center text-brand-plum/35 text-xs mb-10 max-w-lg mx-auto leading-relaxed">
        Same coach. Same PDF. Different depth: {quick.questionCount} focused answers, or {deep.questionCount} for the full arc.
        Your answers stay in this browser until you send them for coaching and results.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            onClick={() => onSelect('short')}
            className="group text-left w-full p-8 rounded-4xl border border-brand-pink/35 bg-white/60 hover:bg-white hover:shadow-[0_10px_40px_rgba(255,183,197,0.25)] transition-all duration-500 hover:scale-[1.02] flex flex-col h-full"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-pink-2 font-bold mb-2">{quick.versionLabel}</p>
            <div className="w-12 h-12 rounded-full bg-brand-pink/25 flex items-center justify-center text-2xl mb-4">⚡</div>
            <h3 className="text-2xl font-serif italic text-brand-plum mb-2">{quick.label}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-brand-pink/25 text-brand-pink-2 text-xs font-bold uppercase tracking-wider">
                {quick.durationLabel}
              </span>
              <span className="text-brand-plum/45 text-xs font-medium pt-1">{quick.questionCount} questions</span>
            </div>
            <p className="text-brand-plum/50 text-xs leading-relaxed mb-5">{quick.bestFor}</p>
            <p className="text-[10px] uppercase tracking-widest text-brand-plum/35 font-bold mb-2">You get</p>
            <ul className="space-y-2.5 text-brand-plum/65 text-sm flex-1 mb-6">
              {quick.youGet.map((line) => (
                <li key={line} className="flex gap-2 items-start">
                  <Check className="w-4 h-4 text-brand-pink-2 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <span className="btn-primary w-full text-center py-3.5 text-sm !inline-flex">Start Quick Session →</span>
            <p className="text-center text-brand-plum/35 text-xs mt-4 italic">Workshops & live sessions</p>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <button
            type="button"
            onClick={() => onSelect('long')}
            className="group text-left w-full p-8 rounded-4xl border border-brand-plum/20 bg-brand-plum/5 hover:bg-brand-plum hover:text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(45,27,34,0.2)] flex flex-col h-full"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-pink-2 group-hover:text-brand-pink font-bold mb-2">
              {deep.versionLabel}
            </p>
            <div className="w-12 h-12 rounded-full bg-brand-plum/10 group-hover:bg-white/15 flex items-center justify-center text-2xl mb-4">
              🌊
            </div>
            <h3 className="text-2xl font-serif italic text-brand-plum group-hover:text-white mb-2">{deep.label}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-brand-plum/10 group-hover:bg-white/15 text-brand-plum group-hover:text-brand-pink text-xs font-bold uppercase tracking-wider">
                {deep.durationLabel}
              </span>
              <span className="text-brand-plum/45 group-hover:text-white/60 text-xs font-medium pt-1">
                {deep.questionCount} questions
              </span>
            </div>
            <p className="text-brand-plum/50 group-hover:text-white/65 text-xs leading-relaxed mb-5">{deep.bestFor}</p>
            <p className="text-[10px] uppercase tracking-widest text-brand-plum/35 group-hover:text-white/40 font-bold mb-2">
              You get
            </p>
            <ul className="space-y-2.5 text-brand-plum/65 group-hover:text-white/75 text-sm flex-1 mb-6">
              {deep.youGet.map((line) => (
                <li key={line} className="flex gap-2 items-start">
                  <Check className="w-4 h-4 text-brand-pink-2 group-hover:text-brand-pink shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <span className="w-full text-center py-3.5 text-sm rounded-full border-2 border-brand-plum/25 group-hover:border-white/40 text-brand-plum group-hover:text-white font-medium transition-colors">
              Begin Deep Dive →
            </span>
            <p className="text-center text-brand-plum/35 group-hover:text-white/50 text-xs mt-4 italic">Solo · full story</p>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
