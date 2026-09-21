'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export type DropdownMenuContentProps = ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--z-popover)] min-w-[10rem] overflow-hidden rounded-[var(--radius-lg)] border p-1 shadow-lg',
          'border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export type DropdownMenuLabelProps = ComponentProps<
  typeof DropdownMenuPrimitive.Label
>;

export function DropdownMenuLabel({
  className,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'px-3 py-2 text-xs text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}

export type DropdownMenuItemProps = ComponentProps<
  typeof DropdownMenuPrimitive.Item
> & {
  variant?: 'default' | 'destructive';
};

export function DropdownMenuItem({
  className,
  variant = 'default',
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default items-center gap-2 rounded-[var(--radius-md)] px-3 py-2.5 text-sm outline-none select-none',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        variant === 'default' &&
          'text-[var(--color-text-primary)] data-[highlighted]:bg-[var(--color-bg-muted)] data-[highlighted]:text-[var(--color-text-secondary)]',
        variant === 'destructive' &&
          'text-[var(--color-text-error)] data-[highlighted]:bg-[var(--color-bg-error-subtle)] data-[highlighted]:text-[var(--color-text-error-strong)]',
        className,
      )}
      {...props}
    />
  );
}

export type DropdownMenuSeparatorProps = ComponentProps<
  typeof DropdownMenuPrimitive.Separator
>;

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn(
        '-mx-1 my-1 h-px bg-[var(--color-border-default)]',
        className,
      )}
      {...props}
    />
  );
}
