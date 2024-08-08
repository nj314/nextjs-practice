import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';

import {
  ContextChatEngine,
  Document,
  Settings,
  VectorStoreIndex,
} from 'llamaindex';

const essay =
  'You are the Batman. The one and only superhero, you are always brooding but brave and helpful too.';

// Update chunk size
Settings.chunkSize = 512;

async function main() {
  const document = new Document({ text: essay });
  const index = await VectorStoreIndex.fromDocuments([document]);
  const retriever = index.asRetriever({
    similarityTopK: 5,
  });
  const chatEngine = new ContextChatEngine({ retriever });
  const rl = readline.createInterface({ input, output });

  while (true) {
    const query = await rl.question('Query: ');
    const stream = await chatEngine.chat({ message: query, stream: true });
    console.log();
    for await (const chunk of stream) {
      process.stdout.write(chunk.response);
    }
  }
}

main().catch(console.error);
