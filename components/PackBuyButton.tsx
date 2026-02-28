'use client'

import { useState } from 'react'

type Props = {
  packId: string
}

export default function PackBuyButton({ packId }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleBuy() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-red-900/40"
      >
        {loading ? 'Redirecting...' : 'Buy This Pack'}
      </button>
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
      <p className="text-white/30 text-xs text-center">Secure checkout · Instant download</p>
    </div>
  )
}
