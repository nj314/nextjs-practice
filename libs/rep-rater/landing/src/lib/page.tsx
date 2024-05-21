import { Button } from '@shared/components/ui';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="">
      <section className="bg-blue-950 text-white mx-auto flex flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight md:text-5xl lg:leading-[1.1]">
          How are you represented?
        </h1>
        <span className="text-center text-lg font-light text-foreground inline-block align-top decoration-inherit max-w-[494px]">
          The House decides the future of fossil fuels, immigration, foreign
          aid, tax breaks, and more. Use this as a guide to understand how well
          they represent you.
        </span>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Button variant="secondary" asChild>
            <Link href="./reps/quiz">Get started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
