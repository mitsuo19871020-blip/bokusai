import { notFound } from 'next/navigation'
import Link from 'next/link'
import { assets, categoryGradients, categoryKanji } from '@/lib/assets'
import RelatedAssets from './RelatedAssets'
import BuyButton from './BuyButton'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return assets.map((a) => ({ id: String(a.id) }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const asset = assets.find((a) => a.id === Number(id))
  if (!asset) return {}
  return {
    title: `${asset.title} — bokusai`,
    description: asset.description,
  }
}

export default async function AssetPage({ params }: Props) {
  const { id } = await params
  const asset = assets.find((a) => a.id === Number(id))
  if (!asset) notFound()

  const gradient = categoryGradients[asset.category] ?? 'from-zinc-800 to-zinc-900'
  const kanji = categoryKanji[asset.category] ?? '和'

  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-xs text-white/30">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-white transition-colors">Browse</Link>
          <span>/</span>
          <span className="text-white/60">{asset.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* ── Left: Preview ── */}
          <div className="space-y-6">
            {/* Main preview */}
            <div className={`relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${gradient}`}>
              <img
                src={asset.image}
                alt={asset.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Watermark */}
              <span className="absolute bottom-4 right-4 text-white/15 text-7xl font-serif select-none drop-shadow-xl pointer-events-none">
                {kanji}
              </span>

              {/* Type badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded font-semibold tracking-wide ${
                  asset.type === 'video' ? 'bg-blue-600/90 text-white' : 'bg-emerald-600/90 text-white'
                }`}>
                  {asset.type === 'video' ? 'VIDEO' : 'IMAGE'}
                </span>
                {asset.duration && (
                  <span className="text-xs px-3 py-1 rounded bg-black/60 text-white/80 backdrop-blur-sm">
                    {asset.duration}
                  </span>
                )}
              </div>

              {/* Play icon overlay for video */}
              {asset.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Bokusai watermark strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20 flex items-end px-4 pb-3">
                <span className="text-white/25 text-xs tracking-widest">PREVIEW — WATERMARK REMOVED AFTER PURCHASE</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {asset.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 space-y-4">
              <h2 className="text-white font-semibold text-sm tracking-widest uppercase">About this asset</h2>
              <p className="text-white/60 text-sm leading-relaxed">{asset.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {[
                  { label: 'Resolution', value: asset.resolution },
                  { label: 'Format', value: asset.format },
                  { label: 'File Size', value: asset.fileSize },
                  ...(asset.duration ? [{ label: 'Duration', value: asset.duration }] : []),
                  { label: 'Category', value: asset.category },
                  { label: 'License', value: 'Commercial' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1">{label}</p>
                    <p className="text-white/80 text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* License summary */}
            <div className="bg-white/3 border border-white/8 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white/80 text-sm font-semibold mb-1">Personal & Commercial License</h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Use in YouTube, TikTok, Instagram Reels, ads, client work, and more.
                    One-time purchase — no subscriptions, no royalties.
                    Redistribution of raw files is not permitted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Purchase panel ── */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 space-y-6">
              {/* Title */}
              <div>
                <p className="text-red-500 text-xs tracking-widest uppercase mb-2">{asset.category}</p>
                <h1 className="text-white text-2xl font-bold leading-tight">{asset.title}</h1>
              </div>

              {/* Price */}
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">¥{asset.price.toLocaleString()}</span>
                <span className="text-white/30 text-sm mb-1">one-time</span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5">
                {[
                  'Instant download after payment',
                  'Full resolution, no watermark',
                  'Personal & commercial use',
                  'No subscription required',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Buy button */}
              <BuyButton asset={asset} />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🔒', label: 'Secure\nCheckout' },
                { icon: '⚡', label: 'Instant\nDownload' },
                { icon: '♾️', label: 'Lifetime\nAccess' },
              ].map(({ icon, label }) => (
                <div key={label} className="bg-zinc-900/50 border border-white/5 rounded-lg p-3 text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <p className="text-white/30 text-xs leading-tight whitespace-pre-line">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related assets */}
        <RelatedAssets currentId={asset.id} category={asset.category} />
      </div>
    </main>
  )
}
