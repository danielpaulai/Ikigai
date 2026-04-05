'use client'

interface ProgressBarProps {
  progress: number
}

const CIRCLE_LABELS = ['Love', 'Skills', 'World', 'Money']

export default function ProgressBar({ progress }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, progress * 100))

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {CIRCLE_LABELS.map((label, i) => {
          const segStart = (i / 4) * 100
          const segEnd = ((i + 1) / 4) * 100
          const filled = pct >= segEnd
          const partial = pct > segStart && pct < segEnd

          return (
            <div key={label} className="flex-1 flex flex-col gap-0.5">
              <div className="h-1 rounded-full bg-brand-pink/15 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-pink to-brand-pink-2 rounded-full transition-all duration-500"
                  style={{
                    width: filled ? '100%' : partial ? `${((pct - segStart) / 25) * 100}%` : '0%',
                  }}
                />
              </div>
              <span className="text-[8px] uppercase tracking-wider text-brand-plum/25 text-center leading-none">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
