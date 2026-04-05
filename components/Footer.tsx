'use client'

import { Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const scrollTo = (id: string) => {
    if (typeof document === 'undefined') return
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 bg-[#050505] border-t border-brand-pink/10 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-daniel flex items-center justify-center">
                <span className="text-white font-bold text-sm font-serif">DP</span>
              </div>
              <span className="text-lg font-serif italic">Daniel Paul</span>
            </div>
            <p className="text-brand-pink/60 text-sm leading-relaxed mb-6">
              Personal branding and AI systems for founders.
            </p>
            <p className="text-white/35 text-xs">© {new Date().getFullYear()} Purely Personal. All rights reserved.</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">Explore</p>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <button type="button" onClick={() => scrollTo('vision')} className="hover:text-brand-pink transition-colors text-left">
                  What is Ikigai
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('how')} className="hover:text-brand-pink transition-colors text-left">
                  How it Works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('action')} className="hover:text-brand-pink transition-colors text-left">
                  Find Your Ikigai
                </button>
              </li>
              <li>
                <a
                  href="https://newsletter.purelypersonal.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-pink transition-colors"
                >
                  Subscribe to Newsletter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">Connect</p>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.linkedin.com/in/danielpaulai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand-daniel hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/danielpaul.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand-daniel hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@purelypersonalpod"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand-daniel hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
            <p className="text-white/45 text-xs leading-relaxed mb-4">
              Follow Daniel Paul on LinkedIn for daily AI and personal branding insights.
            </p>
            <a
              href="https://www.linkedin.com/in/danielpaulai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-daniel hover:text-brand-pink text-sm font-medium inline-flex items-center gap-2"
            >
              <Linkedin size={16} />
              linkedin.com/in/danielpaulai
            </a>
            <a
              href="https://newsletter.purelypersonal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/50 hover:text-white text-sm mt-3"
            >
              newsletter.purelypersonal.ai
            </a>
            <a
              href="https://danielpaul.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/40 hover:text-brand-pink text-xs mt-4"
            >
              danielpaul.ai
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 text-center text-white/35 text-xs leading-relaxed">
          Built with care by Daniel Paul ·{' '}
          <a href="https://danielpaul.ai" className="hover:text-brand-pink transition-colors">
            danielpaul.ai
          </a>{' '}
          · Powered by Claude AI
        </div>
      </div>
    </footer>
  )
}
