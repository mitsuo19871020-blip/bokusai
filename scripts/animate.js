#!/usr/bin/env node
/**
 * animate.js
 *
 * data/assets.json の画像アセットを Replicate の image-to-video モデルで動画化する
 *
 * 使い方:
 *   node scripts/animate.js --id 10        # 侍 ID:10 だけ
 *   node scripts/animate.js --id 10,11,13  # 複数指定
 *   node scripts/animate.js                # 全画像アセット（コスト注意）
 *
 * コスト目安: 1本あたり約 $0.05〜$0.15 (5秒動画)
 */

require('dotenv').config({ path: '.env.local' })
const Replicate = require('replicate')
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')

// ── 引数パース ──────────────────────────────────────────────────
const args = process.argv.slice(2)
const idIdx = args.indexOf('--id')
let filterIds = null
if (idIdx !== -1 && args[idIdx + 1]) {
  filterIds = args[idIdx + 1].split(',').map(Number)
}

// ── 設定 ─────────────────────────────────────────────────────────
const PUBLIC_DIR = path.join(__dirname, '../public')
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'videos')
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// カテゴリごとのアニメーションプロンプト
const CATEGORY_PROMPTS = {
  Samurai:    'samurai slowly turns head and looks toward camera, cloak gently sways in breeze, dramatic cinematic',
  Fuji:       'clouds drift slowly past Mount Fuji, light mist moves at the base, serene and majestic',
  Kyoto:      'cherry blossom petals gently fall, soft wind ripples through the scene, peaceful',
  'Wabi-sabi':'morning mist slowly rises, subtle light shift, zen atmosphere',
  Shrine:     'torii gate mist gradually clears, ethereal atmosphere, spiritual',
  Urban:      'neon lights flicker, rain drops fall on wet streets, city pulse',
  Edo:        'candle flames flicker gently, paper screen casts soft shadow, historical',
  Night:      'city lights twinkle and shimmer, subtle camera drift, atmospheric',
  'Ukiyo-e':  'waves undulate slowly, woodblock print style animation, artistic',
  Koyo:       'autumn leaves drift and fall, gentle breeze, golden light',
}

const DEFAULT_PROMPT = 'subtle cinematic movement, gentle atmospheric motion, high quality'

// ── Replicate クライアント ────────────────────────────────────────
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

// ── ファイルを base64 データ URL に変換 ──────────────────────────
function imageToDataUrl(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase()
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png'
  const data = fs.readFileSync(filePath)
  return `data:${mime};base64,${data.toString('base64')}`
}

// ── URL からファイルをダウンロード ──────────────────────────────
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(dest)
    client.get(url, (res) => {
      // リダイレクト対応
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close()
        fs.unlinkSync(dest)
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject)
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
      file.on('error', reject)
    }).on('error', reject)
  })
}

// ── メイン ───────────────────────────────────────────────────────
async function main() {
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌  REPLICATE_API_TOKEN が .env.local に設定されていません')
    process.exit(1)
  }

  const allAssets = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/assets.json'), 'utf-8')
  )
  let targets = allAssets.filter(
    (a) => a.type === 'image' && a.image.startsWith('/generated/')
  )
  if (filterIds) targets = targets.filter((a) => filterIds.includes(a.id))

  console.log(`\n🎬  bokusai animate — image-to-video (Replicate)`)
  console.log(`    対象: ${targets.length} 件\n`)

  for (const asset of targets) {
    const inputPath = path.join(PUBLIC_DIR, asset.image)
    const outputPath = path.join(OUTPUT_DIR, `video-${asset.id}.mp4`)

    if (!fs.existsSync(inputPath)) {
      console.warn(`  ⚠️  skip: ${asset.title} (画像ファイルなし)`)
      continue
    }

    const prompt = CATEGORY_PROMPTS[asset.category] ?? DEFAULT_PROMPT
    console.log(`  [${asset.id}] ${asset.title}`)
    console.log(`       プロンプト: "${prompt}"`)
    process.stdout.write(`       生成中... `)

    try {
      const imageDataUrl = imageToDataUrl(inputPath)

      // minimax/video-01 : image-to-video、5秒、高品質
      const output = await replicate.run('minimax/video-01', {
        input: {
          prompt,
          first_frame_image: imageDataUrl,
        },
      })

      // output は string / FileOutput / ReadableStream / 配列 など
      let videoUrl = null
      if (typeof output === 'string') {
        videoUrl = output
      } else if (output && typeof output.url === 'function') {
        videoUrl = output.url().toString()  // FileOutput → URL オブジェクト → string
      } else if (Array.isArray(output) && output.length > 0) {
        const first = output[0]
        if (typeof first === 'string') videoUrl = first
        else if (first && typeof first.url === 'function') videoUrl = first.url().toString()
      }

      if (!videoUrl) {
        console.log('❌  動画URLが取得できませんでした')
        console.log('  output type:', typeof output, output)
        continue
      }

      await downloadFile(videoUrl, outputPath)
      const size = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(1)
      console.log(`✅  完了 (${size} MB) → ${outputPath}`)
    } catch (err) {
      console.log(`❌  失敗`)
      console.error(`       ${err.message}`)
    }

    console.log()
  }

  console.log('完了！生成動画は public/videos/ に保存されました。\n')
}

main()
