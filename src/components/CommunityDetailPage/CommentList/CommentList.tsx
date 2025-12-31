// src/components/CommunityDetailPage/CommentList/CommentList.tsx
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { CommentItem } from './CommentItem';
import { EmptyComment } from './EmptyComment';

interface Comment {
  id: number;
  author: {
    nickname: string;
    profileImageUrl: string;
  };
  content: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
  variant: 'guest' | 'member' | 'author';
  isUpdating: boolean;
  isDeleting: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: number) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  editingCommentId: number | null;
  editingContent: string;
  onEditingContentChange: (content: string) => void;
}

export function CommentList({
  comments,
  variant,
  isUpdating,
  isDeleting,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  editingCommentId,
  editingContent,
  onEditingContentChange,
}: CommentListProps) {
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.1 });
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!inView || loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    onLoadMore();

    setTimeout(() => {
      loadingRef.current = false;
    }, 500);
  }, [inView, hasMore, onLoadMore]);

  if (comments.length === 0) {
    return <EmptyComment />;
  }

  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          variant={variant}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onEdit={onEdit}
          onDelete={onDelete}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          editingCommentId={editingCommentId}
          editingContent={editingContent}
          onEditingContentChange={onEditingContentChange}
        />
      ))}

      {hasMore && (
        <div
          ref={loadMoreRef}
          className="flex items-center justify-center py-[24px]"
        >
          {isLoadingMore ? (
            <div className="flex flex-col items-center gap-[12px]">
              <div className="h-[32px] w-[32px] animate-spin rounded-full border-4 border-[#F0E5FF] border-t-[#6201E0]" />
              <span className="text-[13px] font-medium text-[#6201E0]">
                댓글을 불러오는 중...
              </span>
            </div>
          ) : (
            <span className="text-[13px] text-[#BDBDBD]">
              스크롤하여 더보기
            </span>
          )}
        </div>
      )}

      {!hasMore && comments.length > 0 && (
        <div className="py-[24px] text-center">
          <div className="inline-flex items-center gap-[8px] rounded-[999px] bg-[#F7F7F7] px-[16px] py-[8px]">
            <span className="text-[13px] text-[#9D9D9D]">
              모든 댓글을 확인했습니다
            </span>
          </div>
        </div>
      )}
    </>
  );
}
