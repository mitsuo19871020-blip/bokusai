import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

type SendPurchaseEmailParams = {
  to: string
  assetTitle: string
  assetId: number
  downloadUrl: string
  resolution: string
  format: string
}

export async function sendPurchaseEmail({
  to,
  assetTitle,
  assetId,
  downloadUrl,
  resolution,
  format,
}: SendPurchaseEmailParams) {
  await transporter.sendMail({
    from: `"bokusai 墨彩" <${process.env.GMAIL_USER}>`,
    to,
    subject: `【bokusai】購入完了 - ${assetTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #fff; font-size: 24px; margin-bottom: 8px;">bokusai <span style="color: #c41e3a; font-size: 16px;">墨彩</span></h1>
        <hr style="border: 1px solid #222; margin: 20px 0;" />

        <h2 style="color: #fff; font-size: 20px;">ご購入ありがとうございます</h2>
        <p style="color: #aaa;">以下のアセットをダウンロードできます。</p>

        <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="color: #fff; font-size: 18px; font-weight: bold; margin: 0 0 8px;">${assetTitle}</p>
          <p style="color: #666; font-size: 14px; margin: 0;">${resolution} · ${format}</p>
        </div>

        <a href="${downloadUrl}" style="display: inline-block; background: #c41e3a; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
          ダウンロードする
        </a>

        <p style="color: #444; font-size: 12px; margin-top: 40px;">
          このメールはご購入の確認として自動送信されています。<br />
          ご不明な点はお問い合わせページよりご連絡ください。
        </p>

        <p style="color: #333; font-size: 12px; text-align: center; margin-top: 40px; font-family: serif; letter-spacing: 4px;">— 墨彩 —</p>
      </div>
    `,
  })
}
