import { query } from './_generated/server';
import { ensureIdentity } from './utils';

export const get = query({
  // args: {
  // orgId: v.string(),
  // search: v.optional(v.string()),
  // },
  handler: async (ctx, args) => {
    const { subject: userId } = await ensureIdentity(ctx.auth);

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_owner', (q) => q.eq('ownerId', userId))
      .order('desc')
      .collect();

    return documents;
  },
});
