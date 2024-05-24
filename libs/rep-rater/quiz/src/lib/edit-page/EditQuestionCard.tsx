import { api } from '@convex/api';
import { Doc } from '@convex/dataModel';
import { ConfirmModal } from '@shared/components/modals';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui';
import { useMutation } from 'convex/react';
import { Trash } from 'lucide-react';

type Props = {
  initialValues: Doc<'questions'>;
};
export function EditQuestionCard({ initialValues: question }: Props) {
  const remove = useMutation(api.question.remove);
  const handleRemove = async () => {
    await remove({ id: question._id });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{question.title}</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <ul>
          {question.options.map((o) => (
            <li key={o.id}>{o.title}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-end">
        <ConfirmModal
          onConfirm={handleRemove}
          header="Delete this question?"
          description={`Are you sure you want to delete the question, "${question.title}"?`}
        >
          <Button size="icon" variant="ghost" aria-label="Delete question">
            <Trash className="text-red-500" />
          </Button>
        </ConfirmModal>
      </CardFooter>
    </Card>
  );
}
