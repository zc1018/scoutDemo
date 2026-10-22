import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-50',
        size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-4 text-sm',
        variant === 'default' &&
          'bg-ink text-paper hover:bg-ink/90',
        variant === 'outline' &&
          'border border-line bg-transparent hover:bg-black/5',
        variant === 'ghost' && 'hover:bg-black/5',
        className,
      )}
      {...props}
    />
  )
}
