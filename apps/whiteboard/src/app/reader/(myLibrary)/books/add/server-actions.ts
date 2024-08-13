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
 * React Server Action to dispatch a document summary job.
 * @param filePath
 * @returns void
 */
export async function dispatchDocumentSummaryJob(args: {
  // filePath = `${process.cwd()}/src/app/reader/assets/Art of War (Sun Tzu) Chapters 1-4.txt`
  // filePath = `${process.cwd()}/src/app/reader/assets/abramov.txt`
  sourceDocId: Id<'documents'>;
}) {
  const { sourceDocId } = args;
  const user = await currentUser();
  console.log('the current user is ', user);
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
  console.log('Summary job: source file url is', sourceUrl);
  const summaryPromise = summarize({ sourceDocId, sourceUrl }); // do not await
  console.log('Summary job dispatched for source file:', sourceUrl);

  const summaryContent = await summaryPromise;
  console.log('Summary job COMPLETE for source file:', sourceUrl);

  // const summaryFilePath = `./summary-${sourceStorageId}.md`;
  // const localFile = await fs.open(summaryFilePath);
  const uploadUrl = await fetchMutation(
    api.file.generateUploadUrl,
    {},
    { token }
  );
  console.log('upload url is', uploadUrl);
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': mime.contentType('.md') || 'application/octet-stream',
    },
    body: summaryContent,
  });

  const { storageId: summaryStorageId } = await response.json();
  console.log('Uploaded summary document storage id:', summaryStorageId);
  console.log('Updating document with id', sourceDocId);
  await fetchMutation(
    api.document.update,
    {
      id: sourceDocId,
      summaryStorageId,
    },
    { token }
  );
}
