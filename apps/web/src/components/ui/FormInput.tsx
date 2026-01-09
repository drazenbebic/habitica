import { forwardRef, ReactNode } from 'react';

import {
  FormInput as BaseFormInput,
  FormInputProps as BaseFormInputProps,
} from '@ariakit/react';
import clsx from 'clsx';

export type FormInputProps = BaseFormInputProps & {
  leadingIcon?: ReactNode;
  wrapperClassName?: string;
};

const baseStyles =
  'w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-slate-900 placeholder:text-slate-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-600/10 disabled:opacity-50 disabled:pointer-events-none';

const errorStyles =
  'aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:ring-red-500/10 aria-[invalid=true]:bg-red-50/50';

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, wrapperClassName, leadingIcon, ...props }, ref) => {
    return (
      <div className={clsx('relative w-full', wrapperClassName)}>
        {leadingIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {leadingIcon}
          </div>
        )}

        <BaseFormInput
          ref={ref}
          className={clsx(
            baseStyles,
            errorStyles,
            {
              'pl-11': !!leadingIcon, // Add padding to prevent text overlap
            },
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
