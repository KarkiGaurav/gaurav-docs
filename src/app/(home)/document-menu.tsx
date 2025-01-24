import { MoreVertical } from 'lucide-react'
import React from 'react'
import { Id } from '../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

interface DocumetMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: string) => void
}
const DocumentMenu = ({ documentId, title, onNewTab }: DocumetMenuProps) => {
    return (
        <div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-full'>
                <MoreVertical className='size-4' />
            </Button>
            </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    )
}

export default DocumentMenu
