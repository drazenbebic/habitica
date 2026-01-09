import { createElement, FC, ReactNode } from 'react';

import clsx from 'clsx';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base';

export type HeadingProps = {
  level?: HeadingLevel;
  size?: HeadingSize;
  children?: ReactNode;
  className?: string;
};

const sizes: Record<HeadingSize, string> = {
  '4xl': 'text-4xl sm:text-5xl font-extrabold tracking-tight',
  '3xl': 'text-3xl sm:text-4xl font-bold tracking-tight',
  '2xl': 'text-2xl font-bold tracking-tight',
  xl: 'text-xl font-bold tracking-tight',
  lg: 'text-lg font-semibold tracking-tight',
  base: 'text-base font-semibold tracking-tight',
};

const defaultSizeMap: Record<HeadingLevel, HeadingSize> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'base',
};

export const Heading: FC<HeadingProps> = ({
  level = 2,
  size,
  children,
  className,
  ...props
}) => {
  const resolvedSize = size || defaultSizeMap[level];

  return createElement(
    `h${level}`,
    {
      className: clsx('text-slate-900', sizes[resolvedSize], className),
      ...props,
    },
    children,
  );
};
