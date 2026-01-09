import { FC, ReactNode } from 'react';

import {
  FormLabel as BaseFormLabel,
  FormLabelProps as BaseFormLabelProps,
} from '@ariakit/react';
import clsx from 'clsx';

export type FormLabelProps = BaseFormLabelProps & {
  children?: ReactNode;
  isRequired?: boolean;
};

export const FormLabel: FC<FormLabelProps> = ({
  className,
  children,
  isRequired,
  ...props
}) => {
  return (
    <BaseFormLabel
      className={clsx(
        'ml-2 mb-1.5 block text-sm font-medium text-slate-700 select-none cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
      {isRequired && <span className="ml-0.5 text-red-500">*</span>}
    </BaseFormLabel>
  );
};
