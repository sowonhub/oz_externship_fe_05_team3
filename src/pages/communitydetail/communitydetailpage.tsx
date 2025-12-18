// src/pages/communitydetail/communitydetailpage.tsx
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

function CommunityDetailPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* 게시글 영역 */}
      <section className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>작성자</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">작성자 닉네임</p>
              <p className="text-sm text-gray-500">2025.12.18</p>
            </div>
          </div>

          {/* 메타 정보 */}
          <div className="flex gap-2">
            <Badge variant="secondary">👁️ 123</Badge>
            <Badge variant="secondary">❤️ 45</Badge>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold">게시글 제목입니다</h1>

        <div className="prose max-w-none">
          <p>게시글 내용이 여기에 표시됩니다. ID: {id}</p>
          <p>실제 데이터는 API 연동 후 교체될 예정입니다.</p>
        </div>

        {/* 액션 버튼 영역 */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost_purple" size="sm" round="full">
            좋아요
          </Button>
          <Button variant="outline" size="sm" round="full">
            공유하기
          </Button>
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
