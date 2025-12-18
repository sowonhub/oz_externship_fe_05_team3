import { Button } from '@/components/ui/button';
import { Card } from '@/components/CommunityPage/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Pagination } from '@/components/ui/pagination';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { Pencil, SearchIcon } from 'lucide-react';
import { SearchSelect } from '@/components/CommunityPage/searchSelect';

function CommunityPage() {
  return (
    <div className="mx-auto flex max-w-[944px] flex-col gap-4">
      {/* 헤더 */}
      <h1 className="text-[32px] font-bold">커뮤니티</h1>
      <div className="flex items-center gap-4">
        <SearchSelect />
        <InputGroup className="h-[48px] w-[472px] rounded-full">
          <InputGroupInput className="text-[14px]" placeholder="질문검색" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Button variant="default" className="h-[48px] w-[120px] text-[16px]">
          <Pencil className="size-5" />
          글쓰기
        </Button>
      </div>
      {/* 내비게이션 */}
      <div>
        <NavigationMenu></NavigationMenu>
        <DropdownMenu></DropdownMenu>
      </div>
      {/* 카드 */}
      <hr className="w-full" />
      <div className="w-full">
        <Card />
      </div>
      {/* 페이지네이션 */}
      <hr className="w-full" />
      <div className="w-full">
        <Pagination className="w-full" />
      </div>
    </div>
  );
}

export default CommunityPage;
