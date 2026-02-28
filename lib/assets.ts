import assetsData from '../data/assets.json'

export type Asset = {
  id: number
  title: string
  type: 'video' | 'image'
  category: string
  price: number
  duration?: string
  tags: string[]
  image: string
  video?: string
  description: string
  scene?: string
  usecases?: string[]
  resolution: string
  format: string
  fileSize: string
}

export const assets: Asset[] = assetsData as Asset[]

export const categoryGradients: Record<string, string> = {
  Sakura: 'from-pink-950 to-rose-900',
  Urban: 'from-blue-950 to-cyan-900',
  'Wabi-sabi': 'from-stone-900 to-amber-950',
  Shrine: 'from-orange-950 to-red-900',
  Koyo: 'from-orange-900 to-amber-800',
  Edo: 'from-amber-950 to-yellow-900',
  Kyoto: 'from-red-950 to-pink-900',
  Samurai: 'from-slate-900 to-gray-800',
  Fuji: 'from-blue-900 to-indigo-800',
  'Ukiyo-e': 'from-teal-900 to-emerald-800',
  Night: 'from-violet-950 to-purple-900',
  Shibuya: 'from-pink-900 to-rose-800',
  Nature: 'from-green-900 to-teal-800',
  Bakumatsu: 'from-zinc-900 to-stone-800',
  Sengoku: 'from-red-950 to-stone-900',
}

export const categoryKanji: Record<string, string> = {
  Sakura: '桜',
  Urban: '都',
  'Wabi-sabi': '侘',
  Shrine: '社',
  Koyo: '秋',
  Edo: '江',
  Kyoto: '京',
  Samurai: '侍',
  Fuji: '富',
  'Ukiyo-e': '浮',
  Night: '夜',
  Shibuya: '渋',
  Nature: '然',
  Bakumatsu: '幕',
  Sengoku: '戦',
}
