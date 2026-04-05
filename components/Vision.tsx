'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const galleryImages = [
  'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  'https://images.unsplash.com/photo-1506197603485-db7c72639e4a?w=800&q=80',
  'https://images.unsplash.com/photo-1528164344705-4754268799af?w=800&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80',
  'https://images.unsplash.com/photo-1518111655294-734794e50d53?w=800&q=80',
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
  'https://images.unsplash.com/photo-1536224312034-47750882e98d?w=800&q=80',
]

export default function Vision() {
  const [angle, setAngle] = useState(0)
  const [radius, setRadius] = useState(550)
  const reqRef = useRef<number>()

  useEffect(() => {
    const upd = () => setRadius(typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 550)
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  useEffect(() => {
    const animate = () => {
      setAngle((prev) => prev - 0.001)
      reqRef.current = requestAnimationFrame(animate)
    }
    reqRef.current = requestAnimationFrame(animate)
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current)
    }
  }, [])

  return (
    <section id="vision" className="relative pb-32 bg-brand-plum">
      <div className="bg-brand-cream-2 text-brand-plum border-b border-brand-pink/15">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="text-brand-pink-2 text-xs font-bold uppercase tracking-[0.35em] mb-4 text-center md:text-left">
            What is Ikigai
          </p>
          <h2 className="text-3xl md:text-5xl font-serif italic text-center md:text-left text-brand-plum mb-12 max-w-3xl">
            Your reason for being. And your blueprint for success.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="space-y-5 text-brand-plum/70 text-base md:text-[17px] leading-[1.8]">
              <p>
                Ikigai (生き甲斐) is a Japanese concept that means &ldquo;reason for being.&rdquo; It sits at the intersection
                of four things: what you love, what you&apos;re good at, what the world needs, and what you can be paid
                for.
              </p>
              <p>
                Most people operate in only one or two circles. They are either passionate but broke, skilled but
                unfulfilled, or busy but empty. Your Ikigai is the place where all four align.
              </p>
              <p>
                This is not a personality test. It is a conversation, guided by AI, that helps you discover what many
                people spend a lifetime searching for.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { t: 'What You Love', d: 'The activities and topics that make you lose all track of time.' },
                {
                  t: "What You're Good At",
                  d: 'Your natural talents and hard-earned skills, including the ones you take for granted.',
                },
                {
                  t: 'What the World Needs',
                  d: 'The problems and needs you are drawn to solve, even without reward.',
                },
                {
                  t: 'What You Can Be Paid For',
                  d: 'The economic value hidden inside your experience and your unique perspective.',
                },
              ].map((card) => (
                <div
                  key={card.t}
                  className="p-5 rounded-3xl bg-white/80 border border-brand-pink/15 border-l-4 border-l-brand-pink-2 shadow-sm"
                >
                  <p className="text-brand-plum font-semibold text-sm mb-2 font-serif italic">{card.t}</p>
                  <p className="text-brand-plum/55 text-xs leading-relaxed">{card.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 rounded-3xl border border-brand-plum/15 bg-white/60 max-w-4xl mx-auto">
            <p className="text-brand-plum/75 text-sm leading-relaxed text-center md:text-left">
              <span className="font-semibold text-brand-plum">Note:</span> missing even one circle leads to burnout,
              emptiness, or feeling lost. This tool helps you find all four, then shows you how to monetize the
              intersection.
            </p>
          </div>
        </div>
      </div>

      <div className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-32">
        <div className="text-brand-pink/40 text-xs uppercase tracking-[0.5em] mb-12">The Cycle of Meaning</div>

        <div className="relative w-full h-[600px] pointer-events-none">
          {galleryImages.map((imgUrl, i) => {
            const currentAngle = angle + (i / galleryImages.length) * Math.PI * 2
            const x = Math.cos(currentAngle) * radius
            const y = Math.sin(currentAngle) * radius
            const rotation = (currentAngle * 180) / Math.PI + 90

            return (
              <div
                key={imgUrl}
                className="absolute top-1/2 left-1/2 w-48 md:w-64 aspect-[4/5] rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/10"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotateY(${rotation / 4}deg) rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imgUrl}
                    alt=""
                    fill
                    className="object-cover grayscale-[0.2] sepia-[0.1]"
                    sizes="256px"
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center z-10 bg-white/5 backdrop-blur-2xl p-12 rounded-6xl border border-white/10 mt-[-50px]">
          <h3 className="text-3xl md:text-5xl font-serif italic tracking-tight text-white leading-tight">
            Ikigai is where what you love, what you are good at, and what the world needs intersect.
          </h3>
          <div className="mt-8 flex justify-center gap-6">
            <div className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-brand-pink/60 animate-pulse [animation-delay:75ms]" />
            <div className="w-2 h-2 rounded-full bg-brand-pink/30 animate-pulse [animation-delay:150ms]" />
          </div>
        </div>
      </div>

      <div className="relative min-h-[90vh] flex flex-col items-center justify-center py-32 border-t border-white/5">
        <div className="text-brand-pink/40 text-xs uppercase tracking-[0.5em] mb-12">The Four Circles</div>

        <div className="w-full max-w-6xl mx-auto px-6 aspect-video rounded-6xl overflow-hidden my-16 shadow-[0_0_80px_rgba(255,183,197,0.15)] relative group cursor-pointer border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-plum to-transparent z-10 opacity-60" />
          <Image
            className="w-full h-full object-cover scale-105 transition-transform duration-[15s] group-hover:scale-100"
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80"
            alt="Zen Garden"
            fill
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
          <div className="absolute bottom-12 left-12 z-20">
            <h4 className="text-4xl font-serif italic text-white">The Intersection of Purpose</h4>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { kanji: '愛', label: 'What You Love', en: 'Passion' },
            { kanji: '能', label: "What You're Good At", en: 'Vocation' },
            { kanji: '世', label: 'What the World Needs', en: 'Mission' },
            { kanji: '金', label: 'What You Can Be Paid For', en: 'Profession' },
          ].map((c) => (
            <div
              key={c.kanji}
              className="flex flex-col items-center text-center p-6 rounded-4xl bg-white/5 border border-white/10"
            >
              <span className="text-5xl font-serif text-brand-pink mb-3">{c.kanji}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1">{c.en}</span>
              <span className="text-white/80 text-sm font-medium leading-snug">{c.label}</span>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center mt-16">
          <h3 className="text-2xl md:text-4xl font-serif italic text-brand-pink leading-relaxed">
            In the noise of modern life, Ikigai is the whisper that leads you home to your true purpose.
          </h3>
        </div>
      </div>
    </section>
  )
}
