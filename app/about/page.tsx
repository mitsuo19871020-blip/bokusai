import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — bokusai',
  description: 'bokusai is a curated library of AI-generated Japanese visuals for video creators worldwide.',
}

const values = [
  {
    kanji: '美',
    title: 'Beauty First',
    desc: 'Every asset is crafted to meet the aesthetic standards of Japanese visual culture — wabi-sabi, ma, and mono no aware.',
  },
  {
    kanji: '速',
    title: 'Creator Speed',
    desc: 'No subscription forms, no licensing headaches. Buy, download, drop into your timeline. Done.',
  },
  {
    kanji: '誠',
    title: 'Honest Pricing',
    desc: 'One price, one asset, forever. No hidden fees, no recurring charges, no surprises.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Hero */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-20 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,30,58,0.1),_transparent_60%)]" />
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-white/3 text-[180px] font-serif select-none pointer-events-none leading-none">
          墨
        </span>
        <div className="relative z-10">
          <p className="text-red-500 text-xs tracking-widest uppercase mb-4">About</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Made for creators who care<br className="hidden md:block" /> about aesthetics
          </h1>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
            bokusai (墨彩) means "ink and color" in Japanese. We build a library of
            AI-generated visuals inspired by Japan — for TikTok, YouTube, Reels, and beyond.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

        {/* Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-red-500 text-xs tracking-widest uppercase mb-4">The Story</p>
            <h2 className="text-2xl font-bold text-white mb-5">
              Japanese aesthetics, available to anyone
            </h2>
            <div className="space-y-4 text-white/50 text-sm leading-relaxed">
              <p>
                Video creators are always hunting for the perfect b-roll — cherry blossoms, neon
                streets, misty shrines. But stock footage is expensive, licensing is confusing,
                and the quality is often mediocre.
              </p>
              <p>
                bokusai was built to fix that. We use AI to generate premium-quality Japanese
                visuals and sell them at honest, one-time prices. No watermarks, no subscriptions,
                no surprises.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80"
              alt="Zen garden"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-white/20 text-5xl font-serif">侘び寂び</span>
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <p className="text-red-500 text-xs tracking-widest uppercase mb-4 text-center">Our Values</p>
          <h2 className="text-2xl font-bold text-white text-center mb-10">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ kanji, title, desc }) => (
              <div key={title} className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-black flex items-center justify-center mb-5">
                  <span className="text-white/30 text-2xl font-serif">{kanji}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-white/5 pt-16">
          <p className="text-white/20 font-serif tracking-widest text-sm mb-6">— 墨彩 —</p>
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to find your shot?
          </h2>
          <Link
            href="/browse"
            className="inline-block bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-lg font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-red-900/40 hover:scale-105"
          >
            Browse the Collection
          </Link>
        </section>
      </div>
    </main>
  )
}
