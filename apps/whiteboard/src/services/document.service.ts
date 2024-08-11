// import { Client } from '@upstash/qstash';
import {
  LlamaParseReader,
  Ollama,
  Settings,
  VectorStoreIndex,
} from 'llamaindex';

Settings.llm = new Ollama({
  model: 'llama3.1:8b',
});

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

export async function summarize(
  // filePath: string = '/Users/nate/Code/nextjs-practice/apps/whiteboard/src/app/reader/assets/abramov.txt'
  filePath: string = '/Users/nate/Code/nextjs-practice/apps/whiteboard/src/app/reader/assets/canada.pdf'
) {
  console.log('Starting summarization job for ', filePath);

  // set up the llamaparse reader
  const reader = new LlamaParseReader({
    resultType: 'markdown',
    fastMode: true,
  });

  // parse the document
  const documents = await reader.loadData(filePath);

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
