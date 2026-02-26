import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — bokusai',
  description: 'Buy once. Download instantly. Use forever. Simple one-time pricing for every asset.',
}

const singlePrices = [
  {
    type: 'Image',
    kanji: '画',
    price: 190,
    color: 'from-emerald-950 to-teal-900',
    badge: 'bg-emerald-600/80',
    features: [
      '4K resolution (4096×2731)',
      'JPEG + PNG included',
      'Personal & commercial use',
      'Instant download',
    ],
  },
  {
    type: 'Video Clip',
    kanji: '動',
    price: 290,
    color: 'from-blue-950 to-indigo-900',
    badge: 'bg-blue-600/80',
    features: [
      '4K resolution (3840×2160)',
      'MP4 / H.264',
      'Seamless loop ready',
      'Personal & commercial use',
      'Instant download',
    ],
  },
  {
    type: 'Premium Video',
    kanji: '映',
    price: 390,
    color: 'from-violet-950 to-purple-900',
    badge: 'bg-violet-600/80',
    features: [
      '4K resolution (3840×2160)',
      'MP4 / H.264',
      'Longer duration (12–15s)',
      'Seamless loop ready',
      'Personal & commercial use',
      'Instant download',
    ],
  },
]

const faqs = [
  {
    q: 'What does "commercial use" include?',
    a: 'You can use the assets in YouTube videos, TikTok, Instagram Reels, Facebook Ads, client work, podcasts, presentations, and any other commercial project. The only restriction is redistribution of the raw files.',
  },
  {
    q: 'Do I need a subscription?',
    a: 'No. Every asset is a one-time purchase. Pay once, download instantly, use forever. No recurring charges.',
  },
  {
    q: 'Can I use assets for client work?',
    a: 'Yes. Your commercial license covers client projects. You can deliver finished videos to clients without purchasing additional licenses.',
  },
  {
    q: 'What format will I receive?',
    a: 'Videos are delivered as MP4 (H.264) at 4K resolution. Images come as both JPEG and PNG at 4K resolution.',
  },
  {
    q: 'Can I resell or redistribute the files?',
    a: 'No. You may use the assets in your own creative work, but reselling or distributing the raw asset files is not permitted.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-16 px-6 overflow-hidden text-center">
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-white/3 text-[160px] font-serif select-none pointer-events-none leading-none">
          値
        </span>
        <p className="text-red-500 text-xs tracking-widest uppercase mb-4">Pricing</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Simple, one-time pricing
        </h1>
        <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
          No subscriptions. No hidden fees. Buy what you need, when you need it.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {singlePrices.map((plan, i) => (
            <div
              key={plan.type}
              className={`relative rounded-xl border overflow-hidden flex flex-col ${
                i === 1
                  ? 'border-red-600/40 bg-zinc-900'
                  : 'border-white/8 bg-zinc-900/60'
              }`}
            >
              {/* Popular badge */}
              {i === 1 && (
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs tracking-widest text-center py-1.5 font-medium uppercase">
                  Most Popular
                </div>
              )}

              {/* Card header */}
              <div className={`relative p-6 bg-gradient-to-br ${plan.color} ${i === 1 ? 'mt-8' : ''}`}>
                <span className="absolute right-4 bottom-2 text-white/10 text-6xl font-serif select-none">
                  {plan.kanji}
                </span>
                <span className={`inline-block text-xs px-2.5 py-0.5 rounded font-medium text-white mb-3 ${plan.badge}`}>
                  {plan.type.toUpperCase()}
                </span>
                <div className="flex items-end gap-1.5">
                  <span className="text-5xl font-bold text-white">¥{plan.price}</span>
                  <span className="text-white/40 text-sm mb-1.5">/ asset</span>
                </div>
                <p className="text-white/40 text-xs mt-1">one-time payment</p>
              </div>

              {/* Features */}
              <div className="p-6 flex flex-col flex-1">
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                      <svg
                        className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/browse"
                  className={`mt-6 block text-center py-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                    i === 1
                      ? 'bg-red-600 hover:bg-red-500 text-white hover:shadow-lg hover:shadow-red-900/40'
                      : 'bg-white/8 hover:bg-white/12 text-white border border-white/10'
                  }`}
                >
                  Browse {plan.type}s
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* License summary banner */}
        <div className="bg-zinc-900/50 border border-white/8 rounded-xl p-8 mb-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: (
                <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              ),
              title: 'Pay Once',
              desc: 'No subscriptions. No monthly bills. Your payment is final.',
            },
            {
              icon: (
                <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              ),
              title: 'Instant Download',
              desc: 'Your files are ready immediately after payment. No waiting.',
            },
            {
              icon: (
                <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Use Forever',
              desc: 'Your license never expires. Use the asset in future projects too.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <div className="mb-3">{icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1.5">{title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white font-bold text-2xl text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-zinc-900/50 border border-white/8 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none text-white/80 hover:text-white text-sm font-medium transition-colors">
                  {q}
                  <svg
                    className="w-4 h-4 text-white/30 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-white/30 text-sm mb-6 font-serif tracking-widest">— 墨彩 —</p>
          <h2 className="text-white text-2xl font-bold mb-4">Ready to elevate your content?</h2>
          <p className="text-white/40 text-sm mb-8">Browse the full collection and find your perfect shot.</p>
          <Link
            href="/browse"
            className="inline-block bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-lg font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-red-900/40 hover:scale-105"
          >
            Browse All Assets
          </Link>
        </div>
      </div>
    </main>
  )
}
