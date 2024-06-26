import { CreateOrganization } from '@clerk/nextjs';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@shared/components/ui';

export function EmptyOrg() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Welcome to Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg"> Create organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
