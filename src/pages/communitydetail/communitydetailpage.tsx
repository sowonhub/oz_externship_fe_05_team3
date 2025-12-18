import { useParams } from 'react-router-dom';

function CommunityDetailPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* 게시글 영역 */}
      <section className="mb-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">게시글 제목</h1>
          <p className="mb-4 text-gray-600">게시글 ID: {id}</p>
          <div className="prose max-w-none">
            <p>게시글 내용이 여기에 표시됩니다.</p>
          </div>
        </div>
      </section>

      {/* 댓글 영역 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">댓글</h2>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="text-gray-500">댓글 목록이 여기에 표시됩니다.</p>
        </div>
      </section>
    </div>
  );
}

export default CommunityDetailPage;
