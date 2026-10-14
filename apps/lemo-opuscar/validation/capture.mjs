import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
mkdirSync(__dirname, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: {
    dir: __dirname,
    size: { width: 1440, height: 900 },
  },
})
const page = await context.newPage()
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// Fill brief a bit for a richer screenshot
await page.getByPlaceholder('e.g. A lighthouse that refuses to go dark').fill(
  'A lighthouse that refuses to go dark',
)
await page.getByPlaceholder('Setup → turn → ending').fill(
  'Keeper climbs; bulb dies; code draws a new sun.',
)

// Cycle a few styles so the video shows animation changes
const names = [
  'ASCII / CRT',
  'Hologram HUD',
  '16-bit Pixel RPG',
  'Rubber Hose',
  'Low-poly Island',
  '60s Spy Titles',
]
for (const name of names) {
  await page.getByRole('button', { name: new RegExp(name) }).click()
  await page.waitForTimeout(1800)
}

// Land on hologram for the still
await page.getByRole('button', { name: /Hologram HUD/ }).click()
await page.waitForTimeout(1200)
await page.screenshot({
  path: path.join(__dirname, 'ui-preview.png'),
  fullPage: false,
})

await context.close()
await browser.close()

// Rename video to a stable name
import { readdirSync, renameSync } from 'node:fs'
const files = readdirSync(__dirname).filter((f) => f.endsWith('.webm'))
if (files.length) {
  renameSync(path.join(__dirname, files[0]), path.join(__dirname, 'ui-preview.webm'))
  console.log('Wrote validation/ui-preview.png and validation/ui-preview.webm')
} else {
  console.error('No webm produced')
  process.exit(1)
}
