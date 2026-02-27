import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { assets } from '@/lib/assets'
import { sendPurchaseEmail } from '@/lib/mail'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const assetId = Number(session.metadata?.assetId)
    const email = session.customer_details?.email
    const asset = assets.find((a) => a.id === assetId)

    console.log(`✅ 支払い完了: session=${session.id} asset=${assetId} email=${email}`)

    if (asset && email) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3002'
      const downloadUrl = `${appUrl}/success?session_id=${session.id}&asset_id=${assetId}`

      try {
        await sendPurchaseEmail({
          to: email,
          assetTitle: asset.title,
          assetId: asset.id,
          downloadUrl,
          resolution: asset.resolution,
          format: asset.format,
        })
        console.log(`📧 メール送信完了: ${email}`)
      } catch (err) {
        console.error('メール送信エラー:', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
