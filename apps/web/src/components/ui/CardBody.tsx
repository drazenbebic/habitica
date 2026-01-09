import { FC, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

export type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  noPadding?: boolean;
};

export const CardBody: FC<CardBodyProps> = ({
  children,
  className,
  noPadding = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3',
        {
          'p-6 sm:p-8': !noPadding,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
