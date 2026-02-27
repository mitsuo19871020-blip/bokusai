#!/usr/bin/env node
/**
 * make-reels.js
 *
 * data/assets.json の画像アセットから Reels / X ショート用の縦型動画 (1080×1920, 9:16) を自動生成
 *
 * 使い方:
 *   node scripts/make-reels.js              # 全画像アセット
 *   node scripts/make-reels.js --id 10,11   # 指定 ID のみ
 *   node scripts/make-reels.js --square     # 1:1 正方形 (X 向け)
 *
 * 前提:
 *   brew install ffmpeg
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// ── 引数パース ──────────────────────────────────────────────────
const args = process.argv.slice(2)
const isSquare = args.includes('--square')
const idArg = args.find((a) => a.startsWith('--id=') || args[args.indexOf('--id') + 1])
let filterIds = null
const idIdx = args.indexOf('--id')
if (idIdx !== -1 && args[idIdx + 1]) {
  filterIds = args[idIdx + 1].split(',').map(Number)
}

// ── 設定 ─────────────────────────────────────────────────────────
const DURATION = 8          // 秒
const FPS = 30
const FRAMES = DURATION * FPS
const CRF = 22              // 品質 (低いほど高品質・大ファイル)

// 縦型 (Reels) or 正方形 (X)
const [OUT_W, OUT_H] = isSquare ? [1080, 1080] : [1080, 1920]
const MODE_LABEL = isSquare ? 'square' : 'reels'

const ASSETS_PATH = path.join(__dirname, '../data/assets.json')
const PUBLIC_DIR = path.join(__dirname, '../public')
const OUTPUT_DIR = path.join(PUBLIC_DIR, `reels`)

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// ── FFmpeg チェック ───────────────────────────────────────────────
try {
  execSync('ffmpeg -version', { stdio: 'pipe' })
} catch {
  console.error('❌  FFmpeg が見つかりません。')
  console.error('   brew install ffmpeg  を実行してください。')
  process.exit(1)
}

// ── アセット読み込み ─────────────────────────────────────────────
const allAssets = JSON.parse(fs.readFileSync(ASSETS_PATH, 'utf-8'))
let targets = allAssets.filter(
  (a) => a.type === 'image' && a.image.startsWith('/generated/')
)
if (filterIds) targets = targets.filter((a) => filterIds.includes(a.id))

console.log(`\n🎬  bokusai reel generator — ${MODE_LABEL} (${OUT_W}×${OUT_H})`)
console.log(`    対象: ${targets.length} 件 → ${OUTPUT_DIR}\n`)

// ── 生成ループ ────────────────────────────────────────────────────
let ok = 0
let skip = 0
let fail = 0

for (const asset of targets) {
  const inputPath = path.join(PUBLIC_DIR, asset.image)
  const outputPath = path.join(OUTPUT_DIR, `${MODE_LABEL}-${asset.id}.mp4`)

  if (!fs.existsSync(inputPath)) {
    console.warn(`  ⚠️  skip: ${asset.title}  (画像ファイルが見つかりません)`)
    skip++
    continue
  }

  // Ken Burns zoom-in + 9:16 (or 1:1) crop + fade in/out
  const filters = [
    // 出力サイズにスケール（はみ出しOK、アスペクト維持）
    `scale=${OUT_W}:${OUT_H}:force_original_aspect_ratio=increase`,
    `crop=${OUT_W}:${OUT_H}`,
    // Ken Burns: ゆっくりズームイン (中央固定)
    `zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${FRAMES}:s=${OUT_W}x${OUT_H}:fps=${FPS}`,
    // フェードイン / アウト
    `fade=t=in:st=0:d=0.5`,
    `fade=t=out:st=${DURATION - 0.5}:d=0.5`,
  ].join(',')

  const cmd = [
    `ffmpeg -y`,
    `-loop 1 -i "${inputPath}"`,
    `-vf "${filters}"`,
    `-t ${DURATION} -r ${FPS}`,
    `-c:v libx264 -pix_fmt yuv420p -crf ${CRF} -preset fast`,
    `"${outputPath}"`,
  ].join(' ')

  process.stdout.write(`  [${asset.id}] ${asset.title} ... `)
  try {
    execSync(cmd, { stdio: 'pipe' })
    const size = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(1)
    console.log(`✅  (${size} MB)`)
    ok++
  } catch (e) {
    console.log(`❌  failed`)
    fail++
  }
}

// ── サマリー ─────────────────────────────────────────────────────
console.log(`\n  完了: ✅ ${ok}  ⚠️  ${skip} スキップ  ❌ ${fail} 失敗`)
console.log(`  保存先: ${OUTPUT_DIR}\n`)

if (ok > 0) {
  console.log('📱  次のステップ:')
  console.log('    1. public/reels/ の .mp4 を Instagram / X にアップロード')
  console.log('    2. キャプションに  #bokusai #日本 #japanart などのハッシュタグを追加')
  console.log('    3. 週3〜5投稿を目安に、早朝 (7-9時) か夕方 (18-21時) に投稿\n')
}
