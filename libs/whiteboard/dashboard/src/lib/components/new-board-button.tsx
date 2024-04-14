'use client';

import { api } from '@convex/api';
import { cn, useApiMutation } from '@shared/utils';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  orgId: string;
  disabled?: boolean;
};
export function NewBoardButton({ disabled: disabledProp, orgId }: Props) {
  const { mutate: create, pending } = useApiMutation(api.board.create);
  const handleClick = async () => {
    try {
      const board = await create({ orgId, title: 'Untitled board' });
      toast.success('Board created');
      // TODO: redirect to /boards/:id
    } catch {
      toast.error('Failed to create board');
    }
  };
  const disabled = pending || disabledProp;

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg flex flex-col items-center justify-center py-6',
        disabled && 'opacity-75 cursor-not-allowed',
        !disabled && 'hover:bg-blue-800'
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
}
