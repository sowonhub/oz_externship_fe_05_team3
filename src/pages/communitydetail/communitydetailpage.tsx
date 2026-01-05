// src/pages/communitydetail/communitydetailpage.tsx
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Avatar, AvatarFallback, AvatarImage } from '@/lib/index';
import { ThumbsUp, Loader2 } from 'lucide-react';

import { CommentForm } from '@/components/CommunityDetailPage/CommentForm/CommentForm';
import { CommentList } from '@/components/CommunityDetailPage/CommentList/CommentList';
import { DeleteDialog } from '@/components/CommunityDetailPage/CommentList/DeleteDialog';

import { useComments } from '@/hooks/usecomments';
import usePostDetail from '@/hooks/usePostDetail';
import { formatDate } from '@/utils/index';
import linkIcon from '@/assets/icon/feathericons/link.png';

type CommunityDetailVariant = 'guest' | 'member' | 'author';

interface Comment {
  id: number;
  author: {
    nickname: string;
    profileImageUrl: string;
  };
  content: string;
  createdAt: string;
}


// 타입 어댑터 함수
function adaptApiCommentToUiComment(apiComment: any): Comment {
  return {
    id: apiComment.id,
    author: {
      nickname: apiComment.author.nickname,
      profileImageUrl: apiComment.author.profile_img_url,
    },
    content: apiComment.content,
    createdAt: formatDate(apiComment.created_at),
  };
}

