import { cn } from '@/lib/utils'
import type { TextareaHTMLAttributes } from 'react'

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'flex min-h-[72px] w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none ring-accent/40 placeholder:text-muted focus:ring-2',
        className,
      )}
      {...props}
    />
  )
}
