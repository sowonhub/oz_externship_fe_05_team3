// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import communityPosts from '@/mocks/CommunityPosts';
import { processPosts } from '@/utils/index';
import type { SearchFilter, SortOption } from '@/types-interface/index';

const handlers = [
  // 게시글 목록 조회 - 유틸 함수 재사용
  http.get('/api/v1/community/posts', ({ request }) => {
    const url = new URL(request.url);

    const params = {
      categoryId: url.searchParams.get('category_id')
        ? Number(url.searchParams.get('category_id'))
        : undefined,
      search: url.searchParams.get('search') || undefined,
      searchFilter: url.searchParams.get('search_filter') as
        | SearchFilter
        | undefined,
      sort: url.searchParams.get('sort') as SortOption | undefined,
      page: Number(url.searchParams.get('page')) || 1,
      pageSize: 10,
    };

    // 🔍 디버깅 로그
    console.log('🟢 MSW Handler 호출됨!');
    console.log('📥 받은 파라미터:', params);
    console.log('📊 전체 mock 데이터:', communityPosts.results.length, '개');

    // 유틸 함수 사용 - 로직 재사용
    const result = processPosts(communityPosts.results, params);

    console.log('📤 필터링 후:', result.results.length, '개');
    console.log('📦 반환 데이터:', result);

    return HttpResponse.json(result);
  }),

  // 댓글 수정
  http.put(
    '/api/v1/posts/:postId/comments/:commentId',
    async ({ request, params }) => {
      // request.json() 결과에 타입 지정
      const body = (await request.json()) as { content: string };
      const { commentId } = params;

      return HttpResponse.json(
        {
          id: Number(commentId),
          content: body.content,
          updated_at: new Date().toISOString(),
        },
        { status: 200 }
      );
    }
  ),

  // 댓글 삭제
  http.delete('/api/v1/posts/:postId/comments/:commentId', () => {
    return HttpResponse.json(
      { detail: '댓글이 삭제되었습니다.' },
      { status: 200 }
    );
  }),
];

export default handlers;
