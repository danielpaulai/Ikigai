'use client'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, progress * 100))
  return (
    <div className="mt-1.5 h-1 bg-brand-charcoal rounded-full overflow-hidden">
      <div
        className="h-full bg-brand-red rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
