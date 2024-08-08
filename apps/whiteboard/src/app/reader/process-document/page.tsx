'use client';
import type { JSX } from 'react';
import { useFormState } from 'react-dom';
import { chatWithAgent } from '../../actions';

export default function ProcessDocument() {
  const [ui, action] = useFormState<JSX.Element | null>(async () => {
    const response = await chatWithAgent('hello!', []);
    return <>{response}</>;
  }, <span>Initializing...</span>);

  return (
    <main>
      {ui}
      <form action={action}>
        <button>Chat</button>
      </form>
    </main>
  );
}
