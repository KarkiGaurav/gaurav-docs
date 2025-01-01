'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Editor = () => {

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
    })

    return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
            <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:min-w-full print:w-0">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Editor
