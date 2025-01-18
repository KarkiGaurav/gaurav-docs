import { BsCloudCheck } from 'react-icons/bs'

 
export const DocumentInput = () => {
    return (
        <div className="flex items-center gap-2">
            <span className="cursor-pointer text-lg px-1.5 truncate">Untitled Document</span>
            <BsCloudCheck />
        </div>
    )
}