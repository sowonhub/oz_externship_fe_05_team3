import { apiClient } from '@/api/apiclient';
import type {
  CommentListResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
  Comment,
} from '@/types/api';

export const commentService = {
  // 댓글 목록 조회
  getComments(postId: number, page = 1, pageSize = 100) {
    return apiClient.get<CommentListResponse>(`/posts/${postId}/comments`, {
      params: { page, page_size: pageSize },
    });
  },

  createComment(postId: number, data: CreateCommentRequest) {
    return apiClient.post<Comment>(`/posts/${postId}/comments`, data);
  },

  updateComment(postId: number, commentId: number, data: UpdateCommentRequest) {
    return apiClient.put<Comment>(
      `/posts/${postId}/comments/${commentId}`,
      data
    );
  },

  deleteComment(postId: number, commentId: number) {
    return apiClient.delete<{ detail: string }>(
      `/posts/${postId}/comments/${commentId}`
    );
  },
};
