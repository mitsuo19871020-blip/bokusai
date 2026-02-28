import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sets } from '@/lib/sets'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  const setId = searchParams.get('set_id')
  const slot = Number(searchParams.get('slot'))

  if (!sessionId || !setId || !slot) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // Stripeセッション検証
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 403 })
  }

  if (session.metadata?.setId !== setId) {
    return NextResponse.json({ error: 'Session does not match this set' }, { status: 403 })
  }

  // 24時間有効期限チェック
  const purchasedAt = session.created * 1000
  if (Date.now() - purchasedAt > 24 * 60 * 60 * 1000) {
    return NextResponse.json({ error: 'Download link expired' }, { status: 410 })
  }

  // セットとスロット確認
  const set = sets.find((s) => s.id === setId)
  if (!set) {
    return NextResponse.json({ error: 'Set not found' }, { status: 404 })
  }

  const image = set.images.find((img) => img.slot === slot)
  if (!image) {
    return NextResponse.json({ error: 'Image not found in set' }, { status: 404 })
  }

  // 外部URL（Unsplash等のモック）はリダイレクト
  if (image.url.startsWith('http')) {
    return NextResponse.redirect(image.url)
  }

  // ローカルファイルはリダイレクト
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000'
  return NextResponse.redirect(`${appUrl}${image.url}`)
}
