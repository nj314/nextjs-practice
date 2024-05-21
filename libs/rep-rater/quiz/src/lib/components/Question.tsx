import { Doc } from '@convex/dataModel';
import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@shared/components/ui';

type Props = {
  onMove?: (direction: 'previous' | 'next') => void;
  question: Doc<'questions'>;
};

export function Question({ onMove, question }: Props) {
  return (
    <div className="flex flex-col">
      <h1>{question.title}</h1>
      <RadioGroup>
        {question.options.map((option) => (
          <div className="flex items-center space-x-2" key={option.id}>
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id}>{option.title}</Label>
          </div>
        ))}
      </RadioGroup>
      {onMove && (
        <div className="flex">
          <Button onClick={() => onMove('previous')}>Previous</Button>
          <Button onClick={() => onMove('next')}>Next</Button>
        </div>
      )}
    </div>
  );
}
