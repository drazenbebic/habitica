import { FC, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  variant?: 'elevated' | 'outlined' | 'flat';
  isHoverable?: boolean;
};

const cardBaseStyles =
  'relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 ease-in-out';

const variantStyles: Record<string, string> = {
  elevated: 'bg-white border border-slate-100 shadow-xl shadow-violet-900/5',
  outlined: 'bg-transparent border-2 border-slate-200',
  flat: 'bg-slate-50',
};

const hoverStyles: Record<string, string> = {
  elevated:
    'hover:shadow-2xl hover:shadow-violet-900/10 hover:-translate-y-1 cursor-pointer',
  outlined: 'hover:border-violet-200 hover:bg-slate-50 cursor-pointer',
  flat: 'hover:bg-slate-100 cursor-pointer',
};

export const Card: FC<CardProps> = ({
  children,
  className,
  variant = 'elevated',
  isHoverable = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        cardBaseStyles,
        variantStyles[variant],
        isHoverable && hoverStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
