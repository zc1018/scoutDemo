import { useEffect, useRef } from 'react'
import type { FilmStyle, PreviewMode } from '@/data/styles'
import { Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type Props = {
  style: FilmStyle
}

export function StylePreview({ style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playing, setPlaying] = useState(true)
  const playingRef = useRef(true)
  const styleRef = useRef(style)

  useEffect(() => {
    styleRef.current = style
  }, [style])

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t0 = performance.now()
    let elapsed = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!playingRef.current) {
        t0 = now - elapsed * 1000
        return
      }
      elapsed = (now - t0) / 1000
      const s = styleRef.current
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      drawFrame(ctx, w, h, elapsed, s.previewMode, s.accent, s.accentSoft)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-ink shadow-sm">
      <canvas ref={canvasRef} className="block h-[280px] w-full sm:h-[340px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <div className="rounded-md bg-black/50 px-2 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur">
          实时 · {style.name}
        </div>
        <div className="pointer-events-auto">
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 bg-black/40 text-white hover:bg-black/60"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? '暂停预览' : '播放预览'}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            {playing ? '暂停' : '播放'}
          </Button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-[11px] text-white/80">
        纯代码 Canvas 预览 · 不使用视频模型
      </div>
    </div>
  )
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  mode: PreviewMode,
  accent: string,
  soft: string,
) {
  ctx.clearRect(0, 0, w, h)
  switch (mode) {
    case 'ascii-crt':
      drawAsciiCrt(ctx, w, h, t, accent, soft)
      break
    case 'hologram-hud':
      drawHologram(ctx, w, h, t, accent, soft)
      break
    case 'pixel-rpg':
      drawPixelRpg(ctx, w, h, t, accent, soft)
      break
    case 'swiss-motion':
      drawSwiss(ctx, w, h, t, accent, soft)
      break
    case 'rubber-hose':
      drawRubberHose(ctx, w, h, t, accent, soft)
      break
    case 'ink-wash':
      drawInkWash(ctx, w, h, t, accent, soft)
      break
    case 'lowpoly-island':
      drawLowpoly(ctx, w, h, t, accent, soft)
      break
    case 'spy-titles':
      drawSpyTitles(ctx, w, h, t, accent, soft)
      break
  }
}

