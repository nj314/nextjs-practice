'use client';
import { Button } from '@shared/components/ui';
import type { JSX } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { actionEnqueueDocumentSummaryJob } from '../../../../actions';

export default function ProcessDocument() {
  const formStatus = useFormStatus();
  const [ui, action] = useFormState<JSX.Element | null>(async () => {
    await actionEnqueueDocumentSummaryJob();
    return <span>Successfully started summarization job</span>;
  }, <span>Empty</span>);

  return (
    <main className="px-5 flex flex-col items-center justify-center w-full h-full">
      {ui}
      <form action={action}>
        <Button disabled={formStatus.pending}>Summarize document</Button>
      </form>
    </main>
  );
}
