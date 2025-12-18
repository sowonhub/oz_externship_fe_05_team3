import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SearchButton() {
  return (
    <Link to="/community/create" className="">
      <Button variant="default" className="h-[48px] w-[120px] text-[16px]">
        <Pencil className="size-5" />
        글쓰기
      </Button>
    </Link>
  );
}
