import type { ReactNode } from 'react'

interface ToastProps {
  children: ReactNode
}

export const Toast = ({ children }: ToastProps) => {
  return (
    <div className="bg-muted rounded-md px-4 py-2 text-sm shadow">
      {children}
    </div>
  )
}
