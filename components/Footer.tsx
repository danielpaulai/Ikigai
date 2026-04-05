'use client'

import { Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-plum text-white/80">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-10">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-full bg-brand-pink flex items-center justify-center">
                <span className="text-brand-plum font-serif font-bold text-[10px] italic">DP</span>
              </div>
              <span className="text-sm font-serif italic text-white">Daniel Paul</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-4">
              Personal branding and AI systems for founders.
            </p>
            <p className="text-white/25 text-[11px]">© {new Date().getFullYear()} Purely Personal</p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 font-semibold">Explore</p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#action" className="text-white/50 hover:text-brand-pink transition-colors">
                  Find Your Ikigai
                </a>
              </li>
              <li>
                <a
                  href="https://newsletter.purelypersonal.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-brand-pink transition-colors"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="https://danielpaul.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-brand-pink transition-colors"
                >
                  danielpaul.ai
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 font-semibold">Connect</p>
            <div className="flex gap-2 mb-4">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/danielpaulai/', label: 'LinkedIn' },
                { icon: Instagram, href: 'https://www.instagram.com/danielpaul.ai/', label: 'Instagram' },
                { icon: Youtube, href: 'https://www.youtube.com/@purelypersonalpod', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/40 hover:bg-brand-pink/20 hover:text-brand-pink transition-colors"
                  aria-label={label}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <a
              href="https://www.linkedin.com/in/danielpaulai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-pink/70 hover:text-brand-pink text-xs inline-flex items-center gap-1.5"
            >
              <Linkedin size={12} /> linkedin.com/in/danielpaulai
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/8 text-center text-white/25 text-[11px]">
          Built by Daniel Paul ·{' '}
          <a href="https://danielpaul.ai" className="hover:text-brand-pink transition-colors">
            danielpaul.ai
          </a>{' '}
          · Powered by Claude AI
        </div>
      </div>
    </footer>
  )
}
