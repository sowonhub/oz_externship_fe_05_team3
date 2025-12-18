import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SearchOption() {
  return (
    <Select>
      <SelectTrigger className="w-[120px] text-[16px]">
        <SelectValue placeholder="검색 유형" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="">
          <SelectLabel>검색 유형</SelectLabel>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="content">내용</SelectItem>
          <SelectItem value="author">작성자</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
