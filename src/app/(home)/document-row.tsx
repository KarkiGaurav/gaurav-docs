import { SiGoogledocs } from 'react-icons/si'
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { Doc } from '../../../convex/_generated/dataModel';
import { Building2Icon, CircleUserIcon, icons, MoreVertical, MoveVertical } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface DocumentRowProps {
    document: Doc<'documents'>;
}

const DocumentRow = ({ document }: DocumentRowProps) => {
    return (
        <TableRow className='cursor-pointer'>
            <TableCell className="w-[50px]"><SiGoogledocs /></TableCell>
            <TableCell className='font-medium md:w-[45%]'>{document.title}</TableCell>
            <TableCell className='text-muted-foreground hidden md:flex items-center gap-2'>
                {document.organizationId ? <Building2Icon className='size-4' /> : <CircleUserIcon className='size-4' />}
                {document.organizationId ? 'Organization' : 'Personal'}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell text-right">
               {format(new Date(document._creationTime), 'MM dd, yyyy')}
            </TableCell>
            <TableCell className='flex justify-end'>
                <Button variant='ghost' size='icon' className='rounded-full'> 
                    <MoreVertical className='size-4' />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default DocumentRow
