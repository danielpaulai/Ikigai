const steps = [
  {
    num: '01',
    title: 'Pick your mode',
    body: 'Quick Session is 8 questions — perfect for a live event or workshop. Deep Dive is 18 questions for the full picture.',
    icon: '⚡',
  },
  {
    num: '02',
    title: 'Talk to Kai, your AI coach',
    body: 'Answer one question at a time. Type or use your voice. Kai listens, responds, and goes deeper — like a real coaching session.',
    icon: '🎙',
  },
  {
    num: '03',
    title: 'Receive your Ikigai',
    body: 'You get your Ikigai statement, your personal archetype, three ways to monetize it, and a 90-day first step. Download as PDF.',
    icon: '📄',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="bg-brand-dark py-24 md:py-28">
      <div className="max-w-[1000px] mx-auto px-6">
        <p className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-4">The Process</p>
        <h2 className="font-display text-3xl md:text-[44px] font-bold text-white">Three steps to your Ikigai.</h2>
        <p className="mt-4 text-brand-silver text-lg">No forms. No sign-up. Just questions and answers.</p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-3xl bg-brand-charcoal border border-brand-silver/10 p-8 flex flex-col"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <span className="font-display text-4xl font-bold text-brand-red">{s.num}</span>
              <h3 className="mt-4 text-white text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-brand-silver text-sm leading-relaxed flex-1">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-brand-red px-6 py-4 text-center text-white text-sm md:text-base font-medium">
          ⏱ Quick Session: 15-20 minutes &nbsp; | &nbsp; 🌊 Deep Dive: 45-60 minutes &nbsp; | &nbsp; 🔒 Your answers stay
          private
        </div>
      </div>
    </section>
  )
}
