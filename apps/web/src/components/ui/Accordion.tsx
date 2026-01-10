'use client';

import { ReactNode } from 'react';

import {
  Disclosure,
  DisclosureContent,
  DisclosureProvider,
  useDisclosureStore,
} from '@ariakit/react';
import clsx from 'clsx';
import { ArrowDown01Icon } from 'hugeicons-react';

export type AccordionProps = {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
};

export const Accordion = ({
  title,
  children,
  isOpen = false,
  onClick,
}: AccordionProps) => {
  const disclosure = useDisclosureStore({ open: isOpen, setOpen: onClick });

  return (
    <div
      className={clsx(
        'group overflow-hidden rounded-2xl border transition-all duration-300 ease-in-out',
        isOpen
          ? 'border-violet-200 bg-white shadow-lg shadow-violet-900/5'
          : 'border-slate-200 bg-slate-50 hover:border-violet-200 hover:bg-white',
      )}
    >
      <DisclosureProvider store={disclosure}>
        <Disclosure className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-inset cursor-pointer">
          <span
            className={clsx(
              'font-medium transition-colors duration-200',
              isOpen
                ? 'text-violet-900'
                : 'text-slate-700 group-hover:text-slate-900',
            )}
          >
            {title}
          </span>
          <span
            className={clsx(
              'ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
              isOpen
                ? 'bg-violet-100 text-violet-600 rotate-180'
                : 'bg-white text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-500',
            )}
          >
            <ArrowDown01Icon size={20} />
          </span>
        </Disclosure>

        <DisclosureContent className="grid transition-[grid-template-rows] duration-300 ease-out data-open:grid-rows-[1fr] data-!open:grid-rows-[0fr]">
          <div className="overflow-hidden">
            <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed">
              {children}
            </div>
          </div>
        </DisclosureContent>
      </DisclosureProvider>
    </div>
  );
};
