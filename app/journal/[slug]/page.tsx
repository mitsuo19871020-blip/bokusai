import { notFound } from 'next/navigation'
import Link from 'next/link'
import { journalPosts, getPost } from '@/lib/journal'
import { assets, categoryGradients } from '@/lib/assets'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  const linkedAsset = post.assetId ? assets.find((a) => a.id === post.assetId) : null
  const ogImage = linkedAsset
    ? `https://bokusai.vercel.app${linkedAsset.image}`
    : undefined

  return {
    title: `${post.title} — bokusai Journal`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://bokusai.vercel.app/journal/${post.slug}`,
      siteName: 'bokusai',
      type: 'article',
      publishedTime: post.date,
      authors: ['Mitsuo'],
      tags: post.tags,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    alternates: {
      canonical: `https://bokusai.vercel.app/journal/${post.slug}`,
    },
  }
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const linkedAsset = post.assetId ? assets.find((a) => a.id === post.assetId) : null
  const gradient = linkedAsset
    ? (categoryGradients[linkedAsset.category] ?? 'from-zinc-800 to-zinc-900')
    : 'from-zinc-800 to-zinc-900'

  // JSON-LD (BlogPosting schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Mitsuo',
      url: 'https://bokusai.vercel.app/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'bokusai',
      url: 'https://bokusai.vercel.app',
    },
    url: `https://bokusai.vercel.app/journal/${post.slug}`,
    keywords: post.tags.join(', '),
    ...(linkedAsset && {
      image: `https://bokusai.vercel.app${linkedAsset.image}`,
    }),
  }

  return (
    <main className="min-h-screen bg-black pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-xs text-white/30">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/journal" className="hover:text-white transition-colors">Journal</Link>
          <span>/</span>
          <span className="text-white/60 truncate">{post.title}</span>
        </nav>
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-red-500 tracking-widest uppercase">{post.category}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/30 text-xs">{post.readTime} read</span>
            <span className="text-white/20 text-xs">·</span>
            <time className="text-white/30 text-xs" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-white/50 text-lg leading-relaxed italic">{post.excerpt}</p>
        </header>

        {/* Hero image (linked asset) */}
        {linkedAsset && (
          <div
            className={`relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${gradient} mb-12`}
          >
            <img
              src={linkedAsset.image}
              alt={linkedAsset.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="text-white/60 text-xs tracking-widest uppercase mb-0.5">Featured Asset</p>
                <p className="text-white text-sm font-medium">{linkedAsset.title}</p>
              </div>
              <Link
                href={`/asset/${linkedAsset.id}`}
                className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded backdrop-blur-sm transition-colors border border-white/10"
              >
                View asset →
              </Link>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="space-y-6">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-white/75 text-base md:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author */}
        <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-bold text-sm shrink-0">
            M
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium">Mitsuo</p>
            <p className="text-white/30 text-xs">Creator of bokusai — AI Japanese visuals</p>
          </div>
          <Link
            href="/friends"
            className="ml-auto text-xs text-white/30 hover:text-white transition-colors"
          >
            About Mitsuo →
          </Link>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href="/journal"
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All entries
          </Link>
          <Link
            href="/browse"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Browse the collection
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    </main>
  )
}
