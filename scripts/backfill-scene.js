#!/usr/bin/env node
// 既存アセットに scene / usecases を遡って追加するスクリプト

const fs = require('fs')
const path = require('path')
const categories = require('./categories')

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const ASSETS_PATH = path.join(__dirname, '../data/assets.json')
const assets = JSON.parse(fs.readFileSync(ASSETS_PATH, 'utf-8'))

let fixed = 0
for (const asset of assets) {
  if (asset.scene && asset.usecases) continue
  const cat = categories.find(c => c.name === asset.category)
  if (!cat) {
    console.log(`⚠️  カテゴリー不明: ID${asset.id} (${asset.category})`)
    continue
  }
  asset.scene = pick(cat.sceneTemplates)
  asset.usecases = [...cat.usecases]
  fixed++
  console.log(`  ✅ ID${asset.id} "${asset.title}" (${asset.category})`)
}

fs.writeFileSync(ASSETS_PATH, JSON.stringify(assets, null, 2))
console.log(`\n完了: ${fixed}件に scene/usecases を追加しました`)
