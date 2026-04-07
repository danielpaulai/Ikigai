'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ikigaiExplainerImages } from '@/lib/ikigai-explainer-images'

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
    imageKey: 'passion',
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
    imageKey: 'mission',
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
    imageKey: 'vocation',
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
    imageKey: 'profession',
    align: 'right' as const,
    accent: 'from-brand-plum/10 to-brand-pink-2/20',
  },
] as const

function IkigaiDiagramMini() {
  return (
    <svg viewBox="0 0 400 380" className="w-full max-w-lg mx-auto h-auto" aria-hidden>
      <circle cx="155" cy="145" r="95" fill="rgba(255,141,161,0.14)" stroke="rgba(255,141,161,0.5)" strokeWidth="2" />
      <circle cx="245" cy="145" r="95" fill="rgba(45,27,34,0.08)" stroke="rgba(45,27,34,0.28)" strokeWidth="2" />
      <circle cx="155" cy="235" r="95" fill="rgba(255,183,197,0.14)" stroke="rgba(255,183,197,0.4)" strokeWidth="2" />
      <circle cx="245" cy="235" r="95" fill="rgba(255,141,161,0.1)" stroke="rgba(255,141,161,0.35)" strokeWidth="2" />
      <text x="200" y="124" textAnchor="middle" fill="#2D1B22" style={{ fontSize: '13px', fontWeight: 600 }}>
        Passion
      </text>
      <text x="118" y="198" textAnchor="middle" fill="#2D1B22" style={{ fontSize: '13px', fontWeight: 600 }}>
        Mission
      </text>
      <text x="282" y="198" textAnchor="middle" fill="#2D1B22" style={{ fontSize: '13px', fontWeight: 600 }}>
        Vocation
      </text>
      <text x="200" y="272" textAnchor="middle" fill="#2D1B22" style={{ fontSize: '13px', fontWeight: 600 }}>
        Profession
      </text>
      <text x="200" y="198" textAnchor="middle" fill="rgba(45,27,34,0.75)" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
        IKIGAI
      </text>
    </svg>
  )
}

