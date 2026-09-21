'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import type { ComponentProps, HTMLAttributes } from 'react';

import { cn } from '../../utils/cn';
import { isEventTargetInToastViewport } from '../../utils/dismissable';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export type SheetOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

/**
 * `SheetContent`가 이미 이 컴포넌트를 내장해서 렌더한다 (Dialog와 동일한
 * 이유로, 별도로 다시 렌더하면 오버레이가 이중으로 겹친다).
 */
export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
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

export const sheetContentVariants = cva(
  [
    'fixed z-[var(--z-modal)] flex flex-col gap-4',
    'border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6 shadow-lg',
    'outline-none',
    // 콘텐츠가 패널보다 길면 기본으로 세로 스크롤한다. 헤더·바닥을 고정하고
    // 중간 영역만 스크롤해야 하는 화면은 이 클래스를 overflow-hidden으로
    // 덮어쓰고, 그 안의 스크롤 영역에 직접 overflow-y-auto를 준다
    // (AppSidebar가 이 패턴이다).
    'scrollbar-thin overflow-y-auto',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  ].join(' '),
  {
    variants: {
      side: {
        right: [
          'inset-y-0 right-0 h-full w-full max-w-sm border-l md:max-w-md lg:max-w-lg',
          'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
        ].join(' '),
        left: [
          'inset-y-0 left-0 h-full w-full max-w-sm border-r md:max-w-md lg:max-w-lg',
          'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
        ].join(' '),
        top: [
          'inset-x-0 top-0 max-h-[80vh] w-full border-b',
          'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
        ].join(' '),
        bottom: [
          'inset-x-0 bottom-0 max-h-[80vh] w-full border-t',
          'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
        ].join(' '),
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

export type SheetContentProps = ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetContentVariants> & {
    /**
     * 내부에서 함께 렌더하는 SheetOverlay에 합칠 className — SheetContent는
     * 오버레이를 직접 렌더하지 않아 그 className에 닿을 방법이 없어서 이
     * 통로가 필요하다. z-index 오버라이드(예: 이 Sheet 위에 다른 Sheet나
     * Dialog가 뜨는 경우)뿐 아니라 오버레이 배경색 등 다른 확장에도 그대로
     * 쓸 수 있다. 콘텐츠 자체의 z-index 등은 기존 className prop으로 바로
     * 덮어써도 된다(twMerge가 같은 유틸리티 그룹끼리는 나중 값을 남긴다).
     */
    overlayClassName?: string;
  };

export function SheetContent({
  className,
  children,
  side = 'right',
  overlayClassName,
  onPointerDownOutside,
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        className={cn(sheetContentVariants({ side }), className)}
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

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 text-left', className)}
      {...props}
    />
  );
}

export type SheetFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * `mt-auto`로 패널 하단에 고정한다 — Dialog의 DialogFooter와 달리, 본문
 * 길이가 패널 높이보다 짧을 때도 액션 버튼이 항상 바닥에 붙어 있어야
 * 하는 사이드 패널 특유의 레이아웃이기 때문이다.
 */
export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      className={cn(
        'mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

export type SheetTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
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

export type SheetDescriptionProps = ComponentProps<
  typeof DialogPrimitive.Description
>;

export function SheetDescription({
  className,
  ...props
}: SheetDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm text-[var(--color-text-secondary)]', className)}
      {...props}
    />
  );
}
