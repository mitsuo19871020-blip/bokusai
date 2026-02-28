import packsData from '../data/packs.json'

export type Pack = {
  id: string
  title: string
  tagline: string
  scene: string
  kanji: string
  assetIds: number[]
  price: number
  originalPrice: number
  coverImage: string
  gradient: string
  usecases: string[]
}

export const packs: Pack[] = packsData as Pack[]