export default function IkigaiExplainer() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-brand-cream text-brand-plum overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/90 backdrop-blur-xl border-b border-brand-pink/15">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-brand-plum/70 hover:text-brand-plum transition-colors">
            ← Home
          </Link>
          <Link
            href="/#action"
            className="text-xs font-bold rounded-full bg-brand-plum text-brand-pink px-4 py-2.5 hover:bg-brand-plum-2 transition-colors shadow-md"
          >
            Find your Ikigai
          </Link>
        </div>
      </header>

      {/* Hero — full-bleed imagery */}
      <section className="relative min-h-[min(88vh,920px)] flex flex-col">
        <div className="absolute inset-0 z-0">
          <Image
            src={ikigaiExplainerImages.hero.src}
            alt={ikigaiExplainerImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-plum/88 via-brand-plum/45 to-brand-cream" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,183,197,0.15),_transparent_55%)]" />
        </div>

        <div className="relative z-10 flex flex-col flex-grow justify-center px-5 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/25 bg-white/10 text-[10px] uppercase tracking-[0.4em] font-bold text-brand-pink mb-8 backdrop-blur-md"
            >
              From Japan — for your path
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.35rem] font-serif italic text-white leading-[1.08] mb-6 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
            >
              Ikigai is your reason to rise — where love, mastery, need, and livelihood meet.
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-white/92 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md"
            >
              A student-friendly map: the Japanese idea of{' '}
              <em className="text-white not-italic font-serif">ikigai</em> (生き甲斐) points toward a life
              that feels worth living — built in small, honest steps.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Japan roots */}
      <section className="relative py-16 md:py-28 px-5 border-y border-brand-pink/15 bg-white/50 sakura-pattern">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-pink-2 font-bold mb-3">
              Roots &amp; light
            </p>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-plum mb-5">
              Why Japan keeps returning to this word
            </h2>
            <p className="text-brand-plum/75 leading-relaxed text-lg max-w-3xl mx-auto text-left md:text-center">
              The word breaks beautifully: <span className="text-brand-plum font-semibold">iki</span>{' '}
              (生き) carries “life” and “to live,” and <span className="text-brand-plum font-semibold">gai</span>{' '}
              (甲斐) suggests value, worth, or what makes something worthwhile. Together,{' '}
              <em className="font-serif not-italic">ikigai</em> is less about a LinkedIn title and more
              about the daily sense that your hours matter — to you and to someone else.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            <motion.div
              className="relative w-full aspect-[16/11] md:min-h-[340px] rounded-[1.75rem] overflow-hidden shadow-[0_28px_80px_rgba(45,27,34,0.18)] ring-2 ring-white/80"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <Image
                src={ikigaiExplainerImages.roots.src}
                alt={ikigaiExplainerImages.roots.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-plum/35 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              className="space-y-5 text-brand-plum/80 leading-relaxed text-base md:text-lg"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <p>
                You may have heard of <strong className="text-brand-plum font-semibold">Okinawa</strong>, where
                many people live long, socially connected lives. Writers and researchers often talk about{' '}
                <em className="font-serif text-brand-plum not-italic">ikigai</em> alongside community,
                movement, and eating with care — not as a magic formula, but as a reminder that purpose and
                belonging feed each other.
              </p>
              <p>
                Japanese aesthetics — the care in a bowl of tea, the patience in a garden, the rhythm of a
                festival — whisper the same lesson: meaning is rarely only inside your head. It shows up in
                how you attend to the world.
              </p>
              <p className="text-brand-plum/60 text-sm md:text-base border-l-[3px] border-brand-pink pl-5 py-1">
                This page uses the popular <strong className="text-brand-plum/85">four-circle</strong>{' '}
                framework (common in Western workshops). Japanese scholars may use{' '}
                <em className="not-italic">ikigai</em> more broadly — treat the diagram as a compass, not a
                cage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four questions + diagram */}
      <section className="py-16 md:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-pink-2 font-bold mb-3">
              The map
            </p>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-plum mb-4">
              Four questions — one conversation
            </h2>
            <p className="text-brand-plum/75 leading-relaxed text-lg">
              Most classes ask what you want to be. Ikigai asks how your loves, skills, cares, and realities
              can fit together over time.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.ul
              className="space-y-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {fourQuestions.map((item) => (
                <motion.li
                  key={item.q}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  className="rounded-2xl bg-white/80 border-2 border-brand-pink/25 px-6 py-5 shadow-md backdrop-blur-sm"
                >
                  <p className="font-serif italic text-xl text-brand-plum">{item.q}</p>
                  <p className="text-sm md:text-base text-brand-plum/55 mt-2">{item.hint}</p>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="rounded-[2rem] bg-white/60 border-2 border-brand-pink/20 p-8 md:p-10 shadow-inner"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <IkigaiDiagramMini />
              <p className="text-center text-sm text-brand-plum/55 mt-6 max-w-md mx-auto leading-relaxed">
                Where two circles overlap, you get Passion, Mission, Vocation, or Profession. Where all four
                meet — in the center — many people place the feeling of{' '}
                <em className="not-italic text-brand-plum/80 font-semibold">ikigai</em>: a life that feels
                worth living, in the round.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four intersections — in depth */}
      <div className="max-w-6xl mx-auto px-5 pb-10 space-y-28 md:space-y-36">
        {sections.map((s, idx) => {
          const { src, alt } = ikigaiExplainerImages[s.imageKey]

          return (
            <motion.article
              key={s.key}
              className={`flex flex-col gap-12 md:gap-16 md:flex-row md:items-stretch ${
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
                className="flex-1 relative w-full min-h-[280px] md:min-h-[400px]"
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
                  className={`relative h-full min-h-[280px] md:min-h-[400px] rounded-[2rem] overflow-hidden shadow-[0_28px_90px_rgba(45,27,34,0.2)] ring-2 ring-white/70 bg-gradient-to-br ${s.accent}`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 48vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/55 via-brand-plum/5 to-transparent pointer-events-none" />
                  <p className="absolute bottom-5 left-5 right-5 text-white text-sm md:text-base font-bold tracking-wide drop-shadow-lg">
                    {s.jpHint}
                  </p>
                </div>
                <motion.span
                  className="absolute -z-10 w-52 h-52 rounded-full bg-brand-pink/30 blur-3xl -bottom-12 -right-8"
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
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-pink-2 font-bold mb-2">
                  {String(idx + 1).padStart(2, '0')} — {s.subtitle}
                </p>
                <h2 className="text-4xl md:text-5xl font-serif italic text-brand-plum mb-4">{s.title}</h2>
                <p className="text-brand-plum/90 leading-relaxed text-lg mb-4">{s.lead}</p>
                <p className="text-brand-plum/70 leading-relaxed text-base md:text-lg mb-8">{s.body}</p>

                <div className="rounded-2xl bg-brand-cream-2/95 border-2 border-brand-pink/30 px-6 py-5 mb-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-brand-plum/45 font-bold mb-2">
                    For students
                  </p>
                  <p className="text-sm md:text-base text-brand-plum/80 leading-relaxed">{s.students}</p>
                </div>

                <div className="rounded-2xl border-2 border-dashed border-brand-plum/25 bg-white/50 px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-brand-pink-2 font-bold mb-2">
                    Try asking
                  </p>
                  <p className="text-brand-plum font-serif italic text-xl md:text-2xl leading-snug">{s.prompt}</p>
                </div>
              </motion.div>
            </motion.article>
          )
        })}
      </div>

      {/* Center + image */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            className="relative w-full aspect-[16/11] md:min-h-[420px] rounded-[2rem] overflow-hidden shadow-[0_28px_90px_rgba(45,27,34,0.18)] ring-2 ring-white/80 order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <Image
              src={ikigaiExplainerImages.center.src}
              alt={ikigaiExplainerImages.center.alt}
              fill
              className="object-cover object-[center_35%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-plum/35 to-transparent" />
          </motion.div>
          <motion.div
            className="order-1 md:order-2 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-pink-2 font-bold">The center</p>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-plum">The still point is practice</h2>
            <p className="text-brand-plum/75 leading-relaxed text-base md:text-lg">
              When people describe finding <em className="font-serif not-italic text-brand-plum/90">ikigai</em>, they
              often mention neither fame nor speed — but alignment. The center of the diagram is not a job title
              you must decode at eighteen. It is a felt sense that your days, your relationships, and your
              contribution lean in the same direction.
            </p>
            <p className="text-brand-plum/75 leading-relaxed text-base md:text-lg">
              In Japanese culture, long-cultivated arts — calligraphy, archery, tea — teach that mastery is a
              relationship with time. Your ikigai may emerge the same way: through repetition, honest feedback,
              and small courages, not one dramatic announcement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-16 md:py-24 px-5 bg-gradient-to-b from-brand-cream to-brand-cream-2 border-t border-brand-pink/15">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-pink-2 font-bold mb-3">
              Use it well
            </p>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-plum mb-3">
              How to work with this as a student
            </h2>
            <p className="text-brand-plum/65 leading-relaxed text-lg">
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
                className="flex gap-4 items-start rounded-2xl bg-white/80 border-2 border-brand-pink/15 px-6 py-4 shadow-sm"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-pink/30 text-brand-plum text-sm font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-brand-plum/80 leading-relaxed text-base">{line}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Closing + CTA */}
      <motion.section
        className="relative px-5 pb-28 pt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-2xl mx-auto text-center rounded-[2rem] bg-white/70 backdrop-blur-xl border-2 border-brand-pink/25 px-8 py-14 shadow-[0_24px_70px_rgba(255,183,197,0.2)]">
          <h3 className="text-3xl md:text-4xl font-serif italic text-brand-plum mb-4">
            Walk it with someone who listens
          </h3>
          <p className="text-brand-plum/65 mb-10 leading-relaxed text-lg">
            The tool on this site is a conversation — question by question — so your story can surface in its
            own time. Bring your doubts; they belong in the room.
          </p>
          <Link href="/#action" className="btn-primary inline-flex text-base px-10 py-3.5 font-semibold">
            Begin the journey
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
