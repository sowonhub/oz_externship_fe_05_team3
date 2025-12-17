import { useParams } from 'react-router-dom'

function CommunityCreatePage() {
  const { id } = useParams()

  return (
    <div style={{ padding: '20px' }}>
      <h1>{id ? '게시글 수정' : '게시글 작성'}</h1>
      <p>원국님 작업 예정</p>
    </div>
  )
}

export default CommunityCreatePage
