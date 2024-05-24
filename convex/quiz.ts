import { ConvexError, Infer, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { ensureIdentity, quizStatusValidator } from './utils';

const createQuizArgs = v.object({
  title: v.string(),
  description: v.optional(v.string()),
  slug: v.string(),
  orgId: v.string(),
});
export type CreateQuizArgs = Infer<typeof createQuizArgs>;

export const create = mutation({
  args: { formValues: createQuizArgs },
  handler: async (ctx, args) => {
    const { orgId, slug, title, description } = args.formValues;
    if (!orgId) throw new ConvexError('Missing org id');
    const identity = await ensureIdentity(ctx.auth);
    const existingSlug = await ctx.db
      .query('quizzes')
      .withIndex('by_slug_status')
      .filter((q) => q.eq(q.field('slug'), slug))
      .unique();
    if (existingSlug) throw new ConvexError('Slugs must be unique.');
    const id = await ctx.db.insert('quizzes', {
      ownerId: identity.subject,
      ownerOrgId: orgId,
      title,
      description,
      slug,
      status: 'draft',
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
    const questions = await ctx.db
      .query('questions')
      .withIndex('by_quiz')
      .filter((q) => q.eq(q.field('quizId'), quiz._id))
      .collect();
    return { ...quiz, questions };
  },
});

export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const quiz = await ctx.db
      .query('quizzes')
      .withIndex('by_slug_status')
      .filter(
        (q) =>
          q.eq(q.field('slug'), args.slug) && q.eq(q.field('status'), 'active')
      )
      .unique();
    if (!quiz) throw new ConvexError('Quiz not found');
    const questions = await ctx.db
      .query('questions')
      .withIndex('by_quiz')
      .filter((q) => q.eq(q.field('quizId'), quiz._id))
      .collect();
    return { ...quiz, questions };
  },
});

export const update = mutation({
  args: {
    id: v.id('quizzes'),
    title: v.string(),
    description: v.string(),
    slug: v.string(),
    status: quizStatusValidator,
  },
  handler: async (ctx, args) => {
    const { id, title = '', description = '', slug = '', status } = args;
    const identity = await ensureIdentity(ctx.auth);
    const quiz = await ctx.db.get(id);
    if (!quiz) throw new ConvexError('Quiz not found');
    if (quiz.ownerId !== identity.subject)
      throw new ConvexError('You are not authorized to modify this quiz.');

    // Fields set to undefined are removed
    await ctx.db.patch(id, { title, description, slug, status });
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
