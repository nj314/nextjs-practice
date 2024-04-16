import { useOthers, useSelf } from '@nextjs-practice/whiteboard-liveblocks';
import { UserAvatar } from './user-avatar';

const MAX_SHOWN_USERS = 2;

export function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map((user) => (
          <UserAvatar
            key={user.connectionId}
            src={user.info?.picture}
            name={user.info?.name}
            fallback={user.info?.name?.[0] || '?'}
          />
        ))}
      </div>
    </div>
  );
}

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
}
