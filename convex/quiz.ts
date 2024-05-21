import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { ensureIdentity } from './utils';

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ensureIdentity(ctx.auth);
    const existingSlug = await ctx.db
      .query('quizzes')
      .withIndex('by_slug')
      .filter((q) => q.eq(q.field('slug'), args.slug))
      .unique();
    if (existingSlug) throw new ConvexError('Slugs must be unique.');
    const id = await ctx.db.insert('quizzes', {
      ownerId: identity.subject,
      title: args.title,
      description: args.description,
      slug: args.slug,
    });

    return id;
  },
});

export const get = query({
  args: {
    id: v.id('quizzes'),
  },
  handler: async (ctx, args) => {
    const quiz = await ctx.db.get(args.id);
    if (!quiz) throw new ConvexError('Quiz not found');
    return quiz;
  },
});

export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const quiz = await ctx.db
      .query('quizzes')
      .withIndex('by_slug')
      .filter(
        (q) =>
          q.eq(q.field('slug'), args.slug) && q.neq(q.field('isDisabled'), true)
      )
      .unique();
    if (!quiz) throw new ConvexError('Quiz not found');
    return quiz;
  },
});

export const remove = mutation({
  args: {
    id: v.id('quizzes'),
  },
  handler: async (ctx, args) => {
    const identity = await ensureIdentity(ctx.auth);
    const quiz = await ctx.db.get(args.id);
    if (!quiz) throw new ConvexError('Quiz not found');
    if (quiz.ownerId !== identity.subject)
      throw new ConvexError('You are not authorized to delete this quiz.');

    await ctx.db.delete(args.id);
  },
});
