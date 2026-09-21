'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentProps, HTMLAttributes } from 'react';

import { cn } from '../../utils/cn';
import { isEventTargetInToastViewport } from '../../utils/dismissable';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

/**
 * `DialogContent`가 이미 이 컴포넌트를 내장해서 렌더한다. 별도로 다시
 * 렌더하면 오버레이가 두 겹으로 겹치니, 커스텀 레이아웃이 필요할 때만 직접
 * 조합해서 쓴다.
 */
export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-[var(--z-overlay)] bg-[var(--color-bg-overlay)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className,
      )}
      {...props}
    />
  );
}

export type DialogContentProps = ComponentProps<
  typeof DialogPrimitive.Content
> & {
  /**
   * 내부에서 함께 렌더하는 DialogOverlay에 합칠 className — DialogContent는
   * 오버레이를 직접 렌더하지 않아 그 className에 닿을 방법이 없어서 이
   * 통로가 필요하다. z-index 오버라이드(예: Sheet 위에 뜨는 Dialog)뿐
   * 아니라 오버레이 배경색 등 다른 확장에도 그대로 쓸 수 있다.
   * 콘텐츠 자체의 z-index 등은 기존 className prop으로 바로 덮어써도 된다
   * (twMerge가 같은 유틸리티 그룹끼리는 나중 값을 남긴다).
   */
  overlayClassName?: string;
};

export function DialogContent({
  className,
  children,
  overlayClassName,
  onPointerDownOutside,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        className={cn(
          'fixed top-1/2 left-1/2 z-[var(--z-modal)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
          'rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6 shadow-lg',
          'flex flex-col gap-4',
          'outline-none',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          className,
        )}
        onPointerDownOutside={(event) => {
          if (isEventTargetInToastViewport(event.target)) {
            event.preventDefault();
            return;
          }
          onPointerDownOutside?.(event);
        }}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="닫기"
          className={cn(
            'absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center',
            'rounded-[var(--radius-md)] text-[var(--color-text-disabled)] transition-colors',
            'hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-secondary)]',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:outline-none',
          )}
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 text-left', className)}
      {...props}
    />
  );
}

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn(
        'text-lg font-semibold text-[var(--color-text-primary)]',
        className,
      )}
      {...props}
    />
  );
}

export type DialogDescriptionProps = ComponentProps<
  typeof DialogPrimitive.Description
>;

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm text-[var(--color-text-secondary)]', className)}
      {...props}
    />
  );
}
