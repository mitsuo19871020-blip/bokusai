import Link from 'next/link'
import { journalPosts } from '@/lib/journal'
import { assets, categoryGradients } from '@/lib/assets'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal — bokusai | Japanese Aesthetics by Mitsuo',
  description:
    'Personal essays on Japanese aesthetics, AI-generated art, and the visual language of Japan. Written by Mitsuo — the creator of bokusai.',
  openGraph: {
    title: 'Journal — bokusai',
    description: 'Personal essays on Japanese aesthetics and AI-generated visuals.',
    url: 'https://bokusai.vercel.app/journal',
    siteName: 'bokusai',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bokusai.vercel.app/journal',
  },
}

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-16 px-6 overflow-hidden">
        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/3 text-[160px] font-serif select-none pointer-events-none leading-none">
          記
        </span>
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500 text-xs tracking-widest uppercase mb-3">Journal</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Notes on Japanese<br className="hidden md:block" /> Aesthetics
          </h1>
          <p className="text-white/40 text-base mt-4 max-w-xl leading-relaxed">
            Why certain images are beautiful. What AI taught me about Japanese visual culture.
            Written in first person, by Mitsuo.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {journalPosts.map((post) => {
          const linkedAsset = post.assetId ? assets.find((a) => a.id === post.assetId) : null
          const gradient = linkedAsset
            ? (categoryGradients[linkedAsset.category] ?? 'from-zinc-800 to-zinc-900')
            : 'from-zinc-800 to-zinc-900'

          return (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all"
            >
              {/* Thumbnail */}
              <div
                className={`relative w-full sm:w-40 shrink-0 aspect-video sm:aspect-square rounded-lg overflow-hidden bg-gradient-to-br ${gradient}`}
              >
                {linkedAsset && (
                  <img
                    src={linkedAsset.image}
                    alt={linkedAsset.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                )}
                {!linkedAsset && (
                  <span className="absolute inset-0 flex items-center justify-center text-white/20 text-5xl font-serif">
                    記
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-red-500 tracking-widest uppercase">{post.category}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/30 text-xs">{post.readTime} read</span>
                  <span className="text-white/20 text-xs">·</span>
                  <time className="text-white/30 text-xs">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="text-white text-lg font-semibold leading-snug group-hover:text-red-400 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/30 border border-white/5"
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

      {/* Bottom CTA */}
      <div className="border-t border-white/5 py-16 px-6 text-center">
        <p className="text-white/30 text-sm mb-4">
          Browse the images these essays are about
        </p>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Browse Collection
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </main>
  )
}
