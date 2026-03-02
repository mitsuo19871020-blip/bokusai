'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-serif text-2xl tracking-widest font-bold">
            bokusai
          </span>
          <span className="text-red-500 text-xs tracking-widest uppercase mt-1">墨彩</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/browse" className="text-white/70 hover:text-white text-sm tracking-wide transition-colors">
            Browse
          </Link>
          <Link href="/sets" className="text-white/70 hover:text-white text-sm tracking-wide transition-colors">
            Short Sets
          </Link>
          <Link href="/packs" className="text-white/70 hover:text-white text-sm tracking-wide transition-colors">
            Packs
          </Link>
          <Link href="/pricing" className="text-white/70 hover:text-white text-sm tracking-wide transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-white/70 hover:text-white text-sm tracking-wide transition-colors">
            About
          </Link>
          <Link
            href="/samples"
            className="text-green-400 hover:text-green-300 text-sm tracking-wide transition-colors font-medium"
          >
            Free Samples
          </Link>
          <Link
            href="/friends"
            className="text-white/70 hover:text-white text-sm tracking-wide transition-colors"
          >
            Friends
          </Link>
          <Link
            href="/browse"
            className="bg-red-600 hover:bg-red-500 text-white text-sm px-5 py-2 rounded transition-colors tracking-wide"
          >
            Start Browsing
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <Link href="/browse" className="text-white/70 hover:text-white text-sm tracking-wide">Browse</Link>
          <Link href="/sets" className="text-white/70 hover:text-white text-sm tracking-wide">Short Sets</Link>
          <Link href="/packs" className="text-white/70 hover:text-white text-sm tracking-wide">Packs</Link>
          <Link href="/pricing" className="text-white/70 hover:text-white text-sm tracking-wide">Pricing</Link>
          <Link href="/about" className="text-white/70 hover:text-white text-sm tracking-wide">About</Link>
          <Link href="/samples" className="text-green-400 text-sm tracking-wide font-medium">Free Samples</Link>
          <Link href="/friends" className="text-white/70 text-sm tracking-wide">Friends</Link>
          <Link href="/browse" className="bg-red-600 text-white text-sm px-5 py-2 rounded text-center">
            Start Browsing
          </Link>
        </div>
      )}
    </nav>
  )
}
