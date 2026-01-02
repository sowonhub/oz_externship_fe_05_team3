// src/components/CommunityDetailPage/CommentList/EmptyComment.tsx
export function EmptyComment() {
  return (
    <div className="flex flex-col items-center justify-center py-[80px]">
      <div className="mb-[16px] text-[48px]">💬</div>
      <p className="text-[14px] text-[#9D9D9D]">
        아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
      </p>
    </div>
  );
}
