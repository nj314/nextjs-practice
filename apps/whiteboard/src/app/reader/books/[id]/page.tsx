'use client';
import { useParams } from 'next/navigation';

export default function BookHomePage() {
  const { id: bookId } = useParams();
  return <h1>Welcome to BookHomePage for book {bookId}</h1>;
}
