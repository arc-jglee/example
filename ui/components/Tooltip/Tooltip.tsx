'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

/**
 * 앱 루트에 한 번 감싸면 여러 Tooltip이 delayDuration/skipDelayDuration을
 * 공유한다 (생략해도 각 Tooltip이 Radix 기본값으로 개별 동작한다).
 */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipContentProps = ComponentProps<
  typeof TooltipPrimitive.Content
> & {
  /** 툴팁 배경색을 덮어씁니다. 지정 시 화살표 색도 함께 바뀝니다. */
  backgroundColor?: string;
  /** 툴팁 글자색을 덮어씁니다. */
  color?: string;
};

export function TooltipContent({
  className,
  sideOffset = 4,
  children,
  backgroundColor,
  color,
  style,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--z-tooltip)] max-w-[220px] rounded-[var(--radius-md)] px-2.5 py-1.5 shadow-md outline-none',
          'text-[length:var(--text-body-sm)] leading-[1.4]',
          'bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]',
          className,
        )}
        style={{ ...style, backgroundColor, color }}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className="fill-[var(--color-bg-inverse)]"
          style={backgroundColor ? { fill: backgroundColor } : undefined}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
