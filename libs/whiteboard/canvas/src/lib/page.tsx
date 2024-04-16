import { Room } from '@nextjs-practice/whiteboard-liveblocks';
import { Canvas } from './components/canvas';
import { Loading } from './components/loading';

type Props = {
  params: {
    boardId: string;
  };
};

export function CanvasPage({ params }: Props) {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
