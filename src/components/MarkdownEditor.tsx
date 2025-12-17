import { useState } from 'react'
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Image as ImageIcon,
  List,
  ListOrdered,
  CheckSquare,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  X,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const MarkdownEditor = ({ value, onChange, placeholder = '내용을 입력하세요...' }: MarkdownEditorProps) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-3 flex items-center gap-2 flex-wrap bg-gray-50">
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Undo2 className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white focus:outline-none">
          <option>기본서체</option>
        </select>
        <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white focus:outline-none">
          <option>16</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Italic className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Underline className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Strikethrough className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <span className="w-4 h-4 border border-gray-400 block bg-transparent">A</span>
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <span className="w-4 h-4 border border-gray-400 block bg-yellow-200">A</span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Link className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <List className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <ListOrdered className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <CheckSquare className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <AlignLeft className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <AlignCenter className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <AlignRight className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Indent className="w-4 h-4" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <Outdent className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button type="button" className="p-2 hover:bg-gray-200 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex" style={{ height: '600px' }}>
        <div className="flex-1 border-r border-gray-200">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm"
            style={{ fontFamily: 'monospace' }}
          />
        </div>

        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <div
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#1f2937',
            }}
          >
            {value ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            ) : (
              <p style={{ color: '#9ca3af' }}>프리뷰가 여기에 표시됩니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor

