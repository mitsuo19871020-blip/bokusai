#!/usr/bin/env node

/**
 * bokusai 画像削除スクリプト
 *
 * 使い方:
 *   node scripts/delete.js --id 15          # ID:15 を削除
 *   node scripts/delete.js --id 15,16,17    # 複数まとめて削除
 *   node scripts/delete.js --id 15 --deploy # 削除後に Git へ自動 push
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const DATA_FILE = path.join(__dirname, '../data/assets.json')
const PUBLIC_DIR = path.join(__dirname, '../public')

// ── 引数パース ───────────────────────────────────────────────────
const args = process.argv.slice(2)
const idIdx = args.indexOf('--id')
const shouldDeploy = args.includes('--deploy')

if (idIdx === -1 || !args[idIdx + 1]) {
  console.error('使い方: node scripts/delete.js --id <ID> [--deploy]')
  console.error('例:     node scripts/delete.js --id 15')
  console.error('例:     node scripts/delete.js --id 15,16,17 --deploy')
  process.exit(1)
}

const targetIds = args[idIdx + 1].split(',').map(Number)

// ── 削除処理 ─────────────────────────────────────────────────────
const assets = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
const deleted = []
const notFound = []

for (const id of targetIds) {
  const idx = assets.findIndex(a => a.id === id)
  if (idx === -1) {
    notFound.push(id)
    continue
  }

  const asset = assets[idx]

  // 画像ファイルを削除（public/generated/ 内のみ）
  if (asset.image && asset.image.startsWith('/generated/')) {
    const imgPath = path.join(PUBLIC_DIR, asset.image)
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath)
      console.log(`  🗑️  削除: ${imgPath}`)
    }
  }

  deleted.push(asset)
  assets.splice(idx, 1)
}

// ── 結果表示 ─────────────────────────────────────────────────────
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('🗑️  bokusai 削除スクリプト')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

if (deleted.length === 0 && notFound.length === 0) {
  console.log('変更なし。')
  process.exit(0)
}

if (deleted.length > 0) {
  console.log(`\n✅ 削除完了 (${deleted.length}件):`)
  deleted.forEach(a => console.log(`   - [${a.id}] ${a.title} (${a.category})`))

  // assets.json を更新
  fs.writeFileSync(DATA_FILE, JSON.stringify(assets, null, 2))
  console.log(`\n📦 残りのアセット数: ${assets.length}件`)
}

if (notFound.length > 0) {
  console.log(`\n⚠️  見つからなかった ID: ${notFound.join(', ')}`)
}

// ── デプロイ ─────────────────────────────────────────────────────
if (shouldDeploy && deleted.length > 0) {
  console.log('\n🚀 GitHubへ push 中...')
  try {
    const ids = deleted.map(a => a.id).join(', ')
    execSync('git add data/assets.json public/generated/', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    execSync(
      `git commit -m "Remove assets [${ids}] [manual]"`,
      { stdio: 'inherit', cwd: path.join(__dirname, '..') }
    )
    execSync('git push', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    console.log('✅ push 完了！Vercel が自動デプロイを開始します')
  } catch (err) {
    console.error('❌ デプロイエラー:', err.message)
  }
} else if (deleted.length > 0) {
  console.log('\n👀 確認: npm run dev → http://localhost:3000')
  console.log('🚀 デプロイ: node scripts/delete.js --id <ID> --deploy')
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
