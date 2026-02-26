'use client'

import Link from 'next/link'
import { assets, categoryGradients, categoryKanji } from '@/lib/assets'

export default function FeaturedGrid() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-red-500 text-xs tracking-widest uppercase mb-3">Featured Assets</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Download
            </h2>
          </div>
          <Link
            href="/browse"
            className="hidden md:flex items-center gap-2 text-white/50 hover:text-white text-sm tracking-wide transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-3 mb-8">
          {['All', 'Video', 'Image'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded text-sm tracking-wide transition-colors ${
                tab === 'All'
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <Link
              key={asset.id}
              href={`/asset/${asset.id}`}
              className="group relative rounded-lg overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 transition-all hover:scale-[1.02]"
            >
              {/* Image area */}
              <div className={`relative aspect-video bg-gradient-to-br ${categoryGradients[asset.category] ?? 'from-zinc-800 to-zinc-900'}`}>
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Video play button */}
                {asset.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center group-hover:bg-red-600/80 transition-colors">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Japanese kanji watermark */}
                <span className="absolute bottom-3 right-3 text-white/20 text-4xl font-serif select-none drop-shadow-lg">
                  {categoryKanji[asset.category] ?? '和'}
                </span>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    asset.type === 'video'
                      ? 'bg-blue-600/80 text-white'
                      : 'bg-emerald-600/80 text-white'
                  }`}>
                    {asset.type === 'video' ? 'VIDEO' : 'IMAGE'}
                  </span>
                  {asset.duration && (
                    <span className="text-xs px-2 py-0.5 rounded bg-black/60 text-white/80 backdrop-blur-sm">
                      {asset.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
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

                {/* Tags */}
                <div className="flex gap-1.5 mt-3">
                  {asset.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/browse" className="text-white/50 hover:text-white text-sm tracking-wide transition-colors">
            View all assets →
          </Link>
        </div>
      </div>
    </section>
  )
}
