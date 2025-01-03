'use client'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { LucideIcon, Undo2Icon } from 'lucide-react'
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
        }
      ]
    ]


  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 min-h-[40px] rounded-[24px] flex justify-center gap-x-0.5 items-center overflow-x-auto">
      {
        section[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))
      }
    </div>
  )
}

export default Toolbar
