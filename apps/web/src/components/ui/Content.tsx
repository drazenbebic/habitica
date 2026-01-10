import { ElementType, FC, ReactNode } from 'react';

import clsx from 'clsx';

type ContentSize = 'xs' | 'sm' | 'base' | 'lg';

export type ContentProps = {
  as?: ElementType;
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
  as: Tag = 'p',
  children,
  className,
  size = 'base',
  ...props
}) => {
  return (
    <Tag
      className={clsx('leading-relaxed text-slate-600', sizes[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
