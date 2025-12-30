import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CommunityCreatePage() {
  return (
    <div className="flex flex-col items-center px-10 lg:px-0">
      <div className="w-full max-w-[944px]">
        <h1 className="border-b-oz-gray-light mt-27 mb-10 border-b pb-5 text-3xl font-bold">
          커뮤니티 게시글 작성
        </h1>
        <div className="border-oz-gray-light round flex flex-col gap-5 rounded-[20px] border px-[38px] py-10">
          {/* TODOS: 커뮤니티 카테고리 default value 변경 */}
          <Select>
            <SelectTrigger variant="bordered" color="gray" className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {/* TODOS : 커뮤니티 카테고리 타입 분리 */}
              <SelectGroup className="w-full">
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input variant="title" placeholder="제목을 입력해주세요" />
        </div>
      </div>
    </div>
  );
}

export default CommunityCreatePage;
