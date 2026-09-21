'use client';

import { ko } from 'date-fns/locale';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';

import { buttonVariants } from '../../components/Button/Button';
import { cn } from '../../utils/cn';

export type CalendarProps = DayPickerProps;

/**
 * react-day-picker는 shadcn/ui 생태계의 사실상 표준 캘린더 엔진(Radix에는
 * 캘린더 프리미티브가 없음). Day(td)에만 selected/today/outside/disabled
 * 모디파이어 클래스가 적용되고 DayButton(button)에는 안 붙으므로, `day`를
 * `group/day`로 표시하고 `day_button`에서 `group-data-[..]/day:`로 내부
 * 버튼 스타일을 끌어온다.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = ko,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn('p-3', className)}
      classNames={{
        months: 'relative flex flex-col gap-4 sm:flex-row',
        month: 'flex w-full flex-col gap-4',
        nav: 'absolute inset-x-0 top-0 flex w-full items-center justify-between',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'size-8 p-0',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'size-8 p-0',
        ),
        month_caption: 'flex h-8 w-full items-center justify-center',
        caption_label:
          'text-sm font-medium text-[var(--color-text-primary)] select-none',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday:
          'w-9 flex-1 text-[0.8rem] font-normal text-[var(--color-text-tertiary)] select-none',
        week: 'mt-2 flex w-full',
        day: cn(
          'group/day relative aspect-square w-full min-w-9 p-0 text-center select-none',
          '[&:first-child[data-selected=true]_button]:rounded-l-[var(--radius-md)]',
          '[&:last-child[data-selected=true]_button]:rounded-r-[var(--radius-md)]',
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'size-9 w-full p-0 font-normal',
          'group-data-[today=true]/day:bg-[var(--color-bg-muted)]',
          // 오늘 날짜가 선택된 날짜이기도 하면(기본값) 선택 강조가 항상 이겨야 합니다.
          'group-data-[selected=true]/day:!bg-[var(--color-bg-accent)] group-data-[selected=true]/day:!text-[var(--color-text-on-solid)]',
          'group-data-[selected=true]/day:hover:!bg-[var(--color-bg-accent-hover)]',
          'group-data-[outside=true]/day:text-[var(--color-text-disabled)] group-data-[outside=true]/day:opacity-50',
          'group-data-[disabled=true]/day:pointer-events-none group-data-[disabled=true]/day:text-[var(--color-text-disabled)] group-data-[disabled=true]/day:opacity-50',
        ),
        range_start:
          'rounded-l-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)]',
        range_end:
          'rounded-r-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)]',
        range_middle: 'rounded-none bg-[var(--color-bg-accent-subtle)]',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) => {
          const iconClassName = cn('size-4', chevronClassName);
          if (orientation === 'left')
            return <ChevronLeft className={iconClassName} />;
          if (orientation === 'right')
            return <ChevronRight className={iconClassName} />;
          return <ChevronDown className={iconClassName} />;
        },
        ...components,
      }}
      {...props}
    />
  );
}
