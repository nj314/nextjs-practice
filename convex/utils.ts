import { Auth } from 'convex/server';
import { Infer, v } from 'convex/values';

export async function ensureIdentity(auth: Auth) {
  const identity = await auth.getUserIdentity();
  if (!identity) throw new Error('Unauthorized');
  return identity;
}

export const quizStatusValidator = v.union(
  v.literal('draft'),
  v.literal('active'),
  v.literal('disabled')
);

export type QuizStatus = Infer<typeof quizStatusValidator>;
