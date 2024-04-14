'use client';

import { RenameModal } from '@shared/components/modals';
import { useEffect, useState } from 'react';

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensures that this component is only ever rendered on the client side
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <RenameModal />
    </>
  );
}
