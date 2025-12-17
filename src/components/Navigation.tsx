import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            OZ. 오즈코딩스쿨
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/posts/new" className="text-gray-900 font-medium">
              커뮤니티
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              질의응답
            </Link>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
          U
        </div>
      </div>
    </nav>
  )
}

export default Navigation

