'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';

import { Button } from '../../components/Button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/Popover/Popover';
import { cn } from '../../utils/cn';
import { Calendar, type CalendarProps } from '../Calendar/Calendar';

export type DatePickerProps = {
  /** 제어 모드일 때 선택된 날짜. */
  value?: Date;
  /** 비제어 모드일 때 초기 선택 날짜. */
  defaultValue?: Date;
  /** 날짜가 선택될 때 호출된다 (선택과 동시에 팝오버가 닫힌다). */
  onChange?: (date: Date | undefined) => void;
  /** 선택된 날짜가 없을 때 트리거에 표시할 문구. */
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
  /** Calendar에 그대로 전달할 나머지 props (mode/selected/onSelect는 DatePicker가 관리). */
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

/**
 * Popover(트리거) + Calendar(단일 날짜 선택)를 조합한 날짜 선택기.
 * value/onChange를 주면 제어 모드, defaultValue만 주면 비제어 모드로 동작한다.
 */
export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = '날짜 선택',
  disabled,
  className,
  align = 'center',
  side,
  sideOffset,
  calendarProps,
  ...rest
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalValue;

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) {
      setInternalValue(date);
    }
    onChange?.(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'h-12 w-[240px] justify-start gap-2 bg-[var(--color-bg-surface)] font-normal',
            !selected && 'text-[var(--color-text-disabled)]',
            'aria-invalid:border-[var(--color-border-error)] aria-invalid:focus-visible:ring-[var(--color-border-error)]',
            className,
          )}
          {...rest}
        >
          <CalendarIcon className="size-4" />
          {selected
            ? format(selected, 'yyyy년 M월 d일', { locale: ko })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <Calendar
          defaultMonth={selected}
          {...calendarProps}
          mode="single"
          selected={selected}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
