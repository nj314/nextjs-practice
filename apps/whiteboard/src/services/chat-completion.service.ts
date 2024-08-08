import { openAiService } from './openai.service';

export async function continueConversation() {
  try {
    const response = await openAiService.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: '',
        },
      ],
      model: 'gpt-4o',
    });

    const { finish_reason: finishReason, message } = response.choices[0] ?? {};
    if (!message)
      throw new Response(null, {
        status: 500,
        statusText: 'Unable to get assistant reponse',
      });
    // Do something with message
    return message;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    throw e;
  }
}
