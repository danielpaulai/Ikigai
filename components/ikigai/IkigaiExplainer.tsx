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

const fourQuestions = [
  {
    q: 'What do you love?',
    hint: 'Activities that pull you in — even when no one is watching.',
  },
  {
    q: 'What are you good at?',
    hint: 'Strengths others notice before you do.',
  },
  {
    q: 'What does the world need?',
    hint: 'Problems that bother you on a quiet Tuesday.',
  },
  {
    q: 'What can you be paid for?',
    hint: 'Skills or knowledge someone would already trade money for.',
  },
] as const

const sections = [
  {
    key: 'passion',
    title: 'Passion',
    jpHint: '情熱 · where joy meets craft',
    subtitle: 'Love meets mastery',
    lead:
      'Passion is the overlap between what you love and what you are good at. It is not only “what feels fun today” — it is what you return to, practice, and refine until it becomes unmistakably yours.',
    body:
      'Students often discover passion in the overlap: the essay topic you secretly enjoyed researching, the club where hours vanish, the skill friends ask you to teach. Passion is energy you can train — not a fixed label.',
    students:
      'Coding side projects, music practice, tutoring younger students, designing posters, writing stories, fixing bikes, debating, caring for animals — look for patterns, not perfection.',
    prompt: 'What work would you still do (for a while) even if it never became your job?',
    image:
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Hands preparing food with care — craft and repetition, a familiar scene in Japanese kitchens',
    align: 'left' as const,
    accent: 'from-[#ff8da1]/25 to-brand-plum/5',
  },
  {
    key: 'mission',
    title: 'Mission',
    jpHint: '使命 · heart meets need',
    subtitle: 'Love meets what the world needs',
    lead:
      'Mission sits where what you care about meets a real need outside yourself. It often shows up as irritation at injustice, curiosity about healing, or a pull toward education, health, climate, or community.',
    body:
      'You do not need to save the whole world to have a mission. Students often find it close to home: mental health among peers, language access for families, cleaner local parks, fairer classrooms. Mission gives your love a direction.',
    students:
      'Volunteering, advocacy, peer support, sustainability clubs, open-source tools for others, teaching what you learned the hard way.',
    prompt: 'If you could lift one burden from people your age, what would it be — and why you?',
    image:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Fushimi Inari torii gates in Kyoto — a path walked one step at a time',
    align: 'right' as const,
    accent: 'from-brand-pink/30 to-[#2e2f53]/10',
  },
  {
    key: 'vocation',
    title: 'Vocation',
    jpHint: '天職 · need meets livelihood',
    subtitle: 'The world’s needs meet income',
    lead:
      'Vocation is where impact and practicality shake hands. It is useful work that also pays — not selling out, but connecting your care to how value actually moves in the world.',
    body:
      'For students, “paid” can mean part-time work, freelance gigs, stipends, scholarships tied to service, or building something small that one real customer buys. Vocation asks: who would miss this if it disappeared?',
    students:
      'Tutoring, design for local businesses, technical support, seasonal jobs that teach people skills, paid research assistance, selling something you make.',
    prompt: 'What problem would a neighbor or small business pay $20 to have solved this week?',
    image:
      'https://images.unsplash.com/photo-1528164344705-47542686040c?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Tokyo station and city rhythm — where millions trade skill and time every day',
    align: 'left' as const,
    accent: 'from-brand-navy/15 to-brand-pink/20',
  },
  {
    key: 'profession',
    title: 'Profession',
    jpHint: '専門 · skill meets compensation',
    subtitle: 'Mastery meets the market',
    lead:
      'Profession is what you are good at combined with what people will pay for — reputation, reliability, and craft. It is the part of the map that rewards depth: certifications, portfolios, grades that reflect real skill.',
    body:
      'Students sometimes chase “passion” and forget that mastery opens doors. Profession reminds you to build evidence: projects, internships, references, and clarity about what you deliver better than most.',
    students:
      'Internships, apprenticeships, competition entries, GitHub portfolios, clinical hours, performance recordings, leadership roles with measurable outcomes.',
    prompt: 'What do people thank you for repeatedly — and what proof could you show a stranger in five minutes?',
    image:
      'https://images.unsplash.com/photo-1583583853713-9d5b7bb4e8cb?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Tokyo skyline through glass — craft, commute, and the long arc of a career',
    align: 'right' as const,
    accent: 'from-brand-plum/10 to-brand-pink-2/20',
  },
] as const

