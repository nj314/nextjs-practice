'use client';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { Button } from '@nextjs-practice/shared';
import { cn } from '@nextjs-practice/shared/utils';
import { LayoutDashboard, Star } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export function OrgSidebar() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get('favorites');

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 text-red border-gray-">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image alt="logo" src="/logo-sm.png" height={60} width={60} />
          <span className={cn('font-semibold text-2xl', font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: 'flex justify-center items-center w-full',
            organizationSwitcherTrigger:
              'p-1.5 w-full rounded-lg border border-solid border-gray-300 dark:border-gray-700 justify-between dark:text-white',
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size="lg"
          variant={favorites ? 'ghost' : 'secondary'}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant={favorites ? 'secondary' : 'ghost'}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={{ pathname: '/', query: { favorites: true } }}>
            <Star className="h-4 w-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
}
