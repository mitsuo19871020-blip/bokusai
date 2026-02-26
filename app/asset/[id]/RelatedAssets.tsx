'use client'

import Link from 'next/link'
import { assets, categoryGradients, categoryKanji } from '@/lib/assets'

type Props = {
  currentId: number
  category: string
}

export default function RelatedAssets({ currentId, category }: Props) {
  const related = assets
    .filter((a) => a.id !== currentId && a.category === category)
    .slice(0, 3)

  // Fall back to other assets if not enough in same category
  const others = assets
    .filter((a) => a.id !== currentId && a.category !== category)
    .slice(0, 3 - related.length)

  const items = [...related, ...others]

  if (items.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-white/5">
      <h2 className="text-white font-bold text-xl mb-8">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((asset) => {
          const gradient = categoryGradients[asset.category] ?? 'from-zinc-800 to-zinc-900'
          const kanji = categoryKanji[asset.category] ?? '和'
          return (
            <Link
              key={asset.id}
              href={`/asset/${asset.id}`}
              className="group relative rounded-lg overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 transition-all hover:scale-[1.02]"
            >
              <div className={`relative aspect-video bg-gradient-to-br ${gradient}`}>
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                {asset.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/50 border border-white/30 flex items-center justify-center group-hover:bg-red-600/80 transition-colors">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                <span className="absolute bottom-2 right-2 text-white/20 text-3xl font-serif select-none">
                  {kanji}
                </span>
                <div className="absolute top-2 left-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    asset.type === 'video' ? 'bg-blue-600/80 text-white' : 'bg-emerald-600/80 text-white'
                  }`}>
                    {asset.type === 'video' ? 'VIDEO' : 'IMAGE'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white text-sm font-medium group-hover:text-red-400 transition-colors">
                      {asset.title}
                    </h3>
                    <p className="text-white/40 text-xs mt-0.5">{asset.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-white font-bold text-sm">¥{asset.price}</div>
                    <div className="text-white/30 text-xs">one-time</div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
