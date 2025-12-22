import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '@/api/commentapi';
import type { CreateCommentRequest, UpdateCommentRequest } from '@/types/api';

export const useComments = (postId: number) => {
  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: number;
      data: UpdateCommentRequest;
    }) => updateComment(postId, commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return {
    comments: commentsQuery.data?.results || [],
    commentsCount: commentsQuery.data?.count || 0,
    isLoading: commentsQuery.isLoading,
    isError: commentsQuery.isError,
    createComment: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateComment: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteComment: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
