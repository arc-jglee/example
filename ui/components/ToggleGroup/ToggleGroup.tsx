'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, useState } from 'react';

import { cn } from '../../utils/cn';

export type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root>;

const toggleGroupRootClassName =
  'inline-flex items-center overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)]';

type SingleToggleGroupProps = Extract<ToggleGroupProps, { type: 'single' }>;
type MultipleToggleGroupProps = Extract<ToggleGroupProps, { type: 'multiple' }>;

/**
 * Radix의 `type="single"`은 기본적으로 이미 선택된 항목을 다시 누르면 빈 값으로
 * 바뀐다(라디오 버튼과 다른 "토글" 동작). 탭 메뉴처럼 항상 하나가 선택된 상태를
 * 유지해야 하는 세그먼트 컨트롤 용도에는 맞지 않아, 그 빈 값 전이를 막는다.
 */
function SingleToggleGroup({
  className,
  value,
  defaultValue,
  onValueChange,
  ...props
}: SingleToggleGroupProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? '',
  );
  const currentValue = isControlled ? value : uncontrolledValue;

  function handleValueChange(next: string) {
    if (!next) return;
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  }

  return (
    <ToggleGroupPrimitive.Root
      className={cn(toggleGroupRootClassName, className)}
      value={currentValue}
      onValueChange={handleValueChange}
      {...props}
    />
  );
}

function MultipleToggleGroup({
  className,
  ...props
}: MultipleToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(toggleGroupRootClassName, className)}
      {...props}
    />
  );
}

export function ToggleGroup(props: ToggleGroupProps) {
  if (props.type === 'multiple') {
    return <MultipleToggleGroup {...props} />;
  }
  return <SingleToggleGroup {...props} />;
}

