import { notFound } from 'next/navigation'
import { sets } from '@/lib/sets'
import SetBuyButton from '@/components/SetBuyButton'

export async function generateStaticParams() {
  return sets.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const set = sets.find((s) => s.id === params.id)
  if (!set) return {}
  return {
    title: `${set.title} — bokusai`,
    description: set.scene,
  }
}

const LIGHTING_ICON: Record<string, string> = {
  dim:    '🌑',
  normal: '🌤',
  bright: '🌅',
}

export default function SetDetailPage({ params }: { params: { id: string } }) {
  const set = sets.find((s) => s.id === params.id)
  if (!set) notFound()

  // Group images by scene letter (A/B/C)
  const scenes: Record<string, typeof set.images> = {}
  set.images.forEach((img) => {
    const match = img.label.match(/Scene ([A-Z])/)
    const key = match ? match[1] : 'Extra'
    if (!scenes[key]) scenes[key] = []
    scenes[key].push(img)
  })

  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="bg-zinc-950 border-b border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-red-500 text-xs tracking-widest uppercase mb-3">
            Short Set · {set.theme}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{set.title}</h1>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">{set.scene}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {set.usecases.map((uc) => (
              <span key={uc} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 font-medium tracking-wide">
                ▶ {uc}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">

          {/* Left: image grid by scene */}
          <div className="space-y-10">
            {Object.entries(scenes).map(([sceneLetter, images]) => (
              <div key={sceneLetter}>
                <h2 className="text-white/30 text-xs tracking-widest uppercase mb-4">
                  Scene {sceneLetter}
                  {sceneLetter === 'A' && images.some(i => i.margin === 'space') && (
                    <span className="ml-2 text-white/20">· incl. breathing-room version</span>
                  )}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img) => (
                    <div key={img.slot} className="relative group rounded-xl overflow-hidden border border-white/8 hover:border-white/25 transition-all">
                      {/* Image */}
                      <div className="aspect-[9/16] bg-zinc-900">
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      </div>
                      {/* Overlay label */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                        <div className="text-white/70 text-xs font-medium">
                          {LIGHTING_ICON[img.lighting]} {img.label}
                        </div>
                        {img.margin === 'space' && (
                          <div className="text-white/40 text-[10px] mt-0.5">breathing room</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: purchase panel (sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <div className="text-4xl font-bold text-white">${set.price / 100}</div>
                <p className="text-white/40 text-xs mt-1">one-time · {set.imageCount} images</p>
              </div>

              <ul className="space-y-2.5">
                {[
                  `${set.imageCount} images, all variants`,
                  'Dim · Normal · Golden Hour',
                  'Tight + breathing-room versions',
                  'Full resolution (576 × 1024, 9:16)',
                  'Personal & commercial license',
                  'Instant download after payment',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                    <svg className="w-3 h-3 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <SetBuyButton setId={set.id} />

              <p className="text-white/25 text-xs text-center leading-relaxed">
                Secure checkout via Stripe.<br />
                No subscription. Buy once, use forever.
              </p>
            </div>

            {/* What this set is for */}
            <div className="mt-4 bg-red-950/20 border border-red-900/30 rounded-xl p-4">
              <p className="text-red-400 text-xs font-semibold tracking-wide uppercase mb-2">Use this set for</p>
              <p className="text-white/60 text-xs leading-relaxed">{set.scene}</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
