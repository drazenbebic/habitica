import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import { NavigationUser } from '@/components/NavigationUser';
import { UserMenu } from '@/components/UserMenu';

export const Header: FC = () => {
  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full',
        'border-b border-slate-200 bg-white/80 backdrop-blur-md',
        'transition-all duration-200',
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20 ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <Image
              src="/octogriffin_white.png"
              alt="Habitica Sync Logo"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </div>
          <span className="hidden font-bold tracking-tight text-slate-900 sm:block">
            Habitica Sync
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <NavigationUser>
            <UserMenu />
          </NavigationUser>
        </div>
      </div>
    </header>
  );
};
