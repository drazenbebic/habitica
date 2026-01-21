'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

const links = [
  { href: '/docs', label: 'Docs' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/faq', label: 'FAQ' },
];

export const Navigation: FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

  return (
    <nav className={clsx('flex items-center gap-6', className)}>
      {links.map(({ href, label }) => {
        const isActive =
          href === '/' ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'text-sm font-medium transition-colors hover:text-violet-600',
              isActive ? 'text-violet-600' : 'text-slate-600',
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
