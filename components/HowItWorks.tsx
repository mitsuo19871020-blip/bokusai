const steps = [
  {
    number: '01',
    kanji: '探',
    title: 'Browse & Preview',
    description: 'Explore hundreds of AI-generated Japanese visuals. Filter by style, category, or format.',
  },
  {
    number: '02',
    kanji: '買',
    title: 'Buy Once',
    description: 'Pay a one-time fee. No subscription. No recurring charges. Yours forever.',
  },
  {
    number: '03',
    kanji: '得',
    title: 'Instant Download',
    description: 'Download immediately in full resolution. Ready to drop into your video project.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-zinc-950 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-red-500 text-xs tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Three steps to your shot
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* Number + Kanji circle */}
              <div className="relative w-20 h-20 mb-6">
                <div className="w-20 h-20 rounded-full border border-white/10 bg-black flex items-center justify-center">
                  <span className="text-white/20 text-3xl font-serif">{step.kanji}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{step.number}</span>
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        {/* License note */}
        <div className="mt-16 bg-white/3 border border-white/8 rounded-lg p-6 max-w-2xl mx-auto text-center">
          <p className="text-white/50 text-sm leading-relaxed">
            All assets include a <span className="text-white/80">personal & commercial license</span>.
            Use them in YouTube videos, TikTok, Instagram Reels, ads, and more.
            <br />
            <span className="text-white/30 text-xs mt-2 block">Resale or redistribution of raw files is not permitted.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
