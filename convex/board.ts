import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { ensureIdentity } from './utils';

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ensureIdentity(ctx);
    const board = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: user.id,
      authorName: user.fullName ?? user.username ?? 'Unknown author',
      imageUrl: '',
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const user = await ensureIdentity(ctx);
    const userId = user.id;

    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q.eq('userId', userId).eq('boardId', args.id)
      )
      .unique();
    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id('boards'), title: v.string() },
  handler: async (ctx, args) => {
    // TODO auth here
    const user = await ensureIdentity(ctx);

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

export const favorite = mutation({
  args: { id: v.id('boards'), orgId: v.string() },
  handler: async (ctx, args) => {
    const user = await ensureIdentity(ctx);

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error('Board not found');

    const userId = user.id;
    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board_org', (q) =>
        q.eq('userId', userId).eq('boardId', board._id).eq('orgId', args.orgId)
      )
      .unique();

    if (existingFavorite) throw new Error('Board already favorited');

    await ctx.db.insert('userFavorites', {
      userId,
      boardId: args.id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id('boards'), orgId: v.string() },
  handler: async (ctx, args) => {
    const user = await ensureIdentity(ctx);

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error('Board not found');

    const userId = user.id;
    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q.eq('userId', userId).eq('boardId', board._id)
      )
      .unique();

    if (!existingFavorite) throw new Error('Favorited board not found');

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});

export const get = query({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  },
});
