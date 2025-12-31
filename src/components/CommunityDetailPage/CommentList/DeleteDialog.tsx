// src/components/CommunityDetailPage/CommentList/DeleteDialog.tsx
import { Button } from '@/components/ui/button';

interface DeleteDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteDialog({
  isOpen,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[428px] rounded-[16px] bg-white px-[24px] py-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
        <p className="mb-[20px] text-[14px] text-[#121212]">
          댓글을 삭제하시겠습니까?
        </p>
        <div className="flex justify-end gap-[8px]">
          <Button
            type="button"
            onClick={onCancel}
            className="h-[38px] rounded-[999px] border border-[#E4E4E4] bg-white px-[20px] text-[13px] font-medium text-[#707070] shadow-none hover:bg-[#F7F7F7]"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-[38px] rounded-[999px] bg-[#6201E0] px-[20px] text-[13px] font-semibold text-white shadow-none hover:bg-[#5201C0] disabled:bg-[#E0E0E0]"
          >
            {isDeleting ? '삭제 중...' : '확인'}
          </Button>
        </div>
      </div>
    </div>
  );
}
