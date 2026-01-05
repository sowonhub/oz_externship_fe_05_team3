import { useQuery } from '@tanstack/react-query';
import { communityPostsApi } from '@/api/post/services';

const usePostDetail = (postId: string | undefined) => {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => communityPostsApi.getCommunityPostDetail(postId!),
    enabled: !!postId,
  });

  return {
    post: postQuery.data,
    isLoading: postQuery.isLoading,
    isError: postQuery.isError,
    error: postQuery.error,
  };
};

export default usePostDetail;

