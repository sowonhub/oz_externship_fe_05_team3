import { Button } from '@/components/ui/button';
import { Card } from '@/components/communitypage/ListCard';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Pagination } from '@/components/ui/pagination';
import { NavigationMenu } from '@/components/communitypage/NavigationMenu';
import { Pencil, SearchIcon } from 'lucide-react';
import { SearchSelect } from '@/components/communitypage/SelectOption';
import { Link } from 'react-router-dom';

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
        <Link to="/community/write" className="">
          <Button variant="default" className="h-[48px] w-[120px] text-[16px]">
            <Pencil className="size-5" />
            글쓰기
          </Button>
        </Link>
      </div>
      {/* 내비게이션 */}
      <div>
        <NavigationMenu />
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
