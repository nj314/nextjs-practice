import { Canvas } from './components/canvas';

type Props = {
  params: {
    boardId: string;
  };
};

export function CanvasPage({ params }: Props) {
  return <Canvas boardId={params.boardId} />;
}
