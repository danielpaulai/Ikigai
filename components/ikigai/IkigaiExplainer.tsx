'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
}

const sections = [
  {
    key: 'passion',
    title: 'Passion',
    subtitle: 'Love meets mastery',
    line:
      'Where curiosity pulls you in and skill keeps you going — the work that feels like play, refined until it shines.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Warm light on a desk with someone creating at a laptop',
    align: 'left' as const,
    accent: 'from-[#ff8da1]/25 to-brand-plum/5',
  },
  {
    key: 'mission',
    title: 'Mission',
    subtitle: 'Heart meets need',
    line:
      'The causes that choose you back — the gap in the world that you cannot unsee, and long to help close.',
    image:
      'https://images.unsplash.com/photo-1469571486294-7ea27ddf7c31?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Hands joining together in a circle in soft sunlight',
    align: 'right' as const,
    accent: 'from-brand-pink/30 to-[#2e2f53]/10',
  },
  {
    key: 'vocation',
    title: 'Vocation',
    subtitle: 'Need meets livelihood',
    line:
      'Useful work the world will reward — not chasing trends, but offering something people truly need.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Team collaborating around a table with laptops',
    align: 'left' as const,
    accent: 'from-brand-navy/15 to-brand-pink/20',
  },
  {
    key: 'profession',
    title: 'Profession',
    subtitle: 'Craft meets compensation',
    line:
      'The expertise others already seek — where your reputation, experience, and income quietly align.',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Focused professional work at a bright desk',
    align: 'right' as const,
    accent: 'from-brand-plum/10 to-brand-pink-2/20',
  },
]

export default function IkigaiExplainer() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-brand-cream text-brand-plum overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/85 backdrop-blur-xl border-b border-brand-pink/15">
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-brand-plum/70 hover:text-brand-plum transition-colors"
          >
            ← Home
          </Link>
          <Link
            href="/#action"
            className="text-xs font-semibold rounded-full bg-brand-plum text-brand-pink px-4 py-2 hover:bg-brand-plum-2 transition-colors"
          >
            Find your Ikigai
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-5">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute -top-32 right-[-20%] w-[70vw] max-w-xl h-[70vw] max-h-xl rounded-full bg-gradient-to-br from-brand-pink/40 via-brand-pink/10 to-transparent blur-3xl"
            animate={
              reduceMotion
                ? {}
                : {
                    scale: [1, 1.06, 1],
                    opacity: [0.5, 0.75, 0.5],
                  }
            }
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-[-15%] w-[55vw] max-w-md h-[55vw] max-h-md rounded-full bg-gradient-to-tr from-brand-plum/8 to-brand-pink/25 blur-3xl"
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, 18, 0],
                    opacity: [0.35, 0.55, 0.35],
                  }
            }
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="capsule-tag justify-center"
          >
            A gentle guide
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif italic text-brand-plum leading-tight mb-6"
          >
            Ikigai is your reason to rise — the place where love, skill, need, and livelihood softly
            overlap.
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-brand-plum/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            In Japanese, <em className="text-brand-plum not-italic font-medium">iki</em> means life,{' '}
            <em className="text-brand-plum not-italic font-medium">gai</em> means worth. Together they
            name a direction, not a destination — a compass for a life that feels honest and alive.
            Where the four circles meet, stories gather names: Passion, Mission, Vocation, and
            Profession.
          </motion.p>
        </div>

        <motion.div
          className="relative max-w-lg mx-auto mt-14 md:mt-20"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-[0_24px_80px_rgba(45,27,34,0.12)] ring-1 ring-brand-pink/25">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop"
              alt="Sunrise over misty mountains — a metaphor for clarity and direction"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/50 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-white/95 text-sm md:text-base font-serif italic leading-snug drop-shadow-md">
              Scroll slowly — each overlap is a chapter of the same story: you, showing up where it
              matters.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Four intersections */}
      <div className="max-w-5xl mx-auto px-5 pb-24 space-y-24 md:space-y-32">
        {sections.map((s, idx) => (
          <motion.article
            key={s.key}
            className={`flex flex-col gap-10 md:gap-14 md:flex-row md:items-center ${
              s.align === 'right' ? 'md:flex-row-reverse' : ''
            }`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            <motion.div
              className="flex-1 relative"
              variants={{
                hidden: { opacity: 0, x: s.align === 'left' ? -32 : 32 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div
                className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-brand-pink/20 bg-gradient-to-br ${s.accent}`}
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover mix-blend-normal"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/35 via-transparent to-transparent pointer-events-none" />
              </div>
              <motion.span
                className="absolute -z-10 w-40 h-40 rounded-full bg-brand-pink/30 blur-2xl -bottom-8 -right-8"
                animate={reduceMotion ? {} : { scale: [1, 1.15, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.div
              className="flex-1"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-brand-pink-2 font-bold mb-2">
                {String(idx + 1).padStart(2, '0')} — {s.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif italic text-brand-plum mb-4">{s.title}</h2>
              <p className="text-brand-plum/70 text-lg leading-relaxed">{s.line}</p>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* Closing + CTA */}
      <motion.section
        className="relative px-5 pb-28"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-2xl mx-auto text-center rounded-[2rem] bg-white/60 backdrop-blur-xl border border-brand-pink/25 px-8 py-12 shadow-[0_20px_60px_rgba(255,183,197,0.15)]">
          <h3 className="text-2xl md:text-3xl font-serif italic text-brand-plum mb-4">
            The center is yours to discover
          </h3>
          <p className="text-brand-plum/65 mb-8 leading-relaxed">
            Ikigai is not a quiz score — it is a conversation between who you are and what the world
            is asking for. When you are ready, we will walk it together, question by honest question.
          </p>
          <Link href="/#action" className="btn-primary inline-flex">
            Begin the journey
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
