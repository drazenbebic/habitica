import { FC, ReactNode } from 'react';
import Link from 'next/link';

import clsx from 'clsx';
import { ArrowRight01Icon } from 'hugeicons-react';

import { Button } from '@/components/ui/Button';

export type DocsResourceLinkProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  label?: string;
  className?: string;
};

export const DocsResourceLink: FC<DocsResourceLinkProps> = ({
  href,
  title,
  description,
  icon,
  label = 'View Guide',
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center',
        className,
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <div className="text-violet-600 shrink-0 flex items-center">
            {icon}
          </div>
          <span>{title}</span>
        </div>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="shrink-0"
        render={<Link href={href} />}
      >
        {label}
        <ArrowRight01Icon size={16} className="text-slate-400" />
      </Button>
    </div>
  );
};
