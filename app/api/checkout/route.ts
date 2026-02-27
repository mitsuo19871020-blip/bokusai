import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { assets } from '@/lib/assets'

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

  const { assetId } = await req.json()

  const asset = assets.find((a) => a.id === Number(assetId))
  if (!asset) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
  }

  const appUrl = process.env.APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    metadata: {
      assetId: String(asset.id),
    },
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: asset.title,
            description: `${asset.type === 'video' ? 'Video Clip' : 'Image'} · ${asset.category} · ${asset.resolution}`,
            images: [asset.image],
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
}
