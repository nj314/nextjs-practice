'use server';
import { summarize } from '../../services/document.service';

/**
 * React Server Action to dispatch a document summary job.
 * @param filePath
 * @returns void
 */
export async function actionEnqueueDocumentSummaryJob(
  // filePath = `${process.cwd()}/src/app/reader/assets/Art of War (Sun Tzu) Chapters 1-4.txt`
  // filePath = `${process.cwd()}/src/app/reader/assets/abramov.txt`
  filePath?: string
) {
  summarize(filePath); // do not await
}