export const toggleGroupItemVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5 whitespace-nowrap',
    'text-sm font-medium transition-colors',
    'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]',
    'hover:bg-[var(--color-bg-muted)]',
    'focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&:not(:first-child)]:border-l [&:not(:first-child)]:border-[var(--color-border-strong)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-5',
      },
      /**
       * 선택된(on) 상태의 색. 기본은 브랜드 accent, `success`/`warning`/
       * `error`는 ADS 상태색(의미 고정) 3종이다. 항목마다 다르게 줄 수
       * 있어(예: 배치 유형 중 "겸직"만 success) Item 쪽 variant로 둔다.
       *
       * 나머지 16개(`red`~`rose`)는 ADS Secondary 팔레트 — Badge의
       * `variant="secondary"` + `tone`과 같은 축으로, 의미 없이 갈래만
       * 구분하고 싶을 때 쓴다(연한 배경 + 색 텍스트, 상태색과 달리 흰
       * 텍스트가 아니다). 왜 16개를 전부 리터럴로 적는가: `shared.ts`의
       * `TONE_INTERACTIVE_CLASS`와 같은 이유로, Tailwind v4 JIT가
       * 템플릿 문자열(`` `bg-[var(--color-tone-${tone}-bg)]` ``)로는
       * 클래스를 생성하지 못한다.
       */
      tone: {
        default:
          'data-[state=on]:bg-[var(--color-bg-accent)] data-[state=on]:text-[var(--color-text-on-solid)] data-[state=on]:hover:bg-[var(--color-bg-accent)]',
        success:
          'data-[state=on]:bg-[var(--color-bg-success)] data-[state=on]:text-[var(--color-text-on-solid)] data-[state=on]:hover:bg-[var(--color-bg-success-hover)]',
        warning:
          'data-[state=on]:bg-[var(--color-bg-warning)] data-[state=on]:text-[var(--color-text-on-solid)] data-[state=on]:hover:bg-[var(--color-bg-warning-hover)]',
        error:
          'data-[state=on]:bg-[var(--color-bg-error)] data-[state=on]:text-[var(--color-text-on-solid)] data-[state=on]:hover:bg-[var(--color-bg-error-hover)]',
        red: 'data-[state=on]:bg-[var(--color-tone-red-bg)] data-[state=on]:text-[var(--color-tone-red-text)] data-[state=on]:hover:bg-[var(--color-tone-red-bg-hover)]',
        orange:
          'data-[state=on]:bg-[var(--color-tone-orange-bg)] data-[state=on]:text-[var(--color-tone-orange-text)] data-[state=on]:hover:bg-[var(--color-tone-orange-bg-hover)]',
        yellow:
          'data-[state=on]:bg-[var(--color-tone-yellow-bg)] data-[state=on]:text-[var(--color-tone-yellow-text)] data-[state=on]:hover:bg-[var(--color-tone-yellow-bg-hover)]',
        lime: 'data-[state=on]:bg-[var(--color-tone-lime-bg)] data-[state=on]:text-[var(--color-tone-lime-text)] data-[state=on]:hover:bg-[var(--color-tone-lime-bg-hover)]',
        green:
          'data-[state=on]:bg-[var(--color-tone-green-bg)] data-[state=on]:text-[var(--color-tone-green-text)] data-[state=on]:hover:bg-[var(--color-tone-green-bg-hover)]',
        emerald:
          'data-[state=on]:bg-[var(--color-tone-emerald-bg)] data-[state=on]:text-[var(--color-tone-emerald-text)] data-[state=on]:hover:bg-[var(--color-tone-emerald-bg-hover)]',
        teal: 'data-[state=on]:bg-[var(--color-tone-teal-bg)] data-[state=on]:text-[var(--color-tone-teal-text)] data-[state=on]:hover:bg-[var(--color-tone-teal-bg-hover)]',
        cyan: 'data-[state=on]:bg-[var(--color-tone-cyan-bg)] data-[state=on]:text-[var(--color-tone-cyan-text)] data-[state=on]:hover:bg-[var(--color-tone-cyan-bg-hover)]',
        sky: 'data-[state=on]:bg-[var(--color-tone-sky-bg)] data-[state=on]:text-[var(--color-tone-sky-text)] data-[state=on]:hover:bg-[var(--color-tone-sky-bg-hover)]',
        blue: 'data-[state=on]:bg-[var(--color-tone-blue-bg)] data-[state=on]:text-[var(--color-tone-blue-text)] data-[state=on]:hover:bg-[var(--color-tone-blue-bg-hover)]',
        indigo:
          'data-[state=on]:bg-[var(--color-tone-indigo-bg)] data-[state=on]:text-[var(--color-tone-indigo-text)] data-[state=on]:hover:bg-[var(--color-tone-indigo-bg-hover)]',
        violet:
          'data-[state=on]:bg-[var(--color-tone-violet-bg)] data-[state=on]:text-[var(--color-tone-violet-text)] data-[state=on]:hover:bg-[var(--color-tone-violet-bg-hover)]',
        purple:
          'data-[state=on]:bg-[var(--color-tone-purple-bg)] data-[state=on]:text-[var(--color-tone-purple-text)] data-[state=on]:hover:bg-[var(--color-tone-purple-bg-hover)]',
        fuchsia:
          'data-[state=on]:bg-[var(--color-tone-fuchsia-bg)] data-[state=on]:text-[var(--color-tone-fuchsia-text)] data-[state=on]:hover:bg-[var(--color-tone-fuchsia-bg-hover)]',
        pink: 'data-[state=on]:bg-[var(--color-tone-pink-bg)] data-[state=on]:text-[var(--color-tone-pink-text)] data-[state=on]:hover:bg-[var(--color-tone-pink-bg-hover)]',
        rose: 'data-[state=on]:bg-[var(--color-tone-rose-bg)] data-[state=on]:text-[var(--color-tone-rose-text)] data-[state=on]:hover:bg-[var(--color-tone-rose-bg-hover)]',
      },
    },
    defaultVariants: {
      size: 'md',
      tone: 'default',
    },
  },
);

export type ToggleGroupItemProps = ComponentProps<
  typeof ToggleGroupPrimitive.Item
> &
  VariantProps<typeof toggleGroupItemVariants>;

export function ToggleGroupItem({
  className,
  size,
  tone,
  ...props
}: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(toggleGroupItemVariants({ size, tone }), className)}
      {...props}
    />
  );
}
