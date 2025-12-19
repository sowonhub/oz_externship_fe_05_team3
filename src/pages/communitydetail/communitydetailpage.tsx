// src/pages/communitydetail/communitydetailpage.tsx
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InputGroupCustom } from '@/components/ui/input-group-custom';
import { ThumbsUp } from 'lucide-react';

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

interface Post {
  id: string;
  category: string;
  title: string;
  content: string;
  author: {
    nickname: string;
    profileImageUrl: string;
  };
  views: number;
  likes: number;
  createdAt: string;
  comments: Comment[];
}

interface MentionOptionProps {
  nickname: string;
  selected?: boolean;
}

function MentionOption({ nickname, selected }: MentionOptionProps) {
  const base =
    'flex h-[24px] items-center rounded-[999px] border px-[10px] text-[12px] transition-colors cursor-pointer';
  const stateClass = selected
    ? 'border-[#6201E0] bg-[#F0E5FF] text-[#6201E0]'
    : 'border-[#E4E4E4] bg-white text-[#4D4D4D] hover:border-[#DAD0FF] hover:bg-[#F9F5FF]';

  return (
    <button type="button" className={`${base} ${stateClass}`}>
      @{nickname}
    </button>
  );
}

function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();

  // TODO: 실제 로그인/작성자 여부와 연결
  let variant: CommunityDetailVariant = 'author';

  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  // 댓글 삭제 모달 상태
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  // 무한스크롤 상태
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.1 });

  const post: Post = useMemo(
    () => ({
      id: id ?? '',
      category: '구인/협업',
      title: '러닝 메이트 함께해요.',
      content:
        'https://www.codeit.kr/costudy/join/684e26b75155062e46211e77\n\n함께 멈출해요',
      author: {
        nickname: '안지선',
        profileImageUrl: '',
      },
      views: 60,
      likes: 2,
      createdAt: '15시간 전',
      comments: [
        {
          id: 1,
          author: { nickname: '김소원', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 2,
          author: { nickname: '나원국', profileImageUrl: '' },
          content: '굿굿',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 3,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 4,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 5,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 6,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 7,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 8,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 9,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 10,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 11,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 12,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 13,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 14,
          author: { nickname: '김오즈', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        // 추후 API 연동 시 이 배열 대신 서버 데이터 사용
      ],
    }),
    [id]
  );

  // 초기 댓글 페이지 설정
  useEffect(() => {
    setVisibleComments(post.comments.slice(0, pageSize));
    setPage(1);
    setHasMore(post.comments.length > pageSize);
  }, [post.comments]);

  // inView 되면 다음 페이지 로딩
  useEffect(() => {
    if (!inView || isLoading || !hasMore) return;

    setIsLoading(true);

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize;
    const end = start + pageSize;
    const nextSlice = post.comments.slice(start, end);

    setVisibleComments((prev) => [...prev, ...nextSlice]);
    setPage(nextPage);
    setHasMore(end < post.comments.length);
    setIsLoading(false);
  }, [inView, isLoading, hasMore, page, post.comments]);

  const handleLikePost = () => {
    if (variant === 'guest') return;
    console.log('좋아요');
  };

  const handleSharePost = () => {
    console.log('공유하기');
  };

  const handleSubmitComment = () => {
    if (variant === 'guest') return;
    if (!commentText.trim()) return;
    console.log('댓글 등록:', commentText);
    setCommentText('');
    setIsMentionOpen(false);
  };

  const handleCommentChangeValue = (value: string) => {
    setCommentText(value);

    if (value.includes('@')) {
      setIsMentionOpen(true);
    } else {
      setIsMentionOpen(false);
    }
  };

  // 댓글 삭제 모달 핸들러
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
    console.log('댓글 삭제:', targetCommentId);
    setIsDeleteDialogOpen(false);
    setTargetCommentId(null);
  };

  const isCommentEmpty = commentText.trim().length === 0;

  return (
    <div className="flex justify-center bg-white pt-[112px] pb-[160px]">
      <main className="w-full max-w-[944px] px-[24px]">
        <section>
          {/* 상단: 카테고리 / 제목 / 메타 / 작성자 */}
          <header className="border-b border-[#ECECEC] pb-[32px]">
            <div className="mb-[12px] text-[13px] font-semibold text-[#6B21A8]">
              프론트엔드 · 프로그래밍 언어 · Python
            </div>

            <div className="flex items-start justify-between gap-[24px]">
              <div className="flex-1">
                <h1 className="mb-[16px] text-[28px] leading-[37px] font-bold text-[#121212]">
                  {post.title}
                </h1>
                <div className="flex items-center gap-[12px] text-[13px] text-[#9D9D9D]">
                  <span>조회수 {post.views}</span>
                  <span>좋아요 {post.likes}</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-[8px]">
                <Avatar className="h-[40px] w-[40px]">
                  <AvatarImage src={post.author.profileImageUrl} />
                  <AvatarFallback className="bg-[#F5ECFF] text-[14px] font-semibold text-[#6B21A8]">
                    {post.author.nickname[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-[13px] font-semibold text-[#121212]">
                    {post.author.nickname}
                  </span>
                  {variant === 'author' && (
                    <div className="flex items-center gap-[4px] text-[12px] text-[#6B21A8]">
                      <button type="button" className="hover:underline">
                        수정
                      </button>
                      <span className="text-[#CCCCCC]">|</span>
                      <button type="button" className="hover:underline">
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* 본문 + 좋아요/공유하기 */}
          <section className="border-b border-[#ECECEC] pt-[32px] pb-[32px]">
            <div className="mb-[32px]">
              <p className="text-[14px] leading-[22px] break-words whitespace-pre-wrap text-[#4D4D4D]">
                {post.content}
              </p>
            </div>

            <div className="flex justify-end gap-[8px]">
              {/* 좋아요 버튼 (아이콘 보라색, hover 디자인 반영) */}
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
                <span className="leading-[16px]">{post.likes}</span>
              </Button>

              {/* 공유하기 버튼 (디자인 가이드 반영) */}
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

          {/* 개인정보 안내 + 댓글 입력 */}
          <section className="border-b border-[#ECECEC] pt-[40px] pb-[32px]">
            <div className="mb-[20px] rounded-[12px] border border-[#F0F0F0] bg-[#FAFAFA] px-[20px] py-[14px] text-[12px] leading-[18px] text-[#9D9D9D]">
              개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보
              유포시 모니터링 후 삭제될 수 있습니다.
            </div>

            <div className="relative">
              <InputGroupCustom
                value={commentText}
                disabled={variant === 'guest'}
                placeholder={
                  variant === 'guest'
                    ? '댓글을 작성하려면 로그인이 필요합니다.'
                    : '따뜻함을 글로 남겨주세요. @닉네임으로 유저를 태그할 수 있습니다.'
                }
                onChange={handleCommentChangeValue}
                onSubmit={handleSubmitComment}
              />

              {/* 멘션 모달 */}
              {isMentionOpen && variant !== 'guest' && (
                <div className="absolute top-[128px] left-0 z-10 mt-[8px] w-[280px] rounded-[16px] border border-[#ECECEC] bg-white p-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                  <div className="mb-[8px] text-[12px] font-medium text-[#121212]">
                    유저 선택
                  </div>
                  <div className="flex max-h-[160px] flex-wrap gap-[8px] overflow-y-auto">
                    <MentionOption nickname="jnubugo" selected />
                    <MentionOption nickname="name2" />
                    <MentionOption nickname="anotherUser" />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 댓글 목록 + 정렬 버튼 */}
          <section className="pt-[32px]">
            <header className="mb-[20px] flex items-center justify-between">
              <div className="flex items-center gap-[6px] text-[14px] font-semibold text-[#121212]">
                <span className="text-[18px]">💬</span>
                <span>댓글 {post.comments.length}개</span>
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
              {visibleComments.map((comment, index) => {
                const isLast = index === visibleComments.length - 1;

                return (
                  <div
                    key={comment.id}
                    className="flex items-start gap-[12px] border-b border-[#F7F7F7] py-[16px] last:border-b-0"
                  >
                    <Avatar className="h-[40px] w-[40px] shrink-0">
                      <AvatarImage src={comment.author.profileImageUrl} />
                      <AvatarFallback className="bg-[#F5ECFF] text-[14px] font-semibold text-[#6B21A8]">
                        {comment.author.nickname[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-[6px] flex items-center gap-[8px]">
                        <span className="text-[13px] font-semibold text-[#121212]">
                          {comment.author.nickname}
                        </span>
                        <span className="text-[11px] text-[#BDBDBD]">
                          {comment.createdAt}
                        </span>
                        {variant === 'author' && (
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteDialog(comment.id)}
                            className="text-[11px] text-[#BDBDBD] hover:text-[#6201E0] hover:underline"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                      <p className="text-[13px] leading-[20px] text-[#4D4D4D]">
                        {comment.content}
                      </p>

                      {/* 마지막 댓글 카드 아래에 로딩/감시용 div */}
                      {isLast && (
                        <div className="mt-[8px] h-[24px]" ref={loadMoreRef}>
                          {isLoading && (
                            <span className="text-[12px] text-[#BDBDBD]">
                              불러오는 중...
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {!hasMore && visibleComments.length > 0 && (
                <div className="py-[12px] text-center text-[12px] text-[#C4C4C4]">
                  더 이상 댓글이 없습니다.
                </div>
              )}
            </div>
          </section>
        </section>
      </main>

      {/* 댓글 삭제 확인 모달 */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-[428px] rounded-[16px] bg-white px-[24px] py-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
            <p className="mb-[20px] text-[14px] text-[#121212]">
              댓글을 삭제하시겠습니까?
            </p>
            <div className="flex justify-end gap-[8px]">
              <Button
                type="button"
                onClick={handleCancelDeleteComment}
                className="h-[38px] rounded-[999px] border border-[#E4E4E4] bg-white px-[20px] text-[13px] font-medium text-[#707070] shadow-none hover:bg-[#F7F7F7]"
              >
                취소
              </Button>
              <Button
                type="button"
                onClick={handleConfirmDeleteComment}
                className="h-[38px] rounded-[999px] bg-[#6201E0] px-[20px] text-[13px] font-semibold text-white shadow-none hover:bg-[#5201C0]"
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityDetailPage;
