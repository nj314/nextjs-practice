import { authMiddleware } from '@clerk/nextjs';
import { NextMiddleware } from 'next/server';

export const middleware: NextMiddleware = (request, event) => {
  authMiddleware({})(request, event);
};

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
