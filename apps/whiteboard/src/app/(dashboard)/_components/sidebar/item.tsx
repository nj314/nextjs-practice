'use client';

import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { cn } from '@shared/utils';
import Image from 'next/image';

type Props = {
  id: string;
  name: string;
  imageUrl: string;
};

export function Item({ id, name, imageUrl }: Props) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;

  const handleClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Image
        alt={name}
        src={imageUrl}
        fill
        onClick={handleClick}
        className={cn(
          'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
          isActive && 'opacity-100'
        )}
      />
    </div>
  );
}
