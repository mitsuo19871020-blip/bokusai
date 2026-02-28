import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { assets } from '@/lib/assets'
import { packs } from '@/lib/packs'
import { sets } from '@/lib/sets'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

// IP ベースの rate limiting（10回/分）
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const appUrl = process.env.APP_URL ?? 'http://localhost:3000'
  const body = await req.json()

  // ── Short Set checkout ──
  if (body.setId) {
    const set = sets.find((s) => s.id === body.setId)
    if (!set) {
      return NextResponse.json({ error: 'Set not found' }, { status: 404 })
    }

    const imageUrl = set.coverImage.startsWith('http') ? set.coverImage : undefined

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        metadata: { setId: set.id },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: set.title,
                description: `${set.imageCount} images · ${set.theme} · 3 lighting variants`,
                ...(imageUrl ? { images: [imageUrl] } : {}),
              },
              unit_amount: set.price,
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&set_id=${set.id}`,
        cancel_url: `${appUrl}/set/${set.id}`,
      })

      return NextResponse.json({ url: session.url })
    } catch (err) {
      console.error('Stripe error:', err)
      const message = err instanceof Error ? err.message : 'Checkout failed'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  // ── Pack checkout ──
  if (body.packId) {
    const pack = packs.find((p) => p.id === body.packId)
    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 })
    }

    const imageUrl = pack.coverImage.startsWith('http') ? pack.coverImage : undefined

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        metadata: {
          packId: pack.id,
        },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: pack.title,
                description: `${pack.assetIds.length} scenes · ${pack.tagline}`,
                ...(imageUrl ? { images: [imageUrl] } : {}),
              },
              unit_amount: pack.price,
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&pack_id=${pack.id}`,
        cancel_url: `${appUrl}/packs`,
      })

      return NextResponse.json({ url: session.url })
    } catch (err) {
      console.error('Stripe error:', err)
      const message = err instanceof Error ? err.message : 'Checkout failed'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  // ── Single asset checkout ──
  const { assetId } = body

  const asset = assets.find((a) => a.id === Number(assetId))
  if (!asset) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
  }

  // Stripeは絶対URLの画像しか受け付けないので、相対パスの場合は除外する
  const imageUrl = asset.image.startsWith('http') ? asset.image : undefined

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      metadata: {
        assetId: String(asset.id),
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: asset.title,
              description: `${asset.type === 'video' ? 'Video Clip' : 'Image'} · ${asset.category} · ${asset.resolution}`,
              ...(imageUrl ? { images: [imageUrl] } : {}),
              metadata: {
                assetId: String(asset.id),
                type: asset.type,
                category: asset.category,
              },
            },
            unit_amount: asset.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&asset_id=${asset.id}`,
      cancel_url: `${appUrl}/asset/${asset.id}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
