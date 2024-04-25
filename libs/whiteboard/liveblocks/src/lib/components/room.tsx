'use client';

import { ClientSideSuspense } from '@liveblocks/react';
import { RoomProvider } from '../liveblocks.config';

type Props = React.PropsWithChildren<{
  roomId: string;
  fallback: React.ReactNode;
}>;

export function Room({ children, fallback = null, roomId }: Props) {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
