import { v } from 'convex/values';
import { Doc, Id } from './_generated/dataModel';
import { QueryCtx, mutation, query } from './_generated/server';
import { ensureIdentity } from './utils';

export const create = mutation({
  args: {
    title: v.string(),
    sourceStorageId: v.id('_storage'),
    coverUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ensureIdentity(ctx.auth);
    console.log(
      `Creating document, "${args.title}"`,
      ctx.storage.getUrl(args.sourceStorageId)
    );
    const docId = await ctx.db.insert('documents', {
      title: args.title,
      ownerId: identity.subject,
      sourceStorageId: args.sourceStorageId,
      coverUrl: args.coverUrl,
      lastAccessTime: Number(new Date()),
    });
    return docId;
  },
});

async function getDocument(
  ctx: QueryCtx,
  args: { id: string; userId: string }
) {
  const doc = await ctx.db
    .query('documents')
    .withIndex('by_id', (q) => q.eq('_id', args.id as Id<'documents'>))
    .first();
  if (!doc) throw new Error('Document not found');
  if (doc.ownerId !== args.userId)
    throw new Error('You do not have permission to remove this document.');
  return doc;
}

export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const { subject: userId } = await ensureIdentity(ctx.auth);
    await getDocument(ctx, { id: args.id, userId });
    await ctx.db.delete(args.id as Id<'documents'>);
  },
});

export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    sourceStorageId: v.optional(v.id('_storage')),
    summaryStorageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { subject: userId } = await ensureIdentity(ctx.auth);
    await getDocument(ctx, { id: args.id, userId });
    const patch: Partial<Doc<'documents'>> = {};
    if (args.title) {
      const TITLE_MAX_LENGTH = 60;
      if (args.title.length > TITLE_MAX_LENGTH)
        throw new Error(
          `Title cannot be more than ${TITLE_MAX_LENGTH} characters`
        );
      patch.title = args.title;
    }
    if (args.sourceStorageId) {
      patch.sourceStorageId = args.sourceStorageId;
    }
    if (args.summaryStorageId) {
      patch.sourceStorageId = args.sourceStorageId;
    }

    await ctx.db.patch(args.id, patch);
  },
});

export const get = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const { subject: userId } = await ensureIdentity(ctx.auth);
    const document = await getDocument(ctx, { id: args.id, userId });
    return document;
  },
});

export const getSourceUrl = query({
  args: { documentId: v.string() },
  handler: async (ctx, args) => {
    const { subject: userId } = await ensureIdentity(ctx.auth);
    const document = await getDocument(ctx, { id: args.documentId, userId });
    return ctx.storage.getUrl(document.sourceStorageId);
  },
});
