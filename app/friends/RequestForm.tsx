'use client'

import { useState } from 'react'

const usageOptions = ['YouTube Shorts', 'TikTok', 'Instagram Reels', 'AI Narration', 'Other']
const moodOptions  = ['Samurai / Discipline', 'Kyoto / Silence', 'Zen / Minimal', 'Epic / Battle', 'Night / Urban', 'Nature / Peaceful', 'Other']

export default function RequestForm() {
  const [form, setForm] = useState({ name: '', theme: '', usage: '', mood: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-5xl">🎋</div>
        <h3 className="text-2xl font-bold text-white">Arigatou!</h3>
        <p className="text-white/50 max-w-sm mx-auto">
          I got your request. I&apos;ll review it and — if it inspires me — I&apos;ll create it and add it to the site!
        </p>
        <button
          onClick={() => { setForm({ name: '', theme: '', usage: '', mood: '', message: '' }); setStatus('idle') }}
          className="mt-4 text-red-400 hover:text-red-300 text-sm underline underline-offset-4 transition-colors"
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Your name (optional)</label>
        <input
          type="text"
          placeholder="e.g. Alex from Canada"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
        />
      </div>

      {/* Theme */}
      <div>
        <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">
          What do you want? <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Samurai in the rain, Kyoto shrine at night..."
          value={form.theme}
          onChange={e => set('theme', e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
        />
      </div>

      {/* Usage */}
      <div>
        <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">How will you use it?</label>
        <div className="flex flex-wrap gap-2">
          {usageOptions.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => set('usage', form.usage === opt ? '' : opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                form.usage === opt
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div>
        <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Mood / vibe?</label>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => set('mood', form.mood === opt ? '' : opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                form.mood === opt
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">
          Tell me more <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Describe the image you have in mind. Any details help — lighting, season, emotion, composition..."
          value={form.message}
          onChange={e => set('message', e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all"
      >
        {status === 'sending' ? 'Sending to Mitsuo...' : '🎨 Send My Request to Mitsuo'}
      </button>

      <p className="text-white/20 text-xs text-center">
        Free to request. No guarantees — but I read every message.
      </p>
    </form>
  )
}
