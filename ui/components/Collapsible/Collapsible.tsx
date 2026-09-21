'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const Collapsible = CollapsiblePrimitive.Root;

export type CollapsibleTriggerProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

export function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      className={cn(
        'flex w-full items-center justify-between gap-4 text-sm font-medium text-[var(--color-text-primary)] outline-none',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 cursor-pointer text-[var(--color-text-tertiary)] transition-transform" />
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
}

export type CollapsibleContentProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
>;

export function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      className="overflow-hidden text-sm text-[var(--color-text-tertiary)]"
      {...props}
    >
      <div className={cn('pt-3', className)}>{children}</div>
    </CollapsiblePrimitive.CollapsibleContent>
  );
}
