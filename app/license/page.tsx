import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'License — bokusai',
  description: 'bokusai asset license terms. Personal and commercial use included with every purchase.',
}

const allowed = [
  'YouTube videos (including monetized channels)',
  'TikTok, Instagram Reels, Facebook videos',
  'Paid advertisements and sponsored content',
  'Client work and agency projects',
  'Podcasts and audio-visual productions',
  'Presentations and corporate videos',
  'Websites and digital marketing',
  'Film and video projects',
]

const notAllowed = [
  'Reselling or redistributing the raw asset files',
  'Packaging assets into stock footage or template libraries',
  'Sublicensing assets to third parties',
  'Use in content that promotes illegal activity',
]

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-16 px-6 overflow-hidden text-center">
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-white/3 text-[160px] font-serif select-none pointer-events-none leading-none">
          約
        </span>
        <p className="text-red-500 text-xs tracking-widest uppercase mb-4">License</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          What you can do with bokusai assets
        </h1>
        <p className="text-white/40 text-sm max-w-lg mx-auto">
          Every asset includes a Personal & Commercial License. Simple, clear, no legalese.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">

        {/* Summary card */}
        <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-6 text-center">
          <p className="text-red-400 text-sm font-semibold mb-1">One purchase. One license. Forever.</p>
          <p className="text-white/40 text-xs leading-relaxed">
            Your license never expires. Use the asset in any current or future project covered below.
          </p>
        </div>

        {/* Allowed */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-600/30 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white font-semibold">Allowed uses</h2>
          </div>
          <ul className="space-y-3">
            {allowed.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not allowed */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-white font-semibold">Not permitted</h2>
          </div>
          <ul className="space-y-3">
            {notAllowed.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 text-red-500/60 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Questions */}
        <div className="text-center pt-4">
          <p className="text-white/30 text-sm mb-4">
            Have questions about a specific use case?
          </p>
          <Link
            href="/contact"
            className="text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </main>
  )
}
