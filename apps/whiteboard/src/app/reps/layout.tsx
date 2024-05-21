import { TopNavBar } from '@nextjs-practice/rep-rater-shared';

export default function RepsLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col w-full">
      <TopNavBar />
      {children}
    </div>
  );
}
