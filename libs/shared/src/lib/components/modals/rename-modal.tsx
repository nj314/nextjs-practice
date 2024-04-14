'use client';

import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import { useRenameModal } from '@shared/store';
import { useApiMutation } from '@shared/utils';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '../ui';

const TITLE_MAX_LENGTH = 60;

export function RenameModal() {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  const { mutate: updateBoard, pending } = useApiMutation(api.board.update);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const board = await updateBoard({
        id: initialValues.id as Id<'boards'>,
        title,
      });
      onClose();
      toast.success('Board renamed');
    } catch {
      toast.error('Failed to rename board');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
          <DialogDescription>
            Enter a new title for this board
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={TITLE_MAX_LENGTH}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
