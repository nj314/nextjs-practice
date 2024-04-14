import { auth, currentUser } from '@clerk/nextjs';
import { api } from '@convex/api';
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? '');

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_API_SECRET_KEY ?? '',
});

export async function POST(req: Request) {
  const authorization = auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response('Unauthorized', { status: 403 });
  }

  const { room: roomId } = await req.json();
  const board = await convex.query(api.board.get, { id: roomId });

  console.log('AUTH_INFO', {
    roomId,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
    userName: user.firstName,
    userPicture: user.imageUrl,
  });

  if (board?.orgId !== authorization.orgId) {
    return new Response('Unauthorized', { status: 403 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.firstName || 'Anonymous',
      picture: user.imageUrl ?? '',
    },
  });

  if (roomId) {
    session.allow(roomId, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
