import dynamic from 'next/dynamic'

const IkigaiTool = dynamic(() => import('./ikigai/IkigaiTool'), { ssr: false })

export default function Action() {
  return (
    <section id="action" className="bg-brand-charcoal py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-4">Start Here</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Find your Ikigai now.</h2>
          <p className="text-brand-silver text-lg max-w-lg mx-auto">Free. Private. Takes 15–60 minutes.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <IkigaiTool />
        </div>
      </div>
    </section>
  )
}
