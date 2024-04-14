import { Room } from '@nextjs-practice/whiteboard-liveblocks';
import { Canvas } from './components/canvas';

type Props = {
  params: {
    boardId: string;
  };
};

export function CanvasPage({ params }: Props) {
  return (
    <Room roomId={params.boardId}>
      <Canvas boardId={params.boardId} />;
    </Room>
  );
}
