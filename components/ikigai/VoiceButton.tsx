'use client'

import { useRef, useState } from 'react'
import { Mic, MicOff } from 'lucide-react'

interface VoiceButtonProps {
  onTranscript: (text: string) => void
}

export default function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const toggle = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognitionAPI) {
      setError('Voice input works in Chrome and Edge')
      setTimeout(() => setError(''), 3000)
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      onTranscript(transcript)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => {
      setIsListening(false)
      setError('Voice recognition stopped')
      setTimeout(() => setError(''), 2000)
    }

    recognition.start()
    recognitionRef.current = recognition
    setIsListening(true)
  }

  return (
    <div className="relative">
      {error && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-plum text-brand-pink text-xs px-3 py-1.5 rounded-full whitespace-nowrap border border-brand-pink/20 z-10">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 text-lg ${
          isListening
            ? 'bg-brand-pink-2 text-white shadow-[0_0_0_4px_rgba(255,141,161,0.3)] animate-pulse-slow'
            : 'bg-white border border-brand-pink/30 text-brand-pink hover:bg-brand-pink/10'
        }`}
        title={isListening ? 'Stop listening' : 'Use voice input'}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
      {isListening && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-brand-pink-2 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg z-10">
          Listening — tap mic to stop
        </div>
      )}
    </div>
  )
}
