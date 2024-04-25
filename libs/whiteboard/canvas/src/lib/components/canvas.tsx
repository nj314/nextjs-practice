'use client';

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from '@nextjs-practice/whiteboard-liveblocks';
import React, { useCallback, useState } from 'react';
import { Camera, CanvasMode, CanvasState } from '../types';
import { pointerEventToCanvasPoint } from '../utils';
import { CursorsPresence } from './cursors-presence';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

type Props = {
  boardId: string;
};

export function Canvas({ boardId }: Props) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handleWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const handlePointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    []
  );

  const handlePointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      setMyPresence({ cursor: null });
    },
    []
  );

  return (
    <main className="h-full w-full relative bg-neutral-100 dark:bg-neutral-800 touch-none">
      <Info boardId={boardId} />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={history.undo}
        onRedo={history.redo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={handleWheel}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
      <Participants />
    </main>
  );
}
