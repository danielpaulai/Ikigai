'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Waves } from 'lucide-react'
import { SESSION_MODES } from '@/lib/session-modes'

interface ModeSelectorProps {
  onSelect: (mode: 'short' | 'long') => void
}

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  const quick = SESSION_MODES.short
  const deep = SESSION_MODES.long

  return (
    <div className="p-6 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-serif italic text-brand-plum mb-1">Pick your session</h3>
        <p className="text-brand-plum/40 text-xs">
          {quick.questionCount} focused questions or {deep.questionCount} for the full picture. Same coach, same PDF.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Quick Session */}
        <motion.button
          type="button"
          onClick={() => onSelect('short')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="group text-left p-5 sm:p-6 rounded-2xl border border-brand-pink/30 bg-white hover:shadow-[0_6px_24px_rgba(255,183,197,0.2)] transition-all duration-300 hover:border-brand-pink/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-brand-pink/20 flex items-center justify-center">
              <Zap size={16} className="text-brand-pink-2" />
            </div>
            <div>
              <p className="text-base font-serif italic text-brand-plum leading-tight">{quick.label}</p>
              <p className="text-[10px] text-brand-plum/40 uppercase tracking-wider">{quick.durationLabel} · {quick.questionCount} questions</p>
            </div>
          </div>

          <ul className="space-y-1.5 text-brand-plum/55 text-xs mb-5">
            {quick.youGet.map((line) => (
              <li key={line} className="flex gap-1.5 items-start">
                <Check className="w-3.5 h-3.5 text-brand-pink-2 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <span className="block w-full text-center py-2.5 text-xs rounded-xl bg-brand-plum text-brand-pink font-semibold group-hover:bg-brand-plum-2 transition-colors">
            Start Quick Session →
          </span>
          <p className="text-center text-brand-plum/30 text-[10px] mt-2 italic">{quick.bestFor}</p>
        </motion.button>

        {/* Deep Dive */}
        <motion.button
          type="button"
          onClick={() => onSelect('long')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.06 }}
          className="group text-left p-5 sm:p-6 rounded-2xl border border-brand-plum/15 bg-brand-cream-2 hover:bg-brand-plum hover:text-white transition-all duration-300 hover:shadow-[0_6px_24px_rgba(45,27,34,0.15)]"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-brand-plum/10 group-hover:bg-white/15 flex items-center justify-center">
              <Waves size={16} className="text-brand-plum/60 group-hover:text-brand-pink" />
            </div>
            <div>
              <p className="text-base font-serif italic text-brand-plum group-hover:text-white leading-tight">{deep.label}</p>
              <p className="text-[10px] text-brand-plum/40 group-hover:text-white/50 uppercase tracking-wider">{deep.durationLabel} · {deep.questionCount} questions</p>
            </div>
          </div>

          <ul className="space-y-1.5 text-brand-plum/55 group-hover:text-white/65 text-xs mb-5">
            {deep.youGet.map((line) => (
              <li key={line} className="flex gap-1.5 items-start">
                <Check className="w-3.5 h-3.5 text-brand-pink-2 group-hover:text-brand-pink shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <span className="block w-full text-center py-2.5 text-xs rounded-xl border border-brand-plum/20 group-hover:border-white/30 text-brand-plum group-hover:text-white font-semibold transition-colors">
            Begin Deep Dive →
          </span>
          <p className="text-center text-brand-plum/30 group-hover:text-white/40 text-[10px] mt-2 italic">{deep.bestFor}</p>
        </motion.button>
      </div>

      <p className="text-center text-brand-plum/25 text-[10px] mt-6">
        Your answers stay in this browser. Nothing is stored after your session.
      </p>
    </div>
  )
}
