import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { assets } from '@/lib/assets'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export async function POST(req: NextRequest) {
  const { assetId } = await req.json()

  const asset = assets.find((a) => a.id === Number(assetId))
  if (!asset) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
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
