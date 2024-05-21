'use client';
import { UserButton } from '@clerk/nextjs';
import { ThemeModeToggle } from '@shared/components/theme';
import { Button } from '@shared/components/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TopNavBar() {
  const pathname = usePathname();
  // const { organization } = useOrganization();
  const getLinkProps = (path: string) => {
    return {
      className: pathname === path ? 'text-blue-500' : '',
      href: path,
    };
  };

  return (
    <nav className="flex bg-slate-300 dark:bg-slate-900 items-center py-1 px-4 gap-2">
      <h1 className="text-xl font-bold">
        <span aria-hidden>🇺🇸</span> Rep Quiz
      </h1>
      <ul className="flex gap-2 grow">
        <li>
          <Button variant="ghost" asChild>
            <Link {...getLinkProps('/reps')}>Home</Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" asChild>
            <Link {...getLinkProps('/reps/quiz')}>Quiz</Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" asChild disabled>
            <Link {...getLinkProps('/reps/results}')}>Results</Link>
          </Button>
        </li>
      </ul>
      <div className="flex items-center gap-x-4">
        <div className="block flex-1">
          {/* <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox:
                  'flex justify-center items-center w-full max-w-[376px]',
                organizationSwitcherTrigger:
                  'p-1.5 w-full rounded-lg border border-solid border-gray-300 dark:border-gray-700 justify-between dark:text-white',
              },
            }}
          /> */}
        </div>
        {/* {organization && <InviteButton />} */}
        <ThemeModeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
