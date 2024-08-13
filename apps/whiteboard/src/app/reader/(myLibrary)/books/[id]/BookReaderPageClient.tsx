'use client';
import { UserButton } from '@clerk/nextjs';
import { Button, Slider } from '@shared/components/ui';
import { ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Book } from '../../../constants';
import { mockBook } from './mocks';

export function BookReaderPageClient({ summary }: { summary: string }) {
  'use client';
  const book: Book = { ...mockBook };
  const [_, summaryContent] = book.contents;
  if (summary) summaryContent.value = summary;
  const [zoomLevel, setZoomLevel] = useState(0);
  const MAX_ZOOM = 0;
  const MIN_ZOOM = -1 * (book.contents.length - 1);

  return (
    <div className="dark:bg-zinc-950 w-full h-full">
      <header className="flex flex-row justify-between drop-shadow-3 dark:bg-zinc-900 sticky pr-3 py-1">
        <Link href="/reader" className="flex flex-row items-center p-2 gap-2">
          <ArrowLeft />
          Back
        </Link>
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
        <UserButton />
      </header>
      <main>
        <div
          className="mx-auto px-5 py-3 w-full max-w-[400px]"
          dangerouslySetInnerHTML={{
            __html: book.contents[zoomLevel * -1].value,
          }}
        />
      </main>
    </div>
  );
}
