import { useAuth } from '@clerk/nextjs';
import { api } from '@convex/api';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea,
} from '@shared/components/ui';
import { useMutation } from 'convex/react';
import { useState } from 'react';

type Props = React.PropsWithChildren;
export function NewQuizDialog({ children }: Props) {
  const [isOpen, setOpen] = useState(false);
  const create = useMutation(api.quiz.create);
  const { orgId } = useAuth();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    if (!orgId) {
      console.error('No org id');
      return;
    }
    await create({
      formValues: {
        orgId,
        title: data.get('title') as string,
        slug: data.get('slug') as string,
        description: data.get('description') as string,
      },
    });
    setOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>New quiz</DialogTitle>
            <DialogDescription>Create a new quiz</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" type="text" name="title" />
            </div>
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" type="text" name="slug" />
            </div>
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description here"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
