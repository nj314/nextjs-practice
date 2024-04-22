'use client';

import {
  useCanRedo,
  useCanUndo,
  useHistory,
} from '@nextjs-practice/whiteboard-liveblocks';
import { useState } from 'react';
import { CanvasMode, CanvasState } from '../types';
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
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={history.undo}
        onRedo={history.redo}
      />
      <Participants />
    </main>
  );
}
