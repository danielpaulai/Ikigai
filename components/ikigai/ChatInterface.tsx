'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Pause, RotateCcw, Zap, Waves } from 'lucide-react'
import { useSessionStore } from '@/store/useSessionStore'
import { QUESTION_LIMITS, SHORT_QUESTIONS, LONG_QUESTIONS } from '@/lib/questions'
import type { IkigaiResults, Message } from '@/lib/types'
import { fetchJsonWithRetry } from '@/lib/fetch-with-retry'
import {
  fetchChatWithRetry,
  readNdjsonChatStream,
} from '@/lib/chat-stream-client'
import ChatBubble from './ChatBubble'
import CircleTransitionCard from './CircleTransitionCard'
import TypingIndicator from './TypingIndicator'
import VoiceButton from './VoiceButton'
import ProgressBar from './ProgressBar'
import type { QuestionEntry } from '@/lib/questions'

const ERR_GENERIC = 'Something broke on our side. Your answer is saved — hit send again.'
const ERR_CONN = 'Connection dropped. Send that again — I will pick it up.'
const ERR_EMPTY = "Let's keep going — say more when you're ready."
const ERR_CUTOFF = '\n\n— That response cut off. Send again when ready.'

interface CircleBoundary {
  afterUserMsg: number
  completedCircle: string
  completedIndex: number
  totalCircles: number
  nextCircle: string | null
}

function computeCircleBoundaries(questions: QuestionEntry[]): CircleBoundary[] {
  const boundaries: CircleBoundary[] = []
  const circles: string[] = []
  let current = ''

  for (const q of questions) {
    if (q.circleLabel !== current) {
      circles.push(q.circleLabel)
      current = q.circleLabel
    }
  }

  let qIdx = 0
  for (let ci = 0; ci < circles.length; ci++) {
    const circle = circles[ci]
    while (qIdx < questions.length && questions[qIdx].circleLabel === circle) {
      qIdx++
    }
    if (ci < circles.length - 1) {
      boundaries.push({
        afterUserMsg: qIdx,
        completedCircle: circle,
        completedIndex: ci,
        totalCircles: circles.length,
        nextCircle: circles[ci + 1] || null,
      })
    }
  }

  return boundaries
}

