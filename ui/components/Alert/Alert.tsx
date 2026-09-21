'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, TriangleAlert, X, XCircle } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/cn';

export const alertVariants = cva(
  [
    'relative grid w-full max-w-[600px] grid-cols-[auto_1fr] items-start gap-x-3 overflow-hidden',
    'rounded-[var(--radius-xl)] border px-4 py-3',
    'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
    'border-[var(--color-border-default)] shadow-xs',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        success: [
          "pl-[18px] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-[var(--color-border-success)] before:content-['']",
        ].join(' '),
        warning: [
          "pl-[18px] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-[var(--color-border-warning)] before:content-['']",
        ].join(' '),
        error: [
          "pl-[18px] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-[var(--color-border-error)] before:content-['']",
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const ICONS: Record<
  NonNullable<VariantProps<typeof alertVariants>['variant']>,
  LucideIcon | null
> = {
  default: null,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: XCircle,
};

const ICON_COLOR_CLASSNAMES: Record<
  NonNullable<VariantProps<typeof alertVariants>['variant']>,
  string
> = {
  default: 'text-[var(--color-text-tertiary)]',
  success: 'text-[var(--color-text-success)]',
  warning: 'text-[var(--color-text-warning)]',
  error: 'text-[var(--color-text-error)]',
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  VariantProps<typeof alertVariants> & {
    title: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
    onClose?: () => void;
  };

export function Alert({
  className,
  variant = 'default',
  title,
  description,
  icon,
  action,
  onClose,
  ...props
}: AlertProps) {
  const resolvedVariant = variant ?? 'default';
  const Icon = ICONS[resolvedVariant];
  const showIcon = icon !== null && (icon !== undefined || Icon !== null);
  const showCloseButton = Boolean(onClose) && !action;
  const showTrailingSlot = Boolean(action) || showCloseButton;

  return (
    <div
      role="alert"
      className={cn(
        alertVariants({ variant: resolvedVariant }),
        showTrailingSlot && 'pr-10',
        className,
      )}
      {...props}
    >
      {showIcon && (
        <span
          className={cn('self-center', ICON_COLOR_CLASSNAMES[resolvedVariant])}
          aria-hidden
        >
          {icon ?? (Icon && <Icon className="size-5" />)}
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[length:var(--text-body-md)] leading-[1.35] font-medium text-[var(--color-text-primary)]">
          {title}
        </p>
        {description && (
          <p className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}
      </div>

      {showTrailingSlot && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          {action ??
            (showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center',
                  'rounded-[var(--radius-md)] text-[var(--color-text-disabled)] transition-colors',
                  'hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-secondary)]',
                )}
              >
                <X className="size-4" />
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
