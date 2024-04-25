import { useOthers, useSelf } from '@nextjs-practice/whiteboard-liveblocks';
import { connectionIdToColor } from '@shared/utils';
import { UserAvatar } from './user-avatar';

const MAX_SHOWN_USERS = 2;

export function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white dark:bg-black rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-[-8pjkjx]">
        {users.slice(0, MAX_SHOWN_USERS).map((user) => (
          <UserAvatar
            borderColor={connectionIdToColor(user.connectionId)}
            key={user.connectionId}
            src={user.info?.picture}
            name={user.info?.name}
            fallback={user.info?.name?.[0] || '?'}
          />
        ))}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            key={currentUser.connectionId}
            src={currentUser.info?.picture}
            name={currentUser.info?.name}
            fallback={currentUser.info?.name?.[0] || '?'}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar name={`${users.length - MAX_SHOWN_USERS} more`} />
        )}
      </div>
    </div>
  );
}

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white dark:bg-black rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
}
