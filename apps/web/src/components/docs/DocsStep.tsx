import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { Heading } from '@/components/ui/Heading';

export type DocsStepProps = {
  className?: string;
  children: ReactNode;
  heading?: string;
  step?: number;
  withoutBorder?: boolean;
};

export const DocsStep: FC<DocsStepProps> = ({
  className,
  children,
  heading,
  step,
  withoutBorder = false,
}) => {
  return (
    <section className={clsx('space-y-6', className)}>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
          {step}
        </div>
        <Heading level={3} size="lg">
          {heading}
        </Heading>
      </div>

      {withoutBorder ? (
        children
      ) : (
        <div className="border-l-2 border-slate-100 pl-4 ml-4 space-y-4">
          {children}
        </div>
      )}
    </section>
  );
};
