'use client';

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from '@clerk/nextjs';
import { ThemeModeToggle } from '@shared/components/theme';
import { InviteButton } from './invite-button';
import { SearchInput } from './search-input';

export function Navbar() {
  const { organization } = useOrganization();

  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>

      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: 'flex justify-center items-center w-full max-w-[376px]',
              organizationSwitcherTrigger:
                'p-1.5 w-full rounded-lg border border-solid border-gray-300 dark:border-gray-700 justify-between dark:text-white',
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <ThemeModeToggle />
      <UserButton />
    </div>
  );
}
