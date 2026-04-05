'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useSessionStore } from '@/store/useSessionStore'
import { QUESTION_LIMITS } from '@/lib/questions'
import type { Message } from '@/lib/types'
import ChatBubble from './ChatBubble'
import TypingIndicator from './TypingIndicator'
import VoiceButton from './VoiceButton'
import ProgressBar from './ProgressBar'

export default function ChatInterface() {
  const mode = useSessionStore((s) => s.mode)
  const messages = useSessionStore((s) => s.messages)
  const userMessageCount = useSessionStore((s) => s.userMessageCount)
  const addMessage = useSessionStore((s) => s.addMessage)
  const incrementUserCount = useSessionStore((s) => s.incrementUserCount)
  const setResults = useSessionStore((s) => s.setResults)
  const setToolView = useSessionStore((s) => s.setToolView)

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const limit = QUESTION_LIMITS[mode === 'long' ? 'long' : 'short']
  const progress = Math.min(userMessageCount / limit, 1)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const generateResults = async (history: Message[]) => {
    const started = Date.now()
    setToolView('generating')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationHistory: history }),
      })
      const data = await res.json()
      if (data.results) {
        setResults(data.results)
      }
    } catch (err) {
      console.error('Generate error:', err)
    }
    const elapsed = Date.now() - started
    await new Promise((r) => setTimeout(r, Math.max(0, 3000 - elapsed)))
    setToolView('results')
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !mode) return

    const userContent = input.trim()
    setInput('')

    const nextCount = userMessageCount + 1
    incrementUserCount()

    const userMsg: Message = { role: 'user', content: userContent, timestamp: Date.now() }
    addMessage(userMsg)

    const updatedMessages = useSessionStore.getState().messages

    if (nextCount >= limit) {
      const transitionMsg: Message = {
        role: 'assistant',
        content:
          "That answer holds so much. Give me just a moment — I'm crafting something meaningful from everything you've shared...",
        timestamp: Date.now(),
      }
      addMessage(transitionMsg)
      await generateResults(updatedMessages)
      return
    }

    setIsLoading(true)
    try {
      const apiMessages = [
        { role: 'user' as const, content: "I'm ready to begin." },
        ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
      ]
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, mode }),
      })
      const data = await res.json()
      const text = data.message ?? data.error ?? "Thank you for that. Let's continue..."
      addMessage({ role: 'assistant', content: text, timestamp: Date.now() })
    } catch {
      addMessage({
        role: 'assistant',
        content: "Thank you for that. Let's continue...",
        timestamp: Date.now(),
      })
    }
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  return (
    <div className="bg-brand-smoke rounded-2xl overflow-hidden border border-brand-silver/10">
      <div className="bg-brand-dark px-4 py-3 flex items-center gap-3 border-b border-brand-silver/10 min-h-[56px]">
        <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-sm font-bold font-display flex-shrink-0">
          K
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-white text-sm font-medium">Kai · Ikigai Coach</span>
            <span className="text-brand-silver text-xs whitespace-nowrap">
              {userMessageCount} of {limit}
            </span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      <div className="min-h-[380px] max-h-[480px] overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth">
        {messages.map((msg, i) => (
          <ChatBubble key={`${msg.timestamp}-${i}`} role={msg.role} content={msg.content} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative bg-brand-dark border-t border-brand-silver/10 p-3 flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share your thoughts..."
          rows={1}
          className="flex-1 bg-brand-smoke text-white placeholder-brand-silver/50 text-sm rounded-xl px-4 py-3 resize-none outline-none focus:ring-1 focus:ring-brand-red border border-brand-silver/10 focus:border-brand-red transition-colors duration-200 min-h-[44px] max-h-[120px]"
        />
        <VoiceButton onTranscript={setInput} />
        <button
          type="button"
          onClick={() => void sendMessage()}
          disabled={!input.trim() || isLoading}
          className="w-11 h-11 rounded-full bg-brand-red text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors duration-200 flex-shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
