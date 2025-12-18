import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Pagination } from '@/components/ui/pagination';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { SearchIcon } from 'lucide-react';

function CommunityPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[32px] font-bold">커뮤니티</h1>
      <div className="flex items-center gap-4">
        <DropdownMenu></DropdownMenu>
        <InputGroup className="h-[48px] w-[472px] rounded-full">
          <InputGroupInput className="text-[14px]" placeholder="질문검색" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Button>글쓰기</Button>
      </div>
      <div>
        <NavigationMenu></NavigationMenu>
        <DropdownMenu></DropdownMenu>
      </div>
      <hr />
      <div>
        <Card />
      </div>
      <hr />
      <Pagination />
    </div>
  );
}

export default CommunityPage;
