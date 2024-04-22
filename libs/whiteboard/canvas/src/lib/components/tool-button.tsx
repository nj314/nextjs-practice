'use client';

import { Button, Hint } from '@shared/components/ui';
import { ReactNode } from 'react';

type Props = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

export function ToolButton({
  label,
  icon,
  onClick,
  isActive,
  isDisabled,
}: Props) {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? 'boardActive' : 'board'}
      >
        {icon}
      </Button>
    </Hint>
  );
}
