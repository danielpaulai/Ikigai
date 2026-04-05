'use client'

import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b',
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-brand-pink/20 py-4 shadow-sm'
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center shadow-[0_0_15px_rgba(255,183,197,0.5)] group-hover:rotate-45 transition-transform duration-700">
            <span className="text-brand-plum font-serif font-bold text-sm italic">DP</span>
          </div>
          <span className="text-2xl font-serif italic tracking-tighter text-brand-plum">Daniel Paul</span>
        </div>

        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => scrollTo('vision')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-plum/60 hover:text-brand-pink-2 transition-colors"
          >
            What is Ikigai
          </button>
          <button
            type="button"
            onClick={() => scrollTo('how')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-plum/60 hover:text-brand-pink-2 transition-colors"
          >
            How it Works
          </button>
          <button
            type="button"
            onClick={() => scrollTo('action')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-plum/60 hover:text-brand-pink-2 transition-colors"
          >
            Find Yours
          </button>
        </div>

        <a
          href="https://newsletter.purelypersonal.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-brand-pink/30 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-plum hover:bg-brand-pink/10 transition-all"
        >
          Subscribe Free
        </a>

        <button
          type="button"
          className="md:hidden text-brand-plum/70 p-2"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-brand-pink/15 bg-white/90 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          <button type="button" onClick={() => scrollTo('vision')} className="text-left text-sm text-brand-plum/80">
            What is Ikigai
          </button>
          <button type="button" onClick={() => scrollTo('how')} className="text-left text-sm text-brand-plum/80">
            How it Works
          </button>
          <button type="button" onClick={() => scrollTo('action')} className="text-left text-sm text-brand-plum/80">
            Find Yours
          </button>
          <a
            href="https://newsletter.purelypersonal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center rounded-full border border-brand-pink/30 py-2 text-xs font-bold uppercase tracking-wider"
          >
            Subscribe Free
          </a>
        </div>
      )}
    </header>
  )
}