function drawAsciiCrt(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
  soft: string,
) {
  ctx.fillStyle = soft
  ctx.fillRect(0, 0, w, h)
  const cols = 48
  const rows = 22
  const cw = w / cols
  const ch = h / rows
  const glyphs = '.:-=+*#%@'
  ctx.font = `${Math.floor(ch * 0.85)}px monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const nx = x / cols - 0.5
      const ny = y / rows - 0.5
      const wave =
        Math.sin(nx * 8 + t * 2) * Math.cos(ny * 6 - t * 1.4) +
        Math.sin(Math.hypot(nx, ny) * 12 - t * 3) * 0.5
      const v = (wave + 1.5) / 3
      const gi = Math.min(glyphs.length - 1, Math.floor(v * glyphs.length))
      const flicker = 0.85 + 0.15 * Math.sin(t * 40 + x * 0.3)
      ctx.fillStyle = accent
      ctx.globalAlpha = (0.25 + v * 0.75) * flicker
      ctx.fillText(glyphs[gi], x * cw + cw / 2, y * ch + ch / 2)
    }
  }
  ctx.globalAlpha = 0.12
  for (let y = 0; y < h; y += 3) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, y, w, 1)
  }
  ctx.globalAlpha = 1
  // cursor
  const cx = Math.floor((t * 6) % cols)
  const cy = Math.floor(rows * 0.55)
  if (Math.floor(t * 2) % 2 === 0) {
    ctx.fillStyle = accent
    ctx.fillRect(cx * cw + 2, cy * ch + 2, cw - 4, ch - 4)
  }
}

function drawHologram(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
  soft: string,
) {
  ctx.fillStyle = soft
  ctx.fillRect(0, 0, w, h)
  // grid
  ctx.strokeStyle = accent
  ctx.globalAlpha = 0.15
  ctx.lineWidth = 1
  for (let i = 0; i < 20; i++) {
    const o = ((t * 20 + i * 18) % (h + 40)) - 20
    ctx.beginPath()
    ctx.moveTo(0, o)
    ctx.lineTo(w, o)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
  const cx = w / 2
  const cy = h / 2 + 10
  const r = Math.min(w, h) * 0.22
  // pad
  ctx.strokeStyle = accent
  ctx.globalAlpha = 0.5
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath()
    ctx.ellipse(cx, cy + r * 0.9, r * (0.5 + i * 0.18), r * 0.12, 0, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
  // rotating wireframe tetra / box
  const verts = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ]
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ]
  const rotY = t * 1.1
  const rotX = 0.5 + Math.sin(t * 0.7) * 0.2
  const project = (v: number[]) => {
    let [x, y, z] = v
    const cosy = Math.cos(rotY)
    const siny = Math.sin(rotY)
    const cosx = Math.cos(rotX)
    const sinx = Math.sin(rotX)
    let x1 = x * cosy - z * siny
    let z1 = x * siny + z * cosy
    let y1 = y * cosx - z1 * sinx
    z1 = y * sinx + z1 * cosx
    const scale = r * (1.1 + z1 * 0.15)
    return [cx + x1 * scale, cy - 20 + y1 * scale * 0.9, z1] as const
  }
  const pts = verts.map(project)
  ctx.lineWidth = 1.5
  ctx.shadowColor = accent
  ctx.shadowBlur = 12
  for (const [a, b] of edges) {
    const pa = pts[a]
    const pb = pts[b]
    const depth = (pa[2] + pb[2]) / 2
    ctx.globalAlpha = 0.35 + (depth + 1) * 0.3
    ctx.strokeStyle = accent
    ctx.beginPath()
    ctx.moveTo(pa[0], pa[1])
    ctx.lineTo(pb[0], pb[1])
    ctx.stroke()
  }
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
  // HUD brackets
  const br = 18
  ctx.strokeStyle = accent
  ctx.lineWidth = 2
  ;[
    [16, 16],
    [w - 16, 16],
    [16, h - 16],
    [w - 16, h - 16],
  ].forEach(([x, y], i) => {
    const sx = i % 2 === 0 ? 1 : -1
    const sy = i < 2 ? 1 : -1
    ctx.beginPath()
    ctx.moveTo(x, y + sy * br)
    ctx.lineTo(x, y)
    ctx.lineTo(x + sx * br, y)
    ctx.stroke()
  })
  ctx.font = '11px monospace'
  ctx.fillStyle = accent
  ctx.globalAlpha = 0.85
  ctx.fillText(`SCAN ${(t % 3).toFixed(2)}s`, 28, 28)
  ctx.fillText(`LOCK ${String(Math.floor(t * 17) % 100).padStart(2, '0')}`, w - 100, 28)
  ctx.globalAlpha = 1
}

function drawPixelRpg(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
  soft: string,
) {
  const scale = 6
  const pw = Math.floor(w / scale)
  const ph = Math.floor(h / scale)
  ctx.fillStyle = soft
  ctx.fillRect(0, 0, w, h)
  // sky bands
  for (let y = 0; y < ph; y++) {
    const c = y < ph * 0.45 ? '#1a2744' : y < ph * 0.55 ? '#2a3d5c' : '#3d5a3a'
    ctx.fillStyle = c
    ctx.fillRect(0, y * scale, w, scale)
  }
  // ground tiles
  for (let x = 0; x < pw; x++) {
    const shade = (x + Math.floor(t * 2)) % 2 === 0 ? '#4a6b3e' : '#3f5e35'
    ctx.fillStyle = shade
    ctx.fillRect(x * scale, Math.floor(ph * 0.55) * scale, scale, (ph - Math.floor(ph * 0.55)) * scale)
  }
  // walking sprite
  const frame = Math.floor(t * 8) % 4
  const sx = Math.floor((t * 18) % (pw + 10)) - 5
  const sy = Math.floor(ph * 0.5)
  const bob = frame === 1 || frame === 3 ? -1 : 0
  drawSprite(ctx, sx, sy + bob, scale, accent)
  // dialog box
  const boxY = h - 72
  ctx.fillStyle = '#0e1220'
  ctx.fillRect(12, boxY, w - 24, 56)
  ctx.strokeStyle = accent
  ctx.lineWidth = 2
  ctx.strokeRect(12, boxY, w - 24, 56)
  ctx.fillStyle = '#fff'
  ctx.font = '12px monospace'
  const msg = '一部纯代码电影，不用视频模型。'
  const shown = Math.floor((t * 12) % (msg.length + 8))
  ctx.fillText(msg.slice(0, Math.min(shown, msg.length)), 24, boxY + 28)
  if (Math.floor(t * 3) % 2 === 0 && shown >= msg.length) {
    ctx.fillText('▼', w - 36, boxY + 44)
  }
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  accent: string,
) {
  const px = (ox: number, oy: number, c: string, ww = 1, hh = 1) => {
    ctx.fillStyle = c
    ctx.fillRect((x + ox) * s, (y + oy) * s, ww * s, hh * s)
  }
  px(1, 0, '#f5d0a9', 3, 2)
  px(0, 2, accent, 5, 3)
  px(1, 5, '#2d2d2d', 1, 2)
  px(3, 5, '#2d2d2d', 1, 2)
  px(2, 1, '#1a1a1a', 1, 1) // eye
}

function drawSwiss(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
  soft: string,
) {
  ctx.fillStyle = soft
  ctx.fillRect(0, 0, w, h)
  const g = 24
  ctx.strokeStyle = 'rgba(0,0,0,0.06)'
  for (let x = 0; x < w; x += g) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y < h; y += g) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }
  const beat = Math.floor(t * 2) % 4
  const blocks = [
    { x: 2, y: 2, ww: 6, hh: 3, c: accent },
    { x: 9, y: 2, ww: 4, hh: 2, c: '#111' },
    { x: 2, y: 6, ww: 3, hh: 4, c: '#111' },
    { x: 6, y: 6, ww: 7, hh: 2, c: accent },
    { x: 6, y: 9, ww: 4, hh: 3, c: '#444' },
  ]
  blocks.forEach((b, i) => {
    const phase = (t * 2 + i * 0.35) % 1
    const pop = beat === i % 4 ? 1 + Math.sin(phase * Math.PI) * 0.08 : 1
    const x = b.x * g
    const y = b.y * g
    const ww = b.ww * g * pop
    const hh = b.hh * g * pop
    ctx.fillStyle = b.c
    ctx.fillRect(x, y, ww, hh)
  })
  ctx.fillStyle = '#111'
  ctx.font = `bold ${Math.floor(g * 1.6)}px sans-serif`
  const label = 'MOTION'
  const ox = ((t * 40) % (w + 200)) - 100
  ctx.fillText(label, ox, h - g * 1.5)
}

function drawRubberHose(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
  soft: string,
) {
  ctx.fillStyle = soft
  ctx.fillRect(0, 0, w, h)
  const cx = w / 2
  const cy = h / 2
  const bounce = Math.abs(Math.sin(t * 4)) * 18
  ctx.strokeStyle = accent
  ctx.fillStyle = accent
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  // body
  ctx.beginPath()
  ctx.ellipse(cx, cy + 10 - bounce, 28, 36 + bounce * 0.3, 0, 0, Math.PI * 2)
  ctx.fill()
  // head
  ctx.beginPath()
  ctx.arc(cx, cy - 40 - bounce, 22, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = soft
  ctx.beginPath()
  ctx.arc(cx - 7, cy - 42 - bounce, 4, 0, Math.PI * 2)
  ctx.arc(cx + 7, cy - 42 - bounce, 4, 0, Math.PI * 2)
  ctx.fill()
  // limbs
  ctx.strokeStyle = accent
  const arm = Math.sin(t * 6) * 40
  ctx.beginPath()
  ctx.moveTo(cx - 20, cy - bounce)
  ctx.quadraticCurveTo(cx - 50, cy + arm - bounce, cx - 70, cy + 30 + arm * 0.3 - bounce)
  ctx.moveTo(cx + 20, cy - bounce)
  ctx.quadraticCurveTo(cx + 50, cy - arm - bounce, cx + 70, cy + 30 - arm * 0.3 - bounce)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx - 10, cy + 40 - bounce)
  ctx.quadraticCurveTo(cx - 30, cy + 70 + bounce * 0.2, cx - 20, cy + 95)
  ctx.moveTo(cx + 10, cy + 40 - bounce)
  ctx.quadraticCurveTo(cx + 30, cy + 70 + bounce * 0.2, cx + 20, cy + 95)
  ctx.stroke()
  // ground shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.beginPath()
  ctx.ellipse(cx, h - 36, 50 - bounce * 0.5, 8, 0, 0, Math.PI * 2)
  ctx.fill()
}

function drawInkWash(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  _accent: string,
  soft: string,
) {
  ctx.fillStyle = soft
  ctx.fillRect(0, 0, w, h)
  // paper grain
  for (let i = 0; i < 80; i++) {
    const x = (Math.sin(i * 12.3) * 0.5 + 0.5) * w
    const y = (Math.cos(i * 7.1) * 0.5 + 0.5) * h
    ctx.fillStyle = `rgba(0,0,0,${0.02 + (i % 5) * 0.005})`
    ctx.fillRect(x, y, 2, 2)
  }
  const blooms = [
    { x: 0.35, y: 0.45, r: 60, delay: 0 },
    { x: 0.55, y: 0.4, r: 40, delay: 0.8 },
    { x: 0.48, y: 0.58, r: 30, delay: 1.4 },
  ]
  blooms.forEach((b) => {
    const age = Math.max(0, t - b.delay)
    const rr = b.r * (0.4 + Math.min(1, age / 2) * 0.8 + Math.sin(age) * 0.05)
    const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, rr)
    g.addColorStop(0, `rgba(20,20,20,${0.55 * Math.min(1, age / 0.5)})`)
    g.addColorStop(0.55, `rgba(20,20,20,${0.2 * Math.min(1, age / 1)})`)
    g.addColorStop(1, 'rgba(20,20,20,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(b.x * w, b.y * h, rr, 0, Math.PI * 2)
    ctx.fill()
  })
  // dry stroke
  ctx.strokeStyle = 'rgba(15,15,15,0.85)'
  ctx.lineWidth = 2.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  const len = Math.min(1, (t % 4) / 2)
  for (let i = 0; i <= 40 * len; i++) {
    const u = i / 40
    const x = w * 0.2 + u * w * 0.55
    const y = h * 0.72 + Math.sin(u * 4 + t) * 8 + Math.sin(u * 20) * 2
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

function drawLowpoly(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
  soft: string,
) {
  const sky = ctx.createLinearGradient(0, 0, 0, h)
  sky.addColorStop(0, '#87b8d8')
  sky.addColorStop(1, soft)
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h)
  const cx = w / 2
  const cy = h * 0.62
  const tiles: { q: number; r: number; elev: number }[] = []
  for (let q = -3; q <= 3; q++) {
    for (let r = -3; r <= 3; r++) {
      if (Math.abs(q + r) > 3) continue
      tiles.push({
        q,
        r,
        elev: 0.4 + 0.6 * Math.sin(q * 0.9 + r * 0.7 + t * 0.5),
      })
    }
  }
  const size = Math.min(w, h) * 0.07
  const toScreen = (q: number, r: number, elev: number) => {
    const x = size * Math.sqrt(3) * (q + r / 2)
    const y = size * 1.5 * r
    const land = Math.max(0, elev) * size * 1.8
    // bounce in
    const appear = Math.min(1, Math.max(0, t * 1.2 - (q + r + 6) * 0.08))
    const bounce = Math.sin(appear * Math.PI) * (1 - appear) * 20
    return [cx + x, cy + y * 0.55 - land - bounce * appear, appear] as const
  }
  tiles
    .slice()
    .sort((a, b) => a.q + a.r - (b.q + b.r))
    .forEach((tile) => {
      const [sx, sy, a] = toScreen(tile.q, tile.r, tile.elev)
      if (a <= 0) return
      const top = tile.elev > 0.7 ? '#7dcea0' : tile.elev > 0.45 ? '#f0d9a0' : accent
      const side = '#5a8f72'
      ctx.globalAlpha = a
      // side face
      ctx.fillStyle = side
      ctx.beginPath()
      hexPath(ctx, sx, sy + size * 0.35, size * 0.95)
      ctx.fill()
      // top
      ctx.fillStyle = top
      ctx.beginPath()
      hexPath(ctx, sx, sy, size * 0.95)
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.12)'
      ctx.stroke()
    })
  ctx.globalAlpha = 1
}

function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI / 180) * (60 * i - 30)
    const px = x + r * Math.cos(ang)
    const py = y + r * Math.sin(ang) * 0.55
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
}

function drawSpyTitles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
  soft: string,
) {
  ctx.fillStyle = soft
  ctx.fillRect(0, 0, w, h)
  // cut paper panels
  const panels = [
    { x: 0, y: 0, ww: w * 0.45, hh: h, c: '#1a1a1a' },
    { x: w * 0.4, y: 0, ww: w * 0.6, hh: h * 0.55, c: accent },
    { x: w * 0.55, y: h * 0.5, ww: w * 0.45, hh: h * 0.5, c: '#c4a574' },
  ]
  panels.forEach((p, i) => {
    ctx.save()
    ctx.translate(Math.sin(t + i) * 2, 0)
    ctx.fillStyle = p.c
    jaggedRect(ctx, p.x, p.y, p.ww, p.hh, 6)
    ctx.fill()
    ctx.restore()
  })
  // silhouette runner
  const x = ((t * 90) % (w + 80)) - 40
  const y = h * 0.62 + Math.sin(t * 10) * 4
  ctx.fillStyle = '#0a0a0a'
  ctx.beginPath()
  ctx.ellipse(x, y - 40, 10, 12, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillRect(x - 8, y - 28, 16, 28)
  ctx.beginPath()
  ctx.moveTo(x - 8, y)
  ctx.lineTo(x - 18, y + 22 + Math.sin(t * 12) * 6)
  ctx.lineTo(x - 4, y)
  ctx.moveTo(x + 8, y)
  ctx.lineTo(x + 18, y + 22 + Math.cos(t * 12) * 6)
  ctx.lineTo(x + 4, y)
  ctx.fill()
  // scarf accent
  ctx.strokeStyle = accent
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(x + 6, y - 20)
  ctx.quadraticCurveTo(x + 24, y - 10, x + 30 + Math.sin(t * 8) * 8, y + 5)
  ctx.stroke()
  // title letters assembling
  ctx.fillStyle = '#0a0a0a'
  ctx.font = `bold ${Math.floor(w * 0.08)}px sans-serif`
  const title = 'OPUSCAR'
  const letters = title.split('')
  letters.forEach((ch, i) => {
    const tx = w * 0.18 + i * (w * 0.09)
    const ty = h * 0.28 + Math.sin(t * 2 + i) * 3
    const rot = Math.sin(t + i * 0.4) * 0.05
    ctx.save()
    ctx.translate(tx, ty)
    ctx.rotate(rot)
    ctx.fillText(ch, 0, 0)
    ctx.restore()
  })
}

function jaggedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  ww: number,
  hh: number,
  n: number,
) {
  ctx.beginPath()
  const pts = [
    [x, y],
    [x + ww, y],
    [x + ww, y + hh],
    [x, y + hh],
  ]
  for (let s = 0; s < 4; s++) {
    const [x0, y0] = pts[s]
    const [x1, y1] = pts[(s + 1) % 4]
    for (let i = 0; i <= n; i++) {
      const u = i / n
      const jx = (Math.sin(s * 9 + i * 3.1) * 0.5) * 4
      const jy = (Math.cos(s * 7 + i * 2.7) * 0.5) * 4
      const px = x0 + (x1 - x0) * u + jx
      const py = y0 + (y1 - y0) * u + jy
      if (s === 0 && i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
  }
  ctx.closePath()
}
