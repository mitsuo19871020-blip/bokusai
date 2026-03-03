#!/usr/bin/env node

/**
 * 手動画像追加スクリプト
 *
 * 使い方:
 *   1. 画像ファイルを public/generated/inbox/ に入れる
 *   2. node scripts/add-manual.js <カテゴリ名>
 *
 * カテゴリ一覧: Edo, Kyoto, Samurai, Bakumatsu, Sengoku, Fuji, Ukiyo-e, Night, Shibuya, Shrine, Nature
 *
 * 例:
 *   node scripts/add-manual.js Samurai
 *   node scripts/add-manual.js Kyoto --deploy
 */

const fs = require('fs')
const path = require('path')

const categories = require('./categories')

const INBOX_DIR = path.join(require('os').homedir(), 'Desktop/bokusai-inbox')
const OUTPUT_DIR = path.join(__dirname, '../public/generated')
const DATA_FILE = path.join(__dirname, '../data/assets.json')

const args = process.argv.slice(2)
const categoryArg = args.find(a => !a.startsWith('--'))
const shouldDeploy = args.includes('--deploy')

// カテゴリ一覧表示
const categoryNames = categories.map(c => c.name)

if (!categoryArg) {
  console.log('使い方: node scripts/add-manual.js <カテゴリ名> [--deploy]')
  console.log()
  console.log('カテゴリ一覧:')
  categoryNames.forEach(n => console.log(`  - ${n}`))
  console.log()
  console.log('例: node scripts/add-manual.js Samurai')
  process.exit(1)
}

const category = categories.find(
  c => c.name.toLowerCase() === categoryArg.toLowerCase()
)

if (!category) {
  console.error(`❌ カテゴリ "${categoryArg}" が見つかりません`)
  console.error(`使えるカテゴリ: ${categoryNames.join(', ')}`)
  process.exit(1)
}

// inbox フォルダを確認・作成
fs.mkdirSync(INBOX_DIR, { recursive: true })

// inbox 内の画像ファイルを取得
const imageFiles = fs.readdirSync(INBOX_DIR).filter(f =>
  /\.(jpg|jpeg|png|webp)$/i.test(f)
)

if (imageFiles.length === 0) {
  console.log(`❌ public/generated/inbox/ に画像が見つかりません`)
  console.log('ChatGPTなどで作った画像をそのフォルダに入れてから実行してください')
  process.exit(1)
}

// ランダム選択ヘルパー
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateTitle(usedTitles) {
  const available = category.titleTemplates.filter(t => !usedTitles.has(t))
  if (available.length > 0) return pick(available)
  const base = pick(category.titleTemplates)
  return `${base} ${Date.now().toString().slice(-4)}`
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('📥 bokusai 手動画像追加スクリプト')
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`カテゴリ: ${category.name}`)
console.log(`画像数: ${imageFiles.length}枚`)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

// 既存データを読み込む
const assets = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
let nextId = Math.max(...assets.map(a => a.id)) + 1
const usedTitles = new Set(assets.map(a => a.title))

const newAssets = []

for (const filename of imageFiles) {
  const srcPath = path.join(INBOX_DIR, filename)

  // ファイル名をリネーム（衝突防止）
  const ext = path.extname(filename)
  const newFilename = `japan-${category.name.toLowerCase()}-manual-${Date.now()}-${nextId}${ext}`
  const destPath = path.join(OUTPUT_DIR, newFilename)

  // inbox/ → generated/ へ移動
  fs.renameSync(srcPath, destPath)

  const imageUrl = `/generated/${newFilename}`
  const title = generateTitle(usedTitles)
  usedTitles.add(title)

  const newAsset = {
    id: nextId,
    title,
    type: category.type,
    category: category.name,
    price: category.price,
    tags: [...category.tags],
    image: imageUrl,
    description: pick(category.prompts),
    scene: pick(category.sceneTemplates),
    usecases: [...category.usecases],
    resolution: category.resolution,
    format: category.format,
    fileSize: category.fileSize,
  }

  newAssets.push(newAsset)
  assets.push(newAsset)
  console.log(`✅ [${nextId}] "${title}" → ${imageUrl}`)
  nextId++
}

// assets.json を更新
fs.writeFileSync(DATA_FILE, JSON.stringify(assets, null, 2))

console.log()
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log(`✨ 完了！ ${newAssets.length}件を追加しました`)
console.log(`📦 合計アセット数: ${assets.length}件`)

if (shouldDeploy) {
  const { execSync } = require('child_process')
  console.log()
  console.log('🚀 GitHubへpush中...')
  try {
    execSync('git add data/assets.json public/generated/', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    execSync(
      `git commit -m "Add ${newAssets.length} manual assets (${category.name}) [manual]"`,
      { stdio: 'inherit', cwd: path.join(__dirname, '..') }
    )
    execSync('git push', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    console.log('✅ push完了！Vercelが自動デプロイします')
  } catch (err) {
    console.error('❌ デプロイエラー:', err.message)
  }
} else {
  console.log()
  console.log('🚀 サイトに反映するには:')
  console.log('   node scripts/add-manual.js ' + categoryArg + ' --deploy')
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
