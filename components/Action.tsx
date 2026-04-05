import Image from 'next/image'
import dynamic from 'next/dynamic'

const IkigaiTool = dynamic(() => import('./ikigai/IkigaiTool'), { ssr: false })

export default function Action() {
  return (
    <section id="action" className="py-24 md:py-40 overflow-hidden bg-brand-cream relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-16 top-1/4 w-48 aspect-[3/4] rotate-6 rounded-5xl overflow-hidden border-[8px] border-white/80 shadow-xl opacity-40 animate-float relative">
          <Image
            src="https://images.unsplash.com/photo-1528164344705-4754268799af?w=400&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
        <div
          className="absolute -right-16 bottom-1/4 w-44 aspect-square -rotate-6 rounded-5xl overflow-hidden border-[8px] border-white/80 shadow-xl opacity-40 animate-float relative"
          style={{ animationDelay: '2s' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="176px"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <div className="capsule-tag">Start here</div>
          <h2 className="text-4xl md:text-6xl font-serif italic text-brand-plum leading-tight mt-4">Find your Ikigai now.</h2>
          <p className="mt-4 text-brand-plum/55 text-lg max-w-xl mx-auto">
            Free. Private. Pick the short version (~15–20 min) or the in-depth version (~45–60 min).
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <IkigaiTool />
        </div>
      </div>
    </section>
  )
}
