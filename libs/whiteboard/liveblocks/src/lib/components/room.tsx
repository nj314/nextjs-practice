'use client';

import { ClientSideSuspense } from '@liveblocks/react';
import { RoomProvider } from '../liveblocks.config';

type Props = React.PropsWithChildren<{ roomId: string }>;

export function Room({ children, roomId }: Props) {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
