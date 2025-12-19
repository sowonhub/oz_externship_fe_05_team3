// src/pages/communitydetail/communitydetailpage.tsx
import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import thumbsUpIcon from '@/assets/icon/feathericons/thumbs-up@2x.png';
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
          author: { nickname: 'jnubugo', profileImageUrl: '' },
          content: '좋아요',
          createdAt: '2025년 6월 13일',
        },
        {
          id: 2,
          author: { nickname: 'name2', profileImageUrl: '' },
          content: '굿굿',
          createdAt: '2025년 6월 13일',
        },
      ],
    }),
    [id]
  );

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

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentText(value);

    if (value.includes('@')) {
      setIsMentionOpen(true);
    } else {
      setIsMentionOpen(false);
    }
  };

  const isCommentEmpty = commentText.trim().length === 0;
  const isRegisterDisabled = variant === 'guest' || isCommentEmpty;

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
              {/* 좋아요 Button - Figma 가이드: enabled 시 연회색 테두리 + 회색 텍스트  */}
              <Button
                type="button"
                onClick={handleLikePost}
                disabled={variant === 'guest'}
                className={`flex h-[38px] items-center justify-center gap-[6px] rounded-[999px] border px-[12px] text-[13px] font-medium shadow-none transition-colors ${
                  variant === 'guest'
                    ? 'cursor-not-allowed border-[#CECECE] bg-white text-[#BDBDBD]'
                    : 'border-[#CECECE] bg-white text-[#6201E0] hover:bg-[#F9F5FF]'
                }`}
              >
                <img
                  src={thumbsUpIcon}
                  alt="좋아요"
                  className="h-[16px] w-[16px] shrink-0"
                />
                <span className="leading-[16px]">{post.likes}</span>
              </Button>

              {/* 공유하기 Button - Figma 가이드: 연회색 테두리 + 회색 텍스트 */}
              <Button
                type="button"
                onClick={handleSharePost}
                className="flex h-[38px] items-center justify-center gap-[6px] rounded-[999px] border border-[#CECECE] bg-white px-[16px] text-[13px] font-medium text-[#707070] shadow-none transition-colors hover:bg-[#F9F5FF]"
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
              <div className="flex h-[80px] items-center gap-[16px] rounded-[16px] border border-[#F1E4FF] bg-white px-[24px]">
                <textarea
                  className="h-full flex-1 resize-none bg-transparent text-[13px] leading-[20px] text-[#121212] placeholder:text-[#CCCCCC] focus:outline-none"
                  placeholder={
                    variant === 'guest'
                      ? '댓글을 작성하려면 로그인이 필요합니다.'
                      : '따뜻함을 글로 남겨주세요. @닉네임으로 유저를 태그할 수 있습니다.'
                  }
                  disabled={variant === 'guest'}
                  value={commentText}
                  onChange={handleCommentChange}
                />
                {/* 등록 Button - Figma 가이드: disabled 회색, enabled 보라 */}
                <Button
                  type="button"
                  onClick={handleSubmitComment}
                  disabled={isRegisterDisabled}
                  className={`h-[40px] shrink-0 rounded-[999px] px-[20px] text-[13px] font-semibold shadow-none transition-colors ${
                    isRegisterDisabled
                      ? 'cursor-not-allowed border border-[#E8E8E8] bg-[#F7F7F7] text-[#CECECE]'
                      : 'border border-[#6201E0] bg-white text-[#6201E0] hover:bg-[#F9F5FF]'
                  }`}
                >
                  등록
                </Button>
              </div>

              {/* 댓글 언급 모달 */}
              {isMentionOpen && variant !== 'guest' && (
                <div className="absolute top-[88px] left-[24px] z-10 mt-[8px] w-[280px] rounded-[16px] border border-[#ECECEC] bg-white p-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                  <div className="mb-[8px] text-[12px] font-medium text-[#121212]">
                    유저 선택
                  </div>
                  <div className="flex flex-wrap gap-[8px]">
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
              {/* 정렬 버튼 - Figma 가이드 참고 */}
              <button
                type="button"
                className="flex h-[40px] items-center justify-center gap-[6px] rounded-[999px] border border-[#ECECEC] bg-white px-[16px] text-[13px] font-medium text-[#707070] shadow-none transition-colors hover:border-[#DAD0FF] hover:bg-[#FAFAFA]"
              >
                <span>최신순</span>
                <span className="text-[12px]">↕</span>
              </button>
            </header>

            <div>
              {post.comments.map((comment) => (
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
                          className="text-[11px] text-[#BDBDBD] hover:text-[#6201E0] hover:underline"
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
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default CommunityDetailPage;
