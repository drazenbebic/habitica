import React, { FC, forwardRef } from 'react';

import { Tab as BaseTab, TabProps } from '@ariakit/react';
import clsx from 'clsx';

type TabItemProps = TabProps & {
  href: string;
  icon: FC<{ size: number; className?: string }>;
};

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  ({ children, href, icon: Icon, ...props }, ref) => {
    const id = href.toString();

    return (
      <BaseTab
        id={id}
        ref={ref}
        className={clsx(
          'group cursor-pointer inline-flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-slate-500 transition-colors outline-none',
          'hover:border-slate-300 hover:text-slate-700',
          'focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
          'data-active-item:border-violet-600 data-active-item:text-violet-600',
        )}
        {...props}
      >
        <Icon
          size={18}
          className={clsx(
            'text-slate-400 transition-colors group-hover:text-slate-500',
            'group-data-active-item:text-violet-600',
          )}
        />
        {children}
      </BaseTab>
    );
  },
);

TabItem.displayName = 'TabItem';
