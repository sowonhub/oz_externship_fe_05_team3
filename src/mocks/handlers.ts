// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // ...다른 핸들러들

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
