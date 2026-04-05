'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-silver/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm font-display">DP</span>
          </div>
          <span className="text-white font-medium text-[15px] font-sans">Daniel Paul</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => scrollTo('vision')}
            className="text-brand-silver hover:text-white text-sm transition-colors duration-200"
          >
            What is Ikigai
          </button>
          <button
            type="button"
            onClick={() => scrollTo('how')}
            className="text-brand-silver hover:text-white text-sm transition-colors duration-200"
          >
            How it Works
          </button>
          <button
            type="button"
            onClick={() => scrollTo('action')}
            className="text-brand-silver hover:text-white text-sm transition-colors duration-200"
          >
            Find Yours
          </button>
          <a
            href="https://newsletter.purelypersonal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-red text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Subscribe Free
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-brand-silver hover:text-white"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-brand-charcoal border-t border-brand-silver/10 px-6 py-4 flex flex-col gap-4">
          <button type="button" onClick={() => scrollTo('vision')} className="text-brand-silver hover:text-white text-sm text-left">
            What is Ikigai
          </button>
          <button type="button" onClick={() => scrollTo('how')} className="text-brand-silver hover:text-white text-sm text-left">
            How it Works
          </button>
          <button type="button" onClick={() => scrollTo('action')} className="text-brand-silver hover:text-white text-sm text-left">
            Find Yours
          </button>
          <a
            href="https://newsletter.purelypersonal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-red text-white text-sm font-medium px-4 py-2 rounded-lg text-center"
          >
            Subscribe Free
          </a>
        </div>
      )}
    </nav>
  )
}
