import Link from 'next/link'
import { packs } from '@/lib/packs'
import { assets } from '@/lib/assets'
import PackBuyButton from '@/components/PackBuyButton'

export const metadata = {
  title: 'Scene Packs — bokusai',
  description: 'Curated scene packs for AI video creators. Buy a bundle and save.',
}

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-white/60 text-xs tracking-widest uppercase">Curated Packs</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Scene Packs
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
          Handpicked sets of Japanese visuals — grouped by theme, ready for your Shorts, TikTok, or AI narration.
          Buy a pack and save vs. buying individually.
        </p>
      </div>

      {/* Packs grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-8">
        {packs.map((pack) => {
          const packAssets = pack.assetIds
            .map((id) => assets.find((a) => a.id === id))
            .filter(Boolean) as typeof assets
          const discountPct = Math.round((1 - pack.price / pack.originalPrice) * 100)

          return (
            <div
              key={pack.id}
              className={`relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${pack.gradient}`}
            >
              {/* Discount badge */}
              <div className="absolute top-5 right-5 z-10">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  {discountPct}% OFF
                </span>
              </div>

              <div className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">

                  {/* Left: Pack info */}
                  <div className="space-y-5">
                    {/* Kanji + title */}
                    <div className="flex items-center gap-4">
                      <span className="text-white/15 text-6xl font-serif select-none leading-none">
                        {pack.kanji}
                      </span>
                      <div>
                        <h2 className="text-white text-2xl font-bold">{pack.title}</h2>
                        <p className="text-white/50 text-sm mt-1">{pack.tagline}</p>
                      </div>
                    </div>

                    {/* Scene copy */}
                    <p className="text-white/70 text-base leading-relaxed italic border-l-2 border-red-600/60 pl-4">
                      &ldquo;{pack.scene}&rdquo;
                    </p>

                    {/* Use cases */}
                    <div className="flex flex-wrap gap-2">
                      {pack.usecases.map((uc) => (
                        <span key={uc} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 font-medium tracking-wide">
                          ▶ {uc}
                        </span>
                      ))}
                    </div>

                    {/* Asset previews */}
                    <div>
                      <p className="text-white/30 text-xs tracking-widest uppercase mb-3">
                        Includes {packAssets.length} scenes
                      </p>
                      <div className="flex gap-2">
                        {packAssets.map((asset) => (
                          <Link
                            key={asset.id}
                            href={`/asset/${asset.id}`}
                            className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors shrink-0"
                          >
                            <img
                              src={asset.image}
                              alt={asset.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                            />
                            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Purchase panel */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-5 h-fit">
                    {/* Price */}
                    <div>
                      <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold text-white">${pack.price / 100}</span>
                        <span className="text-white/30 text-sm mb-1 line-through">
                          ${pack.originalPrice / 100}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs mt-1">one-time · {packAssets.length} scenes included</p>
                    </div>

                    {/* What's included */}
                    <ul className="space-y-2">
                      {packAssets.map((asset) => (
                        <li key={asset.id} className="flex items-center gap-2 text-xs text-white/50">
                          <svg className="w-3 h-3 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {asset.title}
                        </li>
                      ))}
                      <li className="flex items-center gap-2 text-xs text-white/50">
                        <svg className="w-3 h-3 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Personal & commercial license
                      </li>
                    </ul>

                    {/* Buy button */}
                    <PackBuyButton packId={pack.id} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Browse individual assets CTA */}
      <div className="border-t border-white/5 py-16 text-center">
        <p className="text-white/40 text-sm mb-4">Looking for a single scene?</p>
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
