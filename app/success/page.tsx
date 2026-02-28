import { Metadata } from 'next'
import Link from 'next/link'
import { assets } from '@/lib/assets'
import { packs } from '@/lib/packs'
import { sets } from '@/lib/sets'

export const metadata: Metadata = {
  title: 'Purchase Complete — bokusai',
}

type Props = {
  searchParams: Promise<{ session_id?: string; asset_id?: string; pack_id?: string; set_id?: string }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id, asset_id, pack_id, set_id } = await searchParams

  if (!session_id) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6 pt-16">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Invalid access.</p>
          <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  // ── Short Set purchase ──
  if (set_id) {
    const set = sets.find((s) => s.id === set_id)

    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,30,58,0.08),_transparent_70%)] pointer-events-none" />
        <span className="absolute text-white/3 text-[200px] font-serif select-none pointer-events-none leading-none">
          得
        </span>

        <div className="relative z-10 text-center max-w-lg w-full">
          <div className="w-20 h-20 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-red-500 text-xs tracking-widest uppercase mb-3">Purchase Complete</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Thank you!</h1>
          {set && (
            <p className="text-white/50 text-base mb-2">
              <span className="text-white font-medium">{set.title}</span> — all {set.imageCount} images ready.
            </p>
          )}
          <p className="text-white/30 text-sm mb-10 leading-relaxed">
            Download each image below. Links are valid for 24 hours.
          </p>

          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-8 text-left space-y-3">
            {set?.images.map((img) => (
              <div key={img.slot} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-white/30 text-xs font-mono">
                  {String(img.slot).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-medium truncate">{img.label}</p>
                  <p className="text-white/30 text-xs capitalize">{img.lighting} · {img.margin}</p>
                </div>
                <a
                  href={`/api/download-set?session_id=${session_id}&set_id=${set_id}&slot=${img.slot}`}
                  className="text-xs px-2.5 py-1 rounded bg-red-600/20 text-red-400 border border-red-600/20 shrink-0 hover:bg-red-600/30 transition-colors"
                >
                  Download
                </a>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sets"
              className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-red-900/40"
            >
              Browse More Sets
            </Link>
            <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors px-4 py-3">
              Back to Home
            </Link>
          </div>

          <p className="mt-10 text-white/20 text-xs font-serif tracking-widest">— 墨彩 —</p>
        </div>
      </main>
    )
  }

  // ── Pack purchase ──
  if (pack_id) {
    const pack = packs.find((p) => p.id === pack_id)
    const packAssets = pack
      ? pack.assetIds.map((id) => assets.find((a) => a.id === id)).filter(Boolean) as typeof assets
      : []

    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,30,58,0.08),_transparent_70%)] pointer-events-none" />
        <span className="absolute text-white/3 text-[200px] font-serif select-none pointer-events-none leading-none">
          得
        </span>

        <div className="relative z-10 text-center max-w-lg w-full">
          {/* Checkmark */}
          <div className="w-20 h-20 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-red-500 text-xs tracking-widest uppercase mb-3">Purchase Complete</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Thank you!</h1>
          {pack && (
            <p className="text-white/50 text-base mb-2">
              <span className="text-white font-medium">{pack.title}</span> is ready to download.
            </p>
          )}
          <p className="text-white/30 text-sm mb-10 leading-relaxed">
            Download each scene below. Links are valid for 24 hours.
          </p>

          {/* Download list */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-8 text-left space-y-3">
            {packAssets.map((asset) => (
              <div key={asset.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-medium truncate">{asset.title}</p>
                  <p className="text-white/30 text-xs">{asset.resolution} · {asset.format}</p>
                </div>
                <a
                  href={`/api/download-pack?session_id=${session_id}&pack_id=${pack_id}&asset_id=${asset.id}`}
                  className="text-xs px-2.5 py-1 rounded bg-red-600/20 text-red-400 border border-red-600/20 shrink-0 hover:bg-red-600/30 transition-colors"
                >
                  Download
                </a>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/packs"
              className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-red-900/40"
            >
              Browse More Packs
            </Link>
            <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors px-4 py-3">
              Back to Home
            </Link>
          </div>

          <p className="mt-10 text-white/20 text-xs font-serif tracking-widest">— 墨彩 —</p>
        </div>
      </main>
    )
  }

  // ── Single asset purchase ──
  const asset = assets.find((a) => a.id === Number(asset_id))

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,30,58,0.08),_transparent_70%)] pointer-events-none" />
      <span className="absolute text-white/3 text-[200px] font-serif select-none pointer-events-none leading-none">
        得
      </span>

      <div className="relative z-10 text-center max-w-lg">
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="text-red-500 text-xs tracking-widest uppercase mb-3">Purchase Complete</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Thank you!
        </h1>

        {asset ? (
          <p className="text-white/50 text-base mb-2">
            <span className="text-white font-medium">{asset.title}</span> is ready to download.
          </p>
        ) : (
          <p className="text-white/50 text-base mb-2">Your asset is ready to download.</p>
        )}

        <p className="text-white/30 text-sm mb-12 leading-relaxed">
          A confirmation email has been sent to you.
          <br />
          Your download link is included in that email.
        </p>

        {/* Download button */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-sm font-medium truncate">
                {asset ? asset.title : 'Your Asset'}
              </p>
              <p className="text-white/30 text-xs">
                {asset ? `${asset.resolution} · ${asset.format}` : 'Full resolution file'}
              </p>
            </div>
            {asset && session_id && (
              <a
                href={`/api/download?session_id=${session_id}&asset_id=${asset.id}`}
                className="text-xs px-2.5 py-1 rounded bg-red-600/20 text-red-400 border border-red-600/20 shrink-0 hover:bg-red-600/30 transition-colors"
              >
                ダウンロード
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/browse"
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-red-900/40"
          >
            Browse More Assets
          </Link>
          <Link
            href="/"
            className="text-white/40 hover:text-white text-sm transition-colors px-4 py-3"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-white/20 text-xs font-serif tracking-widest">— 墨彩 —</p>
      </div>
    </main>
  )
}
