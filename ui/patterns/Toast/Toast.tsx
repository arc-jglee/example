'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, TriangleAlert, X, XCircle } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../utils/cn';
import { TOAST_VIEWPORT_ATTRIBUTE } from '../../utils/dismissable';

export const ToastProvider = ToastPrimitive.Provider;

export type ToastViewportProps = ComponentProps<typeof ToastPrimitive.Viewport>;

/**
 * Sheet/Dialog가 열려 있으면 Radix가 `<body>`에 `pointer-events: none`을
 * 걸어 바깥 영역 클릭을 막는다. Toast는 그 Sheet/Dialog와 별도 Portal에
 * 뜨기 때문에 이 잠금을 상속받는다. Viewport는 헤더(프로필·권한 셀렉트)를
 * 덮으므로 항상 `pointer-events-none`이고, 실제 Toast 카드만
 * `pointer-events-auto`로 클릭을 받는다.
 */
export function ToastViewport({
  className,
  style,
  ...props
}: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      {...{ [TOAST_VIEWPORT_ATTRIBUTE]: '' }}
      className={cn(
        'pointer-events-none fixed top-0 right-0 z-[var(--z-toast)] flex w-full max-w-[calc(100vw-2rem)] flex-col gap-2 p-4 outline-none sm:max-w-[380px]',
        className,
      )}
      style={{ pointerEvents: 'none', ...style }}
      {...props}
    />
  );
}

/** 색상/아이콘 체계를 `Alert`(components/Alert)와 통일했다 (patterns/Dialog가 닫기 버튼 스타일을 Alert와 통일한 것과 같은 컨벤션). */
export const toastVariants = cva(
  [
    'relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 overflow-hidden',
    'pointer-events-auto rounded-[var(--radius-xl)] border p-4 shadow-lg',
    'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
    'border-[var(--color-border-default)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:ring-offset-2',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-full',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
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
  NonNullable<VariantProps<typeof toastVariants>['variant']>,
  LucideIcon | null
> = {
  default: null,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: XCircle,
};

const ICON_COLOR_CLASSNAMES: Record<
  NonNullable<VariantProps<typeof toastVariants>['variant']>,
  string
> = {
  default: 'text-[var(--color-text-tertiary)]',
  success: 'text-[var(--color-text-success)]',
  warning: 'text-[var(--color-text-warning)]',
  error: 'text-[var(--color-text-error)]',
};

export type ToastProps = Omit<
  ComponentProps<typeof ToastPrimitive.Root>,
  'title'
> &
  VariantProps<typeof toastVariants> & {
    title: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
    onClose?: () => void;
  };

/**
 * `onOpenChange`로 감싸서 닫기 버튼 클릭·스와이프·자동 dismiss 타이머를
 * `onClose` 하나로 통합한다 (Alert의 onClose는 버튼 클릭만 처리하면 됐지만,
 * Toast는 dismiss 경로가 여러 개라 Root 레벨 콜백이 필요하다).
 */
export function Toast({
  className,
  variant = 'default',
  title,
  description,
  icon,
  action,
  onClose,
  onOpenChange,
  style,
  ...props
}: ToastProps) {
  const resolvedVariant = variant ?? 'default';
  const Icon = ICONS[resolvedVariant];
  const showIcon = icon !== null && (icon !== undefined || Icon !== null);
  const showCloseButton = Boolean(onClose) && !action;
  const showTrailingSlot = Boolean(action) || showCloseButton;

  return (
    <ToastPrimitive.Root
      className={cn(
        toastVariants({ variant: resolvedVariant }),
        showTrailingSlot && 'pr-10',
        className,
      )}
      style={{ pointerEvents: 'auto', ...style }}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
        onOpenChange?.(open);
      }}
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
        <ToastPrimitive.Title className="text-[length:var(--text-body-md)] leading-[1.35] font-medium text-[var(--color-text-primary)]">
          {title}
        </ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-text-secondary)]">
            {description}
          </ToastPrimitive.Description>
        )}
      </div>

      {showTrailingSlot && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          {action ??
            (showCloseButton && (
              <ToastPrimitive.Close
                aria-label="닫기"
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center',
                  'rounded-[var(--radius-md)] text-[var(--color-text-disabled)] transition-colors',
                  'hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-secondary)]',
                )}
              >
                <X className="size-4" />
              </ToastPrimitive.Close>
            ))}
        </div>
      )}
    </ToastPrimitive.Root>
  );
}

export type ToastActionProps = ComponentProps<typeof ToastPrimitive.Action>;

export const ToastAction = ToastPrimitive.Action;
export const ToastClose = ToastPrimitive.Close;
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
