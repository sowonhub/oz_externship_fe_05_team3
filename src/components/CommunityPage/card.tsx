import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { ThumbsUp } from 'lucide-react';

export function Card() {
  return (
    <div className="flex h-[216px] w-[944px] flex-col gap-4">
      <Item
        className="h-full w-full items-start justify-start"
        variant="default"
        asChild
      >
        <a href="" target="_blank" rel="noopener noreferrer">
          <ItemContent className="h-full">
            <div className="flex flex-col gap-2">
              <ItemDescription>예시 카테고리</ItemDescription>
              <ItemTitle className="text-[18px]">예시 게시글 제목</ItemTitle>
              <ItemDescription>
                예시 게시글 내용 예시 게시글 내용 예시 게시글 내용 예시 게시글
                내용 예시 게시글 내용 예시 게시글 내용 예시 게시글 내용 예시
                게시글 내용 예시 게시글 내용 예시 게시글 내용 예시 게시글 내용
              </ItemDescription>
            </div>
            <div className="mt-auto flex w-full items-center justify-between">
              <ItemActions className="text-oz-gray-white-dark mt-auto flex gap-2">
                <ThumbsUp className="color-oz-gray-white-dark" />
                <p className="flex gap-1 text-[12px]">
                  <span>좋아요</span>
                  <span>10</span>
                </p>
                <p className="flex gap-1 text-[12px]">
                  <span>댓글</span>
                  <span>10</span>
                </p>
                <p className="flex gap-1 text-[12px]">
                  <span>조회수</span>
                  <span>10</span>
                </p>
              </ItemActions>
              <div className="flex items-center gap-2">
                <img
                  src="./src/assets/image.png"
                  alt="예시 게시글 이미지"
                  className="bg-oz-gray-light h-[24px] w-[24px] rounded-full object-cover"
                />
                <span className="text-[12px]">김소원</span>
                <span className="text-[12px]">1시간 전</span>
              </div>
            </div>
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
  );
}
