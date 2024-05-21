import { Auth } from 'convex/server';

export async function ensureIdentity(auth: Auth) {
  const identity = await auth.getUserIdentity();
  if (!identity) throw new Error('Unauthorized');
  return identity;
}
