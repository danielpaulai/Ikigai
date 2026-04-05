'use client'

export default function HeroIkigaiDiagram() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full" aria-label="Ikigai Venn diagram showing the intersection of four life dimensions">
        {/* Four main circles */}
        <circle cx="170" cy="160" r="110" fill="rgba(255, 183, 197, 0.15)" stroke="rgba(255, 141, 161, 0.4)" strokeWidth="1.5" className="animate-pulse-slow" />
        <circle cx="230" cy="160" r="110" fill="rgba(45, 27, 34, 0.08)" stroke="rgba(45, 27, 34, 0.25)" strokeWidth="1.5" className="animate-pulse-slow [animation-delay:300ms]" />
        <circle cx="170" cy="230" r="110" fill="rgba(255, 255, 255, 0.25)" stroke="rgba(255, 183, 197, 0.35)" strokeWidth="1.5" className="animate-pulse-slow [animation-delay:600ms]" />
        <circle cx="230" cy="230" r="110" fill="rgba(255, 141, 161, 0.1)" stroke="rgba(255, 141, 161, 0.35)" strokeWidth="1.5" className="animate-pulse-slow [animation-delay:900ms]" />

        {/* Center glow */}
        <circle cx="200" cy="195" r="22" fill="rgba(255, 141, 161, 0.2)" className="animate-pulse-slow" />
        <circle cx="200" cy="195" r="8" fill="#FF8DA1" opacity="0.85" className="animate-pulse-slow" />

        {/* Outer circle labels */}
        <text x="125" y="100" textAnchor="middle" className="fill-brand-plum/70 text-[11px] font-sans font-semibold">What you</text>
        <text x="125" y="115" textAnchor="middle" className="fill-brand-pink-2 text-[13px] font-serif italic font-bold">LOVE</text>

        <text x="275" y="100" textAnchor="middle" className="fill-brand-plum/70 text-[11px] font-sans font-semibold">What you&apos;re</text>
        <text x="275" y="115" textAnchor="middle" className="fill-brand-plum text-[13px] font-serif italic font-bold">GOOD AT</text>

        <text x="120" y="305" textAnchor="middle" className="fill-brand-plum/70 text-[11px] font-sans font-semibold">What the world</text>
        <text x="120" y="320" textAnchor="middle" className="fill-brand-plum/60 text-[13px] font-serif italic font-bold">NEEDS</text>

        <text x="280" y="305" textAnchor="middle" className="fill-brand-plum/70 text-[11px] font-sans font-semibold">What you can be</text>
        <text x="280" y="320" textAnchor="middle" className="fill-brand-pink-2 text-[13px] font-serif italic font-bold">PAID FOR</text>

        {/* Intersection labels */}
        <text x="200" y="135" textAnchor="middle" className="fill-brand-plum/45 text-[9px] font-sans uppercase tracking-widest">Passion</text>
        <text x="138" y="200" textAnchor="middle" className="fill-brand-plum/45 text-[9px] font-sans uppercase tracking-widest">Mission</text>
        <text x="262" y="200" textAnchor="middle" className="fill-brand-plum/45 text-[9px] font-sans uppercase tracking-widest">Vocation</text>
        <text x="200" y="268" textAnchor="middle" className="fill-brand-plum/45 text-[9px] font-sans uppercase tracking-widest">Profession</text>

        {/* Center label */}
        <text x="200" y="188" textAnchor="middle" className="fill-brand-plum text-[11px] font-serif italic font-bold">生き甲斐</text>
        <text x="200" y="206" textAnchor="middle" className="fill-brand-pink-2 text-[10px] font-sans font-bold uppercase tracking-[0.15em]">IKIGAI</text>
      </svg>
    </div>
  )
}
