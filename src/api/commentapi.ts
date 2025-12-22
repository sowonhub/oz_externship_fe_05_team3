import axios from 'axios';
import type {
  Comment,
  CommentListResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '@/types/api';

const API_BASE_URL = '/api/v1';

export async function getComments(
  postId: number,
  page = 1,
  pageSize = 100
): Promise<CommentListResponse> {
  const response = await axios.get<CommentListResponse>(
    `${API_BASE_URL}/posts/${postId}/comments`,
    {
      params: { page, page_size: pageSize },
    }
  );
  return response.data;
}

export async function createComment(
  postId: number,
  data: CreateCommentRequest
): Promise<{ detail: string }> {
  const response = await axios.post(
    `${API_BASE_URL}/posts/${postId}/comments`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
}

export async function updateComment(
  postId: number,
  commentId: number,
  data: UpdateCommentRequest
): Promise<Comment> {
  const response = await axios.put<Comment>(
    `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
}

export async function deleteComment(
  postId: number,
  commentId: number
): Promise<{ detail: string }> {
  const response = await axios.delete(
    `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
}
