import dynamic from 'next/dynamic'

const IkigaiTool = dynamic(() => import('./ikigai/IkigaiTool'), { ssr: false })

export default function Action() {
  return (
    <section id="action" className="py-12 md:py-16 bg-brand-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-brand-pink/20 shadow-[0_8px_40px_rgba(255,183,197,0.12)] overflow-hidden">
          <IkigaiTool />
        </div>
      </div>
    </section>
  )
}
