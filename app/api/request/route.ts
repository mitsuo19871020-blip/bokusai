import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { name, theme, usage, mood, message } = await req.json()

  if (!theme || !message) {
    return NextResponse.json({ error: 'Theme and message are required.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: `bokusai Friends <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `🎨 New Request from bokusai Friends: ${theme}`,
    text: [
      `Name: ${name || 'Anonymous'}`,
      `Theme: ${theme}`,
      `Usage: ${usage || '—'}`,
      `Mood: ${mood || '—'}`,
      `Message: ${message}`,
    ].join('\n'),
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#ef4444;margin:0 0 24px;">🎨 New Image Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#666;padding:8px 0;width:100px;">Name</td><td style="color:#fff;">${name || 'Anonymous'}</td></tr>
          <tr><td style="color:#666;padding:8px 0;">Theme</td><td style="color:#fff;font-weight:bold;">${theme}</td></tr>
          <tr><td style="color:#666;padding:8px 0;">Usage</td><td style="color:#fff;">${usage || '—'}</td></tr>
          <tr><td style="color:#666;padding:8px 0;">Mood</td><td style="color:#fff;">${mood || '—'}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#111;border-radius:8px;border-left:3px solid #ef4444;">
          <p style="margin:0;color:#ccc;">${message}</p>
        </div>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
