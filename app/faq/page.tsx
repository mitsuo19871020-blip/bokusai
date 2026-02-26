import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — bokusai',
  description: 'Frequently asked questions about bokusai assets, licensing, and downloads.',
}

const faqs = [
  {
    section: 'Purchasing',
    items: [
      {
        q: 'How does purchasing work?',
        a: 'Click "Buy" on any asset page. You\'ll be redirected to a secure Stripe checkout. After payment, you\'ll receive an email with your download link instantly.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'All major credit and debit cards (Visa, Mastercard, American Express) are accepted via Stripe. Apple Pay and Google Pay are also available on supported devices.',
      },
      {
        q: 'Is there a subscription?',
        a: 'No. Every purchase is a one-time payment. There are no monthly fees, no renewals, and no hidden charges.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Because digital files are delivered instantly after purchase, we generally do not offer refunds. If there is a technical issue with your download, contact us and we\'ll make it right.',
      },
    ],
  },
  {
    section: 'Downloads',
    items: [
      {
        q: 'How do I download my file?',
        a: 'After purchase, a download link is sent to your email immediately. The link is valid for 7 days and can be used up to 3 times.',
      },
      {
        q: 'What resolution are the files?',
        a: 'All assets are delivered in 4K resolution. Videos are 3840×2160 (MP4/H.264). Images are 4096×2731 (JPEG + PNG).',
      },
      {
        q: 'My download link expired. What do I do?',
        a: 'Contact us at contact@bokusai.com with your purchase confirmation. We\'ll send you a new link right away.',
      },
    ],
  },
  {
    section: 'Licensing',
    items: [
      {
        q: 'Can I use these assets in commercial projects?',
        a: 'Yes. Every asset includes a personal and commercial license. Use them in YouTube videos, TikTok, Instagram Reels, ads, client work, and more.',
      },
      {
        q: 'Can I use assets in videos I monetize?',
        a: 'Absolutely. The commercial license covers monetized content on any platform including YouTube, TikTok, and paid advertising.',
      },
      {
        q: 'Can I use the assets for client work?',
        a: 'Yes. You can deliver finished videos to clients without purchasing additional licenses. One license per project is sufficient.',
      },
      {
        q: 'Can I resell the raw files?',
        a: 'No. Reselling or redistributing the raw asset files (as stock footage, template packs, etc.) is not permitted. The license covers use within your own creative work.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-16 px-6 overflow-hidden text-center">
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-white/3 text-[160px] font-serif select-none pointer-events-none leading-none">
          問
        </span>
        <p className="text-red-500 text-xs tracking-widest uppercase mb-4">FAQ</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Can't find your answer?{' '}
          <Link href="/contact" className="text-red-400 hover:text-red-300 transition-colors">
            Contact us
          </Link>
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">
        {faqs.map(({ section, items }) => (
          <div key={section}>
            <h2 className="text-white/30 text-xs tracking-widest uppercase mb-5 flex items-center gap-3">
              <span className="flex-1 h-px bg-white/5" />
              {section}
              <span className="flex-1 h-px bg-white/5" />
            </h2>
            <div className="space-y-3">
              {items.map(({ q, a }) => (
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
        ))}

        {/* Still have questions */}
        <div className="bg-zinc-900/50 border border-white/8 rounded-xl p-8 text-center">
          <p className="text-white/60 text-sm mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-block bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  )
}
