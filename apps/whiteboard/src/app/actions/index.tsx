export * from './summarize-document';

// Settings.embedModel = new OllamaEmbedding({
//   model: 'llama3.1:8b',
// });

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
