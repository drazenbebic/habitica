import { ElementType, forwardRef, ReactNode, useState } from 'react';

import {
  FormInput as BaseFormInput,
  FormInputProps as BaseFormInputProps,
} from '@ariakit/react';
import clsx from 'clsx';
import { ViewIcon, ViewOffIcon } from 'hugeicons-react';

import { ButtonIcon } from '@/components/ui/ButtonIcon';

export type FormInputProps = BaseFormInputProps & {
  as?: ElementType;
  leadingIcon?: ReactNode;
  wrapperClassName?: string;
};

const baseStyles =
  'w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-slate-900 placeholder:text-slate-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-600/10 disabled:opacity-50 disabled:pointer-events-none';

const errorStyles =
  'aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:ring-red-500/10 aria-[invalid=true]:bg-red-50/50';

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      as: Tag = BaseFormInput,
      className,
      wrapperClassName,
      leadingIcon,
      type,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordType = type === 'password';

    const inputType = isPasswordType
      ? isPasswordVisible
        ? 'text'
        : 'password'
      : type;

    return (
      <div className={clsx('relative w-full', wrapperClassName)}>
        {leadingIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {leadingIcon}
          </div>
        )}

        <Tag
          ref={ref}
          type={inputType}
          className={clsx(
            baseStyles,
            errorStyles,
            {
              'pl-11': !!leadingIcon,
              'pr-12': isPasswordType,
            },
            className,
          )}
          {...props}
        />

        {isPasswordType && (
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <ButtonIcon
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? (
                <ViewOffIcon size={20} />
              ) : (
                <ViewIcon size={20} />
              )}
            </ButtonIcon>
          </div>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
