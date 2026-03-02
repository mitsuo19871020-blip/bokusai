import Link from 'next/link'

export const metadata = {
  title: 'Free Samples — bokusai',
  description: 'Download free Japanese AI visuals. Samurai, Kyoto, Zen — ready for your AI videos.',
}

const themes = [
  {
    id: 'samurai',
    title: 'Silent Samurai',
    subtitle: 'Discipline',
    kanji: '侍',
    description: 'For AI videos about focus, discipline, warrior mindset, and silent strength.',
    gradient: 'from-slate-900 to-zinc-800',
    accent: 'red',
    images: [
      { id: 10, title: "Samurai's Tea Ceremony", src: '/generated/japan-samurai-1772148905827.jpg' },
      { id: 13, title: 'Warrior on Horseback',   src: '/generated/japan-samurai-1772149364261.jpg' },
      { id: 49, title: 'Winter Vigil',            src: '/generated/japan-samurai-1772407329066.jpg' },
      { id: 42, title: 'Warrior at the Gate',     src: '/generated/japan-samurai-1772379810310.jpg' },
    ],
  },
  {
    id: 'kyoto',
    title: 'Kyoto Dawn',
    subtitle: 'Silence',
    kanji: '京',
    description: 'For AI videos about peace, Japanese culture, morning routines, and slow living.',
    gradient: 'from-red-950 to-rose-900',
    accent: 'rose',
    images: [
      { id: 12, title: 'Arashiyama Bamboo Grove',    src: '/generated/japan-kyoto-1772149361444.jpg' },
      { id: 18, title: 'Fushimi Inari at Dawn',      src: '/generated/japan-kyoto-1772149375925.jpg' },
      { id: 20, title: 'Golden Pavilion Reflection', src: '/generated/japan-kyoto-1772149381733.jpg' },
      { id: 38, title: 'Bamboo Grove Silence',       src: '/generated/japan-kyoto-1772379804801.jpg' },
    ],
  },
  {
    id: 'zen',
    title: 'Zen Minimal',
    subtitle: 'Background',
    kanji: '禅',
    description: 'For AI videos about meditation, nature, mindfulness, and Japanese philosophy.',
    gradient: 'from-blue-950 to-indigo-900',
    accent: 'blue',
    images: [
      { id: 11, title: 'Fuji at Dawn',          src: '/generated/japan-fuji-1772149358660.jpg' },
      { id: 15, title: 'Fuji at Golden Hour',   src: '/generated/japan-fuji-1772149369907.jpg' },
      { id: 29, title: 'Pagoda and Mountain',   src: '/generated/japan-fuji-1772285160297.jpg' },
      { id: 27, title: 'Mountain Onsen Dawn',   src: '/generated/japan-nature-1772200945090.jpg' },
    ],
  },
]

export default function SamplesPage() {
  return (
    <main className="min-h-screen bg-black pt-16">

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-white/60 text-xs tracking-widest uppercase">Free Download</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
          Japanese AI Visuals.<br />
          <span className="text-white/40">Try before you buy.</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
          3 themes. 4 images each. 100% free.<br />
          Built for AI narration, Shorts, TikTok, and Reels.
        </p>
      </div>

      {/* Themes */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-24">
        {themes.map((theme, i) => (
          <section key={theme.id}>

            {/* Theme header */}
            <div className="flex items-end gap-4 mb-8">
              <span className={`text-7xl font-serif text-white/10 leading-none select-none`}>
                {theme.kanji}
              </span>
              <div>
                <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Theme {i + 1}</p>
                <h2 className="text-3xl font-bold text-white leading-none">
                  {theme.title}
                  <span className="text-white/30 font-light ml-2">— {theme.subtitle}</span>
                </h2>
                <p className="text-white/40 text-sm mt-2 max-w-md">{theme.description}</p>
              </div>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {theme.images.map((img) => (
                <div key={img.id} className="group relative aspect-[9/16] rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                      <p className="text-white text-xs font-medium mb-2 truncate">{img.title}</p>
                      <a
                        href={img.src}
                        download={`bokusai-${img.id}.jpg`}
                        className="block w-full text-center py-2 rounded-lg bg-white text-black text-xs font-bold tracking-wide hover:bg-white/90 transition-colors"
                      >
                        ↓ Free Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Theme CTA */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-white/20 text-xs">576 × 1024 · JPG · Free for commercial use</p>
              <Link
                href={`/browse?category=${theme.id === 'samurai' ? 'Samurai' : theme.id === 'kyoto' ? 'Kyoto' : 'Fuji'}`}
                className="text-white/50 hover:text-white text-xs tracking-wide transition-colors"
              >
                See full {theme.title} collection →
              </Link>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className={`border-t border-white/5 py-20 text-center bg-gradient-to-b from-transparent to-white/[0.02]`}>
        <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Want more?</p>
        <h3 className="text-3xl font-bold text-white mb-4">
          50+ scenes. More added daily.
        </h3>
        <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">
          Every asset is 9:16 vertical, scene-labeled, and ready to drop into your AI video workflow.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/browse"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black rounded-lg text-sm font-bold tracking-wide hover:bg-white/90 transition-colors"
          >
            Browse All Assets
          </Link>
          <Link
            href="/packs"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium tracking-wide hover:bg-white/10 transition-colors"
          >
            View Scene Packs
          </Link>
        </div>
      </div>

    </main>
  )
}
