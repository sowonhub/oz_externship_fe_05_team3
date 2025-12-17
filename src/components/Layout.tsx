import { ReactNode } from 'react'
import Header from './Header'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header />
      <Navigation />
      {children}
    </div>
  )
}

export default Layout

