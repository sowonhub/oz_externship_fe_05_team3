import type { ReactNode } from 'react'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
}

export const Dropdown = ({ trigger, children }: DropdownProps) => {
  return (
    <div className="relative inline-block text-left">
      {trigger}
      {children}
    </div>
  )
}
