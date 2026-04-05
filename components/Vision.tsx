const cards = [
  {
    emoji: '❤️',
    title: 'What You Love',
    body: 'The activities and topics that make you lose all track of time.',
  },
  {
    emoji: '⚡',
    title: "What You're Good At",
    body: 'Your natural talents and hard-earned skills — including the ones you take for granted.',
  },
  {
    emoji: '🌍',
    title: 'What the World Needs',
    body: 'The problems and needs you are drawn to solve, even without reward.',
  },
  {
    emoji: '💰',
    title: 'What You Can Be Paid For',
    body: 'The economic value hidden inside your experience and your unique perspective.',
  },
]

export default function Vision() {
  return (
    <section id="vision" className="bg-brand-charcoal py-24 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-4">What is Ikigai</p>
        <h2 className="font-display text-3xl md:text-[44px] font-bold text-white leading-tight max-w-3xl">
          Your reason for being. And your blueprint for success.
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-5 text-brand-silver text-[17px] leading-[1.8]">
            <p>
              Ikigai (生き甲斐) is a Japanese concept that means &apos;reason for being.&apos; It sits at the intersection of four
              things: what you love, what you&apos;re good at, what the world needs, and what you can be paid for.
            </p>
            <p>
              Most people operate in only one or two circles. They are either passionate but broke, skilled but unfulfilled,
              or busy but empty. Your Ikigai is the place where all four align.
            </p>
            <p>
              This is not a personality test. It is a conversation — guided by AI — that helps you discover what most people
              spend a lifetime searching for.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((c) => (
              <div
                key={c.title}
                className="bg-brand-smoke rounded-2xl p-5 border border-brand-silver/10 border-l-[3px] border-l-brand-red"
              >
                <div className="text-lg mb-2">
                  {c.emoji} <span className="text-white font-semibold text-lg">{c.title}</span>
                </div>
                <p className="text-brand-silver text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-silver/25 bg-brand-dark/40 px-6 py-5 text-brand-silver text-sm md:text-base leading-relaxed">
          ⚠️ Missing even one circle leads to burnout, emptiness, or feeling lost. This tool helps you find all four — then
          shows you how to monetize the intersection.
        </div>
      </div>
    </section>
  )
}
