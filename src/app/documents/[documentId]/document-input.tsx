import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs'
import { Id } from '../../../../convex/_generated/dataModel'
import { useRef, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useDebounce } from '@/hooks/use-debounce'
import { toast } from 'sonner'
import { useStatus } from '@liveblocks/react'
import { LoaderIcon } from 'lucide-react'


interface DocumentInputProps {
    title: string,
    id: Id<'documents'>
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {

    const status =  useStatus()
    const [value, setValue] = useState(title);
    const [isPending, setIsPending] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null)
    const mutate = useMutation(api.documents.updateById);

    const onChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
       setValue(e.target.value)
       debouncedUpdate(e.target.value)
    }

    const debouncedUpdate = useDebounce((newValue: string) => {
        if (newValue === title) return 

        setIsPending(true)

        mutate({id, title: newValue}).then(() => {
            toast.success('Title updated')
        }).catch(() => {
                toast.error('Something went wrong')
        }).finally(() => {
            setIsPending(false)
        })
    })

    const handleSubmit = (e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)

        mutate({id, title: value}).then(() => {
            toast.success('Title updated')
            setIsEditing(false)
        }).catch(() => {
                toast.error('Something went wrong')
        }).finally(() => {
            setIsPending(false)
        })
    }

    const showLoader =  isPending || status === 'connecting' || status === 'reconnecting';
    const showError =  status === 'disconnected';

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form onSubmit={handleSubmit} className='relative max-w-[50ch] w-fit'>
                    <span className='invisible whitespace-pre px-1.5 text-lg'>
                        {value || ""}
                    </span>
                    <input
                        ref={inputRef}
                        onChange={onChange}
                        onBlur={() => setIsEditing(false )}
                        value={value}
                        className='absolute inset-0 text-lg text-black bg-transparent px-1.5 truncate'
                    />
                </form>
            ) : (
                <>
                    <span
                        onClick={() => {
                            setIsEditing(true);
                            setTimeout(() => {
                                inputRef.current?.focus()
                            }, 0)
                        }}
                        className="cursor-pointer text-lg px-1.5 truncate">{title}</span>
                        {showError && <BsCloudSlash className='size-4' />}
                        {!showError && !showLoader && <BsCloudCheck  className='size-4' />}
                        {showLoader && <LoaderIcon  className='size-4 animate-spin text-muted-foreground' />}
                </>
            )}

        </div>
    )
}