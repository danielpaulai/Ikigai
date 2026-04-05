'use client'

import { useState } from 'react'

export default function CTA() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value ?? ''
    const url =
      email.trim().length > 0
        ? `https://newsletter.purelypersonal.ai?email=${encodeURIComponent(email.trim())}`
        : 'https://newsletter.purelypersonal.ai'
    window.open(url, '_blank')
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="cta" className="py-24 md:py-32 bg-brand-daniel relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-black/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="px-6 max-w-3xl mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight mb-6">
          Get the systems that top founders use.
        </h2>
        <p className="text-white/85 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          1,000+ founders use Daniel Paul&apos;s weekly AI systems to grow on LinkedIn and generate leads. It&apos;s free.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            className="flex-1 px-5 py-3.5 rounded-xl bg-white text-brand-plum placeholder:text-brand-plum/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-brand-plum text-white font-semibold text-sm hover:bg-brand-plum-2 transition-colors whitespace-nowrap"
          >
            Subscribe Free →
          </button>
        </form>

        <p className="text-white/70 text-sm mb-2">Join 1,000+ founders · No spam · Unsubscribe anytime</p>

        {isSubmitted && (
          <p className="text-white text-sm font-medium bg-white/10 rounded-full py-2 px-6 inline-block border border-white/20">
            Opening the newsletter page for you.
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/80 text-sm font-medium uppercase tracking-widest">
          <a
            href="https://www.linkedin.com/in/danielpaulai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/danielpaul.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@purelypersonalpod"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>
    </section>
  )
}
