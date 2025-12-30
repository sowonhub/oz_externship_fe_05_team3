import { COMMUNITY_CATEGORIES } from '@/components/editor/model/communityCategory';
import EditorHeader from '@/components/editor/ui/EditorHeader';
import TipTap from '@/components/editor/ui/TipTap';
import ToolBar from '@/components/editor/ui/ToolBarBtn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTextEditor } from '@/hooks/tiptap';
import { useState } from 'react';

function CommunityCreatePage() {
  // const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [content, setContent] = useState('');

  const editor = useTextEditor({
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  console.log(categoryId, content);
  return (
    <div className="flex flex-col items-center px-10 lg:px-0">
      <div className="w-full max-w-[944px]">
        <EditorHeader />
        <div className="border-oz-gray-light round flex flex-col gap-5 rounded-[20px] border px-[38px] py-10">
          {/* TODOS: 커뮤니티 카테고리 default value 변경 */}
          <Select>
            <SelectTrigger variant="bordered" color="gray" className="w-full">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {/* TODOS : 커뮤니티 카테고리 타입 분리 */}
              <SelectGroup className="w-full">
                {COMMUNITY_CATEGORIES.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={String(category.id)}
                    onSelect={() => setCategoryId(category.id)}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* TODOS : 제목 입력 필드 상태 관리 */}
          <Input variant="title" placeholder="제목을 입력해주세요" />
        </div>
        <div className="border-oz-gray-light h-full overflow-hidden rounded-[20px] border">
          <ToolBar editor={editor} />
          <TipTap editor={editor} />
        </div>
        <div className="flex justify-end">
          <Button>등록하기</Button>
        </div>
      </div>
    </div>
  );
}

export default CommunityCreatePage;
