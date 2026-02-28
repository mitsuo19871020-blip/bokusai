import setsData from '../data/sets.json'

export type SetImage = {
  slot: number
  lighting: 'dim' | 'normal' | 'bright'
  margin: 'tight' | 'space'
  label: string
  url: string
}

export type ShortSet = {
  id: string
  title: string
  theme: string
  kanji: string
  category: string
  price: number
  scene: string
  usecases: string[]
  coverImage: string
  imageCount: number
  images: SetImage[]
}

export const sets: ShortSet[] = setsData as ShortSet[]
