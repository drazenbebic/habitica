'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { docsNavigation } from '@/config/docsNavigation';

export const DocsSidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <div className="flex flex-col gap-8">
        {docsNavigation.map(section => (
          <div key={section.title}>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </h4>
            <ul className="flex flex-col gap-1">
              {section.items.map(item => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        'group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                        isActive
                          ? 'bg-violet-50 text-violet-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                      )}
                    >
                      <span
                        className={clsx(
                          'transition-colors',
                          isActive
                            ? 'text-violet-600'
                            : 'text-slate-400 group-hover:text-slate-600',
                        )}
                      >
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};
