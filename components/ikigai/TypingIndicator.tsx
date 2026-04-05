'use client'

import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-tl-sm bg-brand-charcoal border border-brand-silver/10 px-4 py-3 max-w-[78%]">
        <div className="flex items-center gap-2 text-brand-silver text-sm">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="inline-block h-1.5 w-1.5 rounded-full bg-brand-silver"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </span>
          <span>Kai is thinking...</span>
        </div>
      </div>
    </div>
  )
}
