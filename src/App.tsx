import '@/App.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './components/ui/dialog';
import { DialogClose } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { InputGroupCustom } from './components/ui/inputwithButton';
// import { ExternalLinkIcon } from 'lucide-react'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { ThumbsUp } from 'lucide-react';
import { DeleteDialog } from './components/ui/deletedialog';

function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1>커뮤니티 프로젝트 베이스</h1>
      <p>여기서부터 비회원 / 회원 / 작성자 플로우</p>

      {/* 댓글창 */}
      <InputGroupCustom />

      {/* 삭제 */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="px-[12px] py-[10px] text-[12px] outline-none"
          >
            삭제
          </Button>
        </DialogTrigger>
        <DeleteDialog />
      </Dialog>

      {/* 카드 */}
      <div className="flex h-[216px] w-[944px] flex-col gap-4">
        <Item
          className="h-full w-full items-start justify-start"
          variant="default"
          asChild
        >
          <a href="" target="_blank" rel="noopener noreferrer">
            <ItemContent>
              <div className="flex flex-col gap-2">
                <ItemDescription>예시 카테고리</ItemDescription>
                <ItemTitle className="text-[18px]">예시 게시글 제목</ItemTitle>
                <ItemDescription>
                  예시 게시글 내용 예시 게시글 내용 예시 게시글 내용 예시 게시글
                  내용 예시 게시글 내용 예시 게시글 내용 예시 게시글 내용 예시
                  게시글 내용 예시 게시글 내용 예시 게시글 내용 예시 게시글 내용
                </ItemDescription>
              </div>
              <ItemActions className="flex gap-2">
                <ThumbsUp />
                <p>
                  좋아요
                  <span>10</span>
                </p>
              </ItemActions>
            </ItemContent>
            <ItemMedia className="h-[168px] w-[228px]">
              <img
                src="./src/assets/image.png"
                alt="예시 게시글 이미지"
                className="bg-oz-gray-light h-full w-full rounded-lg object-cover"
              />
            </ItemMedia>
          </a>
        </Item>
      </div>
    </main>
  );
}

export default App;
