'use client';

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Link2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui';

type Props = React.PropsWithChildren<
  Pick<DropdownMenuContentProps, 'side' | 'sideOffset'> & {
    id: string;
    title: string;
  }
>;
export function Actions({ children, side, sideOffset, id, title }: Props) {
  const onCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`
    );
    toast.success('Link copied');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
