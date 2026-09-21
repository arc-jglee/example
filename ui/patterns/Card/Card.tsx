'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type CardProps = ComponentProps<'div'>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] py-6 text-[var(--color-text-primary)] shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

export type CardHeaderProps = ComponentProps<'div'>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  );
}

export type CardTitleProps = ComponentProps<'div'>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      className={cn(
        'leading-none font-semibold text-[var(--color-text-primary)]',
        className,
      )}
      {...props}
    />
  );
}

export type CardDescriptionProps = ComponentProps<'div'>;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      className={cn('text-sm text-[var(--color-text-tertiary)]', className)}
      {...props}
    />
  );
}

export type CardActionProps = ComponentProps<'div'>;

export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

export type CardContentProps = ComponentProps<'div'>;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn('px-6', className)} {...props} />;
}

export type CardFooterProps = ComponentProps<'div'>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}
