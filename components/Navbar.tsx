'use client'

import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,183,197,0.2)] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 rounded-full bg-brand-plum flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-brand-pink font-serif font-bold text-xs italic">DP</span>
          </div>
          <span className="text-lg font-serif italic tracking-tight text-brand-plum hidden sm:block">Daniel Paul</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo('action')}
            className="px-5 py-2 rounded-full bg-brand-plum text-brand-pink text-xs font-semibold hover:bg-brand-plum-2 transition-colors"
          >
            Find Your Ikigai
          </button>
          <a
            href="https://newsletter.purelypersonal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full border border-brand-plum/15 text-brand-plum/70 text-xs font-semibold hover:bg-brand-plum/5 transition-colors"
          >
            Subscribe
          </a>
        </div>
      </div>
    </header>
  )
}
