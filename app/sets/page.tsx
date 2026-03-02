import Link from 'next/link'
import { sets } from '@/lib/sets'

export const metadata = {
  title: 'Short Sets — bokusai',
  description: '10 images. One emotion. Every lighting variation you need. Built for AI video creators.',
}

const THEME_COLORS: Record<string, string> = {
  Discipline: 'from-slate-900 to-gray-800',
  Silence:    'from-emerald-950 to-teal-900',
  Legacy:     'from-amber-950 to-yellow-900',
  'Night & Rain': 'from-violet-950 to-indigo-900',
}

const THEME_ACCENTS: Record<string, string> = {
  Discipline:     'text-slate-400',
  Silence:        'text-emerald-400',
  Legacy:         'text-amber-400',
  'Night & Rain': 'text-violet-400',
}

export default function SetsPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-16 px-6 overflow-hidden text-center">
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-white/3 text-[160px] font-serif select-none pointer-events-none leading-none">
          組
        </span>
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-white/60 text-xs tracking-widest uppercase">Short Sets</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          10 images. One emotion.
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
          Not art — raw material for creators.
          Each set gives you the same scene in 3 lighting variations, so you always have the right shot.
        </p>
      </div>

      {/* What's in a set */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { label: '3 base scenes', desc: 'Same emotion, slightly different angle or pose' },
            { label: '3 lighting each', desc: 'Dim · Normal · Golden Hour — all three' },
            { label: '+ 1 breathing room', desc: 'Extra space for text overlays and captions' },
          ].map(({ label, desc }) => (
            <div key={label} className="bg-zinc-900/50 border border-white/8 rounded-xl p-5">
              <div className="text-white font-bold text-sm mb-1">{label}</div>
              <div className="text-white/40 text-xs leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sets grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-8">
        {sets.length === 0 ? (
          <div className="text-center py-32">
            <span className="text-white/5 text-8xl font-serif block mb-6">空</span>
            <p className="text-white/30 text-sm">No sets available yet. Check back soon.</p>
          </div>
        ) : (
          sets.map((set) => {
            const gradient = THEME_COLORS[set.theme] ?? 'from-zinc-800 to-zinc-900'
            const accent = THEME_ACCENTS[set.theme] ?? 'text-red-400'
            const previewImages = set.images.slice(0, 5)

            return (
              <Link
                key={set.id}
                href={`/set/${set.id}`}
                className="block group"
              >
                <div className={`relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${gradient} hover:border-white/25 transition-all`}>
                  <div className="p-8 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">

                      {/* Left: info */}
                      <div className="space-y-5">
                        {/* Theme + title */}
                        <div className="flex items-center gap-4">
                          <span className="text-white/10 text-6xl font-serif select-none leading-none">
                            {set.kanji}
                          </span>
                          <div>
                            <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${accent}`}>
                              {set.theme}
                            </div>
                            <h2 className="text-white text-2xl font-bold group-hover:text-red-300 transition-colors">
                              {set.title}
                            </h2>
                          </div>
                        </div>

                        {/* Scene copy */}
                        <p className="text-white/70 text-base leading-relaxed italic border-l-2 border-red-600/60 pl-4">
                          &ldquo;{set.scene}&rdquo;
                        </p>

                        {/* Use cases */}
                        <div className="flex flex-wrap gap-2">
                          {set.usecases.map((uc) => (
                            <span key={uc} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 font-medium tracking-wide">
                              ▶ {uc}
                            </span>
                          ))}
                        </div>

                        {/* Preview strip */}
                        <div>
                          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">
                            Preview — {set.imageCount} images included
                          </p>
                          <div className="flex gap-2">
                            {previewImages.map((img) => (
                              <div
                                key={img.slot}
                                className="relative w-16 h-24 rounded-lg overflow-hidden border border-white/10 shrink-0"
                              >
                                <img
                                  src={img.url}
                                  alt={img.label}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white/60 text-[9px] text-center py-0.5 leading-tight">
                                  {img.lighting}
                                </div>
                              </div>
                            ))}
                            <div className="w-16 h-24 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                              <span className="text-white/30 text-xs">+{set.imageCount - 5}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: purchase panel */}
                      <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-5 h-fit">
                        <div>
                          <div className="text-4xl font-bold text-white">${set.price / 100}</div>
                          <p className="text-white/40 text-xs mt-1">one-time · {set.imageCount} images</p>
                        </div>

                        <ul className="space-y-2">
                          {[
                            `${set.imageCount} images total`,
                            'Dim · Normal · Golden Hour lighting',
                            'Tight & breathing-room versions',
                            'Personal & commercial license',
                            'Instant download after payment',
                          ].map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                              <svg className="w-3 h-3 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="block w-full text-center py-3 rounded-lg text-sm font-semibold tracking-wide bg-red-600 group-hover:bg-red-500 text-white transition-all">
                          View & Buy This Set →
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>

      {/* CTA */}
      <div className="border-t border-white/5 py-16 text-center">
        <p className="text-white/40 text-sm mb-4">Need individual scenes instead?</p>
        <Link
          href="/browse"
          className="text-white/70 hover:text-white text-sm tracking-wide underline underline-offset-4 transition-colors"
        >
          Browse all individual assets →
        </Link>
      </div>
    </main>
  )
}
