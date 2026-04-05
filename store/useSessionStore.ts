import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IkigaiResults, Message, Mode } from '@/lib/types'

interface SessionState {
  mode: Mode
  messages: Message[]
  userMessageCount: number
  results: IkigaiResults | null
  toolView: 'mode' | 'chat' | 'generating' | 'results'
  setMode: (mode: Mode) => void
  setToolView: (view: 'mode' | 'chat' | 'generating' | 'results') => void
  addMessage: (message: Message) => void
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
      toolView: 'mode',
      setMode: (mode) => set({ mode }),
      setToolView: (view) => set({ toolView: view }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      incrementUserCount: () =>
        set((state) => ({
          userMessageCount: state.userMessageCount + 1,
        })),
      setResults: (results) => set({ results }),
      reset: () =>
        set({
          mode: null,
          messages: [],
          userMessageCount: 0,
          results: null,
          toolView: 'mode',
        }),
    }),
    { name: 'ikigai-session-dp' }
  )
)
