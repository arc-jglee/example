'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;

export type ContextMenuContentProps = ComponentProps<
  typeof ContextMenuPrimitive.Content
>;

export function ContextMenuContent({
  className,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          'z-[var(--z-popover)] min-w-[10rem] overflow-hidden rounded-[var(--radius-lg)] border p-1 shadow-lg',
          'border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

export type ContextMenuLabelProps = ComponentProps<
  typeof ContextMenuPrimitive.Label
>;

export function ContextMenuLabel({
  className,
  ...props
}: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        'px-3 py-2 text-xs text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}

export type ContextMenuItemProps = ComponentProps<
  typeof ContextMenuPrimitive.Item
> & {
  variant?: 'default' | 'destructive';
};

export function ContextMenuItem({
  className,
  variant = 'default',
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
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

export type ContextMenuSeparatorProps = ComponentProps<
  typeof ContextMenuPrimitive.Separator
>;

export function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuSeparatorProps) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn(
        '-mx-1 my-1 h-px bg-[var(--color-border-default)]',
        className,
      )}
      {...props}
    />
  );
}

export type ContextMenuShortcutProps = ComponentProps<'span'>;

export function ContextMenuShortcut({
  className,
  ...props
}: ContextMenuShortcutProps) {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-[var(--color-text-disabled)]',
        className,
      )}
      {...props}
    />
  );
}
