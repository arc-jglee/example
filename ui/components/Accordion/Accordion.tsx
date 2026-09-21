'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'border-b border-[var(--color-border-default)] last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

export type AccordionTriggerProps = ComponentProps<
  typeof AccordionPrimitive.Trigger
>;

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 items-center justify-between gap-4 py-5 text-left text-sm font-medium text-[var(--color-text-primary)] outline-none',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          '[&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 cursor-pointer text-[var(--color-text-secondary)] transition-transform" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export type AccordionContentProps = ComponentProps<
  typeof AccordionPrimitive.Content
>;

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm text-[var(--color-text-tertiary)]"
      {...props}
    >
      <div className={cn('pb-5', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
