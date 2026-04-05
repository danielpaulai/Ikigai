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
  const [linkState, setLinkState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [linkError, setLinkError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!results) return
    const { downloadIkigaiPDF } = await import('./IkigaiPDF')
    await downloadIkigaiPDF(results)
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
        /* clipboard optional */
      }
    } catch (e) {
      setLinkState('error')
      setLinkError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }, [results])

  if (!results) {
    return (
      <div className="bg-brand-smoke rounded-3xl border border-brand-silver/10 p-10 text-center">
        <p className="text-brand-silver mb-6">We couldn&apos;t generate your report. Please check your connection and try again.</p>
        <button
          type="button"
          onClick={onReset}
          className="brand-gradient text-white font-semibold px-8 py-3 rounded-xl"
        >
          Start Again
        </button>
      </div>
    )
  }

  const r = results as IkigaiResults

  return (
    <div className="bg-brand-smoke rounded-3xl border border-brand-silver/10 overflow-hidden max-h-[min(90vh,900px)] overflow-y-auto">
      <div className="p-8 md:p-10 space-y-12">
        <section className="text-center">
          <p className="text-brand-red text-xs font-semibold uppercase tracking-[0.2em]">Your Ikigai</p>
          <div className="mx-auto mt-4 h-0.5 w-[60px] bg-brand-red rounded-full" />
          <p className="mt-8 font-display text-xl md:text-[22px] text-white italic leading-relaxed max-w-[560px] mx-auto">
            {r.ikigaiStatement}
          </p>
        </section>

        <section className="rounded-2xl p-6 md:p-8 bg-brand-charcoal border border-brand-red/40">
          <h3 className="font-display text-2xl md:text-[28px] font-bold text-white">{r.archetype.name}</h3>
          <p className="text-brand-red font-medium mt-2">{r.archetype.tagline}</p>
          <p className="text-brand-silver text-[15px] mt-4 leading-relaxed">{r.archetype.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {r.archetype.strengths.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full bg-brand-charcoal border border-brand-red/50 text-brand-silver"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-6 border-l-2 border-brand-silver/40 bg-brand-smoke/50 rounded-r-lg px-4 py-3 text-brand-silver text-sm">
            <span className="text-white font-medium">Growth edge: </span>
            {r.archetype.watchOut}
          </div>
        </section>

        <section>
          <h4 className="text-white font-semibold mb-4 font-display text-lg">Your four circles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border-t-4 border-t-brand-red bg-brand-charcoal p-4">
              <p className="text-brand-red text-xs font-semibold uppercase mb-2">What you love</p>
              <p className="text-brand-silver text-sm leading-relaxed">{r.circleInsights.love}</p>
            </div>
            <div className="rounded-xl border-t-4 border-t-brand-silver bg-brand-charcoal p-4">
              <p className="text-brand-silver text-xs font-semibold uppercase mb-2">What you&apos;re good at</p>
              <p className="text-brand-silver text-sm leading-relaxed">{r.circleInsights.skills}</p>
            </div>
            <div className="rounded-xl border-t-4 border-t-white bg-brand-charcoal p-4">
              <p className="text-white text-xs font-semibold uppercase mb-2">What the world needs</p>
              <p className="text-brand-silver text-sm leading-relaxed">{r.circleInsights.mission}</p>
            </div>
            <div className="rounded-xl border-t-4 border-t-brand-red bg-brand-charcoal p-4">
              <p className="text-brand-red text-xs font-semibold uppercase mb-2">What you can be paid for</p>
              <p className="text-brand-silver text-sm leading-relaxed">{r.circleInsights.profession}</p>
            </div>
          </div>
        </section>

        <section>
          <p className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-6">How to monetize your Ikigai</p>
          <div className="space-y-5">
            {r.monetizationStrategies.map((s, i) => (
              <div key={i} className="rounded-2xl bg-brand-charcoal border border-brand-silver/10 p-5">
                <div className="flex items-start gap-2">
                  <span className="text-xl">{s.icon}</span>
                  <h5 className="text-white font-bold text-lg">{s.title}</h5>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="bg-brand-smoke text-brand-silver px-2 py-1 rounded">⏱ {s.timeToRevenue}</span>
                  <span className="bg-brand-smoke text-brand-silver px-2 py-1 rounded">💰 {s.incomeRange}</span>
                </div>
                <p className="text-brand-silver text-sm mt-3 leading-relaxed">{s.description}</p>
                <p className="mt-3 text-sm">
                  <span className="text-brand-silver">First Offer: </span>
                  <span className="text-brand-red font-medium">{s.firstOffer}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative bg-brand-dark rounded-2xl border border-brand-silver/10 p-6 md:p-8 overflow-hidden">
          <span className="absolute top-4 right-4 text-brand-red text-xs font-bold uppercase tracking-wide">
            Your 90-day first step
          </span>
          <div className="border-l-[3px] border-brand-red pl-4 pt-6">
            <p className="font-display text-white text-lg leading-relaxed">{r.ninetyDayStep}</p>
          </div>
        </section>

        <p className="text-center text-brand-silver text-[17px] italic max-w-[480px] mx-auto leading-relaxed">
          {r.closingMessage}
        </p>

        <div className="flex flex-col gap-4 justify-center items-stretch sm:items-center pt-4 max-w-lg mx-auto w-full">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <button
              type="button"
              onClick={() => void handleDownload()}
              className="inline-flex items-center justify-center gap-2 brand-gradient text-white font-semibold px-8 py-3.5 rounded-xl w-full sm:w-auto"
            >
              <FileDown size={18} />
              Download My Ikigai Report
            </button>
            <button
              type="button"
              onClick={() => void handleShareableLink()}
              disabled={linkState === 'loading'}
              className="inline-flex items-center justify-center gap-2 border border-brand-red/50 bg-brand-charcoal text-white font-semibold px-8 py-3.5 rounded-xl w-full sm:w-auto hover:bg-brand-smoke/80 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Link2 size={18} className={linkState === 'loading' ? 'animate-pulse' : ''} />
              {linkState === 'loading' ? 'Uploading…' : 'Get shareable link'}
            </button>
          </div>

          {linkState === 'success' && shareUrl && (
            <div className="rounded-xl border border-brand-silver/20 bg-brand-dark/50 px-4 py-3 text-sm">
              <p className="text-brand-silver mb-2">
                {copied ? 'Link copied to clipboard.' : 'Your link (7-day access):'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                <code className="flex-1 text-xs text-white break-all bg-brand-smoke/50 px-3 py-2 rounded-lg border border-brand-silver/10">
                  {shareUrl}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(shareUrl)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="inline-flex items-center justify-center gap-1.5 text-brand-red text-sm font-medium px-3 py-2 hover:text-white shrink-0"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </div>
          )}

          {linkState === 'error' && linkError && (
            <p className="text-center text-sm text-red-400/90">{linkError}</p>
          )}

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center border border-brand-silver/40 text-white font-semibold px-8 py-3.5 rounded-xl w-full sm:w-auto hover:bg-white/5 mx-auto"
          >
            Start Again
          </button>
        </div>

        <div className="text-center space-y-2 pb-4">
          <a
            href="https://www.linkedin.com/in/danielpaulai/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-brand-silver hover:text-white text-sm"
          >
            Follow Daniel Paul on LinkedIn →
          </a>
          <a
            href="https://newsletter.purelypersonal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-brand-silver hover:text-white text-sm"
          >
            Get weekly AI systems for founders →
          </a>
        </div>
      </div>
    </div>
  )
}
