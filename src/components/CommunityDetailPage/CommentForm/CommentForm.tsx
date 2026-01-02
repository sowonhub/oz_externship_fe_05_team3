// src/components/CommunityDetailPage/CommentForm/CommentForm.tsx
import { useState } from 'react';
import { InputGroupCustom } from '@/components/ui/input-group-custom';
import { MentionOption } from './MentionOption';

interface CommentFormProps {
  disabled: boolean;
  isCreating: boolean;
  placeholder: string;
  onSubmit: (content: string) => void;
}

export function CommentForm({
  disabled,
  isCreating,
  placeholder,
  onSubmit,
}: CommentFormProps) {
  const [commentText, setCommentText] = useState('');
  const [isMentionOpen, setIsMentionOpen] = useState(false);

  const handleChangeValue = (value: string) => {
    setCommentText(value);

    if (value.includes('@')) {
      setIsMentionOpen(true);
    } else {
      setIsMentionOpen(false);
    }
  };

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText('');
    setIsMentionOpen(false);
  };

  return (
    <div className="relative">
      <InputGroupCustom
        value={commentText}
        disabled={disabled || isCreating}
        placeholder={placeholder}
        onChange={handleChangeValue}
        onSubmit={handleSubmit}
      />

      {isMentionOpen && !disabled && (
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
  );
}
