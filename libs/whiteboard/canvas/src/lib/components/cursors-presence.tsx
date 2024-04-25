'use client';

import {
  useOther,
  useOthersConnectionIds,
} from '@nextjs-practice/whiteboard-liveblocks';
import { connectionIdToColor } from '@shared/utils';
import { MousePointer2 } from 'lucide-react';
import { memo, useMemo } from 'react';

type CursorProps = { connectionId: number };
const Cursor = memo(({ connectionId }: CursorProps) => {
  const color = useMemo(
    () => connectionIdToColor(connectionId),
    [connectionId]
  );
  const cursor = useOther(connectionId, (user) => user?.presence.cursor);
  const info = useOther(connectionId, (user) => user?.info);
  const name = info?.name ?? 'Teammate';

  if (!cursor) return null;

  const { x, y } = cursor;
  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        // transition: 'transform 0.25s',
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: color,
          color,
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

function Cursors() {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
}

export const CursorsPresence = memo(() => {
  return (
    <>
      {/* TODO: draft pencil component */}
      <Cursors />
    </>
  );
});
