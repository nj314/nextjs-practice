import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
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
  ...rest
}: Props) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

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
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtlabel={createdAtLabel}
          onClick={() => undefined}
          disabled={false}
        />
      </div>
    </Link>
  );
}
