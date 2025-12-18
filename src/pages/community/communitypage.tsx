import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';

function CommunityPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>커뮤니티</h1>
      <div className="flex items-center gap-4">
        <DropdownMenu></DropdownMenu>
        <Input placeholder="질문검색" />
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
