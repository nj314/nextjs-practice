import { LucideProps, Telescope } from 'lucide-react';

export const AppIcon = (props: LucideProps) => {
  return <Telescope {...props} />;
};

export const APP_NAME = 'Scope';

export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  contents: Array<{
    type: string;
    value: string;
  }>;
};
