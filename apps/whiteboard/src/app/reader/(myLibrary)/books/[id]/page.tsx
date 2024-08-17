'use server';
import { api } from '@convex/api';
import { fetchAction } from 'convex/nextjs';
import showdown from 'showdown';
import { getAuthToken } from '../../../../auth';
import { BookReaderPageClient } from './BookReaderPageClient';

async function getSummaries(id: string) {
  const summaries = await fetchAction(
    api.document.getSummaries,
    { id },
    { token: await getAuthToken() }
  );
  const converter = new showdown.Converter();
  return summaries.map((s) => ({
    ...s,
    content: converter.makeHtml(s.content),
  }));
}

type Props = { params: { id: string } };

export default async function BookReaderPage({ params }: Props) {
  const { id: documentId } = params;
  const summaries = await getSummaries(documentId as string);
  return <BookReaderPageClient summaries={summaries} />;
}
