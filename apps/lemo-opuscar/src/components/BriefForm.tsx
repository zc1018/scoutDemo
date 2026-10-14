import type { FilmStyle } from '@/data/styles'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export type Brief = {
  theme: string
  story: string
  rhythm: string
  reference: string
}

type Props = {
  style: FilmStyle
  brief: Brief
  onChange: (brief: Brief) => void
}

export function BriefForm({ style, brief, onChange }: Props) {
  const set = (key: keyof Brief, value: string) =>
    onChange({ ...brief, [key]: value })

  const exportMd = () => {
    const md = `# 导演简报 — ${style.name}

- **风格：** ${style.name} (\`${style.id}\`)
- **主题：** ${brief.theme || '—'}
- **故事（一句话弧线）：** ${brief.story || '—'}
- **节奏：** ${brief.rhythm || '—'}
- **参考 / 对标：** ${brief.reference || '—'}

> 由 lemo-opuscar 技侦 Demo 在浏览器本地生成，未调用任何 API。
`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `brief-${style.id}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted">
          导演简报
        </h2>
        <p className="text-xs text-muted/80">
          DIRECTOR 模板字段 · 数据只保存在你的浏览器
        </p>
      </div>
      <label className="block space-y-1">
        <span className="text-xs font-medium">主题</span>
        <Input
          placeholder="例如：一座拒绝熄灭的灯塔"
          value={brief.theme}
          onChange={(e) => set('theme', e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-medium">故事（一句话弧线）</span>
        <Textarea
          placeholder="铺垫 → 转折 → 结局"
          value={brief.story}
          onChange={(e) => set('story', e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-medium">节奏</span>
        <Textarea
          value={brief.rhythm}
          onChange={(e) => set('rhythm', e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-medium">参考 / 对标</span>
        <Textarea
          value={brief.reference}
          onChange={(e) => set('reference', e.target.value)}
        />
      </label>
      <div className="rounded-lg border border-line bg-white/70 p-3 text-xs leading-relaxed text-muted">
        <div className="mb-1 font-medium text-ink">实时摘要</div>
        <p>
          <strong>{style.name}</strong>
          {brief.theme ? ` · ${brief.theme}` : ' · 请设置主题'}
        </p>
        <p className="mt-1 line-clamp-3">{brief.story || '故事待填写…'}</p>
      </div>
      <Button type="button" variant="outline" className="w-full" onClick={exportMd}>
        <Download className="size-3.5" />
        下载 brief.md
      </Button>
    </div>
  )
}
