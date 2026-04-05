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
      className={`flex max-w-[78%] animate-fade-in ${isUser ? 'ml-auto' : ''}`}
    >
      <div
        className={`px-5 py-3.5 text-[15px] leading-[1.65] rounded-3xl whitespace-pre-wrap ${
          isUser
            ? 'rounded-tr-sm bg-brand-plum text-brand-pink/90'
            : 'rounded-tl-sm bg-white border border-brand-pink/10 text-brand-plum/85 shadow-sm'
        }`}
      >
        {content}
      </div>
    </motion.div>
  )
}
