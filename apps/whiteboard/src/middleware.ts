import { authMiddleware } from '@clerk/nextjs';

const middleware = authMiddleware({});

export default middleware;

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
