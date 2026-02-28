'use client'

import { useState } from 'react'

export default function SetBuyButton({ setId }: { setId: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleBuy() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
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
        className="w-full py-3.5 rounded-lg text-sm font-semibold tracking-wide bg-red-600 hover:bg-red-500 text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-900/40"
      >
        {loading ? 'Redirecting to checkout…' : 'Buy This Set — $29'}
      </button>
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
    </div>
  )
}
