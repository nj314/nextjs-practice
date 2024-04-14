import { OrganizationProfile } from '@clerk/nextjs';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@shared/components/ui';
import { Plus } from 'lucide-react';

export function InviteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
}
