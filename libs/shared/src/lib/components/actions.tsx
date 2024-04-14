'use client';

import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { useRenameModal } from '@shared/store';
import { useApiMutation } from '@shared/utils';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmModal } from './modals';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui';

type Props = React.PropsWithChildren<
  Pick<DropdownMenuContentProps, 'side' | 'sideOffset'> & {
    id: string;
    title: string;
  }
>;
export function Actions({ children, side, sideOffset, id, title }: Props) {
  const { mutate: remove, pending: pendingDelete } = useApiMutation(
    api.board.remove
  );
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`
    );
    toast.success('Link copied');
  };

  const handleDelete = async () => {
    try {
      await remove({ id: id as Id<'boards'> });
      toast.success('Board deleted');
    } catch {
      toast.error('Failed to delete board');
    }
  };

  const { onOpen } = useRenameModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={handleCopyLink}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <ConfirmModal
          header="Delete board?"
          description="This will permanently delete the board and all of its contents."
          disabled={pendingDelete}
          onConfirm={handleDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
