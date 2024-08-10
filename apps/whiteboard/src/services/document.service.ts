import { Client } from '@upstash/qstash';
import {
  Document,
  MetadataMode,
  NodeWithScore,
  Ollama,
  Settings,
  VectorStoreIndex,
} from 'llamaindex';
import fs from 'node:fs/promises';

Settings.llm = new Ollama({
  model: 'llama3.1:8b',
});

const qstashClient = new Client({
  // Add your token to a .env file
  token: process.env.QSTASH_TOKEN!,
});

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

export async function summarize(filePath: string) {
  console.log('Starting summarization job for ', filePath);
  // Load document content
  const documentContent = await fs.readFile(filePath, { encoding: 'utf-8' });
  console.log(`Document content: ${documentContent.slice(0, 50)}...`);
  mark();

  // Create Document object
  const document = new Document({
    text: documentContent,
    id_: 'input-document',
  });
  mark();

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);
  mark();

  // Query the index
  const queryEngine = index.asQueryEngine();
  mark();
  const { response, sourceNodes } = await queryEngine.query({
    query:
      'Please summarize each chapter of this book. Do not skip any chapters. Each summary should be 1-3 sentences long.',
  });
  mark();

  // Output response with sources
  console.log(response);

  if (sourceNodes) {
    sourceNodes.forEach((source: NodeWithScore, index: number) => {
      console.log(
        `\n${index}: Score: ${source.score} - ${source.node
          .getContent(MetadataMode.NONE)
          .substring(0, 50)}...\n`
      );
    });
  }

  return response;
}
