'use client';

import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/cn';

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** title/description 글자 크기.<br/>
   * 화면 전체를 차지하는 상태에는 'lg'를 쓴다. */
  size?: 'md' | 'lg';
};

const TITLE_SIZE_CLASS = {
  md: 'text-[length:var(--text-body-md)]',
  lg: 'text-[length:var(--text-heading-sm)]',
} as const;

const DESCRIPTION_SIZE_CLASS = {
  md: 'text-[length:var(--text-body-sm)]',
  lg: 'text-[length:var(--text-body-md)]',
} as const;

const ICON_SIZE_CLASS = {
  md: '[&>svg]:size-10',
  lg: '[&>svg]:size-14',
} as const;

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  size = 'md',
  ...props
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-10 text-center',
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden
          className={cn(
            'text-[var(--color-text-disabled)]',
            ICON_SIZE_CLASS[size],
          )}
        >
          {icon}
        </span>
      )}

      <div className="flex flex-col gap-1">
        <p
          className={cn(
            TITLE_SIZE_CLASS[size],
            'font-medium text-[var(--color-text-primary)]',
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              DESCRIPTION_SIZE_CLASS[size],
              'text-[var(--color-text-secondary)]',
            )}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
