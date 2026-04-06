'use client'

import { motion } from 'framer-motion'
import type { HandoffTask } from '@/lib/types'

interface SkillsPriorityMatrixProps {
  tasks: HandoffTask[]
}

const QUADRANTS = [
  {
    key: 'build_first',
    label: 'Build First',
    sublabel: 'High time + High repetition',
    filter: (t: HandoffTask) => t.timeCost === 'high' && t.repetition === 'high',
    bg: 'bg-brand-plum',
    text: 'text-white',
    pill: 'bg-white/15 text-brand-pink',
    corner: 'rounded-tl-3xl',
  },
  {
    key: 'quick_win',
    label: 'Quick Win',
    sublabel: 'Low time + High repetition',
    filter: (t: HandoffTask) => t.timeCost === 'low' && t.repetition === 'high',
    bg: 'bg-brand-plum/80',
    text: 'text-white',
    pill: 'bg-white/15 text-brand-pink',
    corner: 'rounded-tr-3xl',
  },
  {
    key: 'consider',
    label: 'Consider',
    sublabel: 'High time + Low repetition',
    filter: (t: HandoffTask) => t.timeCost === 'high' && t.repetition === 'low',
    bg: 'bg-brand-plum/10',
    text: 'text-brand-plum',
    pill: 'bg-brand-plum/10 text-brand-plum/70',
    corner: 'rounded-bl-3xl',
  },
  {
    key: 'skip',
    label: 'Ignore for Now',
    sublabel: 'Low time + Low repetition',
    filter: (t: HandoffTask) => t.timeCost === 'low' && t.repetition === 'low',
    bg: 'bg-brand-cream-2',
    text: 'text-brand-plum/50',
    pill: 'bg-brand-plum/5 text-brand-plum/40',
    corner: 'rounded-br-3xl',
  },
]

export default function SkillsPriorityMatrix({ tasks }: SkillsPriorityMatrixProps) {
  const skillTasks = tasks.filter((t) => t.category === 'build_skill' || t.category === 'existing_tool')

  return (
    <div>
      {/* Axes labels */}
      <div className="flex items-center justify-center gap-6 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-[2px] bg-brand-plum/20" />
          <span className="text-[9px] uppercase tracking-widest text-brand-plum/30 font-bold">Repetition →</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[2px] h-4 bg-brand-plum/20" />
          <span className="text-[9px] uppercase tracking-widest text-brand-plum/30 font-bold">Time Cost ↑</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-[2px] bg-white/40 rounded-3xl overflow-hidden">
        {QUADRANTS.map((q, qi) => {
          const items = skillTasks.filter(q.filter)
          return (
            <motion.div
              key={q.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: qi * 0.1 }}
              className={`${q.bg} ${q.corner} p-4 min-h-[120px] flex flex-col`}
            >
              <p className={`text-xs font-bold mb-0.5 ${q.text}`}>{q.label}</p>
              <p className={`text-[9px] mb-3 ${q.text} opacity-50`}>{q.sublabel}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {items.length > 0 ? (
                  items.map((t, i) => (
                    <span
                      key={i}
                      className={`${q.pill} text-[10px] px-2.5 py-1 rounded-full font-medium leading-tight`}
                    >
                      {t.task.length > 30 ? t.task.slice(0, 28) + '…' : t.task}
                    </span>
                  ))
                ) : (
                  <span className={`text-[10px] italic ${q.text} opacity-30`}>None</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
