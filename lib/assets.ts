export type Asset = {
  id: number
  title: string
  type: 'video' | 'image'
  category: string
  price: number
  duration?: string
  tags: string[]
  image: string
  description: string
  resolution: string
  format: string
  fileSize: string
}

export const assets: Asset[] = [
  {
    id: 1,
    title: 'Cherry Blossom Rain',
    type: 'video',
    category: 'Sakura',
    price: 290,
    duration: '10s',
    tags: ['loop', '4K', 'spring', 'pink'],
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
    description: 'Gentle cherry blossom petals drifting in a soft spring breeze. Perfect loop for meditation content, travel vlogs, and beauty brand overlays.',
    resolution: '3840 × 2160 (4K)',
    format: 'MP4 / H.264',
    fileSize: '~180MB',
  },
  {
    id: 2,
    title: 'Neon Tokyo Nights',
    type: 'video',
    category: 'Urban',
    price: 390,
    duration: '15s',
    tags: ['loop', '4K', 'neon', 'city'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    description: 'Rain-slicked streets reflecting neon kanji signs. The cinematic cyberpunk aesthetic of modern Tokyo captured in seamless loop format.',
    resolution: '3840 × 2160 (4K)',
    format: 'MP4 / H.264',
    fileSize: '~250MB',
  },
  {
    id: 3,
    title: 'Zen Garden Dawn',
    type: 'image',
    category: 'Wabi-sabi',
    price: 190,
    tags: ['4K', 'portrait', 'zen', 'minimalist'],
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    description: 'Morning mist rising over meticulously raked white gravel. Embodies the wabi-sabi philosophy of finding beauty in imperfection and transience.',
    resolution: '4096 × 2731 (4K)',
    format: 'JPEG / PNG',
    fileSize: '~28MB',
  },
  {
    id: 4,
    title: 'Torii Gate Mist',
    type: 'image',
    category: 'Shrine',
    price: 190,
    tags: ['4K', 'landscape', 'shrine', 'red'],
    image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80',
    description: 'Iconic vermilion torii gates emerging from morning mist. The spiritual gateway between the mundane and sacred worlds of Shinto tradition.',
    resolution: '4096 × 2731 (4K)',
    format: 'JPEG / PNG',
    fileSize: '~32MB',
  },
  {
    id: 5,
    title: 'Autumn Leaves Drift',
    type: 'video',
    category: 'Koyo',
    price: 290,
    duration: '8s',
    tags: ['loop', '4K', 'autumn', 'orange'],
    image: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?w=800&q=80',
    description: 'Crimson and gold maple leaves spiraling in the cool autumn air of a traditional Japanese garden. Evokes the fleeting beauty of koyo season.',
    resolution: '3840 × 2160 (4K)',
    format: 'MP4 / H.264',
    fileSize: '~140MB',
  },
  {
    id: 6,
    title: 'Rainy Shibuya',
    type: 'video',
    category: 'Urban',
    price: 390,
    duration: '12s',
    tags: ['loop', '4K', 'rain', 'street'],
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
    description: 'The famous Shibuya crossing in a moody downpour. Umbrellas of every color, steaming food stalls, and the relentless pulse of the city.',
    resolution: '3840 × 2160 (4K)',
    format: 'MP4 / H.264',
    fileSize: '~210MB',
  },
]

export const categoryGradients: Record<string, string> = {
  Sakura: 'from-pink-950 to-rose-900',
  Urban: 'from-blue-950 to-cyan-900',
  'Wabi-sabi': 'from-stone-900 to-amber-950',
  Shrine: 'from-orange-950 to-red-900',
  Koyo: 'from-orange-900 to-amber-800',
}

export const categoryKanji: Record<string, string> = {
  Sakura: '桜',
  Urban: '都',
  'Wabi-sabi': '侘',
  Shrine: '社',
  Koyo: '秋',
}
