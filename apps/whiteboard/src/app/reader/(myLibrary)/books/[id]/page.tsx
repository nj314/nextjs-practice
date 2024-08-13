'use server';
import { api } from '@convex/api';
import { fetchAction } from 'convex/nextjs';
import showdown from 'showdown';
import { getAuthToken } from '../../../../auth';
import { BookReaderPageClient } from './BookReaderPageClient';

async function getSummary(id: string) {
  const md = await fetchAction(
    api.document.getSummary,
    { id },
    { token: await getAuthToken() }
  );
  const converter = new showdown.Converter();
  return converter.makeHtml(md);
}

type Props = { params: { id: string } };

export default async function BookReaderPage({ params }: Props) {
  const { id: documentId } = params;
  const summary = await getSummary(documentId as string);
  return <BookReaderPageClient summary={summary} />;
}
