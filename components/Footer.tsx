'use client'

import { Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#050505] border-t border-brand-silver/10 py-12 md:py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-display">DP</span>
              </div>
              <span className="text-white font-medium">Daniel Paul</span>
            </div>
            <p className="mt-4 text-brand-silver text-sm leading-relaxed">Personal branding and AI systems for founders.</p>
            <p className="mt-6 text-brand-silver/90 text-[13px]">© 2026 Purely Personal. All rights reserved.</p>
          </div>

          <div>
            <p className="text-brand-silver text-[11px] uppercase tracking-widest mb-4">Explore</p>
            <nav className="flex flex-col gap-3 text-sm text-brand-silver">
              <button type="button" onClick={() => scrollTo('vision')} className="text-left hover:text-white transition-colors">
                What is Ikigai
              </button>
              <button type="button" onClick={() => scrollTo('how')} className="text-left hover:text-white transition-colors">
                How it Works
              </button>
              <button type="button" onClick={() => scrollTo('action')} className="text-left hover:text-white transition-colors">
                Find Your Ikigai
              </button>
              <a
                href="https://newsletter.purelypersonal.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Subscribe to Newsletter
              </a>
            </nav>
          </div>

          <div>
            <p className="text-brand-silver text-[11px] uppercase tracking-widest mb-4">Connect</p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/danielpaulai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-smoke flex items-center justify-center text-brand-silver hover:bg-brand-red hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/danielpaul.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-smoke flex items-center justify-center text-brand-silver hover:bg-brand-red hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@purelypersonalpod"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-smoke flex items-center justify-center text-brand-silver hover:bg-brand-red hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
            <p className="mt-4 text-brand-silver text-[13px] leading-relaxed">
              Follow Daniel Paul on LinkedIn for daily AI and personal branding insights.
            </p>
            <a
              href="https://www.linkedin.com/in/danielpaulai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:text-red-400 text-sm font-medium flex items-center gap-2 mt-3"
            >
              <Linkedin size={16} />
              linkedin.com/in/danielpaulai
            </a>
            <a
              href="https://newsletter.purelypersonal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-silver hover:text-white text-sm flex items-center gap-2 mt-2"
            >
              ✉ newsletter.purelypersonal.ai
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-silver/10 text-center text-[13px] text-brand-silver">
          Built with ❤️ by Daniel Paul · danielpaul.ai · Powered by Claude AI
        </div>
      </div>
    </footer>
  )
}
