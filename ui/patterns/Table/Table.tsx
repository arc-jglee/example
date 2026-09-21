'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type TableProps = ComponentProps<'table'>;

/**
 * 좁은 화면에서 컬럼이 넘칠 때 가로 스크롤로 대응한다 (반응형 컬럼 숨김/카드
 * 전환은 데이터에 종속적이라 이 프리미티브의 책임 밖). 스크롤 wrapper에
 * tabIndex를 줘서 마우스 없이도(키보드) 넘친 컬럼에 접근할 수 있게 한다.
 * `scrollbar-thin`(scrollbar.css)으로 브라우저 기본 스크롤바 대신 얇은
 * 스크롤바를 쓴다 — OrgTreeView 등 다른 가로 스크롤 영역과 같은 기본값.
 */
export function Table({ className, ...props }: TableProps) {
  return (
    <div
      tabIndex={0}
      className="scrollbar-thin relative w-full overflow-x-auto focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:outline-none"
    >
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

export type TableHeaderProps = ComponentProps<'thead'>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        '[&_tr]:border-b [&_tr]:border-[var(--color-border-default)]',
        className,
      )}
      {...props}
    />
  );
}

export type TableBodyProps = ComponentProps<'tbody'>;

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  );
}

export type TableFooterProps = ComponentProps<'tfoot'>;

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        'border-t border-[var(--color-border-default)] bg-[var(--color-bg-muted)] font-medium text-[var(--color-text-primary)]',
        className,
      )}
      {...props}
    />
  );
}

export type TableRowProps = ComponentProps<'tr'>;

/**
 * ref를 그대로 전달한다(React 19라 forwardRef 없이 prop으로 받는다) — 드래그
 * 정렬(dnd-kit의 `useSortable` 등)처럼 실제 `<tr>` DOM 노드가 필요한 곳에서
 * 이 컴포넌트를 그대로 감쌀 수 있게 하기 위해서다.
 */
export function TableRow({ className, ref, ...props }: TableRowProps) {
  return (
    <tr
      ref={ref}
      className={cn(
        'border-b border-[var(--color-border-default)] transition-colors',
        'hover:bg-[var(--color-bg-subtle)]',
        'data-[state=selected]:bg-[var(--color-bg-muted)]',
        className,
      )}
      {...props}
    />
  );
}

export type TableHeadProps = ComponentProps<'th'>;

/** 열 헤더가 압도적으로 흔해 scope="col"을 기본값으로 두고, 행 헤더는 scope="row"로 override한다. */
export function TableHead({
  className,
  scope = 'col',
  ...props
}: TableHeadProps) {
  return (
    <th
      scope={scope}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-[var(--color-text-secondary)]',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

export type TableCellProps = ComponentProps<'td'>;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        'p-4 align-middle text-[var(--color-text-primary)]',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

export type TableCaptionProps = ComponentProps<'caption'>;

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      className={cn(
        'mt-4 text-sm text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}
