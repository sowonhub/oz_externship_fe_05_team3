import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
}

export const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
      {children}
    </span>
  )
}