export default function ChatInterface() {
  const mode = useSessionStore((s) => s.mode)
  const messages = useSessionStore((s) => s.messages)
  const userMessageCount = useSessionStore((s) => s.userMessageCount)
  const addMessage = useSessionStore((s) => s.addMessage)
  const appendAssistantDelta = useSessionStore((s) => s.appendAssistantDelta)
  const flushAssistantStreaming = useSessionStore((s) => s.flushAssistantStreaming)
  const incrementUserCount = useSessionStore((s) => s.incrementUserCount)
  const setResults = useSessionStore((s) => s.setResults)
  const setGenerationError = useSessionStore((s) => s.setGenerationError)
  const setToolView = useSessionStore((s) => s.setToolView)

  const [input, setInput] = useState('')
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const limit = QUESTION_LIMITS[mode === 'long' ? 'long' : 'short']
  const progress = Math.min(userMessageCount / limit, 1)

  const questions = mode === 'long' ? LONG_QUESTIONS : SHORT_QUESTIONS
  const currentCircleLabel =
    userMessageCount < questions.length
      ? questions[userMessageCount].circleLabel
      : questions[questions.length - 1].circleLabel

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, isLoading])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const generateResults = async (history: Message[]) => {
    const started = Date.now()
    setGenerationError(null)
    setToolView('generating')
    try {
      const res = await fetchJsonWithRetry(
        '/api/generate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationHistory: history, mode: mode ?? 'short' }),
        },
        { retries: 3, baseMs: 800, retryOn: [429, 502, 503] }
      )
      const data = (await res.json().catch(() => ({}))) as {
        results?: unknown
        message?: string
        error?: string
      }
      if (res.ok && data.results) {
        setResults(data.results as IkigaiResults)
      } else {
        const msg =
          typeof data.message === 'string'
            ? data.message
            : 'Could not generate your profile. Try again in a moment.'
        setGenerationError(msg)
      }
    } catch (err) {
      console.error('Generate error:', err)
      setGenerationError('Connection dropped while building your profile. Try again.')
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
          'That answer holds so much. Give me just a moment — I am crafting something meaningful from everything you shared.',
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
      const res = await fetchChatWithRetry(
        '/api/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages, mode }),
        },
        { retries: 4, baseMs: 500, retryOn: [429, 502, 503] }
      )

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string }
        const msg = typeof data.message === 'string' ? data.message : ERR_GENERIC
        addMessage({ role: 'assistant', content: msg, timestamp: Date.now() })
        return
      }

      let first = true
      const result = await readNdjsonChatStream(res.body, (delta) => {
        if (first) {
          first = false
          setIsLoading(false)
          addMessage({ role: 'assistant', content: delta, timestamp: Date.now() })
        } else {
          appendAssistantDelta(delta)
        }
      })
      flushAssistantStreaming()

      if (!result.ok) {
        if (first) {
          addMessage({
            role: 'assistant',
            content: result.error || ERR_GENERIC,
            timestamp: Date.now(),
          })
        } else {
          appendAssistantDelta(ERR_CUTOFF)
          flushAssistantStreaming()
        }
        return
      }

      if (first) {
        addMessage({ role: 'assistant', content: ERR_EMPTY, timestamp: Date.now() })
      }
    } catch {
      addMessage({
        role: 'assistant',
        content: ERR_CONN,
        timestamp: Date.now(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  const handleSaveExit = () => {
    setShowSavedToast(true)
    setTimeout(() => {
      setShowSavedToast(false)
      setToolView('mode')
    }, 1500)
  }

  const handleReset = () => {
    if (userMessageCount > 0) {
      useSessionStore.getState().reset()
    }
  }

  const showTyping = isLoading || messages.length === 0

  const modeLabel = mode === 'long' ? 'Deep Dive' : 'Quick'
  const ModeIcon = mode === 'long' ? Waves : Zap

  return (
    <div className="flex flex-col h-[min(600px,80dvh)]">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-brand-pink/15 bg-brand-cream/50">
        <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center shadow-[0_0_10px_rgba(255,183,197,0.4)] flex-shrink-0">
          <span className="text-brand-plum font-serif font-bold text-xs italic">K</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-brand-plum font-medium text-sm font-serif italic truncate">
                  Kai · Ikigai Coach
                </span>
                <span className="inline-flex items-center gap-1 bg-brand-plum/8 text-brand-plum/50 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shrink-0">
                  <ModeIcon size={9} />
                  {modeLabel}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.12em] text-brand-pink-2 font-semibold block truncate">
                {currentCircleLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-brand-plum/40 text-xs">
                {userMessageCount}/{limit}
              </span>
              <button
                type="button"
                onClick={handleSaveExit}
                title="Save & continue later"
                className="w-7 h-7 rounded-lg bg-brand-plum/5 hover:bg-brand-plum/10 flex items-center justify-center text-brand-plum/40 hover:text-brand-plum/70 transition-colors"
              >
                <Pause size={12} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Start over"
                className="w-7 h-7 rounded-lg bg-brand-plum/5 hover:bg-brand-pink-2/20 flex items-center justify-center text-brand-plum/40 hover:text-brand-pink-2 transition-colors"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      {showSavedToast && (
        <div className="px-5 py-2 bg-brand-plum text-brand-pink text-xs text-center font-medium">
          Session saved. You can close this page and come back anytime.
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-6 flex flex-col gap-4 min-h-0 scroll-smooth"
        style={{ scrollBehavior: 'auto' }}
      >
        {(() => {
          const boundaries = computeCircleBoundaries(questions)
          const boundarySet = new Map(boundaries.map((b) => [b.afterUserMsg, b]))
          const elements: React.ReactNode[] = []
          let uCount = 0

          for (let i = 0; i < messages.length; i++) {
            const msg = messages[i]
            elements.push(
              <ChatBubble key={`${msg.timestamp}-${i}`} role={msg.role} content={msg.content} />
            )

            if (msg.role === 'user') {
              uCount++
              const boundary = boundarySet.get(uCount)
              if (boundary) {
                elements.push(
                  <CircleTransitionCard
                    key={`transition-${boundary.completedIndex}`}
                    completedCircle={boundary.completedCircle}
                    completedIndex={boundary.completedIndex}
                    totalCircles={boundary.totalCircles}
                    nextCircle={boundary.nextCircle}
                  />
                )
              }
            }
          }

          return elements
        })()}
        {showTyping && <TypingIndicator />}
      </div>

      <div className="border-t border-brand-pink/15 p-4 bg-brand-cream/50 flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share your thoughts..."
          rows={1}
          className="flex-1 resize-none bg-white/60 backdrop-blur-md border border-brand-pink/20 rounded-2xl px-5 py-3 text-brand-plum placeholder:text-brand-plum/30 text-sm focus:outline-none focus:ring-1 focus:ring-brand-pink focus:border-brand-pink transition-all min-h-[44px] max-h-[120px] not-italic"
        />
        <VoiceButton onTranscript={setInput} />
        <button
          type="button"
          onClick={() => void sendMessage()}
          disabled={!input.trim() || isLoading}
          className="w-11 h-11 rounded-full bg-brand-plum text-brand-pink flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-plum-2 transition-colors flex-shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
