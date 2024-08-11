'use server';
import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import mime from 'mime-types';
import { summarize } from '../../../../../services/document.service';

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
  const fileUrl = await fetchQuery(api.document.getSourceUrl, {
    documentId: sourceDocId,
  });
  if (!fileUrl) throw new Error('Could not get file URL.');
  const summarizePromise = summarize(fileUrl); // do not await
  console.log('Summary job dispatched for source file:', fileUrl);

  const summaryContent = await summarizePromise;
  console.log('Summary job COMPLETE for source file:', fileUrl);

  // const summaryFilePath = `./summary-${sourceStorageId}.md`;
  // const localFile = await fs.open(summaryFilePath);
  const uploadUrl = await fetchMutation(api.file.generateUploadUrl);
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': mime.contentType('.md') || 'application/octet-stream',
    },
    body: summaryContent,
  });

  const { storageId: summaryStorageId } = await response.json();
  await fetchMutation(api.document.update, {
    id: sourceDocId,
    summaryStorageId,
  });
}
