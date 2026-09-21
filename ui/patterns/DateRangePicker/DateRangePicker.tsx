'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '../../components/Button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/Popover/Popover';
import { cn } from '../../utils/cn';
import { Calendar, type CalendarProps } from '../Calendar/Calendar';

export type DateRangePickerProps = {
  /** 제어 모드일 때 선택된 기간. */
  value?: DateRange;
  /** 비제어 모드일 때 초기 선택 기간. */
  defaultValue?: DateRange;
  /** 기간이 바뀔 때마다 호출된다 (시작일만 선택된 중간 상태도 포함). */
  onChange?: (range: DateRange | undefined) => void;
  /** 선택된 기간이 없을 때 트리거에 표시할 문구. */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** 캘린더 팝오버의 트리거 대비 정렬.
   *
   * 화면 가장자리에 붙는 트리거는 'start'/'end'로 보정한다. */
  align?: ComponentProps<typeof PopoverContent>['align'];
  /** 캘린더 팝오버가 트리거의 어느 쪽에 뜰지. */
  side?: ComponentProps<typeof PopoverContent>['side'];
  /** 캘린더 팝오버와 트리거 사이 간격. */
  sideOffset?: ComponentProps<typeof PopoverContent>['sideOffset'];
  /** Calendar에 그대로 전달할 나머지 props (mode/selected/onSelect는 DateRangePicker가 관리). */
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>;
} & Omit<
  ComponentPropsWithoutRef<'button'>,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'disabled'
  | 'className'
  | 'children'
  | 'type'
>;

function formatRange(range: DateRange | undefined, placeholder: string) {
  if (!range?.from) return placeholder;
  const from = format(range.from, 'yyyy.MM.dd', { locale: ko });
  if (!range.to) return `${from} -`;
  const to = format(range.to, 'yyyy.MM.dd', { locale: ko });
  return `${from} - ${to}`;
}

/**
 * Popover(트리거) + Calendar(mode="range")를 조합한 기간 선택기.
 * value/onChange를 주면 제어 모드, defaultValue만 주면 비제어 모드로 동작한다.
 * 시작일만 고른 중간 상태에서는 팝오버를 열어 두고, 종료일까지 선택되면 닫는다.
 */
export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  placeholder = '조회 기간 선택',
  disabled,
  className,
  align = 'center',
  side,
  sideOffset,
  calendarProps,
  ...rest
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<DateRange | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalValue;

  const handleSelect = (range: DateRange | undefined) => {
    if (!isControlled) {
      setInternalValue(range);
    }
    onChange?.(range);
    if (range?.from && range?.to) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'h-12 w-[280px] justify-start gap-2 bg-[var(--color-bg-surface)] font-normal',
            !selected?.from && 'text-[var(--color-text-disabled)]',
            'aria-invalid:border-[var(--color-border-error)] aria-invalid:focus-visible:ring-[var(--color-border-error)]',
            className,
          )}
          {...rest}
        >
          <CalendarIcon className="size-4" />
          {formatRange(selected, placeholder)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <Calendar
          defaultMonth={selected?.from}
          // min={1} 없으면 react-day-picker가 첫 클릭에서 바로 { from, to: from }인
          // "완성된" 1일짜리 범위를 만들어 popover가 즉시 닫혀버린다.
          min={1}
          {...calendarProps}
          mode="range"
          selected={selected}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