function IkigaiDiagramMini() {
  return (
    <svg viewBox="0 0 400 380" className="w-full max-w-md mx-auto h-auto" aria-hidden>
      {/* Four overlapping circles — schematic */}
      <circle cx="155" cy="145" r="95" fill="rgba(255,141,161,0.12)" stroke="rgba(255,141,161,0.45)" strokeWidth="1.5" />
      <circle cx="245" cy="145" r="95" fill="rgba(45,27,34,0.06)" stroke="rgba(45,27,34,0.2)" strokeWidth="1.5" />
      <circle cx="155" cy="235" r="95" fill="rgba(255,183,197,0.1)" stroke="rgba(255,183,197,0.35)" strokeWidth="1.5" />
      <circle cx="245" cy="235" r="95" fill="rgba(255,141,161,0.08)" stroke="rgba(255,141,161,0.3)" strokeWidth="1.5" />
      <text x="200" y="128" textAnchor="middle" className="fill-brand-plum text-[11px] font-sans font-medium" style={{ fontSize: '11px' }}>
        Passion
      </text>
      <text x="118" y="198" textAnchor="middle" className="fill-brand-plum text-[11px] font-sans font-medium" style={{ fontSize: '11px' }}>
        Mission
      </text>
      <text x="282" y="198" textAnchor="middle" className="fill-brand-plum text-[11px] font-sans font-medium" style={{ fontSize: '11px' }}>
        Vocation
      </text>
      <text x="200" y="268" textAnchor="middle" className="fill-brand-plum text-[11px] font-sans font-medium" style={{ fontSize: '11px' }}>
        Profession
      </text>
      <text x="200" y="198" textAnchor="middle" className="fill-brand-plum/80 text-[9px] font-sans" style={{ fontSize: '9px' }}>
        ikigai
      </text>
    </svg>
  )
}

