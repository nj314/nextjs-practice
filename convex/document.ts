import { v } from 'convex/values';
import { api } from './_generated/api';
import { Doc, Id } from './_generated/dataModel';
import { QueryCtx, action, mutation, query } from './_generated/server';
import { zoomLevelSchema } from './schema';
import { ensureIdentity } from './utils';

export const create = mutation({
  args: {
    title: v.string(),
    sourceStorageId: v.id('_storage'),
    coverUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ensureIdentity(ctx);
    console.log(
      `Creating document, "${args.title}"`,
      ctx.storage.getUrl(args.sourceStorageId)
    );
    const docId = await ctx.db.insert('documents', {
      title: args.title,
      ownerId: user.id,
      sourceStorageId: args.sourceStorageId,
      coverUrl: args.coverUrl,
      lastAccessTime: Number(new Date()),
      summaries: [],
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
    const { id: userId } = await ensureIdentity(ctx);
    await getDocument(ctx, { id: args.id, userId });
    await ctx.db.delete(args.id as Id<'documents'>);
  },
});

export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    sourceStorageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const { id: userId } = await ensureIdentity(ctx);
    const doc = await getDocument(ctx, { id: args.id, userId });
    console.log('Original doc', doc);
    doc.lastAccessTime = Number(new Date());
    if (args.title) {
      const TITLE_MAX_LENGTH = 60;
      if (args.title.length > TITLE_MAX_LENGTH)
        throw new Error(
          `Title cannot be more than ${TITLE_MAX_LENGTH} characters`
        );
      doc.title = args.title;
    }
    if (args.sourceStorageId) {
      doc.sourceStorageId = args.sourceStorageId;
    }

    console.log('Writing document to db:', doc);

    await ctx.db.patch(args.id, doc);
  },
});

export const upsertSummary = mutation({
  args: {
    id: v.id('documents'),
    zoomLevel: zoomLevelSchema,
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const { id: userId } = await ensureIdentity(ctx);
    const doc = await getDocument(ctx, { id: args.id, userId });
    await ctx.db.patch(args.id, {
      summaries: [
        ...doc.summaries.filter((s) => s.zoomLevel !== args.zoomLevel),
        { zoomLevel: args.zoomLevel, storageId: args.storageId },
      ],
    });
  },
});

export const get = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const { id: userId } = await ensureIdentity(ctx);
    const document = await getDocument(ctx, { id: args.id, userId });
    return document;
  },
});

export const getSourceUrl = query({
  args: { documentId: v.string() },
  handler: async (ctx, args) => {
    const { sourceStorageId } = await get(ctx, { id: args.documentId });
    if (!sourceStorageId) throw new Error('No source storage id');
    return ctx.storage.getUrl(sourceStorageId);
  },
});

export const getSummaries = action({
  args: { id: v.string() },
  handler: async (ctx, args): Promise<Array<HydratedSummary>> => {
    const { summaries, sourceStorageId } = await ctx.runQuery(
      api.document.get,
      { id: args.id }
    );
    summaries.unshift({ zoomLevel: 'original', storageId: sourceStorageId });
    const hydratedSummaries = (
      await Promise.all(
        summaries.map(async (s) => {
          const url = (await ctx.storage.getUrl(s.storageId)) || '';
          const content = url ? await (await fetch(url)).text() : '';
          return { ...s, content };
        })
      )
    ).filter((s) => s.content);

    return hydratedSummaries;
  },
});

type Summary = Doc<'documents'>['summaries'][number];
export type HydratedSummary = Summary & {
  content: string;
};

export type ZoomLevel = Summary['zoomLevel'];
