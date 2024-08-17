'use client';
import { api } from '@convex/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shared/components/ui';
import { useQuery } from 'convex/react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MyLibraryPage() {
  const books = useQuery(api.documents.get, {});
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">My Library</h1>
        <div className="ml-auto flex flex-row">
          <Link href="/reader/books/add">
            <Button variant="default">Add book</Button>
          </Link>
        </div>
      </div>
      {books && books.length > 0 && (
        <div className="flex flex-1 flex-wrap" role="list">
          {books.map((book) => (
            <Link
              href={`/reader/books/${book._id}`}
              key={book._id}
              role="listitem"
            >
              <Card>
                <CardHeader>
                  {book.coverUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={book.coverUrl}
                      alt="cover art"
                      width={200}
                      height={200}
                      className="bg-slate-500"
                    />
                  )}
                </CardHeader>
                <CardContent>
                  <CardTitle>
                    {book.title}{' '}
                    {book.summaries.length && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CheckCircle name="check mark" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {book.summaries.length} AI summaries available
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!books && (
        <div
          className="flex flex-1 items-center justify-center"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Loading...</h3>
          </div>
        </div>
      )}

      {books && books.length === 0 && (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no books
            </h3>
            <p className="text-sm text-muted-foreground">
              Start by adding a book.
            </p>
            <Link href="/reader/books/add" className="mt-4">
              <Button>Add Book</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
