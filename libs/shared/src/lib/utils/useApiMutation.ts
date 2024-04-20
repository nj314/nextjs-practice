'use client';
import { ReactMutation, useMutation } from 'convex/react';
import { FunctionReference } from 'convex/server';

import { useState } from 'react';

export function useApiMutation<Mutation extends FunctionReference<'mutation'>>(
  ...args: Parameters<typeof useMutation<Mutation>>
) {
  const [mutationFunction] = args;
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation<Mutation>(mutationFunction);

  const mutate: ReactMutation<Mutation> = async (...args) => {
    setPending(true);
    try {
      return await apiMutation(...args);
    } finally {
      setPending(false);
    }
  };

  mutate.withOptimisticUpdate = apiMutation.withOptimisticUpdate;

  return { mutate, pending };
}
