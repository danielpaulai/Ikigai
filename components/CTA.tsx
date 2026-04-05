'use client'

import { useState } from 'react'

export default function CTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value ?? ''
    const url =
      email.trim().length > 0
        ? `https://newsletter.purelypersonal.ai?email=${encodeURIComponent(email.trim())}`
        : 'https://newsletter.purelypersonal.ai'
    window.open(url, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="cta" className="py-16 md:py-20 bg-brand-plum">
      <div className="px-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif italic text-white leading-tight mb-3">
          Get the systems that top founders use.
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          1,000+ founders use Daniel Paul&apos;s weekly AI systems to grow on LinkedIn and generate leads. Free.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mb-4">
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-brand-pink/50"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-brand-pink text-brand-plum font-semibold text-sm hover:bg-brand-pink/80 transition-colors whitespace-nowrap"
          >
            Subscribe Free
          </button>
        </form>

        <p className="text-white/30 text-xs mb-1">No spam · Unsubscribe anytime</p>

        {submitted && (
          <p className="text-brand-pink text-xs mt-2">Opening the newsletter page for you.</p>
        )}

        <div className="flex justify-center gap-6 mt-8 text-white/40 text-xs font-medium uppercase tracking-wider">
          <a href="https://www.linkedin.com/in/danielpaulai/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/danielpaul.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">Instagram</a>
          <a href="https://www.youtube.com/@purelypersonalpod" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">YouTube</a>
        </div>
      </div>
    </section>
  )
}
