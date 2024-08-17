'use server';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import mime from 'mime-types';
import { summarize } from '../../../../../services/document.service';
import { getAuthToken } from '../../../../auth';

export async function getContentType(fileNameOrExtension: string) {
  return mime.contentType(fileNameOrExtension) || 'application/octet-stream';
}

/**
 * React Server Action to dispatch document summary jobs.
 */
export async function dispatchDocumentSummaryJobs(args: {
  sourceDocId: Id<'documents'>;
}) {
  const { sourceDocId } = args;
  const user = await currentUser();
  // console.log('the current user is ', user);
  if (!user) {
    throw new Error('Not authenticated, aborting');
  }

  const token = await getAuthToken();
  const sourceUrl = await fetchQuery(
    api.document.getSourceUrl,
    { documentId: sourceDocId },
    { token }
  );
  if (!sourceUrl) throw new Error('Could not get source file URL.');

  const summaryPromise = summarize({
    sourceDocId,
    sourceUrl,
  }); // do not await

  const summaries = await summaryPromise;
  for (const { zoomLevel, summary } of summaries) {
    const uploadUrl = await fetchMutation(
      api.file.generateUploadUrl,
      {},
      { token }
    );
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': mime.contentType('.md') || 'application/octet-stream',
      },
      body: summary,
    });

    const { storageId } = await response.json();
    await fetchMutation(
      api.document.upsertSummary,
      {
        id: sourceDocId,
        zoomLevel,
        storageId,
      },
      { token }
    );
  }
}
