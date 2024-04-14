'use client';

import { Button } from '@shared/components/ui';

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

type Props = {
  orgId: string;
  query?: { favorites?: boolean; search?: string };
};
export function BoardList({ orgId, query }: Props) {
  const data = []; // TODO

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
    return (
      <ResultsMessage title="No boards" subtitle="Create your first board">
        <Button size="lg" className="">
          Create board
        </Button>
      </ResultsMessage>
    );
  }

  return (
    <div>
      Board list <code>{JSON.stringify(query)}</code>
    </div>
  );
}
