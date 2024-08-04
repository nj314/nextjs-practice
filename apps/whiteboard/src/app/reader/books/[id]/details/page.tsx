'use client';
import { useParams } from 'next/navigation';

export default function BookDetailsPage() {
  const { id: bookId } = useParams();
  return <h1>Reading book {bookId}</h1>;
}
