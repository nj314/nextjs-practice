'use client';
import { Button, Slider } from '@shared/components/ui';
import { HydratedSummary } from 'convex/document';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

type Props = { summaries: HydratedSummary[] };
export function BookReaderPageClient({ summaries }: Props) {
  const [zoomLevel, setZoomLevel] = useState(0);
  const MAX_ZOOM = 0;
  const MIN_ZOOM = -1 * (summaries.length - 1);

  return (
    <div className=" w-full h-full">
      <header className="flex flex-row justify-center drop-shadow-3 sticky pr-3 py-1">
        <div className="flex flex-row min-w-[40%] items-center gap-3">
          <Button
            disabled={zoomLevel === MIN_ZOOM}
            onClick={() => setZoomLevel(Math.max(MIN_ZOOM, zoomLevel - 1))}
            variant="ghost"
          >
            <ZoomOut />
          </Button>
          <Slider
            onChange={(e) => console.log(e)}
            value={[zoomLevel]}
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={1}
          />
          <Button
            disabled={zoomLevel === MAX_ZOOM}
            onClick={() => setZoomLevel(Math.min(MAX_ZOOM, zoomLevel + 1))}
            variant="ghost"
          >
            <ZoomIn />
          </Button>
        </div>
      </header>
      <main>
        <div
          className="mx-auto px-5 py-3 w-full max-w-[600px] [&_p]:my-4"
          dangerouslySetInnerHTML={{
            __html: summaries[zoomLevel * -1].content,
          }}
        />
      </main>
    </div>
  );
}
