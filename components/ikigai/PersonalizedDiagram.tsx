'use client'

import { motion } from 'framer-motion'

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

const CIRCLE_CONFIG = [
  {
    key: 'love' as const,
    label: 'What You Love',
    cx: 170, cy: 155, color: '#FF8DA1',
    fill: 'rgba(255,141,161,0.12)', stroke: 'rgba(255,141,161,0.35)',
    textY: 92,
    kwOffsets: [{ dx: -32, dy: -8 }, { dx: -36, dy: 10 }, { dx: -28, dy: 28 }],
  },
  {
    key: 'skills' as const,
    label: "What You're Good At",
    cx: 230, cy: 155, color: '#2D1B22',
    fill: 'rgba(45,27,34,0.07)', stroke: 'rgba(45,27,34,0.22)',
    textY: 92,
    kwOffsets: [{ dx: 32, dy: -8 }, { dx: 36, dy: 10 }, { dx: 28, dy: 28 }],
  },
  {
    key: 'world' as const,
    label: 'What the World Needs',
    cx: 170, cy: 228, color: '#3d2b32',
    fill: 'rgba(255,183,197,0.1)', stroke: 'rgba(255,183,197,0.3)',
    textY: 312,
    kwOffsets: [{ dx: -32, dy: -28 }, { dx: -36, dy: -10 }, { dx: -28, dy: 8 }],
  },
  {
    key: 'money' as const,
    label: 'What You Can Be Paid For',
    cx: 230, cy: 228, color: '#FF8DA1',
    fill: 'rgba(255,141,161,0.08)', stroke: 'rgba(255,141,161,0.28)',
    textY: 312,
    kwOffsets: [{ dx: 32, dy: -28 }, { dx: 36, dy: -10 }, { dx: 28, dy: 8 }],
  },
]

const INTERSECTIONS = [
  { label: 'Passion', x: 200, y: 128 },
  { label: 'Mission', x: 138, y: 192 },
  { label: 'Vocation', x: 262, y: 192 },
  { label: 'Profession', x: 200, y: 258 },
]

function truncateKw(kw: string, max: number = 18): string {
  return kw.length > max ? kw.slice(0, max - 1) + '…' : kw
}

export default function PersonalizedDiagram({ keywords, ikigaiStatement }: PersonalizedDiagramProps) {
  const shortStatement =
    ikigaiStatement.length > 55
      ? ikigaiStatement.slice(0, 52) + '…'
      : ikigaiStatement

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="w-full"
    >
      <svg viewBox="0 0 400 390" className="w-full h-auto" role="img" aria-label="Your personalized Ikigai diagram">
        <defs>
          <filter id="pd-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circles */}
        {CIRCLE_CONFIG.map((c, ci) => (
          <motion.circle
            key={c.key}
            cx={c.cx} cy={c.cy} r={108}
            fill={c.fill}
            stroke={c.stroke}
            strokeWidth={1.2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: ci * 0.15 }}
            style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          />
        ))}

        {/* Circle outer labels */}
        {CIRCLE_CONFIG.map((c) => (
          <text
            key={`lbl-${c.key}`}
            x={c.cx} y={c.textY}
            textAnchor="middle"
            className="fill-brand-plum/25 text-[7px] font-sans uppercase pointer-events-none"
            style={{ letterSpacing: '0.1em' }}
          >
            {c.label}
          </text>
        ))}

        {/* Keywords — larger, bolder, readable */}
        {CIRCLE_CONFIG.map((c) => {
          const kws = keywords[c.key] || []
          return kws.slice(0, 3).map((kw, ki) => {
            const offset = c.kwOffsets[ki] || { dx: 0, dy: 0 }
            return (
              <motion.text
                key={`${c.key}-kw-${ki}`}
                x={c.cx + offset.dx}
                y={c.cy + offset.dy}
                textAnchor="middle"
                className="font-serif italic pointer-events-none"
                style={{ fontSize: '9px' }}
                fill={c.color}
                fillOpacity={0.75}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 0.5, delay: 0.8 + ki * 0.15 }}
              >
                {truncateKw(kw)}
              </motion.text>
            )
          })
        })}

        {/* Intersection labels */}
        {INTERSECTIONS.map((int) => (
          <text
            key={int.label}
            x={int.x} y={int.y}
            textAnchor="middle"
            className="fill-brand-plum/18 text-[6.5px] font-sans uppercase pointer-events-none"
            style={{ letterSpacing: '0.15em' }}
          >
            {int.label}
          </text>
        ))}

        {/* Center glow */}
        <motion.circle
          cx={200} cy={192} r={28}
          fill="rgba(255,141,161,0.15)"
          filter="url(#pd-glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ transformOrigin: '200px 192px' }}
        />
        <motion.circle
          cx={200} cy={192} r={10}
          fill="#FF8DA1"
          fillOpacity={0.55}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          style={{ transformOrigin: '200px 192px' }}
        />

        {/* Center text */}
        <motion.text
          x={200} y={188}
          textAnchor="middle"
          className="font-serif italic font-bold pointer-events-none"
          style={{ fontSize: '10px' }}
          fill="#2D1B22"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          生き甲斐
        </motion.text>
        <motion.text
          x={200} y={200}
          textAnchor="middle"
          className="font-sans font-bold uppercase pointer-events-none"
          style={{ fontSize: '6.5px', letterSpacing: '0.2em' }}
          fill="#FF8DA1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          YOUR IKIGAI
        </motion.text>

        {/* Bottom statement */}
        <motion.text
          x={200} y={368}
          textAnchor="middle"
          className="font-serif italic pointer-events-none"
          style={{ fontSize: '7.5px' }}
          fill="#2D1B22"
          fillOpacity={0.4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {shortStatement}
        </motion.text>
      </svg>
    </motion.div>
  )
}
