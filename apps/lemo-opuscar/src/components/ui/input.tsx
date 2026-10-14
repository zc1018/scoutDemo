import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'flex h-9 w-full rounded-md border border-line bg-white px-3 text-sm outline-none ring-accent/40 placeholder:text-muted focus:ring-2',
        className,
      )}
      {...props}
    />
  )
}
