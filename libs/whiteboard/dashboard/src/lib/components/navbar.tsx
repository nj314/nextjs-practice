'use client';

import { UserButton } from '@clerk/nextjs';
import { ThemeModeToggle } from '@shared/components/theme';
import { SearchInput } from './search-input';

export function Navbar() {
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <ThemeModeToggle />
      <UserButton />
    </div>
  );
}
