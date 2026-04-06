'use client'

import { useCallback, useState } from 'react'
import { Copy, FileDown, Link2 } from 'lucide-react'
import { useSessionStore } from '@/store/useSessionStore'
import type { IkigaiResults } from '@/lib/types'

interface ResultsViewProps {
  onReset: () => void
}

export default function ResultsView({ onReset }: ResultsViewProps) {
  const results = useSessionStore((s) => s.results)
  const generationError = useSessionStore((s) => s.generationError)
  const [linkState, setLinkState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [linkError, setLinkError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleDownload = useCallback(async () => {
    if (!results) return
    setDownloadError(null)
    try {
      const { downloadIkigaiPDF } = await import('./IkigaiPDF')
      await downloadIkigaiPDF(results)
    } catch (err) {
      console.error('PDF download error:', err)
      setDownloadError('Could not generate the PDF. Try again in a moment.')
    }
  }, [results])

  const handleShareableLink = useCallback(async () => {
    if (!results) return
    setLinkState('loading')
    setLinkError(null)
    setShareUrl(null)
    try {
      const { getIkigaiPdfBlob } = await import('./IkigaiPDF')
      const blob = await getIkigaiPdfBlob(results)
      const form = new FormData()
      form.append('file', new File([blob], 'my-ikigai-report-danielpaul.pdf', { type: 'application/pdf' }))

      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: form,
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }
      if (!data.url) {
        throw new Error('No URL returned')
      }
      setShareUrl(data.url)
      setLinkState('success')
      try {
        await navigator.clipboard.writeText(data.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch {
        /* optional */
      }
    } catch (e) {
      setLinkState('error')
      setLinkError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }, [results])

  if (!results) {
    return (
      <div className="p-10 text-center">
        <p className="text-brand-plum/65 mb-4 max-w-md mx-auto">
          {generationError ??
            'The report did not finish loading. Check your connection, then run the session again.'}
        </p>
        <button type="button" onClick={onReset} className="btn-primary">
          Start Again
        </button>
      </div>
    )
  }

  const r = results as IkigaiResults

  return (
    <div className="overflow-y-auto max-h-[min(90vh,900px)]">
      <div className="p-8 md:p-10 space-y-12">
        <section className="text-center">
          <div className="capsule-tag">Your Ikigai</div>
          <div className="w-12 h-0.5 bg-brand-pink mx-auto mb-8" />
          <p className="font-serif italic text-brand-plum text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
            {r.ikigaiStatement}
          </p>
        </section>

        <section className="bg-brand-plum rounded-4xl p-8 text-center">
          <p className="text-brand-pink/60 text-xs uppercase tracking-[0.3em] mb-3">Your Archetype</p>
          <h3 className="text-3xl font-serif italic text-white mb-2">{r.archetype.name}</h3>
          <p className="text-brand-pink font-medium mb-4">{r.archetype.tagline}</p>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto mb-6">{r.archetype.description}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {r.archetype.strengths.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full border border-brand-pink/30 bg-white/10 text-brand-pink text-xs">
                {s}
              </span>
            ))}
          </div>
          {r.archetype.watchOut && (
            <p className="text-white/40 text-xs italic mt-4">Growth edge: {r.archetype.watchOut}</p>
          )}
        </section>

        <section>
          <h4 className="text-brand-plum font-semibold mb-4 font-serif text-lg italic">Your four circles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white/60 border border-brand-pink/30">
              <p className="text-brand-pink-2 text-[10px] uppercase tracking-widest mb-2 font-bold">What you love</p>
              <p className="text-brand-plum text-sm leading-relaxed italic font-serif">{r.circleInsights.love}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white/60 border border-brand-pink/20">
              <p className="text-brand-plum/50 text-[10px] uppercase tracking-widest mb-2 font-bold">What you&apos;re good at</p>
              <p className="text-brand-plum text-sm leading-relaxed italic font-serif">{r.circleInsights.skills}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white/60 border border-brand-pink/25">
              <p className="text-brand-plum/70 text-[10px] uppercase tracking-widest mb-2 font-bold">What the world needs</p>
              <p className="text-brand-plum text-sm leading-relaxed italic font-serif">{r.circleInsights.mission}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white/60 border border-brand-pink/15">
              <p className="text-brand-pink-2 text-[10px] uppercase tracking-widest mb-2 font-bold">What you can be paid for</p>
              <p className="text-brand-plum text-sm leading-relaxed italic font-serif">{r.circleInsights.profession}</p>
            </div>
          </div>
        </section>

        <section>
          <p className="text-brand-plum/40 text-[10px] uppercase tracking-[0.3em] mb-4 text-center font-bold">How to Monetize Your Ikigai</p>
          <div className="flex flex-col gap-4">
            {r.monetizationStrategies.map((s, i) => (
              <div key={i} className="bg-white/60 border border-brand-pink/15 rounded-3xl p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <h4 className="font-serif italic text-brand-plum text-lg flex-1 min-w-[120px]">{s.title}</h4>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-brand-pink/15 text-brand-pink-2 px-2 py-0.5 rounded-full font-medium">⏱ {s.timeToRevenue}</span>
                    <span className="text-[10px] bg-brand-plum/10 text-brand-plum/70 px-2 py-0.5 rounded-full font-medium">{s.incomeRange}</span>
                  </div>
                </div>
                <p className="text-brand-plum/60 text-sm leading-relaxed mb-2">{s.description}</p>
                <p className="text-brand-pink-2 text-sm font-medium">First offer: {s.firstOffer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-l-4 border-brand-pink bg-brand-cream-2 rounded-r-3xl px-6 py-5">
          <p className="text-brand-pink-2 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Your First Step This Week</p>
          <p className="font-serif italic text-brand-plum text-lg leading-relaxed">{r.ninetyDayStep}</p>
        </section>

        <p className="font-serif italic text-brand-plum/60 text-center text-base leading-relaxed max-w-xl mx-auto">
          {r.closingMessage}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <button type="button" onClick={() => void handleDownload()} className="btn-primary">
            <FileDown size={18} />
            Download My Ikigai Report
          </button>
          <button
            type="button"
            onClick={() => void handleShareableLink()}
            disabled={linkState === 'loading'}
            className="btn-secondary disabled:opacity-50"
          >
            <Link2 size={18} className={linkState === 'loading' ? 'animate-pulse' : ''} />
            {linkState === 'loading' ? 'Uploading…' : 'Get shareable link'}
          </button>
        </div>

        {downloadError && <p className="text-center text-sm text-brand-pink-2">{downloadError}</p>}

        {linkState === 'success' && shareUrl && (
          <div className="rounded-xl border border-brand-pink/20 bg-brand-cream/80 px-4 py-3 text-sm">
            <p className="text-brand-plum/60 mb-2">{copied ? 'Link copied to clipboard.' : 'Your link (7-day access):'}</p>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <code className="flex-1 text-xs text-brand-plum break-all bg-white/60 px-3 py-2 rounded-lg border border-brand-pink/10">
                {shareUrl}
              </code>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(shareUrl)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className="inline-flex items-center justify-center gap-1.5 text-brand-pink-2 text-sm font-medium px-3 py-2 shrink-0"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
          </div>
        )}

        {linkState === 'error' && linkError && <p className="text-center text-sm text-brand-pink-2">{linkError}</p>}

        <div className="text-center space-y-3 pb-4">
          <a
            href="https://www.linkedin.com/in/danielpaulai/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-brand-pink-2 hover:text-brand-plum text-sm italic font-serif transition-colors"
          >
            Follow Daniel Paul on LinkedIn →
          </a>
          <a
            href="https://newsletter.purelypersonal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-brand-plum/50 hover:text-brand-plum text-sm italic transition-colors"
          >
            Get weekly AI systems for founders →
          </a>
          <a
            href="https://danielpaul.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-brand-plum/40 hover:text-brand-plum text-xs transition-colors"
          >
            danielpaul.ai
          </a>
        </div>

        <div className="flex justify-center">
          <button type="button" onClick={onReset} className="btn-secondary">
            Start Again
          </button>
        </div>
      </div>
    </div>
  )
}
