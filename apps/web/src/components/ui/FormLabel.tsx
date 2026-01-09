import { ElementType, FC, ReactNode } from 'react';

import {
  FormLabel as BaseFormLabel,
  FormLabelProps as BaseFormLabelProps,
} from '@ariakit/react';
import clsx from 'clsx';

export type FormLabelProps = BaseFormLabelProps & {
  as?: ElementType;
  children?: ReactNode;
  isRequired?: boolean;
};

export const FormLabel: FC<FormLabelProps> = ({
  as: Tag = BaseFormLabel,
  className,
  children,
  isRequired,
  ...props
}) => {
  return (
    <Tag
      className={clsx(
        'ml-2 mb-1.5 block text-sm font-medium text-slate-700 select-none cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
      {isRequired && <span className="ml-0.5 text-red-500">*</span>}
    </Tag>
  );
};
