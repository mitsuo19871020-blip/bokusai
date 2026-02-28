'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { assets, categoryGradients, categoryKanji } from '@/lib/assets'

const TYPES = ['All', 'Video', 'Image'] as const
const CATEGORIES = ['All', 'Samurai', 'Fuji', 'Kyoto', 'Edo', 'Night', 'Ukiyo-e'] as const
const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
] as const

type TypeFilter = (typeof TYPES)[number]
type CategoryFilter = (typeof CATEGORIES)[number]
type Sort = (typeof SORTS)[number]['value']

export default function BrowseClient() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All')
  const [sort, setSort] = useState<Sort>('featured')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let result = [...assets]

    if (typeFilter !== 'All') {
      result = result.filter((a) => a.type === typeFilter.toLowerCase())
    }
    if (categoryFilter !== 'All') {
      result = result.filter((a) => a.category === categoryFilter)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)

    return result
  }, [typeFilter, categoryFilter, sort, query])

  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Page header */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-12 px-6 overflow-hidden">
        {/* Decorative kanji */}
        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/3 text-[140px] font-serif select-none pointer-events-none leading-none">
          探
        </span>
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 text-xs tracking-widest uppercase mb-3">All Assets</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Browse the Collection</h1>
          <p className="text-white/40 text-sm mt-2">
            {assets.length} assets · AI-generated Japanese visuals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search assets…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/60 focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer min-w-[180px]"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          {/* ── Sidebar filters ── */}
          <aside className="hidden md:block w-48 shrink-0 space-y-8">
            {/* Type */}
            <div>
              <h3 className="text-white/40 text-xs tracking-widest uppercase mb-3">Type</h3>
              <ul className="space-y-1">
                {TYPES.map((t) => (
                  <li key={t}>
                    <button
                      onClick={() => setTypeFilter(t)}
                      className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                        typeFilter === t
                          ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-white/40 text-xs tracking-widest uppercase mb-3">Category</h3>
              <ul className="space-y-1">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setCategoryFilter(c)}
                      className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                        categoryFilter === c
                          ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {c !== 'All' ? (
                        <span className="flex items-center gap-2">
                          <span className="text-white/20 font-serif text-base leading-none">
                            {categoryKanji[c] ?? '和'}
                          </span>
                          {c}
                        </span>
                      ) : (
                        'All'
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Main grid area ── */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter chips */}
            <div className="md:hidden flex flex-wrap gap-2 mb-6">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded text-xs tracking-wide transition-colors ${
                    typeFilter === t
                      ? 'bg-red-600 text-white'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
              {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(categoryFilter === c ? 'All' : c)}
                  className={`px-3 py-1.5 rounded text-xs tracking-wide transition-colors ${
                    categoryFilter === c
                      ? 'bg-red-600 text-white'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="text-white/30 text-xs mb-5">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              {query && ` for "${query}"`}
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((asset) => {
                  const gradient = categoryGradients[asset.category] ?? 'from-zinc-800 to-zinc-900'
                  const kanji = categoryKanji[asset.category] ?? '和'
                  return (
                    <Link
                      key={asset.id}
                      href={`/asset/${asset.id}`}
                      className="group relative rounded-lg overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 transition-all hover:scale-[1.02]"
                    >
                      {/* Thumbnail */}
                      <div className={`relative aspect-video bg-gradient-to-br ${gradient}`}>
                        <img
                          src={asset.image}
                          alt={asset.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                        {asset.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center group-hover:bg-red-600/80 transition-colors">
                              <svg
                                className="w-5 h-5 text-white ml-0.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}

                        <span className="absolute bottom-3 right-3 text-white/20 text-4xl font-serif select-none drop-shadow-lg">
                          {kanji}
                        </span>

                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-medium ${
                              asset.type === 'video'
                                ? 'bg-blue-600/80 text-white'
                                : 'bg-emerald-600/80 text-white'
                            }`}
                          >
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
                            <div className="text-white font-bold text-sm">${asset.price / 100}</div>
                            <div className="text-white/30 text-xs">one-time</div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 mt-3">
                          {asset.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="text-center py-24">
                <span className="text-white/5 text-8xl font-serif block mb-6">空</span>
                <p className="text-white/40 text-sm">No assets found.</p>
                <button
                  onClick={() => {
                    setTypeFilter('All')
                    setCategoryFilter('All')
                    setQuery('')
                  }}
                  className="mt-4 text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
