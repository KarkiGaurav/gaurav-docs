'use client'
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


  interface RemoveDialogProps {
    documentId: Id<'documents'>;
    children: React.ReactNode;
  }

  
  const RemoveDialog = ({documentId, children}: RemoveDialogProps) => {

    const [ isRemoving, setIsRemoving ] = useState(false);
    const remove = useMutation(api.documents.removeById)

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>{ children }</AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
            disabled={isRemoving}
            onClick={(e) => {
                e.stopPropagation();
                setIsRemoving(true);
                remove({id: documentId}).finally(() => {
                    setIsRemoving(false);
                })
            }}
            >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    )
  }
  
  export default RemoveDialog
  