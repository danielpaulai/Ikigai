'use client'

/**
 * Animated four-circle Ikigai diagram — matches brand plum / pink / cream.
 */
export default function HeroIkigaiDiagram() {
  return (
    <div className="relative w-[280px] h-[280px] mx-auto md:mx-0 shrink-0">
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
        <circle
          cx="88"
          cy="88"
          r="52"
          fill="rgba(255, 183, 197, 0.18)"
          stroke="rgba(255, 183, 197, 0.55)"
          strokeWidth="1.5"
          className="animate-pulse-slow"
        />
        <circle
          cx="112"
          cy="88"
          r="52"
          fill="rgba(45, 27, 34, 0.12)"
          stroke="rgba(45, 27, 34, 0.35)"
          strokeWidth="1.5"
          className="animate-pulse-slow [animation-delay:200ms]"
        />
        <circle
          cx="100"
          cy="108"
          r="52"
          fill="rgba(255, 255, 255, 0.35)"
          stroke="rgba(255, 183, 197, 0.45)"
          strokeWidth="1.5"
          className="animate-pulse-slow [animation-delay:400ms]"
        />
        <circle
          cx="100"
          cy="92"
          r="52"
          fill="rgba(255, 141, 161, 0.14)"
          stroke="rgba(255, 141, 161, 0.5)"
          strokeWidth="1.5"
          className="animate-pulse-slow [animation-delay:600ms]"
        />
        <circle cx="100" cy="98" r="5" fill="#FF8DA1" className="animate-pulse-slow opacity-90" />
      </svg>
      <p className="text-center text-brand-plum/40 text-sm font-serif italic mt-4">生き甲斐</p>
    </div>
  )
}
