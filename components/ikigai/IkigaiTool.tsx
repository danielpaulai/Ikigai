'use client'

import {
  fetchChatWithRetry,
  readNdjsonChatStream,
} from '@/lib/chat-stream-client'
import { useSessionStore } from '@/store/useSessionStore'
import ModeSelector from './ModeSelector'
import ChatInterface from './ChatInterface'
import GeneratingView from './GeneratingView'
import ResultsView from './ResultsView'

function GlassShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/70 backdrop-blur-2xl border border-brand-pink/20 rounded-5xl shadow-[0_20px_60px_rgba(255,183,197,0.2)] overflow-hidden">
      {children}
    </div>
  )
}

export default function IkigaiTool() {
  const toolView = useSessionStore((s) => s.toolView)
  const addMessage = useSessionStore((s) => s.addMessage)
  const appendAssistantDelta = useSessionStore((s) => s.appendAssistantDelta)
  const flushAssistantStreaming = useSessionStore((s) => s.flushAssistantStreaming)
  const setToolView = useSessionStore((s) => s.setToolView)

  const startSession = async (selectedMode: 'short' | 'long') => {
    useSessionStore.getState().setMode(selectedMode)
    setToolView('chat')

    const fallback =
      'You showed up. First question: what activities make you lose track of time — where hours disappear?'

    try {
      const res = await fetchChatWithRetry(
        '/api/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ role: 'user', content: "I'm ready to begin." }],
            mode: selectedMode,
          }),
        },
        { retries: 4, baseMs: 500, retryOn: [429, 502, 503] }
      )

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string }
        const text = typeof data.message === 'string' ? data.message : fallback
        addMessage({ role: 'assistant', content: text, timestamp: Date.now() })
        return
      }

      let first = true
      const result = await readNdjsonChatStream(res.body, (delta) => {
        if (first) {
          first = false
          addMessage({ role: 'assistant', content: delta, timestamp: Date.now() })
        } else {
          appendAssistantDelta(delta)
        }
      })
      flushAssistantStreaming()

      if (!result.ok) {
        if (first) {
          addMessage({ role: 'assistant', content: result.error || fallback, timestamp: Date.now() })
        } else {
          appendAssistantDelta('\n\n— That cut off. Send again when ready.')
          flushAssistantStreaming()
        }
        return
      }

      if (first) {
        addMessage({ role: 'assistant', content: fallback, timestamp: Date.now() })
      }
    } catch {
      addMessage({
        role: 'assistant',
        content: fallback,
        timestamp: Date.now(),
      })
    }
  }

  const handleReset = () => {
    useSessionStore.getState().reset()
  }

  if (toolView === 'mode') {
    return (
      <GlassShell>
        <ModeSelector onSelect={startSession} />
      </GlassShell>
    )
  }
  if (toolView === 'chat') {
    return (
      <GlassShell>
        <ChatInterface />
      </GlassShell>
    )
  }
  if (toolView === 'generating') {
    return (
      <GlassShell>
        <GeneratingView />
      </GlassShell>
    )
  }
  if (toolView === 'results') {
    return (
      <GlassShell>
        <ResultsView onReset={handleReset} />
      </GlassShell>
    )
  }

  return (
    <GlassShell>
      <ModeSelector onSelect={startSession} />
    </GlassShell>
  )
}
