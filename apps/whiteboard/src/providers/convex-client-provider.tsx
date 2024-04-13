'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { Loading } from '@nextjs-practice/shared';
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);
const PUBLISHABLE_KEY =
  'pk_test_Y2FwaXRhbC1idWNrLTM2LmNsZXJrLmFjY291bnRzLmRldiQ';

type Props = React.PropsWithChildren;
export function ConvexClientProvider({ children }: Props) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
