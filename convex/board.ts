import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');

    const board = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name ?? identity.nickname ?? 'Unknown author',
      imageUrl: '',
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');

    // TODO later check to delete favorite relation as well
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id('boards'), title: v.string() },
  handler: async (ctx, args) => {
    // TODO auth here
    const TITLE_MAX_LENGTH = 60;
    const title = args.title.trim();
    if (!title) throw new Error('Title is required');
    if (title.length > TITLE_MAX_LENGTH)
      throw new Error(
        `Title cannot be more than ${TITLE_MAX_LENGTH} characters`
      );

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});
