'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger>;

export function SelectTrigger({
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'group flex h-12 w-full items-center justify-between gap-2 rounded-[var(--radius-lg)] border px-4 py-3 text-sm',
        'border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
        'data-[placeholder]:text-[var(--color-text-disabled)]',
        'transition-colors outline-none',
        'focus:ring-2 focus:ring-[var(--color-border-accent)] focus:ring-offset-1',
        'data-[state=open]:border-[var(--color-border-accent)]',
        'disabled:cursor-not-allowed disabled:border-[var(--color-border-default)] disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-disabled)]',
        'aria-invalid:border-[var(--color-border-error)] aria-invalid:focus:ring-[var(--color-border-error)]',
        '[&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-[var(--color-text-tertiary)] transition-transform group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export type SelectContentProps = ComponentProps<typeof SelectPrimitive.Content>;

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={cn(
          'relative z-[var(--z-popover)] max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-hidden rounded-[var(--radius-lg)] border shadow-lg',
          'border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
          position === 'popper' &&
            'w-full min-w-[var(--radix-select-trigger-width)] data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          className,
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export type SelectLabelProps = ComponentProps<typeof SelectPrimitive.Label>;

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      className={cn(
        'px-4 py-1.5 text-xs text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}

export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item>;

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default items-center rounded-[var(--radius-md)] py-2.5 pr-8 pl-4 text-sm outline-none select-none',
        'data-[highlighted]:bg-[var(--color-bg-muted)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-3 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check
            className="size-4 text-[var(--color-text-success)]"
            strokeWidth={2.5}
          />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

export type SelectSeparatorProps = ComponentProps<
  typeof SelectPrimitive.Separator
>;

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        '-mx-1 my-1 h-px bg-[var(--color-border-default)]',
        className,
      )}
      {...props}
    />
  );
}

export function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        'flex cursor-pointer items-center justify-center py-1 text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

export function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        'flex cursor-pointer items-center justify-center py-1 text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}
