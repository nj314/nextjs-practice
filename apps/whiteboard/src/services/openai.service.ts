import OpenAI from 'openai';

export const openAiService = new OpenAI({
  organization: 'org-xdUZyt45H1hPiRaSq3yqcszF',
  apiKey: process.env.OPENAI_API_KEY,
});
