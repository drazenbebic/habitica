import { FocusEvent, FocusEventHandler, forwardRef, useRef } from 'react';

import {
  Select as BaseSelect,
  SelectArrow,
  SelectPopover,
  SelectProps as BaseSelectProps,
  SelectProvider,
  useSelectStore,
  useStoreState,
} from '@ariakit/react';
import clsx from 'clsx';
import { ArrowDown01Icon } from 'hugeicons-react';

export type SelectProps = BaseSelectProps & {
  value?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
  onBlur?: FocusEventHandler<HTMLElement>;
};

const triggerStyles =
  'cursor-pointer relative flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-left text-slate-900 transition-all duration-200 ease-in-out focus:bg-white focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-600/10 disabled:opacity-50 disabled:pointer-events-none hover:bg-slate-100';

const popoverStyles =
  'z-50 max-h-[300px] min-w-[180px] overflow-auto rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-none';

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, className, value, setValue, defaultValue, ...props }, ref) => {
    const select = useSelectStore({ value, setValue, defaultValue });
    const portalRef = useRef<HTMLDivElement>(null);
    const selectValue = useStoreState(select, 'value');

    // Only call onBlur if the focus is leaving the whole widget.
    const onBlur = (event: FocusEvent<HTMLElement>) => {
      const portal = portalRef.current;
      const { selectElement, popoverElement } = select.getState();

      if (portal?.contains(event.relatedTarget)) {
        return;
      }

      if (selectElement?.contains(event.relatedTarget)) {
        return;
      }

      if (popoverElement?.contains(event.relatedTarget)) {
        return;
      }

      props.onBlur?.(event);
    };

    return (
      <SelectProvider store={select}>
        <BaseSelect
          ref={ref}
          {...props}
          store={select}
          onBlur={onBlur}
          className={clsx(triggerStyles, className)}
        >
          <span className="truncate">
            {selectValue || (
              <span className="text-slate-400">Select an item</span>
            )}
          </span>

          <SelectArrow>
            <ArrowDown01Icon className="h-4 w-4 text-slate-400" />
          </SelectArrow>
        </BaseSelect>

        <SelectPopover
          store={select}
          modal
          sameWidth
          gutter={8}
          onBlur={onBlur}
          portalRef={portalRef}
          className={popoverStyles}
        >
          {children}
        </SelectPopover>
      </SelectProvider>
    );
  },
);

Select.displayName = 'Select';
