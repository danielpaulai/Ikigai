import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IkigaiResults, Message, Mode } from '@/lib/types'

/** Buffers streaming tokens; one RAF update per frame keeps UI smooth and persist writes low. */
let assistantStreamBuffer = ''
let assistantStreamRaf: number | null = null

function clearAssistantStreamRaf() {
  if (assistantStreamRaf !== null) {
    cancelAnimationFrame(assistantStreamRaf)
    assistantStreamRaf = null
  }
}

interface SessionState {
  mode: Mode
  messages: Message[]
  userMessageCount: number
  results: IkigaiResults | null
  /** Last generate failure (not persisted — cleared on success / reset). */
  generationError: string | null
  toolView: 'mode' | 'chat' | 'generating' | 'results'
  setMode: (mode: Mode) => void
  setToolView: (view: 'mode' | 'chat' | 'generating' | 'results') => void
  setGenerationError: (message: string | null) => void
  addMessage: (message: Message) => void
  /** Append to the last assistant message (streaming tokens). */
  appendAssistantDelta: (delta: string) => void
  /** Apply any buffered streaming text immediately (call when a stream ends or errors). */
  flushAssistantStreaming: () => void
  incrementUserCount: () => void
  setResults: (results: IkigaiResults) => void
  reset: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      mode: null,
      messages: [],
      userMessageCount: 0,
      results: null,
      generationError: null,
      toolView: 'mode',
      setMode: (mode) => set({ mode }),
      setToolView: (view) => set({ toolView: view }),
      setGenerationError: (message) => set({ generationError: message }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      appendAssistantDelta: (delta) => {
        if (!delta) return
        assistantStreamBuffer += delta
        if (assistantStreamRaf !== null) return
        assistantStreamRaf = requestAnimationFrame(() => {
          assistantStreamRaf = null
          const chunk = assistantStreamBuffer
          assistantStreamBuffer = ''
          if (!chunk) return
          set((state) => {
            const msgs = [...state.messages]
            if (msgs.length === 0) return state
            const i = msgs.length - 1
            if (msgs[i].role !== 'assistant') return state
            msgs[i] = { ...msgs[i], content: msgs[i].content + chunk }
            return { messages: msgs }
          })
        })
      },
      flushAssistantStreaming: () => {
        clearAssistantStreamRaf()
        const chunk = assistantStreamBuffer
        assistantStreamBuffer = ''
        if (!chunk) return
        set((state) => {
          const msgs = [...state.messages]
          if (msgs.length === 0) return state
          const i = msgs.length - 1
          if (msgs[i].role !== 'assistant') return state
          msgs[i] = { ...msgs[i], content: msgs[i].content + chunk }
          return { messages: msgs }
        })
      },
      incrementUserCount: () =>
        set((state) => ({
          userMessageCount: state.userMessageCount + 1,
        })),
      setResults: (results) => set({ results, generationError: null }),
      reset: () => {
        clearAssistantStreamRaf()
        assistantStreamBuffer = ''
        set({
          mode: null,
          messages: [],
          userMessageCount: 0,
          results: null,
          generationError: null,
          toolView: 'mode',
        })
      },
    }),
    {
      name: 'ikigai-session-dp',
      partialize: (state) => ({
        mode: state.mode,
        messages: state.messages,
        userMessageCount: state.userMessageCount,
        results: state.results,
        toolView: state.toolView,
      }),
    }
  )
)
