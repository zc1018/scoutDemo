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
    const md = `# Director brief — ${style.name}

- **Style:** ${style.name} (\`${style.id}\`)
- **Theme:** ${brief.theme || '—'}
- **Story (one-sentence arc):** ${brief.story || '—'}
- **Rhythm:** ${brief.rhythm || '—'}
- **Reference / benchmark:** ${brief.reference || '—'}

> Generated client-side by the lemo-opuscar scout demo. No API calls.
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
          Director brief
        </h2>
        <p className="text-xs text-muted/80">
          DIRECTOR-template fields · stays in your browser
        </p>
      </div>
      <label className="block space-y-1">
        <span className="text-xs font-medium">Theme</span>
        <Input
          placeholder="e.g. A lighthouse that refuses to go dark"
          value={brief.theme}
          onChange={(e) => set('theme', e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-medium">Story (one-sentence arc)</span>
        <Textarea
          placeholder="Setup → turn → ending"
          value={brief.story}
          onChange={(e) => set('story', e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-medium">Rhythm</span>
        <Textarea
          value={brief.rhythm}
          onChange={(e) => set('rhythm', e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-xs font-medium">Reference / benchmark</span>
        <Textarea
          value={brief.reference}
          onChange={(e) => set('reference', e.target.value)}
        />
      </label>
      <div className="rounded-lg border border-line bg-white/70 p-3 text-xs leading-relaxed text-muted">
        <div className="mb-1 font-medium text-ink">Live summary</div>
        <p>
          <strong>{style.name}</strong>
          {brief.theme ? ` · ${brief.theme}` : ' · set a theme'}
        </p>
        <p className="mt-1 line-clamp-3">{brief.story || 'Story pending…'}</p>
      </div>
      <Button type="button" variant="outline" className="w-full" onClick={exportMd}>
        <Download className="size-3.5" />
        Download brief.md
      </Button>
    </div>
  )
}
