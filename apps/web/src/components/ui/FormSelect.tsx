import { FC, forwardRef } from 'react';

import {
  FormControl,
  FormControlProps,
  Role,
  useFormContext,
} from '@ariakit/react';

import { Select, SelectProps } from '@/components/ui/Select';

export type FormSelectProps = FormControlProps<'button'> &
  Omit<SelectProps, keyof FormControlProps<'button'>>;

export const FormSelect: FC<FormSelectProps> = forwardRef(
  ({ name, ...props }, ref) => {
    const form = useFormContext();
    const value = form?.useValue(name);

    const select = (
      <Select
        ref={ref}
        value={value}
        setValue={(value: string | number) => form?.setValue(name, value)}
        render={props.render}
      />
    );
    const field = <FormControl name={name} render={select} />;
    return <Role.button {...props} render={field} />;
  },
);

FormSelect.displayName = 'FormSelect';
