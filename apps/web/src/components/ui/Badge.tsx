import { FC, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  hasDot?: boolean;
  pulsing?: boolean;
};

const badgeBaseStyles =
  'inline-flex items-center justify-center font-medium rounded-full transition-colors';

const variants: Record<string, string> = {
  primary: 'bg-violet-100 text-violet-700 border border-violet-200',
  success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-red-700 border border-red-200',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
};

const sizes: Record<string, string> = {
  sm: 'text-xs px-2.5 py-0.5 gap-1.5',
  md: 'text-sm px-3 py-1 gap-2',
};

const dotColors: Record<string, string> = {
  primary: 'bg-violet-600',
  success: 'bg-emerald-600',
  warning: 'bg-amber-600',
  error: 'bg-red-600',
  neutral: 'bg-slate-500',
};

export const Badge: FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'sm',
  hasDot = false,
  pulsing = false,
  ...props
}) => {
  return (
    <span
      className={clsx(
        badgeBaseStyles,
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {hasDot && (
        <span className="relative flex h-2 w-2">
          {pulsing && (
            <span
              className={clsx(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                dotColors[variant],
              )}
            ></span>
          )}
          <span
            className={clsx(
              'relative inline-flex h-2 w-2 rounded-full',
              dotColors[variant],
            )}
          ></span>
        </span>
      )}
      {children}
    </span>
  );
};
