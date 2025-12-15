import type { ReactNode } from 'react'

interface AvatarProps {
  children?: ReactNode
}

export const Avatar = ({ children }: AvatarProps) => {
  return (
    <div className="bg-muted inline-flex h-10 w-10 items-center justify-center rounded-full">
      {children}
    </div>
  )
}
