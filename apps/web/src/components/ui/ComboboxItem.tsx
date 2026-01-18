import { FC } from 'react';

import {
  ComboboxItem as BaseComboboxItem,
  ComboboxItemCheck,
  ComboboxItemProps as BaseComboboxItemProps,
} from '@ariakit/react';
import clsx from 'clsx';
import { Tick02Icon } from 'hugeicons-react';

import { MultiComboboxItemType } from '@/components/ui/MultiCombobox';

export type ComboboxItemProps = BaseComboboxItemProps & {
  item: MultiComboboxItemType;
};

export const ComboboxItem: FC<ComboboxItemProps> = ({ item }) => {
  return (
    <BaseComboboxItem
      value={item.value}
      focusOnHover
      className={clsx(
        'group flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors',
        'text-slate-700',
        'data-active-item:bg-violet-50 data-active-item:text-violet-700',
        'aria-selected:bg-violet-50 aria-selected:font-medium aria-selected:text-violet-900',
      )}
    >
      <span className="truncate">{item.label}</span>
      <span className="flex items-center justify-center text-violet-600 opacity-0 transition-opacity group-aria-selected:opacity-100">
        <Tick02Icon size={16} />
        <span className="sr-only">
          <ComboboxItemCheck />
        </span>
      </span>
    </BaseComboboxItem>
  );
};
