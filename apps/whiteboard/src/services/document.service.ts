'use server';
// import { Client } from '@upstash/qstash';
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

// Settings.llm = new Ollama({
//   model: 'llama3.1:8b',
// });

Settings.llm = new OpenAI({ model: 'gpt-4o-mini' });

// const qstashClient = new Client({
//   // Add your token to a .env file
//   token: process.env.QSTASH_TOKEN!,
// });

const mark = () => {
  console.log(`Duration: ${performance.measure('1').duration}`);
  performance.mark('1');
};

export type DocumentSummaryJob = {
  docId: string;
  filePath: string;
};

/*
export async function enqueueDocumentSummaryJob(filePath: string) {
  const body: DocumentSummaryJob = {
    docId: new Date().toISOString(),
    filePath,
  };
  const url = `${process.env.QSTASH_URL}/reader/summarize-document/job`;
  console.log('url', url);
  await qstashClient.publishJSON({
    url: url,
    body,
  });
  console.log(`Enqueued job for ${filePath}`);
}
  */

export async function summarize(args: {
  // filePath: string = '/Users/nate/Code/nextjs-practice/apps/whiteboard/src/app/reader/assets/abramov.txt'
  sourceDocId: string;
  sourceUrl: string;
}) {
  const { sourceUrl, sourceDocId } = args;
  console.log('Starting summarization job for ', sourceUrl);
  const localFilePath = await downloadFile(sourceUrl, sourceDocId);
  console.log('local file path', localFilePath);

  // set up the llamaparse reader
  const reader = new SimpleDirectoryReader((category, fileName) => {
    console.log(`Trying to read ${category}:`, fileName);
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
  const { response, sourceNodes } = await queryEngine.query({
    query:
      'Please summarize each chapter of the document. Do not skip any chapters. Each summary should be 1-3 sentences long.',
  });

  // Output response with sources
  console.log(response);

  return response;
}

async function downloadFile(url: string, fileName: string) {
  const res = await fetch(url);
  if (!res.body) throw new Error('Failed to download file');
  const parentFolder = './tmp/downloads';
  if (!fs.existsSync(parentFolder))
    await mkdir(parentFolder, { recursive: true }); //Optional if you already have downloads directory
  console.log('download response headers', { ...res.headers });
  // mime.extensions['text/markdown'] = ['md'];
  let extension = mime.extension(res.headers.get('content-type') ?? 'unknown');
  switch (extension) {
    case 'markdown':
      extension = 'md';
      break;
    default:
      break;
  }
  console.log('extension of downloaded file is', extension);
  const destination = path.resolve(parentFolder, `${fileName}.${extension}`);
  const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
  await finished(
    Readable.fromWeb(res.body as ReadableStream<any>).pipe(fileStream)
  );
  return destination;
}
