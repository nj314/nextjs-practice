'use client';

import { Input } from '@shared';
import { Search } from 'lucide-react';

export function SearchInput() {
  // useDebounceCallback();
  // useRouter();
  // qs;
  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
      />
    </div>
  );
}
