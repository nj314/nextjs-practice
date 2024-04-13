'use client';

import { UserButton } from '@clerk/nextjs';

export default function Index() {
  return (
    <div className="flex flex-col gap-2 items-start">
      {/* <Authenticated>Logged in</Authenticated>
      <Unauthenticated>Logged out</Unauthenticated>
      <AuthLoading>Still loading</AuthLoading> */}

      <div>This screen is for authenticated users only</div>
      <UserButton />
    </div>
  );
}
