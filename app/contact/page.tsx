import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — bokusai',
  description: 'Get in touch with the bokusai team.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="relative bg-zinc-950 border-b border-white/5 py-16 px-6 overflow-hidden text-center">
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-white/3 text-[160px] font-serif select-none pointer-events-none leading-none">
          連
        </span>
        <p className="text-red-500 text-xs tracking-widest uppercase mb-4">Contact</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in touch</h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          We typically reply within 24 hours.
        </p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-16 space-y-8">
        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: (
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'FAQ',
              desc: 'Quick answers to common questions',
              href: '/faq',
            },
            {
              icon: (
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: 'License',
              desc: 'Understand what you can use',
              href: '/license',
            },
          ].map(({ icon, title, desc, href }) => (
            <Link
              key={title}
              href={href}
              className="bg-zinc-900/50 border border-white/5 hover:border-white/15 rounded-xl p-5 flex items-start gap-4 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{title}</p>
                <p className="text-white/30 text-xs mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Email card */}
        <div className="bg-zinc-900/50 border border-white/8 rounded-xl p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-red-600/15 border border-red-600/25 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-2">Send us an email</p>
            <a
              href="mailto:contact@bokusai.com"
              className="text-white font-semibold text-lg hover:text-red-400 transition-colors"
            >
              contact@bokusai.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 text-xs text-white/30">
            <div>
              <p className="font-medium text-white/50 mb-0.5">Response time</p>
              <p>Within 24 hours</p>
            </div>
            <div>
              <p className="font-medium text-white/50 mb-0.5">Support hours</p>
              <p>Mon–Fri, JST</p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://x.com/bokusai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @bokusai
          </a>
          <a
            href="https://instagram.com/bokusai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @bokusai
          </a>
        </div>
      </div>
    </main>
  )
}
