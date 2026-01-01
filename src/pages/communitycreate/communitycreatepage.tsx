import { communityQueries } from '@/components/editor/api/queries';
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
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';

type Mode = 'create' | 'edit';

function CommunityCreatePage({ mode }: { mode: Mode }) {
  // 수정일 때만 게시글 조회
  const { id } = useParams<{ id: string }>();
  const isEdit = mode === 'edit';

  // const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [content, setContent] = useState('');

  // 카테고리 목록 조회
  const { data: categories } = useQuery(communityQueries.getCategories());
  const categoriesList = categories?.results ?? [];
  const editor = useTextEditor({
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // edit 모드일 때 기존 게시글 데이터 조회
  const { data: postDetail } = useQuery(
    communityQueries.getCommunityDetail({ id: Number(id), enabled: isEdit })
  );

  console.log(categoryId, content);
  return (
    <div className="flex flex-col items-center px-10 lg:px-0">
      <div className="w-full max-w-[944px]">
        <EditorHeader />
        <div className="border-oz-gray-light round flex flex-col gap-5 rounded-[20px] border px-[38px] py-10">
          {/* TODOS: 커뮤니티 카테고리 default value 변경 */}
          <Select
            value={categoryId ? String(categoryId) : undefined}
            onValueChange={(value) => setCategoryId(Number(value))}
          >
            <SelectTrigger variant="bordered" color="gray" className="w-full">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {/* TODOS : 커뮤니티 카테고리 타입 분리 */}
              <SelectGroup className="w-full">
                {categoriesList.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={String(category.id)}
                    onSelect={() => setCategoryId(category.id)}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* TODOS : 제목 입력 필드 상태 관리 */}
          <Input variant="title" placeholder="제목을 입력해주세요" />
        </div>
        <div className="border-oz-gray-light my-5 h-full overflow-hidden rounded-[20px] border">
          <ToolBar editor={editor} />
          <TipTap editor={editor} />
        </div>
        <Button className="ml-auto">등록하기</Button>
      </div>
    </div>
  );
}

export default CommunityCreatePage;
