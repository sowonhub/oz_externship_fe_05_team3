import { useState } from 'react'

const PostCreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 게시글 생성 API 연동
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        게시글 작성
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="title" style={{ fontWeight: 600 }}>
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: '0.95rem',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="content" style={{ fontWeight: 600 }}>
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            rows={8}
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: '0.95rem',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="imageUrl" style={{ fontWeight: 600 }}>
            이미지 URL
          </label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="이미지 URL을 입력하세요."
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: '0.95rem',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
          <button
            type="button"
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: 999,
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            취소
          </button>
          <button
            type="submit"
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: 999,
              border: 'none',
              backgroundColor: '#16a34a',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            작성 완료
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostCreatePage


