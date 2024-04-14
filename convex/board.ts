import { Auth } from 'convex/server';
import { v } from 'convex/values';
import { mutation } from './_generated/server';

async function ensureIdentity(auth: Auth) {
  const identity = await auth.getUserIdentity();
  if (!identity) throw new Error('Unauthorized');
  return identity;
}

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ensureIdentity(ctx.auth);
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
    const identity = await ensureIdentity(ctx.auth);

    // TODO later check to delete favorite relation as well
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id('boards'), title: v.string() },
  handler: async (ctx, args) => {
    // TODO auth here
    const identity = await ensureIdentity(ctx.auth);

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
    const identity = await ensureIdentity(ctx.auth);

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error('Board not found');

    const userId = identity.subject;
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
    const identity = await ensureIdentity(ctx.auth);

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error('Board not found');

    const userId = identity.subject;
    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex(
        'by_user_board',
        (q) => q.eq('userId', userId).eq('boardId', board._id)
        // is boardId needed here?
      )
      .unique();

    if (!existingFavorite) throw new Error('Favorited board not found');

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
