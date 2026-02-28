import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { assets } from '@/lib/assets'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

const DOWNLOAD_EXPIRY_SECONDS = 60 * 60 * 24 // 24時間

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  const assetId = searchParams.get('asset_id')

  if (!sessionId || !assetId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // assetId が正の整数かチェック
  if (!/^\d+$/.test(assetId)) {
    return NextResponse.json({ error: 'Invalid asset ID' }, { status: 400 })
  }

  // Stripe で支払いと asset_id の一致を検証
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 403 })
  }

  if (session.metadata?.assetId !== assetId) {
    return NextResponse.json({ error: 'Asset mismatch' }, { status: 403 })
  }

  // 24時間の有効期限チェック
  const sessionAgeSeconds = Math.floor(Date.now() / 1000) - session.created
  if (sessionAgeSeconds > DOWNLOAD_EXPIRY_SECONDS) {
    return NextResponse.json({ error: 'Download link has expired' }, { status: 403 })
  }

  const asset = assets.find((a) => a.id === Number(assetId))
  if (!asset) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
  }

  const appUrl = process.env.APP_URL ?? 'http://localhost:3000'
  const filePath = asset.type === 'video' && asset.video ? asset.video : asset.image
  const fileUrl = filePath.startsWith('http') ? filePath : `${appUrl}${filePath}`
  return NextResponse.redirect(fileUrl)
}
