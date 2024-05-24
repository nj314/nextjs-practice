'use client';
import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@shared/components/ui';
import { useMutation, useQuery } from 'convex/react';
import { QuizStatus } from 'convex/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { EditQuestionCard } from './EditQuestionCard';

export function EditQuizPage() {
  const quizId = useParams().quizId as Id<'quizzes'>;
  const [isOpen, setOpen] = useState(false);
  const quiz = useQuery(api.quiz.get, { id: quizId });
  const update = useMutation(api.quiz.update);
  const createQuestion = useMutation(api.question.create);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    await update({
      id: quizId,
      title: data.get('title') as string,
      slug: data.get('slug') as string,
      description: data.get('description') as string,
      status: data.get('status') as QuizStatus,
    });
    setOpen(false);
  };

  const handleCreateQuestion: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    if (!quiz) throw new Error('No quiz');
    await createQuestion({
      quizId: quiz._id,
      options: [{ title: 'Answer 1' }, { title: 'Answer 2' }],
      title: 'New question',
    });
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl">Edit quiz</h1>
        <div className="flex-grow overflow-auto">
          {quiz ? (
            <>
              <Card onClick={(e) => e.preventDefault()}>
                <CardHeader>
                  <CardTitle>
                    <div className="flex flex-col w-full max-w-sm gap-1.5">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={quiz.title}
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex flex-col w-full max-w-sm gap-1.5">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      type="text"
                      defaultValue={quiz.slug}
                    />
                  </div>
                  <div className="flex flex-col w-full max-w-sm gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Description here"
                      defaultValue={quiz.description}
                    />
                  </div>
                  <div className="flex flex-col w-full max-w-sm gap-1.5">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={quiz.status} name="status">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              {/* Questions section */}
              <section className="mt-4">
                <Button onClick={handleCreateQuestion}>New question</Button>
                <div className="flex flex-col gap-4 mt-4">
                  {quiz.questions.map((question) => (
                    <EditQuestionCard
                      key={question._id}
                      initialValues={question}
                    />
                  ))}
                </div>
              </section>
            </>
          ) : (
            'Loading quiz...'
          )}
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" asChild>
            <Link href="/admin">Cancel</Link>
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
