// src/components/CommunityDetailPage/CommentForm/MentionOption.tsx
interface MentionOptionProps {
  nickname: string;
  selected?: boolean;
}

export function MentionOption({ nickname, selected }: MentionOptionProps) {
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
