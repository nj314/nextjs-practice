import { ConvexError, v } from 'convex/values';
import { v4 as uuidv4 } from 'uuid';
import { mutation } from './_generated/server';
import { ensureIdentity } from './utils';

export const create = mutation({
  args: {
    quizId: v.id('quizzes'),
    title: v.string(),
    options: v.array(
      v.object({
        title: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ensureIdentity(ctx.auth);
    const quiz = await ctx.db.get(args.quizId);
    if (!quiz) throw new ConvexError('Quiz not found');
    if (quiz.ownerId !== identity.subject)
      throw new ConvexError('You are not authorized to change this quiz.');
    const question = await ctx.db.insert('questions', {
      quizId: quiz._id,
      title: args.title,
      options: args.options.map((o) => ({
        id: uuidv4(),
        title: o.title,
        isDisabled: false,
      })),
    });

    return question;
  },
});

export const remove = mutation({
  args: {
    id: v.id('questions'),
  },
  handler: async (ctx, args) => {
    const identity = await ensureIdentity(ctx.auth);
    const question = await ctx.db.get(args.id);
    if (!question) throw new ConvexError('Question not found');
    const quiz = await ctx.db.get(question.quizId);
    if (!quiz) throw new ConvexError('Invalid quiz');
    if (quiz.ownerId !== identity.subject)
      throw new ConvexError('You are not authorized to change this quiz.');

    await ctx.db.delete(args.id);
  },
});
