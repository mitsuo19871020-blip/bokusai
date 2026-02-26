import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'bokusai — Japanese AI Visuals for Video Creators',
  description: 'Premium AI-generated Japanese footage & visuals. Buy once, download instantly, use forever. Perfect for TikTok, Reels, and YouTube Shorts.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
