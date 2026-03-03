import Link from 'next/link'
import RequestForm from './RequestForm'
import TwitterEmbed from '@/components/TwitterEmbed'
import { journalPosts } from '@/lib/journal'
import { assets, categoryGradients } from '@/lib/assets'

export const metadata = {
  title: 'bokusai Friends — Mitsuo from Japan',
  description: "I'm Mitsuo, from Japan. I write about Japanese aesthetics and make AI visuals for creators worldwide.",
}

export default function FriendsPage() {
  return (
    <main className="min-h-screen bg-black pt-16">

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center relative">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-900 to-zinc-800 border border-red-800/50 flex items-center justify-center text-3xl mx-auto mb-6 select-none">
            🇯🇵
          </div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-xs tracking-widest uppercase">Online from Japan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Hi, I&apos;m Mitsuo.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            I&apos;m a Japanese creator who makes AI visuals for video creators around the world.
            Every image on this site was made by me — one at a time.
          </p>
          <TwitterEmbed />
        </div>
      </div>

      {/* About section */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { kanji: '日', label: 'Based in Japan', body: 'I live and breathe Japanese culture. Every scene I create comes from real knowledge — not just aesthetics.' },
            { kanji: '毎', label: 'Daily uploads', body: 'New images are added every day. The catalog grows because I genuinely enjoy making these.' },
            { kanji: '友', label: 'Friendly & direct', body: "English is fine. Message me anytime. I read everything and reply when I can." },
          ].map(item => (
            <div key={item.kanji} className="bg-white/[0.03] border border-white/8 rounded-xl p-6">
              <span className="text-4xl font-serif text-white/10 block mb-3 select-none">{item.kanji}</span>
              <h3 className="text-white font-semibold mb-2 text-sm tracking-wide">{item.label}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="border-l-2 border-red-600/60 pl-6 mb-16">
          <p className="text-white/70 text-lg italic leading-relaxed">
            &ldquo;I started bokusai because I couldn&apos;t find good Japanese visuals for AI videos.
            So I made them myself. If you need something specific — just ask.&rdquo;
          </p>
          <footer className="text-white/30 text-sm mt-3">— Mitsuo, Tokyo</footer>
        </blockquote>

        {/* Latest from the Journal */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-red-500 text-xs tracking-widest uppercase mb-1">From the Journal</p>
              <h2 className="text-xl font-bold text-white">What I think about</h2>
            </div>
            <Link href="/journal" className="text-white/30 hover:text-white text-xs tracking-wide transition-colors">
              All entries →
            </Link>
          </div>
          <div className="space-y-4">
            {journalPosts.slice(0, 3).map((post) => {
              const linkedAsset = post.assetId ? assets.find((a) => a.id === post.assetId) : null
              const gradient = linkedAsset
                ? (categoryGradients[linkedAsset.category] ?? 'from-zinc-800 to-zinc-900')
                : 'from-zinc-800 to-zinc-900'
              return (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className={`w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br ${gradient}`}>
                    {linkedAsset && (
                      <img src={linkedAsset.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    )}
                    {!linkedAsset && (
                      <span className="w-full h-full flex items-center justify-center text-white/20 text-xl font-serif">記</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium group-hover:text-red-400 transition-colors truncate">{post.title}</p>
                    <p className="text-white/30 text-xs mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <span className="text-white/20 group-hover:text-white/50 text-sm transition-colors shrink-0">→</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Request form */}
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🎨</span>
              <h2 className="text-2xl font-bold text-white">Request a Scene</h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Tell me what you&apos;re looking for. If it inspires me, I&apos;ll create it and add it to the site —
              and let you know when it&apos;s ready.
            </p>
          </div>
          <RequestForm />
        </div>

        {/* Social links */}
        <div className="mt-12 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Find me on</p>
            <a
              href="https://x.com/bokusai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @bokusai on X
            </a>
          </div>
          <Link
            href="/browse"
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Browse all visuals →
          </Link>
        </div>
      </div>

    </main>
  )
}
