import { ConvexError, v } from 'convex/values';
import { query } from './_generated/server';

export const get = query({
  args: {
    orgId: v.optional(v.string()),
    isSuperUser: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await ctx.auth.getUserIdentity();

    if (args.orgId) {
      return await ctx.db
        .query('quizzes')
        .withIndex('by_org', (q) => q.eq('ownerOrgId', args.orgId ?? ''))
        .collect();
    } else if (args.isSuperUser) {
      return await ctx.db.query('quizzes').collect();
    }
    throw new ConvexError('Bad request');
  },
});
