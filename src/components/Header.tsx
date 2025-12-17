import { Megaphone } from 'lucide-react'

const Header = () => {
  return (
    <div className="bg-gray-800 text-white text-sm py-2 px-4 flex items-center gap-2">
      <Megaphone className="w-4 h-4 text-red-500" />
      <span>선착순 모집! 국비지원 받고 4주 완성</span>
    </div>
  )
}

export default Header

