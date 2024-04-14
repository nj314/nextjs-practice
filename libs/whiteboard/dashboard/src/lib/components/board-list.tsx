'use client';

import { useOrganization } from '@clerk/nextjs';
import { api } from '@convex/api';
import { Button } from '@shared/components/ui';
import { useApiMutation } from '@shared/utils';
import { useQuery } from 'convex/react';
import { toast } from 'sonner';
import { BoardCard } from './board-card';
import { NewBoardButton } from './new-board-button';

type ResultsMessageProps = {
  children?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
};
function ResultsMessage({ children, title, subtitle }: ResultsMessageProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm mt-2 mb-6">{subtitle}</p>
      {children}
    </div>
  );
}

function EmptyList() {
  const { organization } = useOrganization();
  const { mutate: createBoard, pending } = useApiMutation(api.board.create);

  const handleCreate = async () => {
    if (!organization) return;
    await createBoard({
      orgId: organization.id,
      title: 'Untitled',
    });
    toast.success('Board created');
    // TODO: redirect to /boards/:boardId
  };
  return (
    <ResultsMessage title="No boards" subtitle="Create your first board">
      <Button size="lg" className="" onClick={handleCreate}>
        Create board
      </Button>
    </ResultsMessage>
  );
}

type Props = {
  orgId: string;
  query?: { favorites?: boolean; search?: string };
};
export function BoardList({ orgId, query }: Props) {
  const data = useQuery(api.boards.get, { orgId, search: query?.search });

  if (!data) {
    // Loading state
    return (
      <div>
        <h2 className="text-3xl">
          {query?.favorites ? 'Favorite boards' : 'Team boards'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query?.search) {
    return (
      <ResultsMessage
        title="No results"
        subtitle="Try searching for something else"
      />
    );
  }

  if (!data.length && query?.favorites) {
    return (
      <ResultsMessage
        title="No favorite boards"
        subtitle="Try favoritng a board"
      />
    );
  }

  if (!data.length) {
    return <EmptyList />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query?.favorites ? 'Favorite boards' : 'Team boards'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
}
