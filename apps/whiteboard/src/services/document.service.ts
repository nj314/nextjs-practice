'use server';
import { ZoomLevel } from 'convex/document';
import fs from 'fs';
import { mkdir } from 'fs/promises';
import {
  OpenAI,
  Settings,
  SimpleDirectoryReader,
  VectorStoreIndex,
} from 'llamaindex';
import mime from 'mime-types';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { ReadableStream } from 'stream/web';
import { ZOOM_LEVELS } from '../domain/document.types';

// Settings.llm = new Ollama({
//   model: 'llama3.1:8b',
// });

Settings.llm = new OpenAI({ model: 'gpt-4o-mini' });

const ZOOM_PROMPTS: Record<ZoomLevel, string> = {
  original: '',
  paragraph:
    'Please summarize each paragraph of the document. Do not skip any paragraphs. Each summary should be one sentence long.',
  multiParagraph:
    'For each 5-10 paragraphs of the document, provide a summary. Do not skip any paragraphs. Each summary should be 1-3 sentences long.',
  chapter:
    'For each chapter of the document, provide a summary. Do not skip any chapters. Each summary should be 1-3 sentences long.',
};

export async function summarize(args: {
  sourceDocId: string;
  sourceUrl: string;
  zoomLevels?: ZoomLevel[];
}) {
  const { sourceUrl, sourceDocId, zoomLevels = ZOOM_LEVELS } = args;
  if (zoomLevels.length === 0) return [];
  console.log(`Starting summarization jobs for ${sourceUrl}`);
  const localFilePath = await downloadFile(sourceUrl, sourceDocId);
  // console.log('local file path', localFilePath);

  // set up the llamaparse reader
  const reader = new SimpleDirectoryReader((category, fileName) => {
    // console.log(`Trying to read ${category}:`, fileName);
    if (category === 'directory') return true;
    return fileName === localFilePath;
  });
  // const reader = new LlamaParseReader({
  //   resultType: 'markdown',
  //   fastMode: true,
  // });

  // parse the document
  const documents = await reader.loadData(path.dirname(localFilePath));
  if (!documents?.length)
    throw new Error('Unable to load document into reader');

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments(documents);

  // Query the index
  const queryEngine = index.asQueryEngine();

  const summaries = await Promise.all(
    zoomLevels
      .filter((z) => z !== 'original')
      .map(async (zoomLevel) => {
        const { response, sourceNodes } = await queryEngine.query({
          query: ZOOM_PROMPTS[zoomLevel],
        });
        return { zoomLevel, summary: response };
      })
  );

  // Output response with sources
  // console.log(response);

  return summaries;
}

async function downloadFile(url: string, fileName: string) {
  const res = await fetch(url);
  if (!res.body) throw new Error('Failed to download file');
  const parentFolder = './tmp/downloads';
  if (!fs.existsSync(parentFolder))
    await mkdir(parentFolder, { recursive: true }); //Optional if you already have downloads directory
  // console.log('download response headers', { ...res.headers });
  // mime.extensions['text/markdown'] = ['md'];
  let extension = mime.extension(res.headers.get('content-type') ?? 'unknown');
  switch (extension) {
    case 'markdown':
      extension = 'md';
      break;
    default:
      break;
  }
  // console.log('extension of downloaded file is', extension);
  const destination = path.resolve(parentFolder, `${fileName}.${extension}`);
  const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
  await finished(
    Readable.fromWeb(res.body as ReadableStream<any>).pipe(fileStream)
  );
  return destination;
}
