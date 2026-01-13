'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useMemo,
  useState,
} from 'react';

import clsx from 'clsx';

import { AccordionProps } from '@/components/ui/Accordion';

function isAccordionElement(child: ReactNode) {
  return isValidElement<AccordionProps>(child);
}

type AccordionGroupProps = {
  children: ReactNode;
  defaultOpenIndex?: number | null;
  className?: string;
};

export const AccordionGroup = ({
  children,
  defaultOpenIndex = null,
  className,
}: AccordionGroupProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const accordions = useMemo(
    () => Children.toArray(children).filter(isAccordionElement),
    [children],
  );

  const handleItemClick = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {accordions.map((accordion, i) => {
        return cloneElement(accordion, {
          isOpen: openIndex === i,
          onClick: () => handleItemClick(i),
        });
      })}
    </div>
  );
};
