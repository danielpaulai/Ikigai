'use client'

import { motion } from 'framer-motion'
import { Heart, Brain, Globe, Coins } from 'lucide-react'

interface CircleKeywords {
  love: string[]
  skills: string[]
  world: string[]
  money: string[]
}

interface PersonalizedDiagramProps {
  keywords: CircleKeywords
  ikigaiStatement: string
}

const QUADRANTS = [
  {
    key: 'love' as const,
    label: 'What You Love',
    icon: Heart,
    color: 'text-brand-pink-2',
    bg: 'bg-brand-pink/8',
    border: 'border-brand-pink/20',
    pillBg: 'bg-brand-pink/15 text-brand-pink-2',
  },
  {
    key: 'skills' as const,
    label: "What You're Good At",
    icon: Brain,
    color: 'text-brand-plum/70',
    bg: 'bg-brand-plum/[0.04]',
    border: 'border-brand-plum/10',
    pillBg: 'bg-brand-plum/8 text-brand-plum/70',
  },
  {
    key: 'world' as const,
    label: 'What the World Needs',
    icon: Globe,
    color: 'text-brand-plum/60',
    bg: 'bg-brand-pink/5',
    border: 'border-brand-pink/15',
    pillBg: 'bg-brand-pink/10 text-brand-plum/60',
  },
  {
    key: 'money' as const,
    label: 'What You Can Be Paid For',
    icon: Coins,
    color: 'text-brand-pink-2',
    bg: 'bg-brand-pink/6',
    border: 'border-brand-pink-2/15',
    pillBg: 'bg-brand-pink-2/10 text-brand-pink-2',
  },
]

const INTERSECTIONS = [
  { label: 'Passion', top: 'love', bottom: 'skills' },
  { label: 'Mission', top: 'love', bottom: 'world' },
  { label: 'Profession', top: 'skills', bottom: 'money' },
  { label: 'Vocation', top: 'world', bottom: 'money' },
]

export default function PersonalizedDiagram({ keywords }: PersonalizedDiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Four quadrants */}
      <div className="grid grid-cols-2 gap-2">
        {QUADRANTS.map((q, qi) => {
          const Icon = q.icon
          const kws = keywords[q.key] || []
          return (
            <motion.div
              key={q.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + qi * 0.1 }}
              className={`${q.bg} border ${q.border} p-4 ${
                qi === 0 ? 'rounded-tl-3xl' : qi === 1 ? 'rounded-tr-3xl' : qi === 2 ? 'rounded-bl-3xl' : 'rounded-br-3xl'
              }`}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <Icon size={14} className={q.color} strokeWidth={2} />
                <p className={`text-[11px] font-bold uppercase tracking-wide ${q.color}`}>
                  {q.label}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {kws.slice(0, 4).map((kw, ki) => (
                  <motion.span
                    key={ki}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + qi * 0.1 + ki * 0.08 }}
                    className={`${q.pillBg} text-xs px-2.5 py-1 rounded-full font-medium leading-tight`}
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Intersections row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex items-center justify-center gap-3 mt-3"
      >
        {INTERSECTIONS.map((int) => (
          <span
            key={int.label}
            className="text-[10px] uppercase tracking-widest text-brand-plum/25 font-bold"
          >
            {int.label}
          </span>
        ))}
      </motion.div>

      {/* Center Ikigai badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="flex justify-center -mt-1"
      >
        <div className="bg-brand-plum text-center px-5 py-2.5 rounded-full">
          <span className="text-brand-pink font-serif italic text-sm font-bold">
            生き甲斐
          </span>
          <span className="text-brand-pink/50 text-[9px] uppercase tracking-[0.2em] font-bold ml-2">
            Your Ikigai
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
