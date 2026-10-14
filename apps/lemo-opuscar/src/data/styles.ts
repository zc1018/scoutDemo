export type FilmStyle = {
  id: string
  name: string
  tagline: string
  tags: string[]
  accent: string
  accentSoft: string
  previewMode: PreviewMode
  defaultRhythm: string
  defaultReference: string
}

export type PreviewMode =
  | 'ascii-crt'
  | 'hologram-hud'
  | 'pixel-rpg'
  | 'swiss-motion'
  | 'rubber-hose'
  | 'ink-wash'
  | 'lowpoly-island'
  | 'spy-titles'

export const STYLES: FilmStyle[] = [
  {
    id: 'ascii-crt',
    name: 'ASCII / CRT 终端',
    tagline: '弧面单色显像管上的荧光字符。',
    tags: ['终端', '网格', '琥珀色'],
    accent: '#ffb000',
    accentSoft: '#2a1f0a',
    previewMode: 'ascii-crt',
    defaultRhythm: '冷峻脉冲；打字般的节拍；静默之后来一个温暖的惊喜。',
    defaultReference: '1970 年代单色终端；80 年代初合成器氛围音（只借语法）。',
  },
  {
    id: 'hologram-hud',
    name: '全息 HUD',
    tagline: '线框扫描、目标锁定、滚动遥测数据。',
    tags: ['科幻', '线框', 'HUD'],
    accent: '#5dffc8',
    accentSoft: '#0a1f1a',
    previewMode: 'hologram-hud',
    defaultRhythm: '扫描 → 锁定 → 部件爆炸分解；数字随铜管般的节拍落定。',
    defaultReference: '钢铁侠时代的 HUD 语法；CAD 爆炸视图（不复制素材）。',
  },
  {
    id: 'pixel-rpg',
    name: '16 位像素 RPG',
    tagline: '320×180 索引色世界，用对话框推动剧情。',
    tags: ['像素', '调色板', 'RPG'],
    accent: '#7ec8ff',
    accentSoft: '#12182a',
    previewMode: 'pixel-rpg',
    defaultRhythm: '行走循环 → 对话打字 → 号角齐鸣；用调色板深浅表现时间。',
    defaultReference: '90 年代中期主机 RPG 的 UI 语法；类 ENDESGA 调色板。',
  },
  {
    id: 'swiss-motion',
    name: '瑞士动态设计',
    tagline: '网格、字块与精心设计的利落切换。',
    tags: ['网格', '字体', '现代'],
    accent: '#e11d48',
    accentSoft: '#f8f5f0',
    previewMode: 'swiss-motion',
    defaultRhythm: '沿网格硬切；屏住一口长气，然后猛地切换。',
    defaultReference: '国际主义排版风格的动态版；Müller-Brockmann 式的力量感。',
  },
  {
    id: 'rubber-hose',
    name: '橡皮管动画',
    tagline: '弹跳的四肢、挤压与拉伸、循环笑点。',
    tags: ['卡通', '循环', '1920 年代'],
    accent: '#f59e0b',
    accentSoft: '#1a1208',
    previewMode: 'rubber-hose',
    defaultRhythm: '每 2 秒一个笑点；拉伸进入转折；定格在一个姿势上。',
    defaultReference: '1920 年代橡皮管卡通（只借语法，不用角色）。',
  },
  {
    id: 'ink-wash',
    name: '水墨',
    tagline: '湿墨晕染、飞白笔触，大片留白。',
    tags: ['水墨', '笔触', '东方'],
    accent: '#1f1f1f',
    accentSoft: '#f2ecde',
    previewMode: 'ink-wash',
    defaultRhythm: '缓慢洇开 → 骤然一笔枯墨 → 留白处归于寂静。',
    defaultReference: '中国水墨画语法；以留白控制节奏。',
  },
  {
    id: 'lowpoly-island',
    name: '低多边形小岛',
    tagline: '多面体等距地块，弹跳着落到位。',
    tags: ['3D', '等距', '粉彩'],
    accent: '#67e8f9',
    accentSoft: '#0f172a',
    previewMode: 'lowpoly-island',
    defaultRhythm: '每块地块落下都伴一个音符；太阳轨迹改变整体配色。',
    defaultReference: 'Townscaper / 纪念碑谷的语法（不用素材）。',
  },
  {
    id: 'spy-titles',
    name: '60 年代谍战片头',
    tagline: '剪纸剪影在片头字幕间追逐。',
    tags: ['片头', '剪影', 'Saul Bass'],
    accent: '#dc2626',
    accentSoft: '#f5e6c8',
    previewMode: 'spy-titles',
    defaultRhythm: '铜管重音即剪辑点；追逐 → 由碎片拼出片名。',
    defaultReference: 'Saul Bass 片头语法；致敬《猫鼠游戏》的气质。',
  },
]

export function getStyle(id: string): FilmStyle {
  return STYLES.find((s) => s.id === id) ?? STYLES[0]
}
