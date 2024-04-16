import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Hint,
} from '@shared/components/ui';

type Props = {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
};

export function UserAvatar({
  src,
  name = 'Teammate',
  fallback,
  borderColor,
}: Props) {
  return (
    <Hint label={name} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}
