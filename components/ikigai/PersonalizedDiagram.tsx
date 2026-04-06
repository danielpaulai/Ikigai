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
  { key: 'love' as const, label: 'What You Love', cx: 170, cy: 155, color: '#FF8DA1', fill: 'rgba(255,141,161,0.12)', stroke: 'rgba(255,141,161,0.35)', textY: 98, kwOffsets: [{ dx: -30, dy: -10 }, { dx: -40, dy: 6 }, { dx: -25, dy: 22 }, { dx: -35, dy: 38 }] },
  { key: 'skills' as const, label: "What You're Good At", cx: 230, cy: 155, color: '#2D1B22', fill: 'rgba(45,27,34,0.07)', stroke: 'rgba(45,27,34,0.22)', textY: 98, kwOffsets: [{ dx: 30, dy: -10 }, { dx: 40, dy: 6 }, { dx: 25, dy: 22 }, { dx: 35, dy: 38 }] },
  { key: 'world' as const, label: 'What the World Needs', cx: 170, cy: 225, color: '#2D1B22', fill: 'rgba(255,183,197,0.1)', stroke: 'rgba(255,183,197,0.3)', textY: 302, kwOffsets: [{ dx: -30, dy: -38 }, { dx: -40, dy: -22 }, { dx: -25, dy: -6 }, { dx: -35, dy: 10 }] },
  { key: 'money' as const, label: 'What You Can Be Paid For', cx: 230, cy: 225, color: '#FF8DA1', fill: 'rgba(255,141,161,0.08)', stroke: 'rgba(255,141,161,0.28)', textY: 302, kwOffsets: [{ dx: 30, dy: -38 }, { dx: 40, dy: -22 }, { dx: 25, dy: -6 }, { dx: 35, dy: 10 }] },
]

const INTERSECTIONS = [
  { label: 'Passion', x: 200, y: 128 },
  { label: 'Mission', x: 140, y: 190 },
  { label: 'Vocation', x: 260, y: 190 },
  { label: 'Profession', x: 200, y: 255 },
]

export default function PersonalizedDiagram({ keywords, ikigaiStatement }: PersonalizedDiagramProps) {
  const shortStatement = ikigaiStatement.length > 60
    ? ikigaiStatement.slice(0, 57) + '...'
    : ikigaiStatement

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full"
    >
      <svg viewBox="0 0 400 390" className="w-full h-auto" role="img" aria-label="Your personalized Ikigai diagram">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Four circles */}
        {CIRCLE_CONFIG.map((c, ci) => (
          <motion.circle
            key={c.key}
            cx={c.cx}
            cy={c.cy}
            r={105}
            fill={c.fill}
            stroke={c.stroke}
            strokeWidth={1.2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: ci * 0.15 }}
            style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          />
        ))}

        {/* Circle labels (outer) */}
        {CIRCLE_CONFIG.map((c) => (
          <text
            key={`label-${c.key}`}
            x={c.cx}
            y={c.textY}
            textAnchor="middle"
            className="fill-brand-plum/30 text-[7px] font-sans uppercase"
            style={{ letterSpacing: '0.1em' }}
          >
            {c.label}
          </text>
        ))}

        {/* Keywords in each circle */}
        {CIRCLE_CONFIG.map((c) => {
          const kws = keywords[c.key] || []
          return kws.slice(0, 4).map((kw, ki) => {
            const offset = c.kwOffsets[ki] || { dx: 0, dy: 0 }
            return (
              <motion.text
                key={`${c.key}-kw-${ki}`}
                x={c.cx + offset.dx}
                y={c.cy + offset.dy}
                textAnchor="middle"
                className="font-serif italic text-[8px]"
                fill={c.color}
                fillOpacity={0.7}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5, delay: 0.8 + ki * 0.12 }}
              >
                {kw}
              </motion.text>
            )
          })
        })}

        {/* Intersection labels */}
        {INTERSECTIONS.map((int) => (
          <text
            key={int.label}
            x={int.x}
            y={int.y}
            textAnchor="middle"
            className="fill-brand-plum/20 text-[6.5px] font-sans uppercase"
            style={{ letterSpacing: '0.15em' }}
          >
            {int.label}
          </text>
        ))}

        {/* Center glow */}
        <motion.circle
          cx={200}
          cy={190}
          r={28}
          fill="rgba(255,141,161,0.15)"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ transformOrigin: '200px 190px' }}
        />
        <motion.circle
          cx={200}
          cy={190}
          r={10}
          fill="#FF8DA1"
          fillOpacity={0.6}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          style={{ transformOrigin: '200px 190px' }}
        />

        {/* Center text */}
        <motion.text
          x={200}
          y={186}
          textAnchor="middle"
          className="font-serif italic text-[9px] font-bold"
          fill="#2D1B22"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          生き甲斐
        </motion.text>
        <motion.text
          x={200}
          y={198}
          textAnchor="middle"
          className="font-sans text-[6px] font-bold uppercase"
          fill="#FF8DA1"
          style={{ letterSpacing: '0.2em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          YOUR IKIGAI
        </motion.text>

        {/* Statement at bottom */}
        <motion.text
          x={200}
          y={365}
          textAnchor="middle"
          className="font-serif italic text-[8px]"
          fill="#2D1B22"
          fillOpacity={0.5}
          initial={{ opacity: 0, y: 375 }}
          animate={{ opacity: 0.5, y: 365 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {shortStatement}
        </motion.text>
      </svg>
    </motion.div>
  )
}
