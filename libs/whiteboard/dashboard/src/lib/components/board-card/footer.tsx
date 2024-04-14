import { cn } from '@shared/utils';
import { Star } from 'lucide-react';
import React from 'react';

type Props = {
  isFavorite?: boolean;
  title: string;
  authorLabel: string;
  createdAtlabel: string;
  onClick: () => void;
  disabled?: boolean;
};
export function Footer({
  isFavorite,
  title,
  authorLabel,
  createdAtlabel,
  onClick,
  disabled,
}: Props) {
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault(); // prevent redirect
    onClick();
  };
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtlabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
          disabled && 'cursor-not-allowed opacity-75',
          !isFavorite && 'opacity-0 group-hover:opacity-100'
        )}
      >
        <Star
          className={cn('h-4 w-4', isFavorite && 'fill-blue-600 text-blue-600')}
        />
      </button>
    </div>
  );
}