function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();

  // 게시글 상세 API 훅 호출
  const {
    post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = usePostDetail(id);

  // 댓글 API 훅 호출
  const {
    comments: apiComments,
    createComment,
    isCreating,
    updateComment,
    isUpdating,
    deleteComment,
    isDeleting,
  } = useComments(Number(id));

  // API 데이터를 UI용으로 변환
  const convertedComments: Comment[] = useMemo(
    () => apiComments.map(adaptApiCommentToUiComment),
    [apiComments]
  );

  const [variant] = useState<CommunityDetailVariant>('author');

  // 댓글 삭제 모달 상태
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  // 댓글 수정 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  // 무한스크롤 상태 (5개씩 로딩)
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [displayedComments, setDisplayedComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  // 초기 댓글 페이지 설정
  useEffect(() => {
    setDisplayedComments(convertedComments.slice(0, pageSize));
    setPage(1);
    setHasMore(convertedComments.length > pageSize);
  }, [convertedComments]);

  // 무한스크롤 로드 더보기
  const handleLoadMore = () => {
    setIsLoadingMore(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const start = (nextPage - 1) * pageSize;
      const end = start + pageSize;
      const nextSlice = convertedComments.slice(start, end);

      setDisplayedComments((prev) => [...prev, ...nextSlice]);
      setPage(nextPage);
      setHasMore(end < convertedComments.length);

      setIsLoadingMore(false);
    }, 500);
  };

  const handleLikePost = () => {
    if (variant === 'guest') return;
  };

  const handleSharePost = () => {};

  const handleSubmitComment = (content: string) => {
    if (variant === 'guest') return;
    createComment({ content });
  };

  const handleOpenDeleteDialog = (commentId: number) => {
    setTargetCommentId(commentId);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDeleteComment = () => {
    setIsDeleteDialogOpen(false);
    setTargetCommentId(null);
  };

  const handleConfirmDeleteComment = () => {
    if (targetCommentId == null) return;

    deleteComment(targetCommentId);
    setIsDeleteDialogOpen(false);
    setTargetCommentId(null);
  };

  // 댓글 수정 핸들러
  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleSaveEdit = () => {
    if (!editingContent.trim() || editingCommentId === null) return;

    updateComment({
      commentId: editingCommentId,
      data: { content: editingContent },
    });

    setEditingCommentId(null);
    setEditingContent('');
  };

  // 로딩 상태
  if (isPostLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#6B21A8]" />
      </div>
    );
  }

  // 에러 상태
  if (isPostError || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <p className="text-[16px] text-[#9D9D9D]">
          게시글을 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-white pt-[112px] pb-[160px]">
      <main className="w-full max-w-[944px] px-[24px]">
        <section>
          <header className="border-b border-[#ECECEC] pb-[32px]">
            <div className="mb-[12px] text-[13px] font-semibold text-[#6B21A8]">
              {post.category.name}
            </div>

            <div className="mb-[16px] flex items-start justify-between gap-[24px]">
              <h1 className="flex-1 text-[28px] leading-[37px] font-bold text-[#121212]">
                {post.title}
              </h1>

              <div className="flex shrink-0 items-center gap-[8px]">
                <Avatar className="h-[40px] w-[40px]">
                  <AvatarImage src={post.author.profile_image_url} />
                  <AvatarFallback className="bg-[#F5ECFF] text-[14px] font-semibold text-[#6B21A8]">
                    {post.author.nickname}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[13px] font-semibold text-[#121212]">
                  {post.author.nickname}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px] text-[13px] text-[#9D9D9D]">
                <span>조회수 {post.view_count}</span>
                <span>좋아요 {post.like_count}</span>
                <span>{formatDate(post.created_at)}</span>
              </div>

              {variant === 'author' && (
                <div className="flex items-center gap-[4px] text-[12px]">
                  <button
                    type="button"
                    className="text-[#6B21A8] hover:text-[#5201C0] hover:underline"
                  >
                    수정
                  </button>
                  <span className="text-[#CCCCCC]">|</span>
                  <button
                    type="button"
                    className="text-[#9D9D9D] hover:text-[#707070] hover:underline"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </header>

          <section className="border-b border-[#ECECEC] pt-[32px] pb-[32px]">
            <div className="mb-[32px]">
              <p className="text-[14px] leading-[22px] break-words whitespace-pre-wrap text-[#4D4D4D]">
                {post.content}
              </p>
            </div>

            <div className="flex justify-end gap-[8px]">
              <Button
                type="button"
                onClick={handleLikePost}
                disabled={variant === 'guest'}
                className={`flex h-[38px] items-center justify-center gap-[6px] rounded-[999px] border px-[16px] text-[13px] font-medium shadow-none transition-colors ${
                  variant === 'guest'
                    ? 'cursor-not-allowed border-[#E0E0E0] bg-[#F5F5F5] text-[#BDBDBD]'
                    : 'border-[#6201E0] bg-white text-[#6201E0] hover:bg-[#F9F5FF]'
                }`}
              >
                <ThumbsUp className="h-[16px] w-[16px]" />
                <span className="leading-[16px]">{post.like_count}</span>
              </Button>

              <Button
                type="button"
                onClick={handleSharePost}
                className="flex h-[38px] items-center justify-center gap-[6px] rounded-[999px] border border-[#E0E0E0] bg-white px-[16px] text-[13px] font-medium text-[#A3A3A3] shadow-none transition-colors hover:bg-[#F2F2F2]"
              >
                <img
                  src={linkIcon}
                  alt="공유하기"
                  className="h-[16px] w-[16px] shrink-0"
                />
                <span className="leading-[16px]">공유하기</span>
              </Button>
            </div>
          </section>

          <section className="border-b border-[#ECECEC] pt-[40px] pb-[32px]">
            <div className="mb-[20px] rounded-[12px] border border-[#F0F0F0] bg-[#FAFAFA] px-[20px] py-[14px] text-[12px] leading-[18px] text-[#9D9D9D]">
              개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보
              유포시 모니터링 후 삭제될 수 있습니다.
            </div>

            <CommentForm
              disabled={variant === 'guest'}
              isCreating={isCreating}
              placeholder={
                variant === 'guest'
                  ? '댓글을 작성하려면 로그인이 필요합니다.'
                  : '따뜻함을 글로 남겨주세요. @닉네임으로 유저를 태그할 수 있습니다.'
              }
              onSubmit={handleSubmitComment}
            />
          </section>

          <section className="pt-[32px]">
            <header className="mb-[20px] flex items-center justify-between">
              <div className="flex items-center gap-[6px] text-[14px] font-semibold text-[#121212]">
                <span className="text-[18px]">💬</span>
                <span>댓글 {convertedComments.length}개</span>
              </div>
              <button
                type="button"
                className="flex h-[40px] items-center justify-center gap-[6px] rounded-[999px] border border-[#ECECEC] bg-white px-[16px] text-[13px] font-medium text-[#707070] shadow-none transition-colors hover:border-[#DAD0FF] hover:bg-[#FAFAFA]"
              >
                <span>최신순</span>
                <span className="text-[12px]">↕</span>
              </button>
            </header>

            <div>
              <CommentList
                comments={displayedComments}
                variant={variant}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                onLoadMore={handleLoadMore}
                onEdit={handleStartEdit}
                onDelete={handleOpenDeleteDialog}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                editingCommentId={editingCommentId}
                editingContent={editingContent}
                onEditingContentChange={setEditingContent}
              />
            </div>
          </section>
        </section>
      </main>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        onCancel={handleCancelDeleteComment}
        onConfirm={handleConfirmDeleteComment}
      />
    </div>
  );
}

export default CommunityDetailPage;
