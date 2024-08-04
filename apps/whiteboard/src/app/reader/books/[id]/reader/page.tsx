'use client';
import { useParams } from 'next/navigation';

export default function BookReaderPage() {
  const { id: bookId } = useParams();
  return <h1>Reading book {bookId}</h1>;
}
