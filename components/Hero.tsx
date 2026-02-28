import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(196,30,58,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(196,30,58,0.08),_transparent_60%)]" />

      {/* Japanese decorative elements */}
      <div className="absolute top-32 right-10 text-white/5 text-9xl font-serif select-none pointer-events-none">
        墨
      </div>
      <div className="absolute bottom-32 left-10 text-white/5 text-9xl font-serif select-none pointer-events-none">
        彩
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Tag line */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/60 text-xs tracking-widest uppercase">For AI Video Creators · Japan Only</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
          Japanese Visuals
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            for AI Storytellers.
          </span>
        </h1>

        {/* Sub headline */}
        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          We sell only Japan — samurai, kyoto, zen, neon, silence.
          <br className="hidden md:block" />
          Drop the perfect scene into your Shorts, TikTok, or AI narration. Buy once. Use forever.
        </p>

        {/* Brand statement */}
        <p className="text-white/35 text-sm tracking-[0.2em] mb-12 uppercase">
          Made in Japan.&nbsp;&nbsp;Built for AI video creators worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/browse"
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded text-base font-medium tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-900/40"
          >
            Browse All Scenes
          </Link>
          <Link
            href="/browse?category=Samurai"
            className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded text-base font-medium tracking-wide transition-all"
          >
            Start with Samurai
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { value: 'Japan', label: 'Only' },
            { value: '4K', label: 'Resolution' },
            { value: 'Instant', label: 'Download' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/40 text-sm tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
