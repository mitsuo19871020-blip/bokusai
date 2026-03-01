#!/usr/bin/env node

/**
 * bokusai 自動生成スクリプト
 *
 * 使い方:
 *   node scripts/generate.js           # 5枚生成（モックモード）
 *   node scripts/generate.js 10        # 10枚生成
 *   node scripts/generate.js 10 --deploy  # 生成後にGitへ自動デプロイ
 *
 * 本番モード（APIキー設定後）:
 *   HUGGINGFACE_API_KEY=hf_xxx node scripts/generate.js 10
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// .env.local を自動で読み込む
const envPath = path.join(__dirname, '../.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  })
}
const categories = require('./categories')

// カテゴリーの必須フィールドを起動時に検証
for (const cat of categories) {
  if (!Array.isArray(cat.sceneTemplates) || cat.sceneTemplates.length === 0) {
    throw new Error(`sceneTemplates が未定義または空です: ${cat.name}`)
  }
  if (!Array.isArray(cat.usecases) || cat.usecases.length === 0) {
    throw new Error(`usecases が未定義または空です: ${cat.name}`)
  }
}

const DATA_FILE = path.join(__dirname, '../data/assets.json')
const MOCK_MODE = !process.env.HUGGINGFACE_API_KEY

// コマンドライン引数を解析
const args = process.argv.slice(2)
const count = parseInt(args.find(a => /^\d+$/.test(a)) || '5')
const shouldDeploy = args.includes('--deploy')

// ランダム選択ヘルパー
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// 既に使われているタイトルを追跡して重複を避ける
function generateTitle(category, usedTitles) {
  const available = category.titleTemplates.filter(t => !usedTitles.has(t))
  if (available.length > 0) return pick(available)
  // 全部使い切ったら番号を付ける
  const base = pick(category.titleTemplates)
  return `${base} ${Date.now().toString().slice(-4)}`
}

// モックモード: 既存の画像URLを使う（パイプラインのテスト用）
async function generateMockImage(category) {
  return pick(category.mockImages)
}

// 本番モード: Hugging Face APIで画像を生成して保存
async function generateRealImage(category) {
  const prompt = pick(category.prompts)
  const fullPrompt = `${prompt}, vertical portrait composition 9:16, tall framing, mobile wallpaper, ultra detailed, professional photography, award winning`

  console.log(`   プロンプト: ${prompt.slice(0, 60)}...`)

  const response = await fetch(
    'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          num_inference_steps: 4,
          width: 576,
          height: 1024,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`HuggingFace APIエラー: ${response.status} ${err}`)
  }

  // 画像をファイルに保存
  const buffer = await response.arrayBuffer()
  const outputDir = path.join(__dirname, '../public/generated')
  fs.mkdirSync(outputDir, { recursive: true })

  const filename = `japan-${category.name.toLowerCase()}-${Date.now()}.jpg`
  const filepath = path.join(outputDir, filename)
  fs.writeFileSync(filepath, Buffer.from(buffer))

  return `/generated/${filename}`
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎨 bokusai 自動生成スクリプト')
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`モード: ${MOCK_MODE ? '🔵 モック（テスト）' : '🟢 本番（AI生成）'}`)
  console.log(`生成数: ${count}枚`)
  console.log(`デプロイ: ${shouldDeploy ? 'あり' : 'なし'}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // 既存データを読み込む
  const assets = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  let nextId = Math.max(...assets.map(a => a.id)) + 1
  const usedTitles = new Set(assets.map(a => a.title))

  const newAssets = []

  // IDとタイトルを先に確定（並列実行時の競合を避けるため）
  const jobs = Array.from({ length: count }, (_, i) => {
    const category = pick(categories)
    const title = generateTitle(category, usedTitles)
    usedTitles.add(title)
    const id = nextId++
    return { i, id, category, title }
  })

  // 3枚ずつ並列生成（無料枠のレート制限対策）
  const CONCURRENCY = 3
  for (let i = 0; i < jobs.length; i += CONCURRENCY) {
    const batch = jobs.slice(i, i + CONCURRENCY)
    console.log(`[${i + 1}〜${Math.min(i + CONCURRENCY, count)}/${count}] 並列生成中...`)

    const results = await Promise.allSettled(
      batch.map(async (job) => {
        const imageUrl = MOCK_MODE
          ? await generateMockImage(job.category)
          : await generateRealImage(job.category)
        return { ...job, imageUrl }
      })
    )

    for (const result of results) {
      if (result.status === 'fulfilled') {
        const { id, title, category, imageUrl } = result.value
        const prompt = pick(category.prompts)
        const newAsset = {
          id,
          title,
          type: category.type,
          category: category.name,
          price: category.price,
          tags: [...category.tags],
          image: imageUrl,
          description: prompt,
          scene: category.sceneTemplates ? pick(category.sceneTemplates) : null,
          usecases: category.usecases ? [...category.usecases] : [],
          resolution: category.resolution,
          format: category.format,
          fileSize: category.fileSize,
        }
        newAssets.push(newAsset)
        assets.push(newAsset)
        console.log(`   ✅ [${id}] "${title}" ${MOCK_MODE ? '' : '→ ' + imageUrl}`)
      } else {
        console.error(`   ❌ エラー: ${result.reason.message}`)
      }
    }
    console.log()
  }

  // JSONファイルに書き込む
  fs.writeFileSync(DATA_FILE, JSON.stringify(assets, null, 2))

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✨ 完了！ ${newAssets.length}件を追加しました`)
  console.log(`📦 合計アセット数: ${assets.length}件`)

  if (MOCK_MODE) {
    console.log()
    console.log('💡 本物のAI画像を生成するには:')
    console.log('   1. https://huggingface.co でアカウント作成')
    console.log('   2. APIキーを取得')
    console.log('   3. HUGGINGFACE_API_KEY=hf_xxx node scripts/generate.js')
  }

  // デプロイ処理
  if (shouldDeploy) {
    console.log()
    console.log('🚀 GitHubへpush中...')
    try {
      execSync('git add data/assets.json public/generated/', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
      execSync(
        `git commit -m "Add ${newAssets.length} new AI-generated assets [auto]"`,
        { stdio: 'inherit', cwd: path.join(__dirname, '..') }
      )
      execSync('git push', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
      console.log('✅ push完了！Vercelが自動デプロイを開始します')
    } catch (err) {
      console.error('❌ デプロイエラー:', err.message)
    }
  } else {
    console.log()
    console.log('👀 確認するには: npm run dev → http://localhost:3000')
    console.log('🚀 デプロイするには: node scripts/generate.js --deploy')
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main().catch(console.error)
