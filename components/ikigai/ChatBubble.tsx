'use client'

import { motion } from 'framer-motion'

interface ChatBubbleProps {
  role: 'assistant' | 'user'
  content: string
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[78%] px-4 py-3 text-[15px] md:text-base leading-relaxed ${
          isUser
            ? 'rounded-2xl rounded-tr-sm brand-gradient text-white'
            : 'rounded-2xl rounded-tl-sm bg-brand-charcoal text-white border border-brand-silver/10'
        }`}
      >
        {content}
      </div>
    </motion.div>
  )
}
