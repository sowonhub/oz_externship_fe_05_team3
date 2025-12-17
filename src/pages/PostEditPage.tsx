import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, MarkdownEditor } from '../components'
import type { PostFormData } from '../types'

const PostEditPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    imageUrl: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleChange = (field: keyof PostFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">커뮤니티 게시글 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="기존 제목이 여기에 들어갑니다."
            className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400"
          />

          <MarkdownEditor
            value={formData.content}
            onChange={(value) => handleChange('content', value)}
            placeholder="기존 내용이 여기에 들어갑니다."
          />

          <input
            type="text"
            value={formData.imageUrl || ''}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            placeholder="기존 이미지 URL이 여기에 들어갑니다."
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default PostEditPage
