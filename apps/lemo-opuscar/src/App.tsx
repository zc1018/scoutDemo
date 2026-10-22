import { useMemo, useState } from 'react'
import { STYLES, type FilmStyle } from '@/data/styles'
import { StyleGallery } from '@/components/StyleGallery'
import { BriefForm, type Brief } from '@/components/BriefForm'
import { StylePreview } from '@/components/StylePreview'
import { Clapperboard, ExternalLink } from 'lucide-react'

function briefFor(style: FilmStyle, theme = ''): Brief {
  return {
    theme,
    story: '',
    rhythm: style.defaultRhythm,
    reference: style.defaultReference,
  }
}

export default function App() {
  const [style, setStyle] = useState<FilmStyle>(STYLES[0])
  const [brief, setBrief] = useState<Brief>(() => briefFor(STYLES[0]))

  const onSelect = (next: FilmStyle) => {
    setStyle(next)
    setBrief((prev) => ({
      ...briefFor(next, prev.theme),
      story: prev.story,
    }))
  }

  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="min-h-full">
      <header className="border-b border-line bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-ink text-paper">
              <Clapperboard className="size-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                Lemo-Opuscar 工作室
              </h1>
              <p className="text-xs text-muted">
                纯代码电影风格 · 技侦 Demo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a
              className="inline-flex items-center gap-1 text-muted hover:text-ink"
              href="https://github.com/lemomo-ai/lemo-opuscar"
              target="_blank"
              rel="noreferrer"
            >
              上游仓库 <ExternalLink className="size-3" />
            </a>
            <a
              className="inline-flex items-center gap-1 text-muted hover:text-ink"
              href="https://x.com/lemomo_ai/status/2103823847632060854"
              target="_blank"
              rel="noreferrer"
            >
              原书签 <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-4">
          <StylePreview style={style} />
          <StyleGallery selectedId={style.id} onSelect={onSelect} />
        </section>
        <aside className="rounded-xl border border-line bg-white/60 p-4 shadow-sm lg:sticky lg:top-4 lg:self-start">
          <BriefForm style={style} brief={brief} onChange={setBrief} />
        </aside>
      </main>

      <footer className="border-t border-line px-4 py-6 text-center text-[11px] text-muted">
        灵感来自{' '}
        <a className="underline" href="https://github.com/lemomo-ai/lemo-opuscar">
          lemomo-ai/lemo-opuscar
        </a>
        。纯前端 Demo · 不调用 Claude API · 不使用视频模型 · {year}
      </footer>
    </div>
  )
}
