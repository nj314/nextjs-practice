import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { quizStatusValidator } from './utils';

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index('by_org', ['orgId'])
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['orgId'],
    }),
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id('boards'),
  })
    .index('by_board', ['boardId'])
    .index('by_user_org', ['userId', 'orgId'])
    .index('by_user_board', ['userId', 'boardId'])
    .index('by_user_board_org', ['userId', 'boardId', 'orgId']),
  quizzes: defineTable({
    ownerId: v.string(),
    ownerOrgId: v.string(),
    title: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    status: quizStatusValidator,
  })
    .index('by_slug_status', ['slug', 'status'])
    .index('by_org', ['ownerOrgId'])
    .index('by_owner', ['ownerId']),
  questions: defineTable({
    quizId: v.id('quizzes'),
    title: v.string(),
    options: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        isDisabled: v.optional(v.boolean()),
      })
    ),
  }).index('by_quiz', ['quizId']),
});
