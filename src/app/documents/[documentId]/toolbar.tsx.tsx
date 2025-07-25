'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheck, UnderlineIcon, Undo2Icon, UploadIcon } from 'lucide-react'
import { type Level } from "@tiptap/extension-heading"
import { type ColorResult, SketchPicker } from "react-color"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const LineHeightButton = () => {
  const { editor } = useEditorStore()

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" }
  ];  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListCollapseIcon className="size-4" />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {
          lineHeights.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setLineHeight(value).run()}
              className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.getAttributes("paragraph").LineHeight === value && 'bg-neutral-200/80')}
            >
              <span className="text-sm"> {label} </span>
            </button>
          ))
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const FontSizeButton = () => {
  const { editor } = useEditorStore()

  const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor.getAttributes("textStyle").fontSize.replace("px", "") : 16;

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus()
    }
  }

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  }

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }

  }


  return (

    <div className="flex items-cente gap-x-0.5">
      <button onClick={decrement} className="h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <MinusIcon className="size-4" />
      </button>
      {
        isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-10 h-7 text-center text-sm border-neutral-400 bg-transparent text-neutral-900 rounded-sm border"
          />
        ) : (
          <button onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
            className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80"
          >
            {currentFontSize}
          </button>
        )
      }
      <button onClick={increment} className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <PlusIcon className="size-4" onClick={increment} />
      </button>
    </div>

  )

}

const ListButton = () => {
  const { editor } = useEditorStore()

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onclick: () => { editor?.chain().focus().toggleBulletList().run() }
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onclick: () => { editor?.chain().focus().toggleOrderedList().run() }
    },

  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListIcon className="size-4" />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {
          lists.map(({ label, icon: Icon, onclick, isActive }) => (
            <button
              key={label}
              onClick={(onclick)}
              className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", isActive() && 'bg-neutral-200/80')}
            >
              <Icon className="size-4" />
              <span className="text-sm"> {label} </span>
            </button>
          ))
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const AlignButton = () => {
  const { editor } = useEditorStore()

  const alignments = [
    { label: "Align Left", value: "left", icon: AlignLeftIcon },
    { label: "Align Center", value: "center", icon: AlignCenterIcon },
    { label: "Align Right", value: "right", icon: AlignRightIcon },
    { label: "Align Justify", value: "justify", icon: AlignJustifyIcon },

  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <AlignLeftIcon className="size-4" />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {
          alignments.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80')}
            >
              <Icon className="size-4" />
              <span className="text-sm"> {label} </span>
            </button>
          ))
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const ImageButton = () => {

  const { editor } = useEditorStore();
  const [imgUrl, setImgUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);



  const onChange = (src: string) => {

    editor?.chain().focus().setImage({ src }).run();
  }

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        onChange(imageUrl)
      }
    }

    input.click();
  }

  const handleImageUrlSubmit = () => {
    if (imgUrl) {
      onChange(imgUrl);
      setIsDialogOpen(false);
      setImgUrl('')
    }
  }


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
            <ImageIcon className="size-4" />
          </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="mr-2 size-4" />
            Upload

          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="mr-2 size-4" />
            Paste Image Url

          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Image Url </DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Inset image url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'enter') {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>



  )

}

const LinkButton = () => {

  const { editor } = useEditorStore()
  const [value, setValue] = useState(editor?.getAttributes("link").href || "")

  const onChange = (href: string) => {

    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setValue("")
  }

  return (
    <DropdownMenu onOpenChange={(open) => {
      if (open) {
        setValue(editor?.getAttributes("link").href || "")
      }
    }}>
      <DropdownMenuTrigger asChild >
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input placeholder="https://example.com" onChange={(e) => setValue(e.target.value)} value={value} />
        <Button onClick={() => onChange(value)}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}


const HighlightColorButton = () => {
  const { editor } = useEditorStore()

  const value = editor?.getAttributes('highlight').color || '#FFFFFF';

  const onChange = (color: ColorResult) => {

    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <HighlighterIcon className="size-4" />
          <div className="h-[3px] w-full" style={{ backgroundColor: value }}></div>
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const TextColorButton = () => {
  const { editor } = useEditorStore()

  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChange = (color: ColorResult) => {

    editor?.chain().focus().setColor(color.hex).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className="text-sm"> A</span>
          <div className="h-[3px] w-full" style={{ backgroundColor: value }}></div>
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const HeadingLevelButton = () => {

  const { editor } = useEditorStore();

  const heading = [
    { label: 'Normal text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ]

  const getCurrentHeading = () => {

    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal text'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className='h-7 min-w-7 shrink-0 flex justify-center items-center  rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className='size-4 ml-2 shrink-0' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {
          heading.map(({ label, value, fontSize }) => (
            <button
              key={value}
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run()
                } else {
                  editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                }
              }
              }
              className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", (value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value }) && "bg-neutral-200/80")}
              style={{ fontSize }}
            >
              {label}
            </button>
          ))
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )


}

const FontFamilyButton = () => {
  const { editor } = useEditorStore()

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <button className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className='size-4 ml-2 shrink-0' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {
          fonts.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
              className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.getAttributes('textStyle').FontFamily === value && "bg-neutral-200/80")}
              style={{ fontFamily: value }}
            >
              {label}
            </button>
          ))
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )

}

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
            const current = editor?.view.dom.getAttribute("spellcheck");
            editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
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
          onClick: () => editor?.chain().focus().addPendingComment().run(),
          isActive: editor?.isActive("liveblocksCommentMark"),
        },
        {
          label: 'List Todo',
          icon: ListTodoIcon,
          onClick: () => editor?.chain().focus().toggleTaskList().run(),
          isActive: editor?.isActive('taskList')
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
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />

      {
        section[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))
      }

      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <FontSizeButton />
      <LineHeightButton />
      <ListButton />
      <Separator orientation='vertical' className='h-7 bg-neutral-300' />

      {
        section[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))
      }

    </div>
  )
}

export default Toolbar
