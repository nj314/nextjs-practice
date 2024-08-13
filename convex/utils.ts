import { Infer, v } from 'convex/values';
import { QueryCtx } from './_generated/server';

export async function ensureIdentity(ctx: QueryCtx) {
  const user = await ctx.auth.getUserIdentity();
  // const user = await currentUser();
  if (!user) throw new Error('Unauthorized');
  return {
    ...user,
    fullName: user.name,
    username: user.preferredUsername,
    id: user.subject,
  };
}

export const quizStatusValidator = v.union(
  v.literal('draft'),
  v.literal('active'),
  v.literal('disabled')
);

export type QuizStatus = Infer<typeof quizStatusValidator>;