export default function IkigaiExplainer() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-brand-cream text-brand-plum overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/85 backdrop-blur-xl border-b border-brand-pink/15">
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-medium text-brand-plum/70 hover:text-brand-plum transition-colors">
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
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-5">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" initial={false}>
          <motion.div
            className="absolute -top-32 right-[-20%] w-[70vw] max-w-xl h-[70vw] max-h-xl rounded-full bg-gradient-to-br from-brand-pink/40 via-brand-pink/10 to-transparent blur-3xl"
            animate={reduceMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-[-15%] w-[55vw] max-w-md h-[55vw] max-h-md rounded-full bg-gradient-to-tr from-brand-plum/8 to-brand-pink/25 blur-3xl"
            animate={reduceMotion ? {} : { y: [0, 18, 0], opacity: [0.35, 0.55, 0.35] }}
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
            From Japan — for your path
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif italic text-brand-plum leading-tight mb-5"
          >
            Ikigai is your reason to rise — where what you love, what you excel at, what the world
            needs, and what can sustain you quietly meet.
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-brand-plum/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            If you are a student, think of this page as a map, not a test. The Japanese idea of{' '}
            <em className="text-brand-plum not-italic font-medium">ikigai</em> (生き甲斐) is often
            translated as “a life worth living” — a sense of purpose you can grow in small, honest
            steps, not a single label you must discover overnight.
          </motion.p>
        </div>

        <motion.div
          className="relative max-w-2xl mx-auto mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_24px_80px_rgba(45,27,34,0.14)] ring-1 ring-brand-pink/25">
            <Image
              src="https://images.unsplash.com/photo-1490806843927-4cdcbe499a3d?w=1200&q=80&auto=format&fit=crop"
              alt="Mount Fuji above clouds at sunrise — Japan’s iconic horizon, a metaphor for clarity emerging slowly"
              fill
              className="object-cover object-[center_40%]"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/55 via-brand-plum/10 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white/95 text-sm md:text-base font-serif italic leading-snug drop-shadow-md">
              In Japan, purpose is not only ambition in a hurry — it can look like showing up well,
              season after season, until your life and your values start to rhyme.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Japan roots */}
      <section className="relative py-16 md:py-24 px-5 border-y border-brand-pink/15 bg-white/40 sakura-pattern">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="text-center mb-10"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-brand-pink-2 font-bold mb-3">
              Roots &amp; light
            </p>
            <h2 className="text-2xl md:text-3xl font-serif italic text-brand-plum mb-4">
              Why Japan keeps returning to this word
            </h2>
            <p className="text-brand-plum/70 leading-relaxed text-left md:text-center">
              The word breaks beautifully: <span className="text-brand-plum font-medium">iki</span>{' '}
              (生き) carries “life” and “to live,” and <span className="text-brand-plum font-medium">gai</span>{' '}
              (甲斐) suggests value, worth, or what makes something worthwhile. Together,{' '}
              <em className="font-serif not-italic">ikigai</em> is less about a LinkedIn title and
              more about the daily sense that your hours matter — to you and to someone else.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
            <motion.div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-brand-pink/20"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1000&q=80&auto=format&fit=crop"
                alt="Cherry blossoms along a river in Japan — mono no aware, the gentle awareness of impermanence"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-plum/30 to-transparent" />
            </motion.div>
            <motion.div
              className="space-y-4 text-brand-plum/75 leading-relaxed"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <p>
                You may have heard of <strong className="text-brand-plum font-medium">Okinawa</strong>, where
                many people live long, socially connected lives. Writers and researchers often talk
                about <em className="font-serif text-brand-plum/90 not-italic">ikigai</em> alongside
                community, movement, and eating with care — not as a magic formula, but as a reminder
                that purpose and belonging feed each other.
              </p>
              <p>
                Japanese aesthetics — think of the care in a bowl of tea, the patience in a garden, the
                rhythm of a neighborhood festival — also whisper the same lesson: meaning is rarely only
                inside your head. It shows up in how you attend to the world.
              </p>
              <p className="text-brand-plum/60 text-sm border-l-2 border-brand-pink/50 pl-4">
                This page uses the popular <strong className="text-brand-plum/80">four-circle</strong>{' '}
                framework (common in Western workshops) to help you study your life in pieces. Japanese
                scholars and speakers may use <em className="not-italic">ikigai</em> more broadly — treat
                the diagram as a compass, not a cage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four questions + diagram */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-brand-pink-2 font-bold mb-3">
              The map
            </p>
            <h2 className="text-2xl md:text-3xl font-serif italic text-brand-plum mb-4">
              Four questions — one conversation
            </h2>
            <p className="text-brand-plum/70 leading-relaxed">
              Most classes ask what you want to be. Ikigai asks how your loves, skills, cares, and
              realities can fit together over time. Start anywhere; the edges will start to speak to each
              other.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.ul
              className="space-y-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {fourQuestions.map((item, i) => (
                <motion.li
                  key={item.q}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  className="rounded-2xl bg-white/70 border border-brand-pink/20 px-5 py-4 shadow-sm backdrop-blur-sm"
                >
                  <p className="font-serif italic text-lg text-brand-plum">{item.q}</p>
                  <p className="text-sm text-brand-plum/55 mt-1">{item.hint}</p>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="rounded-3xl bg-white/50 border border-brand-pink/15 p-6 md:p-8 shadow-inner"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <IkigaiDiagramMini />
              <p className="text-center text-xs text-brand-plum/50 mt-4 max-w-sm mx-auto leading-relaxed">
                Where two circles overlap, you get Passion, Mission, Vocation, or Profession. Where all
                four meet — in the center — many people place the feeling of <em className="not-italic text-brand-plum/70">ikigai</em>: a life
                that feels worth living, in the round.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four intersections — in depth */}
      <div className="max-w-5xl mx-auto px-5 pb-8 space-y-24 md:space-y-32">
        {sections.map((s, idx) => (
          <motion.article
            key={s.key}
            className={`flex flex-col gap-10 md:gap-14 md:flex-row md:items-stretch ${
              s.align === 'right' ? 'md:flex-row-reverse' : ''
            }`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              className="flex-1 relative min-h-[220px] md:min-h-0"
              variants={{
                hidden: { opacity: 0, x: s.align === 'left' ? -28 : 28 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div
                className={`relative h-full min-h-[220px] md:min-h-[320px] rounded-3xl overflow-hidden shadow-xl ring-1 ring-brand-pink/20 bg-gradient-to-br ${s.accent}`}
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/40 via-transparent to-transparent pointer-events-none" />
                <p className="absolute bottom-4 left-4 right-4 text-white/90 text-xs font-medium tracking-wide drop-shadow">
                  {s.jpHint}
                </p>
              </div>
              <motion.span
                className="absolute -z-10 w-44 h-44 rounded-full bg-brand-pink/25 blur-2xl -bottom-10 -right-6"
                animate={reduceMotion ? {} : { scale: [1, 1.12, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
              />
            </motion.div>

            <motion.div
              className="flex-1 flex flex-col justify-center"
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-brand-pink-2 font-bold mb-2">
                {String(idx + 1).padStart(2, '0')} — {s.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif italic text-brand-plum mb-3">{s.title}</h2>
              <p className="text-brand-plum/85 leading-relaxed mb-3">{s.lead}</p>
              <p className="text-brand-plum/65 leading-relaxed mb-6">{s.body}</p>

              <div className="rounded-2xl bg-brand-cream-2/90 border border-brand-pink/25 px-5 py-4 mb-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-plum/45 font-bold mb-2">
                  For students
                </p>
                <p className="text-sm text-brand-plum/75 leading-relaxed">{s.students}</p>
              </div>

              <div className="rounded-2xl border border-dashed border-brand-plum/20 bg-white/40 px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-pink-2 font-bold mb-1.5">
                  Try asking
                </p>
                <p className="text-brand-plum/80 font-serif italic text-lg leading-snug">{s.prompt}</p>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* Center + bamboo */}
      <section className="py-16 md:py-20 px-5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-brand-pink/20 order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1578469559606-135d7db21a79?w=1100&q=80&auto=format&fit=crop"
              alt="Bamboo forest path in Arashiyama — steady growth, patience, returning to the same practice"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-plum/25 to-transparent" />
          </motion.div>
          <motion.div
            className="order-1 md:order-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-brand-pink-2 font-bold">The center</p>
            <h2 className="text-2xl md:text-3xl font-serif italic text-brand-plum">The still point is practice</h2>
            <p className="text-brand-plum/70 leading-relaxed">
              When people describe finding <em className="font-serif not-italic text-brand-plum/85">ikigai</em>, they
              often mention neither fame nor speed — but alignment. The center of the diagram is not a job
              title you must decode at eighteen. It is a felt sense that your days, your relationships,
              and your contribution lean in the same direction.
            </p>
            <p className="text-brand-plum/70 leading-relaxed">
              In Japanese culture, long-cultivated arts — calligraphy, archery, tea — teach that mastery
              is a relationship with time. Your ikigai may emerge the same way: through repetition,
              honest feedback, and small courages, not one dramatic announcement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-14 md:py-20 px-5 bg-gradient-to-b from-brand-cream to-brand-cream-2 border-t border-brand-pink/15">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-brand-pink-2 font-bold mb-3">
              Use it well
            </p>
            <h2 className="text-2xl md:text-3xl font-serif italic text-brand-plum mb-3">
              How to work with this as a student
            </h2>
            <p className="text-brand-plum/65 leading-relaxed">
              Depth beats drama. Borrow one habit from Japanese craft culture: show up, notice, adjust.
            </p>
          </motion.div>
          <motion.ul
            className="space-y-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {[
              'Write for ten minutes a week — one honest paragraph per circle. No grades; just pattern-spotting.',
              'Run small experiments: a two-week project, a volunteer shift, a paid gig, a skill you teach someone.',
              'Talk to three people who do work you respect — ask what their Tuesdays look like, not only their job title.',
              'Let the center move with your seasons. What fits at sixteen may evolve; the skill is staying curious.',
              'When the map feels confusing, return to one question: who do I want to become in the eyes of someone I love?',
            ].map((line, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
                className="flex gap-3 items-start rounded-2xl bg-white/70 border border-brand-pink/15 px-5 py-4"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-pink/25 text-brand-plum text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-brand-plum/75 leading-relaxed">{line}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Closing + CTA */}
      <motion.section
        className="relative px-5 pb-28 pt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-2xl mx-auto text-center rounded-[2rem] bg-white/60 backdrop-blur-xl border border-brand-pink/25 px-8 py-12 shadow-[0_20px_60px_rgba(255,183,197,0.15)]">
          <h3 className="text-2xl md:text-3xl font-serif italic text-brand-plum mb-4">
            Walk it with someone who listens
          </h3>
          <p className="text-brand-plum/65 mb-8 leading-relaxed">
            The tool on this site is a conversation — question by question — so your story can surface in
            its own time. Bring your doubts; they belong in the room. Ikigai, after all, is not a poster.
            It is a practice of living as if your days count.
          </p>
          <Link href="/#action" className="btn-primary inline-flex">
            Begin the journey
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
