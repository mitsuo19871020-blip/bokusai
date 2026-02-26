import { Metadata } from 'next'
import BrowseClient from './BrowseClient'

export const metadata: Metadata = {
  title: 'Browse Assets — bokusai',
  description: 'Explore premium AI-generated Japanese footage and visuals. Filter by type, category, and price.',
}

export default function BrowsePage() {
  return <BrowseClient />
}
