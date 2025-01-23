import { PaginationStatus } from 'convex/react'
import React from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import DocumentRow from './document-row'


interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined,
    loadMore: (numItems: number) => void,
    status: PaginationStatus

}

const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
            {
                documents === undefined ? (
                    <div className="flex justify-center items-center h-24">
                        <Loader className='animate-spin text-muted-foreground size-5' />
                    </div>
                ) : (
                    <Table>
                        <TableCaption className={cn(documents.length === 0 && 'hidden' )}>A list of your recent created documents.</TableCaption>
                        <TableHeader>
                            <TableRow className='hover:bg-transparent border-none'>
                                <TableHead className="">Name</TableHead>
                                <TableHead>&nbsp;</TableHead>
                                <TableHead className='hidden md:table-cell'>Shared</TableHead>
                                <TableHead className="hidden md:table-cell text-right">Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        {documents.length === 0 ? (
                            <TableBody>
                            <TableRow className='hover:bg-transparent'>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No Document Found</TableCell>
                                
                            </TableRow>
                        </TableBody>

                        ) : (
                            <TableBody>
                                {documents.map((document, index) => (
                                    <DocumentRow key={index} document={document}/>
                                )
                                )}
                            </TableBody>
                        )}

                    </Table>

                )
            }

        </div>
    )
}

export default DocumentsTable
