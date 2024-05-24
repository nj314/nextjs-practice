'use client';

import { api } from '@convex/api';
import { Loading } from '@shared/components/ui';
import { useQuery } from 'convex/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { QuestionSection } from '../components/QuestionSection';
import { QUIZ_SLUGS } from '../constants';

type Props = {
  /**
   * Search params are always strings!
   */
  searchParams: {};
};

export const QuizPage: NextPage<Props> = ({ searchParams }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const quiz = useQuery(api.quiz.getBySlug, {
    slug: QUIZ_SLUGS.reps,
  });

  if (!quiz) {
    return <Loading />;
  }

  const question = quiz.questions[questionIndex];

  return (
    <div>
      <h2 className="text-xl font-bold">{quiz.title}</h2>
      <span className="block font-light">{quiz.description}</span>
      {question ? (
        <QuestionSection
          question={question}
          onMove={(delta) => setQuestionIndex((q) => q + delta)}
        />
      ) : (
        'No question found'
      )}
    </div>
  );
};
