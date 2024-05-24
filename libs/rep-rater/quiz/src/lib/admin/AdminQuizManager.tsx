'use client';
import { api } from '@convex/api';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { QuizManager } from '../components/QuizManager';

export function AdminQuizManager() {
  const quizzes = useQuery(api.quizzes.get, { isSuperUser: true });
  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push(`/admin/quizzes/${id}`);
  };
  if (!quizzes) return 'Loading...';
  return <QuizManager quizzes={quizzes} onEdit={handleEdit} />;
}
