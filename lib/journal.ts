import journalData from '../data/journal.json'

export type JournalPost = {
  slug: string
  title: string
  date: string
  category: string
  assetId: number | null
  excerpt: string
  tags: string[]
  readTime: string
  body: string[]
}

export const journalPosts: JournalPost[] = journalData as JournalPost[]

export function getPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug)
}
