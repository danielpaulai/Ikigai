'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CIRCLES = [
  {
    key: 'love',
    label: 'What You Love',
    cx: 170, cy: 155, r: 108,
    fill: 'rgba(255,141,161,0.13)', stroke: 'rgba(255,141,161,0.4)',
    labelPos: { x: 115, y: 90 },
    color: '#FF8DA1',
    headline: 'Passion & Flow',
    description: 'The activities that make time vanish. Topics you research at midnight not because you have to, but because you cannot stop.',
    examples: ['Building things from scratch', 'Solving complex puzzles', 'Teaching and explaining ideas', 'Creating art, music, or writing'],
  },
  {
    key: 'skills',
    label: "What You're Good At",
    cx: 230, cy: 155, r: 108,
    fill: 'rgba(45,27,34,0.06)', stroke: 'rgba(45,27,34,0.22)',
    labelPos: { x: 285, y: 90 },
    color: '#2D1B22',
    headline: 'Talent & Mastery',
    description: 'The skills that come naturally to you. The things people consistently ask your help with, even strangers.',
    examples: ['Simplifying complexity', 'Connecting people and ideas', 'Strategic thinking under pressure', 'Making others feel heard'],
  },
  {
    key: 'world',
    label: 'What the World Needs',
    cx: 170, cy: 228, r: 108,
    fill: 'rgba(255,183,197,0.1)', stroke: 'rgba(255,183,197,0.3)',
    labelPos: { x: 110, y: 320 },
    color: '#3d2b32',
    headline: 'Mission & Impact',
    description: 'The problems that genuinely frustrate you. The struggles that pull at your heart because you have been through them.',
    examples: ['People stuck without direction', 'Broken education systems', 'Mental health stigma', 'Inequality in opportunity'],
  },
  {
    key: 'money',
    label: 'What You Can Be Paid For',
    cx: 230, cy: 228, r: 108,
    fill: 'rgba(255,141,161,0.08)', stroke: 'rgba(255,141,161,0.28)',
    labelPos: { x: 290, y: 320 },
    color: '#FF8DA1',
    headline: 'Value & Income',
    description: 'The economic edge hidden in your experience. What people and companies already pay money to have solved.',
    examples: ['Consulting and advisory', 'Online courses and workshops', 'Coaching high-performers', 'Building products and tools'],
  },
]

const INTERSECTIONS = [
  { label: 'Passion', x: 200, y: 128 },
  { label: 'Mission', x: 138, y: 192 },
  { label: 'Vocation', x: 262, y: 192 },
  { label: 'Profession', x: 200, y: 260 },
]

export default function HeroIkigaiDiagram() {
  const [active, setActive] = useState<string | null>(null)
  const activeCircle = CIRCLES.find((c) => c.key === active)

  return (
    <div className="w-full max-w-[560px] mx-auto">
      <div className="relative">
        <svg
          viewBox="0 0 400 390"
          className="w-full h-auto cursor-pointer"
          aria-label="Interactive Ikigai diagram — click each circle to learn more"
        >
          <defs>
            <filter id="hero-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CIRCLES.map((c) => {
            const isActive = active === c.key
            const dimmed = active !== null && !isActive
            return (
              <g key={c.key} onClick={() => setActive(isActive ? null : c.key)}>
                <circle
                  cx={c.cx} cy={c.cy} r={c.r}
                  fill={c.fill}
                  stroke={isActive ? c.color : c.stroke}
                  strokeWidth={isActive ? 2.5 : 1.2}
                  opacity={dimmed ? 0.3 : 1}
                  className="transition-all duration-500 hover:opacity-100"
                  style={{ cursor: 'pointer' }}
                />
                <text
                  x={c.labelPos.x} y={c.labelPos.y}
                  textAnchor="middle"
                  className="text-[8px] font-sans uppercase pointer-events-none"
                  style={{ letterSpacing: '0.12em' }}
                  fill={isActive ? c.color : dimmed ? 'rgba(45,27,34,0.15)' : 'rgba(45,27,34,0.4)'}
                >
                  {c.label}
                </text>
              </g>
            )
          })}

          {INTERSECTIONS.map((int) => (
            <text
              key={int.label}
              x={int.x} y={int.y}
              textAnchor="middle"
              className="text-[7px] font-sans uppercase pointer-events-none"
              style={{ letterSpacing: '0.15em' }}
              fill={active ? 'rgba(45,27,34,0.1)' : 'rgba(45,27,34,0.25)'}
            >
              {int.label}
            </text>
          ))}

          {/* Center */}
          <circle cx={200} cy={192} r={24} fill="rgba(255,141,161,0.15)" filter="url(#hero-glow)" opacity={active ? 0.3 : 1} className="transition-opacity duration-500" />
          <circle cx={200} cy={192} r={8} fill="#FF8DA1" opacity={active ? 0.2 : 0.7} className="transition-opacity duration-500" />

          {!active && (
            <>
              <text x={200} y={188} textAnchor="middle" className="fill-brand-plum text-[10px] font-serif italic font-bold pointer-events-none">生き甲斐</text>
              <text x={200} y={202} textAnchor="middle" className="fill-brand-pink-2 text-[7px] font-sans font-bold uppercase pointer-events-none" style={{ letterSpacing: '0.2em' }}>IKIGAI</text>
            </>
          )}

          {!active && (
            <text x={200} y={370} textAnchor="middle" className="fill-brand-plum/25 text-[7px] font-sans pointer-events-none">
              Tap a circle to explore
            </text>
          )}
        </svg>
      </div>

      {/* Slide panel */}
      <AnimatePresence mode="wait">
        {activeCircle && (
          <motion.div
            key={activeCircle.key}
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 rounded-2xl bg-white/80 border border-brand-pink/15 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeCircle.color, opacity: 0.6 }}
                />
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: activeCircle.color }}>
                  {activeCircle.label}
                </p>
              </div>
              <h3 className="text-lg font-serif italic text-brand-plum mb-2">{activeCircle.headline}</h3>
              <p className="text-brand-plum/55 text-sm leading-relaxed mb-4">
                {activeCircle.description}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-brand-plum/30 font-bold mb-2">Examples</p>
              <ul className="space-y-1.5">
                {activeCircle.examples.map((ex) => (
                  <li key={ex} className="text-brand-plum/50 text-xs flex gap-2 items-start">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: activeCircle.color, opacity: 0.5 }} />
                    {ex}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mt-4 text-[10px] uppercase tracking-wider text-brand-plum/30 hover:text-brand-plum/60 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
