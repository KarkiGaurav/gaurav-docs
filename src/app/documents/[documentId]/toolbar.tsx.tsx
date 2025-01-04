'use client'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheck, UnderlineIcon, Undo2Icon } from 'lucide-react'
import React from 'react'

interface ToolbarButtonProps {
  onClick: () => void,
  isActive?: boolean,
  icon: LucideIcon,
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon
}: ToolbarButtonProps) => {

  return (
    <button
      onClick={onClick}
      className={cn('h-7 min-w-7 hover:bg-neutral-200/80 flex justify-center items-center rounded-sm', isActive && 'bg-neutral-200/80')}
    >
      <Icon className='size-4' />
    </button>
  )
}


const Toolbar = () => {

  const { editor } = useEditorStore();

  const section: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
      [
        {
          label: "Undo",
          icon: Undo2Icon,
          onClick: () => editor?.chain().focus().undo().run(),
        },
        {
          label: "Redo",
          icon: Redo2Icon,
          onClick: () => editor?.chain().focus().redo().run(),
        },
        {
          label: "Print",
          icon: PrinterIcon,
          onClick: () => window.print(),
        },
        {
          label: "Spell Check",
          icon: SpellCheck,
          onClick: () => {
            const current = editor?.view.dom.getAttribute('spellCheck');
            editor?.view.dom.setAttribute('spellCheck', current === 'false' ? 'true' : 'false')
          },
        }
      ],
      [
        {
          label: "Bold",
          icon: BoldIcon,
          isActive: editor?.isActive('bold'),
          onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        {
          label: "Italic",
          icon: ItalicIcon,
          isActive: editor?.isActive('italic'),
          onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
          label: "Underline",
          icon: UnderlineIcon,
          isActive: editor?.isActive('underline'),
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
        },
      ],
      [
        {
          label: 'Comment',
          icon: MessageSquarePlusIcon,
          onClick: () => console.log("message commented"),
          isActive: false,
        },
        {
          label: 'List Todo',
          icon: ListTodoIcon,
          onClick: () => editor?.chain().focus().toggleTaskList().run(),
          isActive: editor?.isActive('TaskList')
        },
        {
          label: 'Remove Formatting',
          icon: RemoveFormattingIcon,
          onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        }
      ]
    ]


  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 min-h-[40px] rounded-[24px] flex gap-x-0.5 items-center overflow-x-auto">
      {
        section[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))
      }
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />

      {
        section[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))
      }

      <Separator orientation='vertical' className='h-7 bg-neutral-300' />

      {
        section[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))
      }

    </div>
  )
}

export default Toolbar
