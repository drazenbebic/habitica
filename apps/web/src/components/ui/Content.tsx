import { FC, ReactNode } from 'react';

import clsx from 'clsx';

type ContentSize = 'xs' | 'sm' | 'base' | 'lg';

export type ContentProps = {
  children?: ReactNode;
  className?: string;
  size?: ContentSize;
};

const sizes: Record<ContentSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
};

export const Content: FC<ContentProps> = ({
  children,
  className,
  size = 'base',
  ...props
}) => {
  return (
    <p
      className={clsx('leading-relaxed text-slate-600', sizes[size], className)}
      {...props}
    >
      {children}
    </p>
  );
};
