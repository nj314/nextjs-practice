import { v } from 'convex/values';
import { query } from './_generated/server';

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const userId = identity.subject;

    const title = args.search;
    const boards = await (async function () {
      if (title) {
        // Query with search index
        return await ctx.db
          .query('boards')
          .withSearchIndex('search_title', (q) =>
            q.search('title', title).eq('orgId', args.orgId)
          )
          .collect();
      } else {
        return await ctx.db
          .query('boards')
          .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
          .order('desc')
          .collect();
      }
    })();

    const userFavoriteBoards = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_org', (q) =>
        q.eq('userId', userId).eq('orgId', args.orgId)
      )
      .collect();

    const boardsWithFavorites = boards.map((b) => ({
      ...b,
      isFavorite: userFavoriteBoards.some((f) => f.boardId === b._id),
    }));

    if (args.favorites) {
      return boardsWithFavorites.filter((b) => b.isFavorite);
    }

    return boardsWithFavorites;
  },
});
