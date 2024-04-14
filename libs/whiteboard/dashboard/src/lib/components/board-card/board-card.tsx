import { useAuth } from '@clerk/nextjs';
import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import { Actions } from '@shared/components/actions';
import { Skeleton } from '@shared/components/ui';
import { useApiMutation } from '@shared/utils';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Footer } from './footer';
import { Overlay } from './overlay';

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite?: boolean;
};

export function BoardCard({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: Props) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  const { mutate: favorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: unfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFavorite = async () => {
    if (!isFavorite) {
      try {
        await favorite({ orgId, id: id as Id<'boards'> });
      } catch {
        toast.error('Failed to favorite');
      }
    } else {
      try {
        unfavorite({ orgId, id: id as Id<'boards'> });
      } catch {
        toast.error('Failed to unfavorite');
      }
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <img
            alt="preview of board"
            className="object-fill"
            src="https://images.ctfassets.net/w6r2i5d8q73s/FmpmX20UUvUKyweJ6lgNE/175e3b929ac8f7b98efc81be015efd78/homepage_project_management_02_miro_cards_product_image_EN_1210x680_2x.png"
          />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtlabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={false}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
