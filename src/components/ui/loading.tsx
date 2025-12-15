interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
}

export const Loading = ({ size = 'md' }: LoadingProps) => {
  const sizeClass =
    size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'

  return (
    <div
      className={`border-muted-foreground animate-spin rounded-full border-2 border-t-transparent ${sizeClass}`}
      role="status"
      aria-label="로딩 중"
    />
  )
}
