import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/** Clerk auth notes
 * Use auth().protect() if you want Clerk to return a 404 if the user does not have the role or permission.
 * Use auth().has() if you want more control over what your app does based on the authorization status.
 */

const isAdminRoute = createRouteMatcher(['(.*)/admin(.*)']);
const isPublicRoute = createRouteMatcher([]);

const middleware = clerkMiddleware((auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (isAdminRoute(req)) {
    auth().protect((has) => has({ permission: 'org:sys:manage' }));
  }

  // Require sign-in to access to nonpublic endpoints
  if (!auth().userId && !isPublicRoute(req)) {
    auth().redirectToSignIn();
  }

  return NextResponse.next();
});

export default middleware;

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
