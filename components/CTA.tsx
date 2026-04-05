'use client'

import { Instagram, Linkedin, Youtube } from 'lucide-react'

export default function CTA() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value ?? ''
    window.open(`https://newsletter.purelypersonal.ai?email=${encodeURIComponent(email)}`, '_blank')
  }

  return (
    <section id="cta" className="bg-brand-red py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-[44px] font-bold text-white leading-tight">
          Get the systems that top founders use.
        </h2>
        <p className="mt-5 text-white/90 text-lg max-w-[500px] mx-auto">
          1,000+ founders use Daniel Paul&apos;s weekly AI systems to grow their LinkedIn and generate leads. It&apos;s free.
        </p>

        <form onSubmit={handleSubscribe} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            name="email"
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 rounded-[14px] px-4 py-3 text-brand-dark text-sm placeholder:text-brand-silver outline-none"
          />
          <button
            type="submit"
            className="bg-brand-dark text-white font-semibold px-8 py-3 rounded-[14px] whitespace-nowrap hover:bg-black/90 transition-colors"
          >
            Subscribe Free →
          </button>
        </form>

        <p className="mt-6 text-white/85 text-sm">Join 1,000+ founders · No spam · Unsubscribe anytime</p>

        <div className="mt-10 flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/danielpaulai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="LinkedIn"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://www.instagram.com/danielpaul.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://www.youtube.com/@purelypersonalpod"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="YouTube"
          >
            <Youtube size={28} />
          </a>
        </div>
      </div>
    </section>
  )
}
