// src/pages/communitydetail/communitydetailpage.tsx
import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';

import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  InputGroupCustom,
} from '@/lib/index';
import { ThumbsUp } from 'lucide-react';

import { useComments } from '@/hooks/usecomments';
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

  // API 훅 호출
  const {
    comments: apiComments,
    // commentsCount,
    // isLoading: isApiLoading,
    createComment,
    isCreating,
    deleteComment,
    isDeleting,
  } = useComments(Number(id));

  // API 데이터를 UI용으로 변환
  const convertedComments: Comment[] = useMemo(
    () => apiComments.map(adaptApiCommentToUiComment),
    [apiComments]
  );

  const [variant] = useState<CommunityDetailVariant>('author');

  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  // 댓글 삭제 모달 상태
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  // 무한스크롤 상태 (5개씩 로딩)
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.1 });

  // 무한스크롤 로딩 상태 관리용 ref
  const loadingRef = useRef(false);

  // 테스트용 더미 댓글 50개
  const dummyComments: Comment[] = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        author: {
          nickname: ['안지선', '김소원', '나원국'][i % 3],
          profileImageUrl: '',
        },
        content: [
          '정말 좋은 글이네요! 저도 함께하고 싶어요 👍',
          '러닝 메이트 구하시는군요. 언제 시작하시나요?',
          '좋은 취지네요! 응원합니다 🔥',
          '저도 관심 있어요! 연락 주세요',
          '멋진 프로젝트네요. 화이팅!',
          '같이 하면 좋을 것 같아요',
          '좋은 기회인 것 같네요 ㅎㅎ',
          '저도 참여하고 싶습니다!',
          '언제 어디서 모이나요?',
          '궁금한게 있는데 DM 가능할까요?',
          '이런 모임 기다렸어요!',
          '주말에 시간 되시나요?',
          '저도 러닝 시작하려던 참이었어요',
          '함께하면 더 재밌을 것 같네요!',
          '정보 공유 감사합니다 🙏',
        ][i % 15],
        createdAt: `${i + 1}시간 전`,
      })),
    []
  );

  // post 객체 생성
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
      // API 데이터가 있으면 API, 없으면 더미 사용
      comments:
        convertedComments.length > 0 ? convertedComments : dummyComments,
    }),
    [id, convertedComments, dummyComments]
  );

  // 초기 댓글 페이지 설정
  useEffect(() => {
    setVisibleComments(post.comments.slice(0, pageSize));
    setPage(1);
    setHasMore(post.comments.length > pageSize);
  }, [post.comments]);

  // inView 되면 다음 페이지 로딩 (로딩 인디케이터 개선)
  useEffect(() => {
    if (!inView || loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setIsLoadingMore(true);

    // 로딩 효과를 위한 딜레이
    setTimeout(() => {
      const nextPage = page + 1;
      const start = (nextPage - 1) * pageSize;
      const end = start + pageSize;
      const nextSlice = post.comments.slice(start, end);

      setVisibleComments((prev) => [...prev, ...nextSlice]);
      setPage(nextPage);
      setHasMore(end < post.comments.length);

      setIsLoadingMore(false);
      loadingRef.current = false;
    }, 500);
  }, [inView, hasMore, page, post.comments]);

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

    createComment(
      { content: commentText },
      {
        onSuccess: () => {
          setCommentText('');
          setIsMentionOpen(false);
        },
      }
    );
  };

  const handleCommentChangeValue = (value: string) => {
    setCommentText(value);

    if (value.includes('@')) {
      setIsMentionOpen(true);
    } else {
      setIsMentionOpen(false);
    }
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

    deleteComment(targetCommentId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setTargetCommentId(null);
      },
    });
  };

  return (
    <div className="flex justify-center bg-white pt-[112px] pb-[160px]">
      <main className="w-full max-w-[944px] px-[24px]">
        <section>
          {/* 상단: 카테고리 / 제목 / 메타 / 작성자 */}
          <header className="border-b border-[#ECECEC] pb-[32px]">
            {/* 라인1: 카테고리 */}
            <div className="mb-[12px] text-[13px] font-semibold text-[#6B21A8]">
              구인 / 협업
            </div>

            {/* 라인2: 제목(왼쪽) + 프로필+닉네임*/}
            <div className="mb-[16px] flex items-start justify-between gap-[24px]">
              <h1 className="flex-1 text-[28px] leading-[37px] font-bold text-[#121212]">
                {post.title}
              </h1>

              <div className="flex shrink-0 items-center gap-[8px]">
                <Avatar className="h-[40px] w-[40px]">
                  <AvatarImage src={post.author.profileImageUrl} />
                  <AvatarFallback className="bg-[#F5ECFF] text-[14px] font-semibold text-[#6B21A8]">
                    {post.author.nickname[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[13px] font-semibold text-[#121212]">
                  {post.author.nickname}
                </span>
              </div>
            </div>

            {/* 라인3: 메타정보(왼쪽) + 수정/삭제(오른쪽) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px] text-[13px] text-[#9D9D9D]">
                <span>조회수 {post.views}</span>
                <span>좋아요 {post.likes}</span>
                <span>{post.createdAt}</span>
              </div>

              {variant === 'author' && (
                <div className="flex items-center gap-[4px] text-[12px]">
                  <span className="text-[#CCCCCC]"></span>
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

          {/* 본문 + 좋아요/공유하기 */}
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
                <span className="leading-[16px]">{post.likes}</span>
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

          {/* 개인정보 안내 + 댓글 입력 */}
          <section className="border-b border-[#ECECEC] pt-[40px] pb-[32px]">
            <div className="mb-[20px] rounded-[12px] border border-[#F0F0F0] bg-[#FAFAFA] px-[20px] py-[14px] text-[12px] leading-[18px] text-[#9D9D9D]">
              개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보
              유포시 모니터링 후 삭제될 수 있습니다.
            </div>

            <div className="relative">
              <InputGroupCustom
                value={commentText}
                disabled={variant === 'guest' || isCreating}
                placeholder={
                  variant === 'guest'
                    ? '댓글을 작성하려면 로그인이 필요합니다.'
                    : '따뜻함을 글로 남겨주세요. @닉네임으로 유저를 태그할 수 있습니다.'
                }
                onChange={handleCommentChangeValue}
                onSubmit={handleSubmitComment}
              />

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
              {visibleComments.map((comment) => (
                <div
                  key={comment.id}
                  className="animate-fadeIn flex items-start gap-[12px] border-b border-[#F7F7F7] py-[16px] last:border-b-0"
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
                          disabled={isDeleting}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <p className="text-[13px] leading-[20px] text-[#4D4D4D]">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* 로딩 인디케이터 */}
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

              {!hasMore && visibleComments.length > 0 && (
                <div className="py-[24px] text-center">
                  <div className="inline-flex items-center gap-[8px] rounded-[999px] bg-[#F7F7F7] px-[16px] py-[8px]">
                    <span className="text-[13px] text-[#9D9D9D]">
                      모든 댓글을 확인했습니다
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>

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
                disabled={isDeleting}
                className="h-[38px] rounded-[999px] bg-[#6201E0] px-[20px] text-[13px] font-semibold text-white shadow-none hover:bg-[#5201C0] disabled:bg-[#E0E0E0]"
              >
                {isDeleting ? '삭제 중...' : '확인'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityDetailPage;
