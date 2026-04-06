'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, FileDown, Link2, Star, Zap, Waves } from 'lucide-react'
import { useSessionStore } from '@/store/useSessionStore'
import { track } from '@/lib/track'
import type { IkigaiResults } from '@/lib/types'
import PersonalizedDiagram from './PersonalizedDiagram'
import MomentumCards from './MomentumCards'
import SkillsRoadmap from './SkillsRoadmap'

interface ResultsViewProps {
  onReset: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function ResultsView({ onReset }: ResultsViewProps) {
  const results = useSessionStore((s) => s.results)
  const generationError = useSessionStore((s) => s.generationError)
  const sessionMode = useSessionStore((s) => s.mode)
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
      const sid = useSessionStore.getState().sessionId
      track('pdf_download', { sessionId: sid })
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
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      if (!data.url) throw new Error('No URL returned')
      setShareUrl(data.url)
      setLinkState('success')
      const sid = useSessionStore.getState().sessionId
      track('share_link', { sessionId: sid })
      try {
        await navigator.clipboard.writeText(data.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch { /* optional */ }
    } catch (e) {
      setLinkState('error')
      setLinkError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }, [results])

  if (!results) {
    return (
      <div className="p-10 text-center">
        <p className="text-brand-plum/65 mb-4 max-w-md mx-auto">
          {generationError ?? 'The report did not finish loading. Check your connection, then run the session again.'}
        </p>
        <button type="button" onClick={onReset} className="btn-primary">Start Again</button>
      </div>
    )
  }

  const r = results as IkigaiResults
  const isDeepDive = sessionMode === 'long'
  const ModeIcon = isDeepDive ? Waves : Zap
  const modeLabel = isDeepDive ? 'Deep Dive' : 'Quick Session'

  return (
    <div className="overflow-y-auto max-h-[min(90vh,900px)]">
      <div className="p-8 md:p-10 space-y-12">
        {/* Ikigai Statement + Diagram */}
        <motion.section className="text-center" initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-brand-plum/8 text-brand-plum/50 text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
              <ModeIcon size={10} />
              {modeLabel} Results
            </span>
          </div>
          <div className="capsule-tag">Your Ikigai</div>
          {r.circleKeywords && (
            <div className="max-w-md mx-auto mb-8">
              <PersonalizedDiagram keywords={r.circleKeywords} ikigaiStatement={r.ikigaiStatement} />
            </div>
          )}
          <div className="w-12 h-0.5 bg-brand-pink mx-auto mb-6" />
          <p className="font-serif italic text-brand-plum text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
            {r.ikigaiStatement}
          </p>
        </motion.section>

        {/* Archetype */}
        <motion.section className="bg-brand-plum rounded-4xl p-8 text-center" initial="hidden" animate="visible" custom={1} variants={fadeUp}>
          <p className="text-brand-pink/60 text-xs uppercase tracking-[0.3em] mb-3">Your Archetype</p>
          <h3 className="text-3xl font-serif italic text-white mb-2">{r.archetype.name}</h3>
          <p className="text-brand-pink font-medium mb-4">{r.archetype.tagline}</p>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto mb-6">{r.archetype.description}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {r.archetype.strengths.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full border border-brand-pink/30 bg-white/10 text-brand-pink text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
          {r.archetype.watchOut && (
            <div className="mt-4 mx-auto max-w-md bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
              <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold mb-1">Growth Edge</p>
              <p className="text-white/50 text-sm italic leading-relaxed">{r.archetype.watchOut}</p>
            </div>
          )}
        </motion.section>

        {/* Four Circles */}
        <motion.section initial="hidden" animate="visible" custom={2} variants={fadeUp}>
          <h4 className="text-brand-plum font-semibold mb-5 font-serif text-lg italic text-center">Your Four Circles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'love', label: 'What You Love', insight: r.circleInsights.love, kwKey: 'love' as const, borderColor: 'border-brand-pink/40', dotColor: 'bg-brand-pink-2' },
              { key: 'skills', label: "What You're Good At", insight: r.circleInsights.skills, kwKey: 'skills' as const, borderColor: 'border-brand-plum/20', dotColor: 'bg-brand-plum/40' },
              { key: 'mission', label: 'What the World Needs', insight: r.circleInsights.mission, kwKey: 'world' as const, borderColor: 'border-brand-pink/25', dotColor: 'bg-brand-plum/30' },
              { key: 'profession', label: 'What You Can Be Paid For', insight: r.circleInsights.profession, kwKey: 'money' as const, borderColor: 'border-brand-pink-2/30', dotColor: 'bg-brand-pink-2' },
            ].map((circle) => (
              <div key={circle.key} className={`p-5 rounded-3xl bg-white/60 border ${circle.borderColor}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${circle.dotColor}`} />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand-plum/50">{circle.label}</p>
                </div>
                {r.circleKeywords && r.circleKeywords[circle.kwKey]?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {r.circleKeywords[circle.kwKey].map((kw) => (
                      <span key={kw} className="text-[10px] bg-brand-pink/10 text-brand-pink-2 px-2 py-0.5 rounded-full font-medium">{kw}</span>
                    ))}
                  </div>
                )}
                <p className="text-brand-plum/75 text-sm leading-relaxed">{circle.insight}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Monetization — clean, no emojis */}
        <motion.section initial="hidden" animate="visible" custom={3} variants={fadeUp}>
          <p className="text-brand-plum/35 text-[10px] uppercase tracking-[0.3em] mb-5 text-center font-bold">
            How to Monetize Your Ikigai
          </p>
          <div className="flex flex-col gap-4">
            {r.monetizationStrategies.map((s, i) => (
              <div
                key={i}
                className={`relative border rounded-3xl p-6 ${
                  i === 0
                    ? 'bg-brand-plum/[0.03] border-brand-pink/30 shadow-[0_4px_20px_rgba(255,183,197,0.1)]'
                    : 'bg-white/60 border-brand-pink/15'
                }`}
              >
                {i === 0 && (
                  <div className="absolute -top-3 left-6 flex items-center gap-1.5 bg-brand-pink-2 text-white text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
                    <Star size={10} fill="currentColor" />
                    Start Here
                  </div>
                )}
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 ${
                    i === 0
                      ? 'bg-brand-plum text-brand-pink'
                      : 'bg-brand-plum/8 text-brand-plum/50'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif italic text-brand-plum text-base leading-snug">{s.title}</h4>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <span className="text-[10px] bg-brand-pink/12 text-brand-pink-2 px-2.5 py-0.5 rounded-full font-medium">
                        {s.timeToRevenue}
                      </span>
                      <span className="text-[10px] bg-brand-plum/8 text-brand-plum/60 px-2.5 py-0.5 rounded-full font-medium">
                        {s.incomeRange}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-brand-plum/55 text-sm leading-relaxed mb-3">{s.description}</p>
                <div className={`rounded-2xl px-4 py-3 ${i === 0 ? 'bg-brand-pink/10' : 'bg-brand-cream-2'}`}>
                  <p className="text-[9px] uppercase tracking-widest text-brand-plum/30 font-bold mb-1">First Offer</p>
                  <p className="text-brand-plum/80 text-sm font-medium">{s.firstOffer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Momentum Cards — the premium action flashcards */}
        {r.actionSteps && r.actionSteps.length > 0 && r.personalQuote && (
          <motion.section initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            <MomentumCards
              personalQuote={r.personalQuote}
              actionSteps={r.actionSteps}
              archetypeName={r.archetype.name}
            />
          </motion.section>
        )}

        {/* First Step (fallback if no actionSteps) */}
        {(!r.actionSteps || r.actionSteps.length === 0) && (
          <motion.section
            className="border-l-4 border-brand-pink bg-brand-cream-2 rounded-r-3xl px-6 py-5"
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
          >
            <p className="text-brand-pink-2 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Your First Step This Week</p>
            <p className="font-serif italic text-brand-plum text-lg leading-relaxed">{r.ninetyDayStep}</p>
          </motion.section>
        )}

        {/* Claude Skills Roadmap */}
        {r.skillsRoadmap && r.skillsRoadmap.claudeSkills && r.skillsRoadmap.claudeSkills.length > 0 && (
          <motion.section initial="hidden" animate="visible" custom={5} variants={fadeUp}>
            <SkillsRoadmap roadmap={r.skillsRoadmap} />
          </motion.section>
        )}

        {/* Closing */}
        <motion.p
          className="font-serif italic text-brand-plum/55 text-center text-base leading-relaxed max-w-xl mx-auto"
          initial="hidden" animate="visible" custom={6} variants={fadeUp}
        >
          {r.closingMessage}
        </motion.p>

        {/* Action buttons */}
        <motion.div className="space-y-4" initial="hidden" animate="visible" custom={7} variants={fadeUp}>
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
                <code className="flex-1 text-xs text-brand-plum break-all bg-white/60 px-3 py-2 rounded-lg border border-brand-pink/10">{shareUrl}</code>
                <button
                  type="button"
                  onClick={() => { void navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                  className="inline-flex items-center justify-center gap-1.5 text-brand-pink-2 text-sm font-medium px-3 py-2 shrink-0"
                >
                  <Copy size={16} /> Copy
                </button>
              </div>
            </div>
          )}

          {linkState === 'error' && linkError && <p className="text-center text-sm text-brand-pink-2">{linkError}</p>}
        </motion.div>

        {/* Links */}
        <div className="text-center space-y-3 pb-4">
          <a href="https://www.linkedin.com/in/danielpaulai/" target="_blank" rel="noopener noreferrer"
            className="block text-brand-pink-2 hover:text-brand-plum text-sm italic font-serif transition-colors">
            Follow Daniel Paul on LinkedIn →
          </a>
          <a href="https://newsletter.purelypersonal.ai" target="_blank" rel="noopener noreferrer"
            className="block text-brand-plum/50 hover:text-brand-plum text-sm italic transition-colors">
            Get weekly AI systems for founders →
          </a>
          <a href="https://danielpaul.ai" target="_blank" rel="noopener noreferrer"
            className="block text-brand-plum/40 hover:text-brand-plum text-xs transition-colors">
            danielpaul.ai
          </a>
        </div>

        <div className="flex justify-center">
          <button type="button" onClick={onReset} className="btn-secondary">Start Again</button>
        </div>
      </div>
    </div>
  )
}
