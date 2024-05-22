'use client';
import { api } from '@convex/api';
import { Doc } from '@convex/dataModel';
import { ConfirmModal } from '@shared/components/modals';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/components/ui';
import { useMutation, useQuery } from 'convex/react';
import { Pencil, Trash } from 'lucide-react';
import { EditQuizDialog } from './EditQuizDialog';
import { NewQuizDialog } from './NewQuizDialog';

type Props = { quizzes: Array<Doc<'quizzes'>> };
export function QuizManager({ quizzes }: Props) {
  const remove = useMutation(api.quiz.remove);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="grow" />
        <div className="flex gap-2">
          <NewQuizDialog>
            <Button>New quiz</Button>
          </NewQuizDialog>
        </div>
      </div>
      <Table>
        {/* <TableCaption>List of quizzes</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz._id}>
              <TableCell className="font-medium">
                <pre className="bg-gray-100 text-xs">{quiz._id}</pre>
              </TableCell>
              <TableCell className="whitespace-nowrap">{quiz.slug}</TableCell>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.status}</TableCell>
              <TableCell>
                {new Date(quiz._creationTime).toISOString()}
              </TableCell>
              <TableCell className="text-right flex">
                <EditQuizDialog id={quiz._id}>
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                </EditQuizDialog>
                <ConfirmModal
                  header={`Are you sure you want to delete "${quiz.title}"?`}
                  description="This cannot be undone."
                  onConfirm={() => remove({ id: quiz._id })}
                >
                  <Button variant="outline" size="icon">
                    <Trash className="text-red-500" />
                  </Button>
                </ConfirmModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function AdminQuizManager() {
  const quizzes = useQuery(api.quizzes.get, { isSuperUser: true });
  if (!quizzes) return 'Loading...';
  return <QuizManager quizzes={quizzes} />;
}
