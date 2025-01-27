'use client'
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";


interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
  children: React.ReactNode;
}


const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {

  const update = useMutation(api.documents.updateById)

  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isOpen, setIsOpen] = useState(false);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(false);

    update({ id: documentId, title: title.trim() || 'Untitled' })
    .catch(() => toast.error("Something went wrong"))
    .then(() => toast.success("Document renamed"))
    .then(() => {
      setIsOpen(false);
    })
      .finally(() => {
        setIsUpdating(false);
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Remane document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Documet name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              variant='ghost'
              disabled={isUpdating}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false)
              }}
            >
              Cancle
            </Button>
            <Button
              disabled={isUpdating}
              type="submit"
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}

export default RenameDialog
