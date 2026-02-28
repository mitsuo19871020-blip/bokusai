#!/usr/bin/env node

/**
 * bokusai Short Set 生成スクリプト
 *
 * 「美術」から「工業」へ — 1シーンを10枚の差分素材に変える。
 *
 * 使い方:
 *   node scripts/generate-set.js discipline      # Disciplineテーマで生成
 *   node scripts/generate-set.js silence         # Silenceテーマで生成
 *   node scripts/generate-set.js legacy          # Legacyテーマで生成
 *   node scripts/generate-set.js night           # Night & Rainテーマで生成
 *   node scripts/generate-set.js                 # ランダムテーマで生成
 *   node scripts/generate-set.js discipline --deploy  # 生成後にgit push
 *
 * 出力: public/generated/sets/[setId]/ に10枚 + data/sets.json を更新
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// .env.local を読み込む
const envPath = path.join(__dirname, '../.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  })
}

const DATA_FILE = path.join(__dirname, '../data/sets.json')
const MOCK_MODE = !process.env.HUGGINGFACE_API_KEY

const args = process.argv.slice(2)
const themeArg = args.find(a => !a.startsWith('--'))
const shouldDeploy = args.includes('--deploy')

// ──────────────────────────────────────────────
// 感情テーマ定義（②の戦略を反映）
// 日本を「主役」ではなく「舞台」として使う
// ──────────────────────────────────────────────
const SET_THEMES = {
  discipline: {
    name: 'Discipline',
    kanji: '律',
    category: 'Samurai',
    price: 2900,
    scene: 'For AI narrated videos about discipline, self-control, and quiet strength. Drop into any motivational Short or AI narration — opener, transition, or closing shot.',
    usecases: ['AI Narration', 'YouTube Shorts', 'Self-Help Content', 'Motivation'],
    // 3つのベースシーン（同じ「規律」という感情、異なる構図）
    baseScenes: [
      'lone samurai in worn gray kimono and dark hakama, standing at misty crossroads at dawn, single katana at left hip, back straight, eyes forward, vertical 9:16 portrait, cinematic, no text',
      'japanese calligrapher kneeling at low wooden desk, ink brush raised in stillness before the stroke, empty rice paper before him, dim room with single candle, vertical 9:16, no text',
      'zen monk in black robes, seated in perfect stillness on stone step at temple entrance, early morning mist, bare feet, hands folded in lap, vertical 9:16, no text',
    ],
    mockImages: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80',
      'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?w=600&q=80',
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80',
    ],
  },
  silence: {
    name: 'Silence',
    kanji: '静',
    category: 'Shrine',
    price: 2900,
    scene: 'For AI narrated videos about mindfulness, inner peace, and letting go. The stillness speaks louder than words — perfect for slow-paced motivational Shorts.',
    usecases: ['AI Narration', 'Mindfulness Content', 'TikTok', 'Instagram Reels'],
    baseScenes: [
      'ancient shinto shrine deep in cedar forest, stone torii gate wrapped in shimenawa rope, thick morning mist, absolute stillness, no people, vertical 9:16, no text',
      'raked karesansui gravel garden viewed from engawa veranda, single moss-covered stone, long shadows at dawn, complete emptiness, vertical 9:16, no text',
      'narrow bamboo grove path at golden hour, towering green stalks casting long shadows, empty path, dappled light, meditative quiet, vertical 9:16, no text',
    ],
    mockImages: [
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80',
    ],
  },
  legacy: {
    name: 'Legacy',
    kanji: '継',
    category: 'Edo',
    price: 2900,
    scene: 'For AI narrated videos about legacy, what we leave behind, and the weight of time. Slow, poetic visuals that make viewers stop scrolling and think.',
    usecases: ['AI Narration', 'History Content', 'YouTube Shorts', 'Documentary'],
    baseScenes: [
      'worn wooden merchant house in Edo period streetscape at dusk, paper lanterns beginning to glow, stone path worn smooth by centuries of footsteps, no people, vertical 9:16, no text',
      'ancient katana displayed on wooden sword stand, single candle flame nearby, dojo floor, dust motes in air, quiet reverence, vertical 9:16, no text',
      'elderly samurai in simple hakama, seated by shoji window, autumn maple leaves visible outside, profile view, contemplative, end of an era, vertical 9:16, no text',
    ],
    mockImages: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    ],
  },
  night: {
    name: 'Night & Rain',
    kanji: '夜',
    category: 'Night',
    price: 2900,
    scene: 'For AI narrated videos about loneliness, ambition, and the city that never sleeps. Night rain in Japan hits differently — moody, cinematic, and universally relatable.',
    usecases: ['AI Narration', 'Lofi Content', 'YouTube Shorts', 'Chill/Study'],
    baseScenes: [
      'narrow Japanese izakaya alley at night in heavy rain, red paper lanterns reflected in wet cobblestones, single figure with umbrella in distance, no legible signs, vertical 9:16, cinematic',
      'tokyo rooftop at night, heavy rain on glass, city bokeh lights below, lone silhouette standing at edge looking out, moody atmosphere, vertical 9:16, no text',
      'traditional wooden bridge over dark river at midnight, rain ripples on water surface, single stone lantern glowing amber, mist rising, no people, vertical 9:16, no text',
    ],
    mockImages: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    ],
  },
}

// ──────────────────────────────────────────────
// バリエーション定義
// 3シーン × 3ライティング = 9枚 + 余白あり1枚 = 10枚
// ──────────────────────────────────────────────
const LIGHTING_VARIANTS = [
  { key: 'dim',    suffix: 'dim',    prompt: 'dim muted lighting, overcast foggy atmosphere, low contrast, cool desaturated tones' },
  { key: 'normal', suffix: 'normal', prompt: 'balanced natural lighting, soft shadows, clear atmosphere' },
  { key: 'bright', suffix: 'bright', prompt: 'golden hour warm backlighting, dramatic rim light, cinematic glow, warm amber tones' },
]

// ──────────────────────────────────────────────
// HuggingFace API で1枚生成
// ──────────────────────────────────────────────
async function generateImage(basePrompt, lightingVariant, margin, outputDir, filename) {
  const marginPrompt = margin === 'space'
    ? 'generous negative space above and below subject, minimal breathing room composition'
    : 'tight vertical framing, subject fills frame'

  const fullPrompt = `${basePrompt}, ${lightingVariant.prompt}, ${marginPrompt}, vertical portrait 9:16, ultra detailed, award winning photography, no text, no watermark`

  console.log(`   プロンプト (${lightingVariant.key}, margin:${margin}): ${basePrompt.slice(0, 55)}...`)

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

  const buffer = await response.arrayBuffer()
  fs.mkdirSync(outputDir, { recursive: true })
  const filepath = path.join(outputDir, filename)
  fs.writeFileSync(filepath, Buffer.from(buffer))

  return filepath
}

// ──────────────────────────────────────────────
// メイン
// ──────────────────────────────────────────────
async function main() {
  // テーマ選択
  const themeKey = themeArg && SET_THEMES[themeArg.toLowerCase()]
    ? themeArg.toLowerCase()
    : Object.keys(SET_THEMES)[Math.floor(Math.random() * Object.keys(SET_THEMES).length)]

  const theme = SET_THEMES[themeKey]

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📦 bokusai Short Set 生成スクリプト')
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`モード: ${MOCK_MODE ? '🔵 モック（テスト）' : '🟢 本番（AI生成）'}`)
  console.log(`テーマ: ${theme.name} (${theme.kanji})`)
  console.log(`生成数: 10枚（3シーン × 3ライティング + 余白あり1枚）`)
  console.log(`デプロイ: ${shouldDeploy ? 'あり' : 'なし'}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // 既存データ読み込み
  const existingSets = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))

  // セットID生成（例: discipline-samurai-02）
  const sameTheme = existingSets.filter(s => s.theme === theme.name)
  const setNum = String(sameTheme.length + 1).padStart(2, '0')
  const setId = `${themeKey}-${theme.category.toLowerCase()}-${setNum}`

  const outputDir = path.join(__dirname, `../public/generated/sets/${setId}`)
  const images = []
  let slot = 1

  // 3シーン × 3ライティング = 9枚
  for (let sceneIdx = 0; sceneIdx < theme.baseScenes.length; sceneIdx++) {
    const basePrompt = theme.baseScenes[sceneIdx]
    const sceneLetter = String.fromCharCode(65 + sceneIdx) // A, B, C

    for (const lighting of LIGHTING_VARIANTS) {
      const filename = `${String(slot).padStart(2, '0')}-scene${sceneLetter}-${lighting.suffix}.jpg`
      const label = `Scene ${sceneLetter} · ${lighting.key.charAt(0).toUpperCase() + lighting.key.slice(1)}`

      console.log(`[${slot}/10] ${label}...`)

      let url
      if (MOCK_MODE) {
        url = theme.mockImages[sceneIdx % theme.mockImages.length]
        console.log(`   📷 モック画像: ${url.slice(0, 55)}...`)
      } else {
        await generateImage(basePrompt, lighting, 'tight', outputDir, filename)
        url = `/generated/sets/${setId}/${filename}`
        console.log(`   💾 保存: ${url}`)
      }

      images.push({
        slot,
        lighting: lighting.key,
        margin: 'tight',
        label,
        url,
      })

      slot++
      console.log()
    }
  }

  // 10枚目: Scene A + normal + 余白あり
  {
    const filename = `10-sceneA-normal-space.jpg`
    const label = 'Scene A · Space'

    console.log(`[10/10] ${label} (余白あり)...`)

    let url
    if (MOCK_MODE) {
      url = theme.mockImages[0]
      console.log(`   📷 モック画像: ${url.slice(0, 55)}...`)
    } else {
      await generateImage(theme.baseScenes[0], LIGHTING_VARIANTS[1], 'space', outputDir, filename)
      url = `/generated/sets/${setId}/${filename}`
      console.log(`   💾 保存: ${url}`)
    }

    images.push({
      slot: 10,
      lighting: 'normal',
      margin: 'space',
      label,
      url,
    })
  }

  // sets.json に追記
  const newSet = {
    id: setId,
    title: `${theme.name} — ${theme.category} Short Set ${setNum}`,
    theme: theme.name,
    kanji: theme.kanji,
    category: theme.category,
    price: theme.price,
    scene: theme.scene,
    usecases: theme.usecases,
    coverImage: MOCK_MODE ? theme.mockImages[0] : `/generated/sets/${setId}/01-sceneA-normal.jpg`,
    imageCount: images.length,
    images,
  }

  existingSets.push(newSet)
  fs.writeFileSync(DATA_FILE, JSON.stringify(existingSets, null, 2))

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✨ 完了！ Short Set "${newSet.title}" を追加しました`)
  console.log(`📦 合計セット数: ${existingSets.length}件`)
  console.log(`🆔 Set ID: ${setId}`)

  if (MOCK_MODE) {
    console.log()
    console.log('💡 本物のAI画像を生成するには:')
    console.log('   HUGGINGFACE_API_KEY=hf_xxx node scripts/generate-set.js discipline')
  }

  if (shouldDeploy) {
    console.log()
    console.log('🚀 GitHubへpush中...')
    try {
      execSync(`git add data/sets.json public/generated/sets/`, { stdio: 'inherit', cwd: path.join(__dirname, '..') })
      execSync(`git commit -m "Add Short Set: ${newSet.title} [auto]"`, { stdio: 'inherit', cwd: path.join(__dirname, '..') })
      execSync('git push', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
      console.log('✅ push完了！')
    } catch (err) {
      console.error('❌ デプロイエラー:', err.message)
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main().catch(console.error)
