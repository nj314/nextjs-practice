import { cn } from '@shared/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

type Props = React.ComponentProps<typeof TooltipContent> & {
  label: string;
};

export function Hint({ label, children, ...tooltipContentProps }: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          {...tooltipContentProps}
          className={cn(
            'text-white bg-black border-black',
            tooltipContentProps.className
          )}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
