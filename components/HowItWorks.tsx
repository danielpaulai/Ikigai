'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { SESSION_MODES } from '@/lib/session-modes'

const steps = [
  {
    num: '零',
    title: 'Pick your mode',
    desc: `${SESSION_MODES.short.label} (${SESSION_MODES.short.questionCount} questions, ~${SESSION_MODES.short.durationLabel}) for speed. ${SESSION_MODES.long.label} (${SESSION_MODES.long.questionCount} questions, ~${SESSION_MODES.long.durationLabel}) for the full arc. Voice or text.`,
    image: 'https://images.unsplash.com/photo-1544333323-5374ac12800d?w=800&q=80',
  },
  {
    num: '壱',
    title: 'Talk to Kai, your AI coach',
    desc: 'One question at a time. Kai listens, responds, and goes deeper. Like a real coaching session.',
    image: 'https://images.unsplash.com/photo-1506197603485-db7c72639e4a?w=800&q=80',
  },
  {
    num: '弐',
    title: 'Receive your Ikigai',
    desc: 'Statement, archetype, monetization plays (three in Deep Dive), and your next step. Download as PDF.',
    image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80',
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="how" className="relative py-32 bg-brand-cream-2 border-t border-brand-pink/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <div className="capsule-tag">The process</div>
          <h2 className="text-5xl md:text-7xl font-serif italic text-brand-plum mt-4">Three steps to your Ikigai.</h2>
          <p className="mt-6 text-brand-plum/55 text-lg max-w-xl mx-auto">
            No forms. No sign-up. Just questions and answers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(i)}
                className={clsx(
                  'text-left flex gap-8 p-10 rounded-5xl transition-all duration-700 border',
                  activeStep === i
                    ? 'bg-white shadow-[0_20px_50px_rgba(255,183,197,0.2)] scale-[1.03] border-brand-pink/30'
                    : 'opacity-40 border-transparent hover:opacity-70'
                )}
              >
                <span className="text-3xl font-serif text-brand-pink-2 flex-shrink-0">{step.num}</span>
                <div>
                  <h4 className="text-3xl font-serif italic text-brand-plum mb-3">{step.title}</h4>
                  <p className="text-brand-plum/60 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/5] rounded-6xl overflow-hidden bg-brand-plum shadow-2xl">
            {steps.map((step, i) => (
              <div
                key={step.image}
                className={clsx(
                  'absolute inset-0 transition-all duration-1000 ease-in-out',
                  activeStep === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                )}
              >
                <Image src={step.image} alt={step.title} fill className="object-cover grayscale-[0.1]" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum to-transparent opacity-40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 opacity-10 pointer-events-none hidden md:flex">
        <div className="w-px h-24 bg-gradient-to-t from-brand-plum to-transparent" />
        <span className="text-4xl font-serif text-brand-plum [writing-mode:vertical-rl]">道</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        <div className="rounded-2xl bg-brand-plum px-6 py-4 text-center text-white/90 text-sm md:text-base shadow-lg border border-white/10">
          <span className="font-medium">Quick Session:</span> 15–20 minutes &nbsp;|&nbsp;{' '}
          <span className="font-medium">Deep Dive:</span> 45–60 minutes &nbsp;|&nbsp;{' '}
          <span className="text-brand-pink">Your answers stay on this device unless you choose to share.</span>
        </div>
      </div>
    </section>
  )
}
