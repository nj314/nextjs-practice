import { api } from '@convex/api';
import { Id } from '@convex/dataModel';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
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
import { useState } from 'react';

type Props = React.PropsWithChildren<{ id: Id<'quizzes'> }>;
export function EditQuizDialog({ children, id }: Props) {
  const [isOpen, setOpen] = useState(false);
  const quiz = useQuery(api.quiz.get, { id });
  const update = useMutation(api.quiz.update);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    await update({
      id,
      title: data.get('title') as string,
      slug: data.get('slug') as string,
      description: data.get('description') as string,
      status: data.get('status') as QuizStatus,
    });
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>Edit quiz</DialogHeader>
          <DialogDescription>Update a quiz's properties</DialogDescription>
          {quiz ? (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col w-full max-w-sm gap-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={quiz.title}
                  />
                </div>
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
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </>
          ) : (
            'Loading quiz...'
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
