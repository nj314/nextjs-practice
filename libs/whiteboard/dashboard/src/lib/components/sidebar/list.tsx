'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { Item } from './item';

export function List() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.count) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((membership) => (
        <Item
          id={membership.organization.id}
          key={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
}
