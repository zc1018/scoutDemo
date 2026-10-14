import { STYLES, type FilmStyle } from '@/data/styles'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Props = {
  selectedId: string
  onSelect: (style: FilmStyle) => void
}

export function StyleGallery({ selectedId, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted">
            Style gallery
          </h2>
          <p className="text-xs text-muted/80">
            Curated from Lemo-Opuscar · pick one to drive the preview
          </p>
        </div>
        <span className="text-[11px] text-muted">{STYLES.length} styles</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {STYLES.map((style) => {
          const active = style.id === selectedId
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelect(style)}
              className={cn(
                'group rounded-xl border p-3 text-left transition-all',
                active
                  ? 'border-ink bg-white shadow-sm ring-2 ring-ink/10'
                  : 'border-line bg-white/50 hover:border-ink/30 hover:bg-white',
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full ring-2 ring-white"
                  style={{ background: style.accent }}
                />
                <span className="text-sm font-semibold">{style.name}</span>
              </div>
              <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-muted">
                {style.tagline}
              </p>
              <div className="flex flex-wrap gap-1">
                {style.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
