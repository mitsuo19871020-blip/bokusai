'use client'

import { useEffect } from 'react'

export default function TwitterEmbed() {
  useEffect(() => {
    const win = window as Window & { twttr?: { widgets: { load: () => void } } }
    if (win.twttr?.widgets) {
      win.twttr.widgets.load()
    } else {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.charset = 'utf-8'
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="flex justify-center my-6">
      <blockquote className="twitter-tweet" data-theme="dark">
        <p lang="en" dir="ltr">
          Hello everyone! 👋 <br />
          I&apos;m Mitsuo from the Bokusai team. I&apos;ve created a website to share authentic
          Japanese cultural content with the world. 🇯🇵 I&apos;d love to connect with you all.
          Let&apos;s be friends!<br /><br />
          Nice to meet you! ✨
        </p>
        &mdash; Mitsuo @ Bokusai (@XiaGuang85175){' '}
        <a href="https://twitter.com/XiaGuang85175/status/2028381723374002231?ref_src=twsrc%5Etfw">
          March 2, 2026
        </a>
      </blockquote>
    </div>
  )
}
