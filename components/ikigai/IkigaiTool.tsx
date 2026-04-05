'use client'

import { useSessionStore } from '@/store/useSessionStore'
import ModeSelector from './ModeSelector'
import ChatInterface from './ChatInterface'
import GeneratingView from './GeneratingView'
import ResultsView from './ResultsView'

export default function IkigaiTool() {
  const toolView = useSessionStore((s) => s.toolView)
  const addMessage = useSessionStore((s) => s.addMessage)
  const setToolView = useSessionStore((s) => s.setToolView)

  const startSession = async (selectedMode: 'short' | 'long') => {
    useSessionStore.getState().setMode(selectedMode)
    setToolView('chat')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: "I'm ready to begin." }],
          mode: selectedMode,
        }),
      })
      const data = await res.json()
      const fallback =
        "Something meaningful is about to happen. Let's start with this: What activities make you completely lose track of time — where hours feel like minutes?"
      const text = res.ok && typeof data.message === 'string' ? data.message : fallback
      addMessage({ role: 'assistant', content: text, timestamp: Date.now() })
    } catch {
      addMessage({
        role: 'assistant',
        content:
          "Something meaningful is about to happen. Let's start with this: What activities make you completely lose track of time — where hours feel like minutes?",
        timestamp: Date.now(),
      })
    }
  }

  const handleReset = () => {
    useSessionStore.getState().reset()
  }

  if (toolView === 'mode') return <ModeSelector onSelect={startSession} />
  if (toolView === 'chat') return <ChatInterface />
  if (toolView === 'generating') return <GeneratingView />
  if (toolView === 'results') return <ResultsView onReset={handleReset} />

  return <ModeSelector onSelect={startSession} />
}
