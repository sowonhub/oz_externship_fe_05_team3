import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import TextareaAutosize from 'react-textarea-autosize';
import { InputGroupButton } from './input-group';

export function InputGroupCustom() {
  return (
    <div className="focus-within:border-oz-purple grid h-[120px] w-full max-w-[868px] gap-6">
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-[16px]"
          placeholder="개인정보를 공유 및 요청하거나, 명예 회손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            className="focus-within:border-oz-purple bg-oz-gray-white text-oz-gray-dark hover:bg-oz-purple-light active:bg-oz-purple ml-auto h-[40px] w-[80px] rounded-full text-[16px] active:text-white"
            size="sm"
            variant="outline"
          >
            등록
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
