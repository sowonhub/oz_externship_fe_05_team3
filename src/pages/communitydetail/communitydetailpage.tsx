import { useParams } from 'react-router-dom'

function CommunityDetailPage() {
  const { id } = useParams()

  return (
    <div style={{ padding: '20px' }}>
      <h1>게시글 상세 페이지</h1>
      <p>ID: {id}</p>
      <p>지선 작업 중</p>
    </div>
  )
}

export default CommunityDetailPage
