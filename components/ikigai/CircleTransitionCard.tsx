'use client'

import { motion } from 'framer-motion'
import { Check, Heart, Brain, Globe, Coins, Sparkles } from 'lucide-react'

interface CircleTransitionCardProps {
  completedCircle: string
  completedIndex: number
  totalCircles: number
  nextCircle: string | null
}

const CIRCLE_META: Record<string, {
  icon: typeof Heart
  quote: string
  color: string
  bg: string
  image: string
}> = {
  'What You Love': {
    icon: Heart,
    quote: 'Your passion lives where time disappears.',
    color: '#FF8DA1',
    bg: 'from-[#2D1B22] to-[#4a1e30]',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&q=80',
  },
  "What You're Good At": {
    icon: Brain,
    quote: 'Your gifts are what the world comes to you for.',
    color: '#FFB7C5',
    bg: 'from-[#1a2030] to-[#2D1B22]',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=300&fit=crop&q=80',
  },
  'What the World Needs': {
    icon: Globe,
    quote: 'Your mission is the struggle that pulls at your heart.',
    color: '#FFB7C5',
    bg: 'from-[#1a2a1a] to-[#2D1B22]',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=300&fit=crop&q=80',
  },
  'What You Can Be Paid For': {
    icon: Coins,
    quote: 'Your edge is where expertise meets demand.',
    color: '#FF8DA1',
    bg: 'from-[#2D1B22] to-[#1a1a2f]',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=300&fit=crop&q=80',
  },
  'Putting It All Together': {
    icon: Sparkles,
    quote: 'All four circles explored. Your Ikigai is taking shape.',
    color: '#FF8DA1',
    bg: 'from-[#2D1B22] to-[#3d1a2a]',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=300&fit=crop&q=80',
  },
}

const NEXT_LINES: Record<string, string> = {
  "What You're Good At": "Now let's explore what you're built for.",
  'What the World Needs': 'Time to look at what the world needs from you.',
  'What You Can Be Paid For': 'Now — where money meets meaning.',
  'Putting It All Together': 'One last question to bring it all together.',
}

export default function CircleTransitionCard({
  completedCircle,
  completedIndex,
  totalCircles,
  nextCircle,
}: CircleTransitionCardProps) {
  const meta = CIRCLE_META[completedCircle] || CIRCLE_META['What You Love']
  const Icon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto w-full max-w-[85%]"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        {/* Background image */}
        <img
          src={meta.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative px-5 py-5 sm:px-6 sm:py-6">
          {/* Top: check + circle name */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Check size={13} className="text-white" strokeWidth={3} />
            </div>
            <div className="flex items-center gap-2">
              <Icon size={13} style={{ color: meta.color }} />
              <span className="text-white/70 text-[10px] uppercase tracking-[0.15em] font-bold">
                {completedCircle}
              </span>
            </div>
          </div>

          {/* Quote */}
          <p className="text-white font-serif italic text-lg sm:text-xl leading-snug mb-4 max-w-xs">
            {meta.quote}
          </p>

          {/* Progress dots */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {Array.from({ length: totalCircles }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i <= completedIndex
                      ? 'w-5 bg-white/80'
                      : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-white/30 text-[10px] font-medium">
              {completedIndex + 1} of {totalCircles}
            </span>
          </div>

          {/* Next circle line */}
          {nextCircle && (
            <p className="text-white/40 text-xs mt-3 italic">
              {NEXT_LINES[nextCircle] || `Next: ${nextCircle}`}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
