'use server';
import { ChatMessage, Ollama } from 'llamaindex';

import {
  Document,
  MetadataMode,
  NodeWithScore,
  Settings,
  VectorStoreIndex,
} from 'llamaindex';

Settings.llm = new Ollama({
  model: 'llama3.1',
});

/*
export async function chatWithAgent(
  question: string,
  prevMessages: ChatMessage[] = []
) {
  const agent = new OpenAIAgent({
    tools: [
      // ... adding your tools here
    ],
  });
  const responseStream = await agent.chat({
    stream: true,
    message: question,
    chatHistory: prevMessages,
  });
  const uiStream = createStreamableUI(<div>loading...</div>);
  responseStream
    .pipeTo(
      new WritableStream({
        start: () => {
          uiStream.update('response:');
        },
        write: async (message) => {
          uiStream.append(message.delta);
        },
      })
    )
    .catch(console.error);
  return uiStream.value;
}
  */

export async function chatWithAgent(
  question: string,
  prevMessages: ChatMessage[] = []
) {
  // Load essay from abramov.txt in Node
  // const path = 'node_modules/llamaindex/examples/abramov.txt';
  // const essay = await fs.readFile(path, 'utf-8');

  // Create Document object with essay
  const document = new Document({
    text: 'You are a pirate.',
    id_: 'pirate',
  });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Query the index
  const queryEngine = index.asQueryEngine();
  const { response, sourceNodes } = await queryEngine.query({
    query: 'What are you?',
  });

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

  return <span>{response}</span>;
}
